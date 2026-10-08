"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InfiniteSlider } from "./components/InfiniteSlider";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { brands, projects, testimonials } from "./data/home";
import logoJp from "../public/Logo/Logo.jpeg";
import joaoPedro from "../public/images/joao-pedro.jpg";

const whatsappUrl = "https://wa.me/5548996656319?text=Ol%C3%A1%2C%20JPCreative!%20Quero%20conversar%20sobre%20um%20projeto.";

const services = [
  { icon: "bi-window", title: "Sites", text: "Presenças digitais próprias, claras e construídas para representar o nível do seu negócio." },
  { icon: "bi-braces", title: "Sistemas", text: "Ferramentas sob medida para organizar informações, rotinas e decisões importantes." },
  { icon: "bi-layers", title: "Soluções digitais", text: "Experiências que conectam estratégia, interface e tecnologia sem depender de fórmulas prontas." },
];

const process = [
  ["Entender", "o momento, o negócio e a necessidade real."],
  ["Pensar", "a direção mais coerente antes de desenhar."],
  ["Criar", "design e tecnologia como uma única experiência."],
  ["Refinar", "conteúdo, interação e detalhes em conjunto."],
  ["Entregar e evoluir", "uma solução pronta para trabalhar e crescer."],
];

function Brand({ small = false }: { small?: boolean }) {
  return <span className={`official-brand ${small ? "small" : ""}`}><Image src={logoJp} alt="JPCreative" priority sizes={small ? "150px" : "190px"} /></span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><i className="bi bi-dash-lg" aria-hidden="true" />{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-shell">
          <a className="brand" href="#inicio" aria-label="JPCreative — início"><Brand small /></a>
          <nav id="navigation" className={menuOpen ? "is-open" : ""} aria-label="Navegação principal">
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a>
            <a href="#processo" onClick={() => setMenuOpen(false)}>Processo</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a className="nav-contact" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" />Conversar</a>
          </nav>
          <a className="header-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" /><span>Conversar</span><i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-controls="navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" /></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-light" aria-hidden="true" /><div className="hero-rule rule-one" aria-hidden="true" /><div className="hero-rule rule-two" aria-hidden="true" />
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="hero-kicker"><span />Design, tecnologia e presença</p>
            <h1>Sua empresa merece ser <em>melhor percebida.</em></h1>
            <p className="hero-description">Sites e sistemas pensados para transformar presença digital em confiança, profissionalismo e novas oportunidades.</p>
            <div className="hero-actions">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" />Conversar sobre um projeto<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
              <a className="button secondary" href="#projetos">Conhecer projetos<i className="bi bi-arrow-down" aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-signature" aria-hidden="true"><span>Sites</span><span>Sistemas</span><span>Soluções digitais</span></div>
        </div>
        <a className="scroll-cue" href="#valor" aria-label="Continuar"><i className="bi bi-arrow-down" aria-hidden="true" /></a>
      </section>

      <section className="value section-shell" id="valor">
        <div className="value-lead"><Label>Presença com intenção</Label><h2>Não basta estar online.<br /><span>É preciso transmitir valor.</span></h2></div>
        <div className="value-copy"><p>Antes de conversar com sua empresa, muita gente conhece a forma como ela se apresenta.</p><p>Uma experiência clara, profissional e própria ajuda o seu negócio a ocupar o espaço que merece.</p><a href="#projetos">Ver isso na prática <i className="bi bi-arrow-down-right" aria-hidden="true" /></a></div>
      </section>

      <section className="services section-shell" id="servicos">
        <div className="section-heading"><Label>O que a JPCreative desenvolve</Label><h2>O digital certo para o que seu negócio precisa agora.</h2></div>
        <div className="capability-grid">{services.map((service, index) => <article key={service.title}><span>0{index + 1}</span><i className={`bi ${service.icon}`} aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
      </section>

      <section className="work" id="projetos">
        <div className="section-shell work-heading"><div><Label>Projetos selecionados</Label><h2>Identidade própria.<br />Decisões sob medida.</h2></div><p>Quatro negócios diferentes, cada um com uma linguagem construída para o seu público, seu momento e sua forma de gerar confiança.</p></div>
        <div className="section-shell"><ProjectShowcase projects={projects} /></div>
      </section>

      <section className="brands" aria-labelledby="brands-title">
        <div className="section-shell brands-heading"><Label>Marcas que já confiaram</Label><h2 id="brands-title">Projetos criados a partir de relações reais.</h2></div>
        <InfiniteSlider brands={brands} />
      </section>

      <section className="testimonials section-shell" aria-labelledby="testimonials-title">
        <div className="testimonials-heading"><Label>Quem viveu o processo</Label><h2 id="testimonials-title">O resultado importa.<br />A experiência também.</h2></div>
        <div className="quotes">{testimonials.map((testimonial, index) => {
          const [before, after = ""] = testimonial.text.split(testimonial.highlight);
          return <blockquote key={testimonial.author}><div className="quote-index">0{index + 1}</div><div className="quote-concept">{testimonial.concept}</div><p>“{before}<strong>{testimonial.highlight}</strong>{after}”</p><footer>— {testimonial.author}</footer></blockquote>;
        })}</div>
      </section>

      <section className="process section-shell" id="processo">
        <div className="process-intro"><Label>Um processo simples</Label><h2>Você não precisa entender de tecnologia para começar.</h2><p>A JPCreative conduz cada decisão com clareza, do primeiro contexto à evolução do projeto.</p></div>
        <ol>{process.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div><i className="bi bi-arrow-right" aria-hidden="true" /></li>)}</ol>
      </section>

      <section className="trust section-shell" id="sobre">
        <div className="about">
          <div className="about-portrait"><Image src={joaoPedro} alt="João Pedro da Silva, responsável pela JPCreative" sizes="(max-width: 640px) calc(100vw - 36px), 430px" /></div>
          <div className="about-copy"><Label>Por trás da JPCreative</Label><h2>João Pedro da Silva</h2><p>Design, desenvolvimento e visão de negócio reunidos em projetos tratados com atenção — da primeira conversa ao detalhe final.</p><p>A marca é o centro. João Pedro é quem transforma intenção, estratégia e tecnologia em uma experiência coerente para cada negócio.</p><div className="social-links"><a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-silva-380a1b32a" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" aria-hidden="true" />LinkedIn<i className="bi bi-arrow-up-right" aria-hidden="true" /></a><a href="https://github.com/JP081019" target="_blank" rel="noopener noreferrer"><i className="bi bi-github" aria-hidden="true" />GitHub<i className="bi bi-arrow-up-right" aria-hidden="true" /></a></div></div>
        </div>
        <div className="investment"><i className="bi bi-stars" aria-hidden="true" /><p className="eyebrow">Investimento com sentido</p><h2>Uma solução profissional, dimensionada para o seu momento.</h2><p>Primeiro entendemos o que seu negócio realmente precisa. O investimento acompanha a complexidade, os objetivos e a relação contínua — sem empacotar mais do que faz sentido.</p></div>
      </section>

      <section className="final-cta section-shell" id="contato"><p className="eyebrow">O próximo projeto pode começar com uma boa conversa.</p><h2>Vamos construir algo que represente o nível do seu negócio?</h2><p>Conte o que você precisa transformar. A JPCreative ajuda a encontrar a direção e traduzir isso em uma experiência digital própria.</p><a className="button primary large" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" />Conversar no WhatsApp<i className="bi bi-arrow-up-right" aria-hidden="true" /></a></section>

      <footer className="site-footer"><div className="section-shell footer-main"><div><Brand small /><p>Design, tecnologia e presença.</p></div><div><p>Navegação</p><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#processo">Processo</a><a href="#sobre">Sobre</a></div><div><p>Contato</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" />WhatsApp</a><a href="https://instagram.com/jpcreative.dev" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" aria-hidden="true" />@jpcreative.dev</a><a href="mailto:joao081019p0edrodasilv@gmail.com"><i className="bi bi-envelope" aria-hidden="true" />E-mail</a></div></div><div className="section-shell footer-bottom"><span>© 2026 JPCreative</span><span>Desenvolvido por JPCreative</span><span>Santa Catarina · Brasil</span><a href="#inicio" aria-label="Voltar ao início"><i className="bi bi-arrow-up" aria-hidden="true" /></a></div></footer>
    </main>
  );
}
