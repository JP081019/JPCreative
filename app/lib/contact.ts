export type ContactValues = { name: string; contact: string; company: string; service: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export const emptyContact: ContactValues = { name: "", contact: "", company: "", service: "", message: "" };

export function validateContact(input: unknown): { values: ContactValues; errors: ContactErrors } {
  const raw = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const values = Object.fromEntries(Object.keys(emptyContact).map((key) => [key, typeof raw[key] === "string" ? raw[key].trim() : ""])) as ContactValues;
  const errors: ContactErrors = {};
  if (values.name.length < 2 || values.name.length > 100) errors.name = "Informe seu nome, entre 2 e 100 caracteres.";
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact);
  const phone = /^[+()\d\s.-]+$/.test(values.contact) && values.contact.replace(/\D/g, "").length >= 10 && values.contact.replace(/\D/g, "").length <= 15;
  if ((!email && !phone) || values.contact.length > 180) errors.contact = "Informe um e-mail válido ou um WhatsApp com DDD.";
  if (values.company.length > 150) errors.company = "Use até 150 caracteres para o nome da empresa.";
  if (values.service && !["1", "2", "3", "4", "parceria"].includes(values.service)) errors.service = "Selecione uma das opções disponíveis.";
  if (values.message.length < 20 || values.message.length > 3000) errors.message = "Conte um pouco mais: use entre 20 e 3.000 caracteres.";
  return { values, errors };
}
