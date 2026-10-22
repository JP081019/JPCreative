import { createHash, randomBytes } from "node:crypto";
import { validateContact } from "../../lib/contact";

export const runtime = "nodejs";
const salt = randomBytes(24).toString("hex");
const attempts = new Map<string, { count: number; expires: number }>();
const headers = { "Cache-Control": "no-store" };
function reply(message: string, status: number, extra = {}) { return Response.json({ message, ...extra }, { status, headers }); }

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return reply("Origem da solicitação não permitida.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Formato de mensagem não aceito.", 415);
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(salt + ip).digest("hex");
  const entry = attempts.get(key);
  if (entry && entry.count >= 5) return Response.json({ message: "Muitas tentativas. Aguarde alguns minutos ou fale pelo WhatsApp." }, { status: 429, headers: { ...headers, "Retry-After": String(Math.ceil((entry.expires - now) / 1000)) } });
  if (attempts.size >= 10000 && !entry) return reply("Tente novamente em alguns minutos ou fale pelo WhatsApp.", 429);
  attempts.set(key, { count: (entry?.count ?? 0) + 1, expires: entry?.expires ?? now + 600000 });
  if (Number(request.headers.get("content-length")) > 16384) return reply("A mensagem excedeu o tamanho permitido.", 413);
  let input: unknown;
  try {
    // Read a bounded stream, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply("Mensagem inválida.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply("A mensagem excedeu o tamanho permitido.", 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return reply("Não foi possível ler a mensagem.", 400); }
  if (typeof input !== "object" || !input || Array.isArray(input)) return reply("Mensagem inválida.", 400);
  const raw = input as Record<string, unknown>;
  if (raw.website) return reply("Não foi possível processar a solicitação.", 400);
  const { errors } = validateContact(input);
  if (Object.keys(errors).length) return reply("Revise os campos indicados.", 400, { errors });
  if (typeof raw.startedAt !== "number" || now - raw.startedAt < 2000 || now - raw.startedAt > 86400000) return reply("Aguarde um instante e tente novamente.", 400);
  return reply("Sua mensagem não foi enviada. O envio pelo formulário ainda não está disponível. Use o WhatsApp ou o e-mail para conversar com a JP Creative.", 503);
}
