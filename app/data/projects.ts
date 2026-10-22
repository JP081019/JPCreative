import { projects as existingProjects, type Project as ExistingProject } from "./home";

export type CaseStudy = ExistingProject & {
  year: number | null;
  context: string;
  objective: string;
  approach: string;
  solution: string;
  focus: readonly string[];
};

const details: Record<string, Omit<CaseStudy, keyof ExistingProject>> = {
  "ana-dias": {
    year: null,
    context: "Uma presença digital dedicada à reflexoterapia e à saúde integrativa, com espaço para apresentar a profissional e seu trabalho.",
    objective: "Organizar a apresentação do atendimento e facilitar o caminho entre conhecer o trabalho e iniciar uma conversa.",
    approach: "Tons suaves, imagens amplas e uma hierarquia tranquila aproximam o conteúdo da experiência de acolhimento da marca.",
    solution: "Um website institucional com apresentação profissional, informações sobre o trabalho terapêutico e acesso aos canais de contato.",
    focus: ["Clareza de conteúdo", "Linguagem acolhedora", "Navegação responsiva"],
  },
  "kleber-moreira": {
    year: null,
    context: "A apresentação digital de um trabalho de psicanálise e terapia pede uma linguagem serena e informações fáceis de encontrar.",
    objective: "Apresentar o profissional e sua proposta de atendimento em uma experiência direta, que respeite o tempo de quem procura cuidado.",
    approach: "Uma composição editorial com cores contidas, tipografia legível e espaço entre os conteúdos valoriza a leitura.",
    solution: "Um website para apresentar o trabalho de Kleber Moreira, contextualizar o atendimento e facilitar o primeiro contato.",
    focus: ["Hierarquia editorial", "Leitura confortável", "Contato acessível"],
  },
  "ely-oliveira": {
    year: null,
    context: "Terapia e desenvolvimento humano apresentados por meio de uma experiência que combina proximidade e clareza.",
    objective: "Dar espaço à identidade da profissional e organizar as informações necessárias para conhecer sua atuação.",
    approach: "A direção visual utiliza tons quentes, uma composição intimista e imagens que acompanham a narrativa da página.",
    solution: "Uma presença institucional com apresentação da profissional, conteúdo sobre sua atuação e caminhos de contato em desktop e celular.",
    focus: ["Personalidade visual", "Narrativa da marca", "Experiência mobile"],
  },
  "brava-spa": {
    year: null,
    context: "A experiência de um spa urbano traduzida para um ambiente digital de bem-estar e cuidado.",
    objective: "Apresentar a atmosfera da marca e permitir que o visitante explore a proposta do espaço com tranquilidade.",
    approach: "Verde profundo, imagens com protagonismo e contrastes suaves dão continuidade à identidade do spa na tela.",
    solution: "Uma experiência de apresentação da Brava Spa, com composição visual que funciona em telas amplas e dispositivos móveis.",
    focus: ["Direção de arte", "Imagens em destaque", "Adaptação entre telas"],
  },
};

const order = ["brava-spa", "kleber-moreira", "ana-dias", "ely-oliveira"];
export const caseStudies: CaseStudy[] = order.map((slug) => ({
  ...existingProjects.find((project) => project.slug === slug)!,
  ...details[slug],
}));

export function getProject(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
