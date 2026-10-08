import type { StaticImageData } from "next/image";
import logoAna from "../../public/Logo/Logo - Anadias_Terapeuta.jpeg";
import logoBrava from "../../public/Logo/Logo - Brava_Spa_Urbano.png";
import logoEly from "../../public/Logo/Logo - Ely Transparente.jpeg";
import logoKleber from "../../public/Logo/logo-kleber.jpeg";
import desktopAna from "../../public/Telas/desktop-anapaula.png";
import desktopBrava from "../../public/Telas/desktop-brava.png";
import desktopEly from "../../public/Telas/desktop-ely.png";
import desktopKleber from "../../public/Telas/desktop-kleber.png";
import mobileAna from "../../public/Telas/mobile-anapaula.png";
import mobileBrava from "../../public/Telas/mobile-brava.png";
import mobileEly from "../../public/Telas/mobile-ely.png";
import mobileKleber from "../../public/Telas/mobile-kleber.png";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url: string;
  logo: StaticImageData;
  desktopScreenshot: StaticImageData;
  mobileScreenshot: StaticImageData;
  quote?: string;
  theme: {
    frame: string;
    canvas: string;
    ink: string;
    accent: string;
  };
};

export const projects: Project[] = [
  {
    slug: "ana-dias",
    name: "Ana Dias",
    category: "Reflexoterapia / Saúde integrativa",
    description: "Clareza e acolhimento para aproximar pessoas de um trabalho terapêutico.",
    url: "https://www.anadiasreflexoterapia.com.br/",
    logo: logoAna,
    desktopScreenshot: desktopAna,
    mobileScreenshot: mobileAna,
    quote: "As ideias e mudanças têm dado cada vez mais vida ao meu site.",
    theme: { frame: "#c2d8d0", canvas: "#edf4f1", ink: "#345f55", accent: "#69a895" },
  },
  {
    slug: "kleber-moreira",
    name: "Kleber Moreira",
    category: "Psicanálise / Terapia",
    description: "Uma presença serena e segura para apresentar escuta, cuidado e acompanhamento.",
    url: "https://www.psicanalistaklebermoreira.com.br/",
    logo: logoKleber,
    desktopScreenshot: desktopKleber,
    mobileScreenshot: mobileKleber,
    quote: "Gostei muito do seu trabalho e de como foi feito.",
    theme: { frame: "#d9d6ce", canvas: "#f2f0e8", ink: "#27312c", accent: "#7a8979" },
  },
  {
    slug: "ely-oliveira",
    name: "Ely Oliveira",
    category: "Terapia / Desenvolvimento humano",
    description: "Uma experiência sensível e direta, construída para gerar identificação e confiança.",
    url: "https://www.terapiaely.com.br/",
    logo: logoEly,
    desktopScreenshot: desktopEly,
    mobileScreenshot: mobileEly,
    quote: "Só tenho a agradecer por todo o carinho e cuidado durante o processo.",
    theme: { frame: "#dad7cf", canvas: "#f5f0e9", ink: "#563f37", accent: "#c59c8c" },
  },
  {
    slug: "brava-spa",
    name: "Brava Spa",
    category: "Spa urbano / Bem-estar",
    description: "Sofisticação tranquila para traduzir a experiência da marca no ambiente digital.",
    url: "https://brava-spa.vercel.app/",
    logo: logoBrava,
    desktopScreenshot: desktopBrava,
    mobileScreenshot: mobileBrava,
    theme: { frame: "#08261d", canvas: "#f0eee6", ink: "#183329", accent: "#c5a863" },
  },
];

export const brands = projects.map(({ name, logo, url }) => ({ name, logo, url }));

export const testimonials = [
  {
    concept: "Cuidado",
    author: "Ely Oliveira",
    text: "Gostei muito do trabalho. Ficou muito bom! Só tenho a agradecer por todo o carinho e cuidado durante o processo.",
    highlight: "carinho e cuidado durante o processo.",
  },
  {
    concept: "Qualidade",
    author: "Kleber Moreira",
    text: "Gostei bastante do site. Está muito bacana, muito bom. Gostei muito do seu trabalho e de como foi feito. Agora a gente começa uma parceria legal e eu já começo a divulgar também.",
    highlight: "Gostei muito do seu trabalho e de como foi feito.",
  },
  {
    concept: "Parceria",
    author: "Ana Paula",
    text: "Estou amando seu trabalho no meu site. Já amei quando o criou, e agora as ideias e mudanças têm dado cada vez mais vida a ele. Maravilhoso seu trabalho! Vou sempre recomendá-lo para os amigos. E continuamos juntos!",
    highlight: "Vou sempre recomendá-lo para os amigos. E continuamos juntos!",
  },
];
