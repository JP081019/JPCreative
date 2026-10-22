import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch {
  const bundled = path.join(process.env.USERPROFILE || process.env.HOME || "", ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
  playwright = require(process.env.PLAYWRIGHT_MODULE || bundled);
}
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const output = path.resolve(".qa");
mkdirSync(output, { recursive: true });
const executablePath = process.env.BROWSER_EXECUTABLE || ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const failures = [];
const runtimeErrors = [];
const routeResults = [];
const overflowResults = [];
const accessibilityResults = [];
let checkingNotFound = false;
page.on("pageerror", (error) => runtimeErrors.push(error.message));
page.on("console", (message) => { if (message.type() === "error" && !message.text().includes("503") && !(checkingNotFound && message.text().includes("404"))) runtimeErrors.push(message.text()); });

async function inspectOverflow(route, width) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll("main *, header *, footer *")].filter((el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return !el.closest('[aria-hidden="true"]') && rect.width > 0 && style.visibility !== "hidden" && style.position !== "absolute" && (rect.right > innerWidth + 1 || rect.left < -1);
  }).slice(0, 8).map((el) => ({ tag: el.tagName, class: String(el.className), text: el.textContent.slice(0, 60) })) }));
  overflowResults.push({ route, width, ...result });
  if (result.scroll > width + 1 || result.offenders.length) failures.push({ kind: "overflow", route, width, ...result });
}

