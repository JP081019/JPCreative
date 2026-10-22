import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); } catch {
  playwright = require(process.env.PLAYWRIGHT_MODULE || path.join(process.env.USERPROFILE || process.env.HOME || "", ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"));
}
const executablePath = process.env.BROWSER_EXECUTABLE || ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__jpMetrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => { for (const entry of list.getEntries()) window.__jpMetrics.lcp = entry.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__jpMetrics.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(process.env.TEST_BASE_URL || "http://localhost:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Include the complete initial hero sequence in the observation window.
    await page.waitForTimeout(1800);
    const metrics = await page.evaluate(() => ({ ...window.__jpMetrics, scriptsKB: Math.round(performance.getEntriesByType("resource").filter((resource) => resource.initiatorType === "script").reduce((sum, resource) => sum + resource.encodedBodySize, 0) / 1024) }));
    results.push({ viewport, lcpMs: Math.round(metrics.lcp), cls: Number(metrics.cls.toFixed(4)), scriptsKB: metrics.scriptsKB });
    await context.close();
  }
} finally { await browser.close(); }
mkdirSync(".qa", { recursive: true });
const report = { date: new Date().toISOString(), conditions: "Local production server, Chrome headless, new browser context per viewport, no network or CPU throttling. INP not measured. Not field Core Web Vitals.", results };
writeFileSync(".qa/performance.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
