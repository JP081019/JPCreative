const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Processo", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

const processSteps = [
  {
    icon: "chat",
    number: "01",
    title: "Descoberta",
    text: "Entendemos seu negócio, seus objetivos e o público que você deseja alcançar.",
  },
  {
    icon: "pen",
    number: "02",
    title: "Planejamento",
    text: "Definimos estilo, cores, estrutura e a mensagem principal do seu site.",
  },
  {
    icon: "code",
    number: "03",
    title: "Desenvolvimento",
    text: "Criamos um site moderno, responsivo, rápido e pensado para conversão.",
  },
  {
    icon: "rocket",
    number: "04",
    title: "Publicação",
    text: "Publicamos o projeto e orientamos você sobre como usar e divulgar.",
  },
];

const projects = [
  {
    name: "Ana Dias Reflexoterapia",
    category: "Saúde integrativa",
    url: "https://www.anadiasreflexoterapia.com.br/",
    image: "/project-ana-dias-reflexoterapia.png",
    tone: "tone-a",
  },
  {
    name: "Cabanas do Rio",
    category: "Hospedagem / Experiência",
    url: "https://cabanas-do-rio.vercel.app/",
    image: "/project-cabanas-do-rio.png",
    tone: "tone-c",
  },
  {
    name: "Injoy",
    category: "Marca / Experiência digital",
    url: "https://injoy-tau.vercel.app/",
    image: "/project-injoy.png",
    tone: "tone-b",
  },
];

const benefits = [
  {
    icon: "shield",
    title: "Mais credibilidade",
    text: "Um site bem feito transmite profissionalismo e aumenta a confiança dos clientes.",
  },
  {
    icon: "users",
    title: "Mais clientes",
    text: "Uma presença digital clara ajuda o visitante a entender sua oferta e entrar em contato.",
  },
  {
    icon: "clock",
    title: "Presença 24h",
    text: "Sua empresa continua sendo apresentada mesmo quando você não está online.",
  },
  {
    icon: "star",
    title: "Diferencial competitivo",
    text: "Enquanto muitos ainda não têm um site profissional, sua marca se destaca.",
  },
];

const services = [
  {
    icon: "window",
    title: "Landing Pages",
    text: "Páginas estratégicas para divulgar serviços, campanhas ou captar clientes.",
  },
  {
    icon: "monitor",
    title: "Sites Institucionais",
    text: "Sites completos para apresentar sua empresa, serviços, diferenciais e formas de contato.",
  },
  {
    icon: "briefcase",
    title: "Portfólios Profissionais",
    text: "Páginas para profissionais que querem mostrar autoridade e atrair oportunidades.",
  },
  {
    icon: "pin",
    title: "Negócios Locais",
    text: "Presença digital moderna para negócios locais, lojas, clínicas, pousadas e muito mais.",
  },
];

