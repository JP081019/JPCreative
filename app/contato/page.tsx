import { PageIntro } from "../components/Editorial";
import { ContactForm } from "../components/ContactForm";
import { site } from "../data/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata("Contato", "Conte sobre sua empresa e seu próximo projeto. Converse com a JP Creative pelo WhatsApp ou e-mail.", "/contato");
type Props = { searchParams: Promise<{ servico?: string; interesse?: string }> };
export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialService = params.interesse === "parceria" ? "parceria" : ["1", "2", "3", "4"].includes(params.servico ?? "") ? params.servico! : "";
  return <><PageIntro label="Uma conversa pode ser o começo" title="Seu próximo nível começa aqui."><p>Conte sobre sua empresa, seu momento e o que você quer construir. Vamos encontrar uma direção juntos.</p></PageIntro><section className="shell contact-grid" aria-label="Canais de contato"><div className="contact-details"><h2>Vamos conversar.</h2><p>Prefere começar com uma conversa direta? Escolha o canal que funciona melhor para você.</p><div className="contact-channels"><a className="text-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a className="text-link" href={`mailto:${site.email}`}>E-mail ↗</a></div><p className="contact-note">Cada proposta considera os objetivos, o escopo e as necessidades do negócio. Sem fórmulas prontas.</p></div><ContactForm initialService={initialService} /></section></>;
}
