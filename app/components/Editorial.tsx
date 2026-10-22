import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { CaseStudy } from "../data/projects";
import { processSteps, services } from "../data/site";

export function Arrow({ direction = "up" }: { direction?: "up" | "down" | "right" }) {
  return <span className="arrow" aria-hidden="true">{direction === "down" ? "↓" : direction === "right" ? "→" : "↗"}</span>;
}
export function ButtonLink({ href, children, light = false, secondary = false }: { href: string; children: ReactNode; light?: boolean; secondary?: boolean }) {
  return <Link className={`button${light ? " button-light" : ""}${secondary ? " button-secondary" : ""}`} href={href}>{children}<Arrow /></Link>;
}
export function SectionIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className="section-intro"><p className="eyebrow">{label}</p><div><h2>{title}</h2>{children}</div></div>;
}
export function PageIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <section className="shell page-intro"><p className="eyebrow">{label}</p><h1>{title}</h1>{children ? <div className="page-intro-description">{children}</div> : null}</section>;
}
export function Geometry() {
  return <div className="geometry" aria-hidden="true"><div className="geometry-orbit"><svg viewBox="0 0 440 440" fill="none"><g stroke="currentColor" strokeWidth=".8">{Array.from({ length: 9 }, (_, i) => <rect key={i} x={68 + i * 10} y={68 + i * 10} width={304 - i * 20} height={304 - i * 20} rx="2" transform={`rotate(${i * 5 - 20} 220 220)`} />)}<path d="M220 18v42m0 320v42M18 220h42m320 0h42" /><circle cx="220" cy="220" r="191" strokeDasharray="2 7" /></g><circle cx="220" cy="220" r="4" fill="currentColor" /></svg></div><span>Direção. Forma. Evolução.</span></div>;
}
export function ProjectArtwork({ project, large = false, priority = false }: { project: CaseStudy; large?: boolean; priority?: boolean }) {
  return <div className={`project-artwork${large ? " artwork-large" : ""}`} style={{ "--project-surface": project.theme.frame } as CSSProperties}><div className="artwork-corner" aria-hidden="true">JP / {project.name}</div><div className="desktop-device"><div className="device-chrome" aria-hidden="true"><span /><span /><span /><i /></div><Image src={project.desktopScreenshot} alt={`Página inicial do website de ${project.name} em uma tela de computador`} sizes={large ? "(max-width: 700px) 85vw, 1000px" : "(max-width: 700px) 85vw, 700px"} preload={priority} /></div><div className="mobile-device" aria-hidden="true"><Image src={project.mobileScreenshot} alt="" sizes="(max-width: 700px) 22vw, 190px" /></div><span className="artwork-caption" aria-hidden="true">Desktop + Mobile</span></div>;
}
export function ProjectCard({ project, variant = "standard", priority = false }: { project: CaseStudy; variant?: "feature" | "standard" | "split"; priority?: boolean }) {
  return <article className={`project-card project-${variant}`}><Link href={`/projetos/${project.slug}`} className="project-image-link" aria-label={`Conhecer o projeto ${project.name}`}><ProjectArtwork project={project} large={variant === "feature"} priority={priority} /><span className="project-open" aria-hidden="true"><Arrow /></span></Link><div className="project-caption"><div><p className="project-category">{project.category}</p><h3><Link href={`/projetos/${project.slug}`}>{project.name}</Link></h3></div><p className="project-description">{project.description}</p><Link href={`/projetos/${project.slug}`} className="text-link">Conhecer projeto <Arrow /></Link></div></article>;
}
export function ServicesList({ expanded = false }: { expanded?: boolean }) {
  return <div className="services-list">{services.map((service, i) => <article key={service.title}><span className="service-number">0{i + 1}</span><h3>{service.title}</h3><p>{expanded ? service.detail : service.text}</p><Link href={`/contato?servico=${i + 1}`} aria-label={`Conversar sobre ${service.title}`}><Arrow /></Link></article>)}</div>;
}
export function Process() {
  return <section className="section-pad process-section" id="processo"><div className="shell"><SectionIntro label="Como trabalhamos" title="Um caminho claro. Do primeiro encontro ao próximo passo."><p>Boas experiências começam com boas perguntas. E evoluem com decisões que fazem sentido.</p></SectionIntro><ol className="process-grid">{processSteps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>;
}
export function Partnership() {
  return <section className="partnership section-pad" id="parceria"><div className="shell partnership-inner"><p className="eyebrow">Crescer em parceria</p><h2>Um projeto profissional.<br />Uma parceria contínua.</h2><div className="partnership-copy"><p>Em parcerias selecionadas, desenvolvemos o website sem cobrança inicial de criação. O investimento mensal contempla hospedagem, manutenção e suporte conforme as condições contratadas.</p><p className="small-copy">A proposta é definida após conhecer o negócio. Escopo, serviços e condições são combinados antes de começar.</p><ButtonLink href="/contato?interesse=parceria" light>Conhecer a proposta</ButtonLink></div><span className="partnership-plus" aria-hidden="true">+</span></div></section>;
}
export function FinalCTA() {
  return <section className="final-cta"><div className="shell"><p className="eyebrow">Vamos construir juntos</p><h2>Seu próximo nível<br />começa aqui.</h2><div className="final-cta-bottom"><p>Conte sobre sua empresa e descubra como podemos fortalecer sua presença digital.</p><ButtonLink href="/contato">Iniciar um projeto</ButtonLink></div></div></section>;
}
