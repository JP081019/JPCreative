import { FinalCTA, PageIntro, ProjectCard } from "../components/Editorial";
import { caseStudies } from "../data/projects";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata("Projetos", "Uma seleção de websites e experiências digitais da JP Creative. Conheça a direção e os detalhes de cada projeto.", "/projetos");

export default function ProjectsPage() {
  return <><PageIntro label="Nosso trabalho" title="Histórias diferentes. A mesma atenção aos detalhes."><p>Uma seleção de experiências em que estratégia, design e tecnologia encontram a personalidade de cada marca.</p></PageIntro><section className="shell projects-page" aria-label="Projetos da JP Creative"><div className="portfolio-grid">{caseStudies.map((project, index) => <ProjectCard key={project.slug} project={project} variant={index === 0 ? "feature" : index === 3 ? "split" : "standard"} priority={index === 0} />)}</div></section><FinalCTA /></>;
}
