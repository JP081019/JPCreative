export const site = {
  name: "JP Creative",
  url: "https://jpcreative.com.br",
  email: "joao081019p0edrodasilv@gmail.com",
  whatsapp: "https://wa.me/5548996656319?text=Ol%C3%A1%2C%20JP%20Creative!%20Quero%20conversar%20sobre%20um%20projeto.",
  instagram: "https://instagram.com/jpcreative.dev",
  linkedin: "https://www.linkedin.com/in/jo%C3%A3o-pedro-silva-380a1b32a",
  github: "https://github.com/JP081019",
} as const;

export const navigation = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export const services = [
  { title: "Websites institucionais", text: "Uma presença própria, pensada para apresentar sua empresa com clareza, personalidade e confiança.", detail: "Arquitetura de conteúdo, direção visual e desenvolvimento responsivo. Cada escolha parte da sua marca e do que seu público precisa encontrar." },
  { title: "Experiências digitais", text: "Design e tecnologia conectados para transformar uma necessidade em uma experiência simples de usar.", detail: "Interfaces e soluções sob medida, com escopo definido a partir dos objetivos do negócio e atenção à navegação, ao conteúdo e à acessibilidade." },
  { title: "Manutenção e suporte", text: "Cuidado contínuo para manter sua presença digital atualizada e acompanhar novos momentos do negócio.", detail: "Hospedagem, manutenção e suporte conforme o plano contratado. Atualizações e melhorias são dimensionadas de acordo com cada parceria." },
  { title: "Divulgação digital", text: "Uma comunicação coerente para aproximar sua marca das pessoas que fazem sentido para ela.", detail: "Ações e materiais alinhados ao posicionamento da empresa. Canais, entregas e acompanhamento são definidos em proposta específica." },
] as const;

export const processSteps = [
  ["Descoberta", "Ouvimos sua história, entendemos o negócio e identificamos o que precisa mudar."],
  ["Estratégia", "Definimos objetivos, prioridades, conteúdo e um caminho claro para o projeto."],
  ["Design", "Traduzimos a personalidade da marca em uma experiência visual própria."],
  ["Desenvolvimento", "Construímos a experiência com atenção à velocidade, à adaptação e ao uso."],
  ["Publicação", "Revisamos conteúdo, navegação e funcionamento antes de colocar o site no ar."],
  ["Evolução", "Acompanhamos a presença digital conforme as condições de cada parceria."],
] as const;