const differentials = [
  ["wand", "Design personalizado"],
  ["phone", "Layout responsivo"],
  ["rocket", "Alta performance"],
  ["search", "SEO básico"],
  ["chat", "Comunicação clara"],
  ["target", "Acompanhamento constante"],
  ["spark", "Experiência premium"],
  ["box", "Entrega profissional"],
];

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {name === "chat" && (
        <>
          <path {...common} d="M4 6.8A4.8 4.8 0 0 1 8.8 2h6.4A4.8 4.8 0 0 1 20 6.8v3.7a4.8 4.8 0 0 1-4.8 4.8H11l-4.8 3.1v-3.3A4.8 4.8 0 0 1 4 10.5Z" />
          <path {...common} d="M8 8h8M8 11h5" />
        </>
      )}
      {name === "pen" && (
        <path {...common} d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5 4 16.5ZM14.5 6 18 9.5" />
      )}
      {name === "code" && (
        <>
          <path {...common} d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          <path {...common} d="m13 5-2 14" />
        </>
      )}
      {name === "rocket" && (
        <>
          <path {...common} d="M5 15c2.8-.6 5.1-2.1 7-4.5S15.5 5.2 20 4c-1.2 4.5-4.1 6.3-6.5 8.2S9.6 16.3 9 19l-4-4Z" />
          <path {...common} d="M14 6.5 17.5 10M5 15l-2 5 6-1M10 5l-5 2 4 4" />
        </>
      )}
      {name === "shield" && (
        <path {...common} d="M12 3 5 5.8v5.6c0 4 2.8 7.4 7 9.6 4.2-2.2 7-5.6 7-9.6V5.8L12 3Z" />
      )}
      {name === "users" && (
        <>
          <path {...common} d="M16 19c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4" />
          <path {...common} d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 19c0-1.8-1.1-3.4-2.8-3.9M16 3.4a3.8 3.8 0 0 1 0 7.2" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M12 7v5l3 2" />
        </>
      )}
      {name === "star" && (
        <path {...common} d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      )}
      {name === "window" && (
        <>
          <rect {...common} x="4" y="5" width="16" height="14" rx="1.5" />
          <path {...common} d="M4 9h16" />
        </>
      )}
      {name === "monitor" && (
        <>
          <rect {...common} x="4" y="5" width="16" height="12" rx="1.5" />
          <path {...common} d="M12 17v3M8.5 20h7" />
        </>
      )}
      {name === "briefcase" && (
        <>
          <path {...common} d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4c1 0 1.8.8 1.8 1.8V7" />
          <rect {...common} x="4" y="7" width="16" height="12" rx="2" />
          <path {...common} d="M4 12h16" />
        </>
      )}
      {name === "pin" && (
        <>
          <path {...common} d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
          <circle {...common} cx="12" cy="10" r="2" />
        </>
      )}
      {name === "wand" && <path {...common} d="m4 20 13-13M14 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3ZM5 4l.6 1.8L7.5 6.5l-1.9.7L5 9l-.6-1.8-1.9-.7 1.9-.7L5 4Z" />}
      {name === "phone" && <path {...common} d="M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3ZM10 18h4" />}
      {name === "search" && (
        <>
          <circle {...common} cx="11" cy="11" r="6" />
          <path {...common} d="m16 16 4 4" />
        </>
      )}
      {name === "target" && (
        <>
          <circle {...common} cx="12" cy="12" r="8" />
          <circle {...common} cx="12" cy="12" r="3" />
        </>
      )}
      {name === "spark" && <path {...common} d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z" />}
      {name === "box" && (
        <>
          <path {...common} d="m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z" />
          <path {...common} d="M4 7.5 12 12l8-4.5M12 12v9" />
        </>
      )}
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">→</span>;
}

