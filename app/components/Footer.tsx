import Link from "next/link";
import { navigation, site } from "../data/site";
import { Brand } from "./Brand";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><Brand footer /><p>Estratégia, design e tecnologia<br />para marcas que querem evoluir.</p><span>Impact + Evolve.</span></div><div><p className="footer-label">Explore</p>{navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}</div><div><p className="footer-label">Vamos conversar</p><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href={`mailto:${site.email}`}>E-mail ↗</a><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><Link href="/solucoes#parceria">Modelo de parceria</Link></div><div><p className="footer-label">Transparência</p><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link><Link href="/cookies">Cookies</Link><Link href="/reembolsos-e-cancelamentos">Cancelamentos</Link></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} JP Creative</span><a href={site.url}>Desenvolvido por JP Creative</a><a href="#conteudo">Voltar ao topo ↑</a></div></footer>;
}
