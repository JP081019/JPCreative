"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { services, site } from "../data/site";
import { emptyContact, validateContact, type ContactErrors, type ContactValues } from "../lib/contact";

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, service: initialService });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const startedAt = useRef<number | null>(null);
  const form = useRef<HTMLFormElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateContact(values);
    setErrors(checked.errors);
    setStatus("");
    if (Object.keys(checked.errors).length) {
      const first = Object.keys(checked.errors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...checked.values, website: new FormData(form.current!).get("website"), startedAt: startedAt.current }) });
      const data = await response.json();
      if (data.errors) setErrors(data.errors);
      // Delivery is intentionally unavailable until a provider is selected and verified.
      setStatus(typeof data.message === "string" ? data.message : "Sua mensagem não foi enviada. Fale conosco pelo WhatsApp ou e-mail.");
    } catch {
      setStatus("Não foi possível enviar. Seu texto continua aqui. Fale conosco pelo WhatsApp ou e-mail.");
    } finally { setSending(false); }
  }
  function update(key: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }
  const fieldProps = (name: keyof ContactValues) => ({ id: name, name, value: values[name], "aria-invalid": errors[name] ? true as const : undefined, "aria-describedby": errors[name] ? `${name}-error` : undefined, onChange: (event: { target: { value: string } }) => update(name, event.target.value) });
  const error = (name: keyof ContactValues) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;

  return <form ref={form} className="contact-form" onSubmit={submit} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} noValidate aria-label="Conte sobre seu projeto">
    <div className="form-notice"><strong>Envio pelo formulário ainda indisponível.</strong><br />Para iniciar seu projeto agora, use o <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> ou o e-mail. Nenhuma mensagem será entregue por este formulário nesta versão.</div>
    <div className="form-fields">
      <div className="field"><label htmlFor="name">Nome</label><input {...fieldProps("name")} autoComplete="name" required maxLength={100} />{error("name")}</div>
      <div className="field"><label htmlFor="contact">E-mail ou WhatsApp</label><input {...fieldProps("contact")} autoComplete="email" required maxLength={180} />{error("contact")}</div>
      <div className="field"><label htmlFor="company">Empresa <span>(opcional)</span></label><input {...fieldProps("company")} autoComplete="organization" maxLength={150} />{error("company")}</div>
      <div className="field"><label htmlFor="service">Interesse <span>(opcional)</span></label><select {...fieldProps("service")}><option value="">Vamos descobrir juntos</option>{services.map((service, i) => <option key={service.title} value={String(i + 1)}>{service.title}</option>)}<option value="parceria">Modelo de parceria</option></select>{error("service")}</div>
      <div className="field field-wide"><label htmlFor="message">O que você tem em mente?</label><textarea {...fieldProps("message")} rows={5} required minLength={20} maxLength={3000} />{error("message")}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Deixe este campo vazio</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    </div>
    <p className="form-privacy">Usamos os dados apenas para analisar sua solicitação. Não envie informações sensíveis. Leia a <Link href="/privacidade">Política de privacidade</Link>.</p>
    <div role="status" aria-live="polite" aria-atomic="true">{status ? <p className="form-status">{status}</p> : null}</div>
    <button className="button" type="submit" disabled={sending}>{sending ? "Verificando…" : "Enviar mensagem"}<span aria-hidden="true">↗</span></button>
  </form>;
}
