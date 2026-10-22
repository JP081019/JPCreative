import { ButtonLink, FinalCTA, Geometry, Partnership, Process, ProjectCard, SectionIntro, ServicesList } from "./components/Editorial";
import { caseStudies } from "./data/projects";
import { pageMetadata } from "./lib/metadata";

export const metadata = pageMetadata("Construímos o próximo nível.", "Estratégia, design e tecnologia para marcas que querem evoluir. Conheça os projetos e as soluções digitais da JP Creative.", "/");

export default function Home() {
  return <>
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-topline"><p>Agência digital independente</p><span>Estratégia / Design / Tecnologia</span></div>
      <div className="hero-composition"><h1 id="hero-title"><span>Construímos</span><span>o próximo</span><span>nível.</span></h1><Geometry /></div>
      <div className="hero-bottom"><p>Estratégia, design e tecnologia<br />para marcas que querem evoluir.</p><div className="hero-actions"><ButtonLink href="/projetos">Ver projetos</ButtonLink><ButtonLink href="/contato" secondary>Iniciar um projeto</ButtonLink></div></div>
      <div className="hero-footnote"><a href="#visao">Explore o próximo passo <span aria-hidden="true">↓</span></a><span>Impact + Evolve</span></div>
    </section>
    <section className="manifesto section-pad" id="visao" aria-labelledby="manifesto-title"><div className="shell manifesto-grid"><p className="eyebrow">02 / Nossa visão</p><h2 id="manifesto-title">Uma presença digital não deve apenas existir. Deve representar a qualidade de quem está por trás dela.</h2><div className="manifesto-bottom"><span className="manifesto-mark" aria-hidden="true">↗</span><p>Unimos estratégia, design e tecnologia para construir experiências digitais com propósito, personalidade e atenção a cada detalhe.</p><a className="text-link" href="/sobre">Conheça a JP Creative <span aria-hidden="true">↗</span></a></div></div></section>
    <section className="portfolio section-pad" id="projetos"><div className="shell"><SectionIntro label="Selected work" title="Projetos selecionados."><p>Experiências digitais criadas para marcas com diferentes histórias, objetivos e personalidades.</p></SectionIntro><div className="portfolio-grid"><ProjectCard project={caseStudies[0]} variant="feature" /><ProjectCard project={caseStudies[1]} /><ProjectCard project={caseStudies[2]} /><ProjectCard project={caseStudies[3]} variant="split" /></div><div className="portfolio-end"><p>Cada marca tem uma história.<br />Cada projeto, uma direção.</p><ButtonLink href="/projetos" secondary>Todos os projetos</ButtonLink></div></div></section>
    <section className="solutions-section section-pad" id="solucoes"><div className="shell"><SectionIntro label="O que fazemos" title="Ideias que ganham forma. Marcas que avançam."><p>Da primeira direção ao cuidado contínuo, conectamos o que sua empresa precisa ao que o digital pode oferecer.</p></SectionIntro><ServicesList /></div></section>
    <Process /><Partnership /><FinalCTA />
  </>;
}