try {
  const routes = ["/", "/projetos", "/projetos/brava-spa", "/projetos/kleber-moreira", "/projetos/ana-dias", "/projetos/ely-oliveira", "/solucoes", "/sobre", "/contato", "/privacidade", "/termos", "/cookies", "/reembolsos-e-cancelamentos"];
  for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1, `${route}: one h1`);
    assert.ok(await page.title(), `${route}: title`);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    assert.equal(new URL(canonical).pathname, route, `${route}: canonical`);
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((img) => img.complete && !img.naturalWidth).map((img) => img.src));
    assert.deepEqual(brokenImages, [], `${route}: broken images`);
    routeResults.push({ route, status: response.status(), title: await page.title() });
    if (route.startsWith("/projetos/")) assert.match(await page.locator('meta[property="og:image"]').getAttribute("content"), /desktop-/, "Project-specific Open Graph");
    await page.addScriptTag({ content: readFileSync(require.resolve("axe-core/axe.min.js"), "utf8") });
    const accessibility = await page.evaluate(async () => {
      const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } });
      return { violations: result.violations.map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), incomplete: result.incomplete.length };
    });
    accessibilityResults.push({ route, ...accessibility });
    if (accessibility.violations.length) failures.push({ kind: "accessibility", route, ...accessibility });
  }
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) await inspectOverflow("/", width);
  for (const route of routes.filter((route) => route !== "/")) for (const width of [320, 768, 1440]) await inspectOverflow(route, width);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  const menuTrigger = page.getByRole("button", { name: "Abrir menu" });
  await menuTrigger.click();
  assert.equal(await page.locator("dialog").evaluate((el) => el.open), true);
  assert.equal(await page.getByRole("button", { name: "Fechar menu" }).evaluate((el) => document.activeElement === el), true);
  await page.keyboard.press("Shift+Tab");
  // Native dialogs may let the browser chrome receive focus; background links must remain inert.
  assert.equal(await page.locator("dialog").evaluate((el) => el.contains(document.activeElement) || document.activeElement === document.body), true);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("dialog").evaluate((el) => el.contains(document.activeElement) || document.activeElement === document.body), true, "Menu prevents background focus");
  }
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog").evaluate((el) => el.open), false);
  assert.equal(await menuTrigger.evaluate((el) => document.activeElement === el), true, "Escape restores focus");
  await menuTrigger.click();
  await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Projetos" }).click();
  await page.waitForURL(base + "/projetos");
  assert.equal(await page.locator("dialog").evaluate((el) => el.open), false);
  assert.equal(await page.locator("body").evaluate((el) => el.style.overflow), "");
  await menuTrigger.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.waitForFunction(() => !document.querySelector("dialog").open);
  assert.equal(await page.locator("body").evaluate((el) => el.style.overflow), "");

  await page.goto(base + "/contato?servico=2", { waitUntil: "networkidle" });
  assert.equal(await page.getByLabel("Interesse").inputValue(), "2");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
  assert.equal(await page.getByLabel("Nome", { exact: true }).evaluate((el) => document.activeElement === el), true);
  await page.getByLabel("Nome", { exact: true }).fill("Pessoa de teste");
  await page.getByLabel("E-mail ou WhatsApp").fill("teste@example.com");
  await page.getByLabel("O que você tem em mente?").fill("Mensagem de teste para verificar validação e indisponibilidade de entrega.");
  // Ensure the legitimate input path clears the minimum-time spam guard.
  await page.waitForTimeout(2100);
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await page.getByRole("status").getByText(/Sua mensagem não foi enviada/).waitFor();
  assert.equal(await page.getByLabel("Nome", { exact: true }).inputValue(), "Pessoa de teste");
  assert.equal(await page.getByRole("button", { name: "Enviar mensagem" }).isEnabled(), true);

  const headers = { Origin: base, "Content-Type": "application/json" };
  const api = async (body, extraHeaders = headers) => context.request.post(base + "/api/contato", { headers: extraHeaders, data: body });
  const valid = { name: "Pessoa de teste", contact: "teste@example.com", company: "", service: "1", message: "Mensagem somente para teste de validação no servidor.", website: "", startedAt: Date.now() - 10000 };
  assert.equal((await api(valid, { ...headers, Origin: "https://other.example" })).status(), 403);
  assert.equal((await api(valid, { Origin: base, "Content-Type": "text/plain" })).status(), 415);
  assert.equal((await api({ ...valid, name: "", contact: "inválido", message: "curta" })).status(), 400);
  assert.equal((await api({ ...valid, website: "spam" })).status(), 400);
  assert.equal((await api(valid)).status(), 503);
  assert.equal((await api({ ...valid, message: "x".repeat(18000) })).status(), 413);
  assert.equal((await api(valid)).status(), 429);

  checkingNotFound = true;
  const missing = await page.goto(base + "/projetos/inexistente", { waitUntil: "networkidle" });
  assert.equal(missing.status(), 404);
  const notFound = await page.goto(base + "/pagina-inexistente", { waitUntil: "networkidle" });
  assert.equal(notFound.status(), 404);
  assert.match(await page.locator("h1").innerText(), /outro caminho/);
  checkingNotFound = false;
  const sitemap = await context.request.get(base + "/sitemap.xml");
  assert.equal(sitemap.status(), 200);
  assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 9);
  assert.equal((await context.request.get(base + "/robots.txt")).status(), 200);
  const og = await context.request.get(base + "/opengraph-image");
  assert.equal(og.status(), 200);
  assert.match(og.headers()["content-type"], /image\/png/);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await page.getByRole("link", { name: "Pular para o conteúdo" }).focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("main").evaluate((el) => document.activeElement === el), true, "Skip link focuses content");
  await page.locator("main").evaluate((el) => el.blur());
  const response = await context.request.get(base);
  assert.match(response.headers()["content-security-policy"], /frame-ancestors 'none'/);
  assert.equal(response.headers()["x-content-type-options"], "nosniff");
  assert.equal(response.headers()["x-frame-options"], "DENY");
  assert.equal(response.headers()["referrer-policy"], "no-referrer");
  assert.equal(await page.locator("h1>span").first().evaluate((el) => getComputedStyle(el).animationName), "none", "Reduced motion");
  await page.screenshot({ path: path.join(output, "desktop-hero.png") });
  await page.screenshot({ path: path.join(output, "desktop-full.png"), fullPage: true });
  await page.locator("#projetos").screenshot({ path: path.join(output, "portfolio.png"), style: ".site-header,.skip-link {visibility:hidden!important}" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(output, "mobile-hero.png") });
  await page.screenshot({ path: path.join(output, "mobile-full.png"), fullPage: true });
  const cookies = await context.cookies();
  const storage = await page.evaluate(() => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage) }));
  assert.deepEqual(cookies, []);
  assert.deepEqual(storage, { local: [], session: [] });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1>span").first().evaluate((el) => getComputedStyle(el).animationName), "title-enter");
  const geometry = await page.locator(".geometry").boundingBox();
  const actions = await page.locator(".hero-actions").boundingBox();
  assert.ok(geometry.y + geometry.height <= actions.y, "Hero geometry does not overlap actions");
  assert.deepEqual(runtimeErrors, [], "Browser runtime and CSP errors");
  assert.deepEqual(failures, [], "Responsive and accessibility checks");
  console.log(`PASS: ${routes.length} routes; ${overflowResults.length} viewport checks; menu, focus, Escape, resize, form errors, 503 delivery, origin, media type, server validation, honeypot, request size, rate limit, 404, SEO endpoints, headers, reduced motion, cookies and storage.`);
} catch (error) {
  failures.push({ kind: "assertion", message: error.message, stack: error.stack });
  console.log("FAIL:", error.message);
  if (!page.isClosed()) await page.screenshot({ path: path.join(output, "failure.png"), fullPage: true });
  process.exitCode = 1;
} finally {
  writeFileSync(path.join(output, "verification.json"), JSON.stringify({ base, date: new Date().toISOString(), routes: routeResults, viewports: overflowResults, accessibility: accessibilityResults, runtimeErrors, failures }, null, 2));
  console.log(JSON.stringify({ routes: routeResults.length, viewportChecks: overflowResults.length, accessibilityViolations: accessibilityResults.reduce((sum, item) => sum + item.violations.length, 0), runtimeErrors, failures }, null, 2));
  await browser.close();
}
