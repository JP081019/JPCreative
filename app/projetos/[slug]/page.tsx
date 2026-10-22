import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Arrow, FinalCTA, PageIntro, ProjectArtwork } from "../../components/Editorial";
import { caseStudies, getProject } from "../../data/projects";
import { pageMetadata } from "../../lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const metadata = pageMetadata(project.name, project.description, `/projetos/${slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: project.desktopScreenshot.src, width: project.desktopScreenshot.width, height: project.desktopScreenshot.height, alt: `Website de ${project.name}` }] } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = caseStudies[(caseStudies.findIndex((item) => item.slug === slug) + 1) % caseStudies.length];
  return <>
    <PageIntro label="Projeto / Website" title={project.name}><p>{project.description}</p><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visitar website <Arrow /></a></PageIntro>
    <div className="shell"><dl className="case-meta"><div><dt>Cliente</dt><dd>{project.name}</dd></div><div><dt>Segmento</dt><dd>{project.category}</dd></div><div><dt>Experiência</dt><dd>Desktop e mobile</dd></div>{project.year ? <div><dt>Ano</dt><dd>{project.year}</dd></div> : null}</dl><ProjectArtwork project={project} large priority /></div>
    <section className="shell case-story section-pad" aria-labelledby="case-details"><h2 id="case-details">Por dentro do projeto</h2><div><div className="case-story-grid">{[["Contexto", project.context], ["Objetivo", project.objective], ["Abordagem", project.approach], ["Solução", project.solution]].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><ul className="case-focus" aria-label="Focos do projeto">{project.focus.map((focus) => <li key={focus}>{focus}</li>)}</ul></div></section>
    <section className="case-gallery section-pad" aria-label={`Capturas do website de ${project.name}`}><div className="shell case-gallery-grid"><figure><Image src={project.desktopScreenshot} alt={`Captura desktop do website de ${project.name}, com sua composição e conteúdo reais`} sizes="(max-width: 600px) 90vw, 850px" /><figcaption>A experiência em tela ampla.</figcaption></figure><figure><Image src={project.mobileScreenshot} alt={`Captura da versão para celular do website de ${project.name}`} sizes="(max-width: 600px) 60vw, 300px" /><figcaption>A mesma identidade. Outro formato.</figcaption></figure></div></section>
    <div className="shell"><Link href={`/projetos/${next.slug}`} className="next-project"><div><p className="eyebrow">Próximo projeto</p><h2>{next.name}</h2></div><Arrow /></Link></div><FinalCTA />
  </>;
}