function BrandLogo() {
  return (
    <span className="brand-logo">
      <span className="brand-symbol">JP</span>
      <span className="brand-copy">
        <strong>JPCREATIVE</strong>
        <small>STAND OUT.</small>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="JPCreative início">
          <BrandLogo />
        </a>

        <nav className="main-nav">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contato">
          Solicitar orçamento
          <Arrow />
        </a>
      </header>

      <section className="hero-section" id="inicio">
        <video className="hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="hero-layout section-shell">
          <div className="hero-brand-stage" aria-hidden="true">
            <div className="hero-mega-brand">
              <span className="hero-mega-jp">JP</span>
              <span className="hero-mega-creative">CREATIVE</span>
            </div>
          </div>

          <span className="hero-divider" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">STAND OUT.</p>
            <h1>Sua empresa merece mais do que apenas um site.</h1>
            <p className="hero-subtitle">
              Criamos experiências digitais modernas, profissionais e estratégicas para empresas que desejam transmitir confiança, gerar credibilidade e atrair mais clientes.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contato">
                Quero meu site
                <Arrow />
              </a>
              <a className="button button-secondary" href="#projetos">
                Ver projetos
              </a>
            </div>
          </div>
        </div>

        <a className="scroll-indicator" href="#processo" aria-label="Ir para processo">
          <span />
          <small>Role para explorar</small>
        </a>
      </section>

      <section className="content-section process-section" id="processo">
        <div className="section-shell">
          <div className="section-intro two-column">
            <div>
              <p className="eyebrow">Como é trabalhar comigo</p>
              <h2>Um processo simples, transparente e profissional.</h2>
            </div>
            <p>
              Você acompanha cada etapa do projeto e participa das decisões importantes desde o início até a entrega.
            </p>
          </div>

          <div className="process-panel">
            {processSteps.map((step, index) => (
              <article className="process-card" key={step.number}>
                <div className="process-topline">
                  <span className="icon-bubble"><Icon name={step.icon} /></span>
                  <strong>{step.number}</strong>
                  {index < processSteps.length - 1 && <span className="process-arrow">→</span>}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section projects-section" id="projetos">
        <div className="section-shell">
          <div className="section-intro two-column">
            <div>
              <p className="eyebrow">Projetos</p>
              <h2>Projetos que transformam marcas em experiências digitais.</h2>
            </div>
            <p>Cada projeto é desenvolvido para refletir a identidade única de cada negócio.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className={`project-media ${project.tone}`}>
                  <img src={project.image} alt={`Capa do projeto ${project.name}`} />
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Ver projeto <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section benefits-section">
        <div className="section-shell">
          <div className="section-intro compact">
            <p className="eyebrow">Por que ter um site profissional?</p>
            <h2>Seu site trabalha pela sua empresa 24 horas por dia.</h2>
          </div>

          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="feature-card" key={benefit.title}>
                <Icon name={benefit.icon} />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section services-section" id="servicos">
        <div className="section-shell">
          <div className="section-intro compact">
            <p className="eyebrow">Soluções</p>
            <h2>Soluções digitais para empresas que querem crescer.</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="feature-card service-card" key={service.title}>
                <Icon name={service.icon} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contato">Saiba mais <Arrow /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="differentials-section">
        <div className="section-shell differentials-layout">
          <div>
            <p className="eyebrow">Diferenciais</p>
            <h2>Mais do que desenvolvimento. Uma experiência completa.</h2>
          </div>

          <div className="differential-list">
            {differentials.map(([icon, label]) => (
              <div className="differential-item" key={label}>
                <Icon name={icon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto-section" aria-label="Manifesto JPCreative">
        <video className="manifesto-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="manifesto-content section-shell">
          <p>STAND OUT.</p>
          <h2>Sua empresa não foi feita para passar despercebida.</h2>
          <span>
            Criamos experiências digitais que destacam marcas, fortalecem negócios e ajudam empresas a ocuparem o espaço que merecem.
          </span>
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div className="section-shell final-cta-grid">
          <div>
            <p className="eyebrow">Vamos criar algo incrível juntos?</p>
            <h2>Transforme sua presença digital com um site moderno e profissional.</h2>
          </div>
          <p>
            Me chame no WhatsApp e vamos conversar sobre como transformar sua ideia em um site que gera resultados de verdade.
          </p>
          <a className="button button-primary whatsapp-button" href="https://wa.me/5548996656319" target="_blank" rel="noreferrer">
            <Icon name="chat" />
            Solicitar orçamento
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div className="footer-brand-block">
            <a className="footer-logo" href="#inicio" aria-label="JPCreative início">
              <BrandLogo />
            </a>
            <p>Sites modernos, profissionais e estratégicos para empresas que querem se destacar.</p>
            <div className="social-links" aria-label="Redes sociais">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">◎</a>
              <a href="https://wa.me/5548996656319" target="_blank" rel="noreferrer">◌</a>
              <a href="mailto:joao081019pedrodasilv@gmail.com">✉</a>
            </div>
          </div>

          <div>
            <h3>Navegação</h3>
            <div className="footer-links">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3>Contato</h3>
            <div className="footer-links footer-contact">
              <a href="https://wa.me/5548996656319" target="_blank" rel="noreferrer">WhatsApp<br />(48) 99665-6319</a>
              <a href="mailto:joao081019pedrodasilv@gmail.com">E-mail<br />joao081019pedrodasilv@gmail.com</a>
              <a href="https://instagram.com/jpcreative.dev" target="_blank" rel="noreferrer">Instagram<br />@jpcreative.dev</a>
            </div>
          </div>

          <div>
            <h3>Localização</h3>
            <p>Alfredo Wagner, SC<br />Atendemos todo o Brasil</p>
          </div>
        </div>
        <div className="section-shell copyright">
          © 2026 JPCreative. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
