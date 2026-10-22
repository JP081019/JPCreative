import Image from "next/image";
import { FinalCTA, PageIntro, Process } from "../components/Editorial";
import { site } from "../data/site";
import { pageMetadata } from "../lib/metadata";
import portrait from "../../public/images/joao-pedro.jpg";

export const metadata = pageMetadata("Sobre", "Conheça a JP Creative: estratégia, design e tecnologia com atenção à identidade e ao momento de cada negócio.", "/sobre");
export default function AboutPage() {
  return <><PageIntro label="Impact + Evolve" title="Pensar com intenção. Criar para evoluir."><p>A JP Creative conecta estratégia, design e tecnologia para construir presenças digitais que representam quem está por trás de cada marca.</p></PageIntro><section className="shell about-grid section-pad" aria-labelledby="about-title"><div className="about-image"><Image src={portrait} alt="João Pedro da Silva, responsável pela JP Creative" sizes="(max-width: 600px) 90vw, 550px" preload /></div><div className="about-copy"><p className="eyebrow">Por trás da JP Creative</p><h2 id="about-title">João Pedro da Silva.</h2><p>Design, desenvolvimento e visão de negócio reunidos em projetos tratados com atenção, da primeira conversa ao detalhe final.</p><p>O trabalho começa por entender a empresa, seu público e o que ela precisa comunicar. A partir daí, conteúdo, forma e tecnologia se tornam uma experiência coerente.</p><p>Acreditamos em relações claras, decisões compartilhadas e cuidado contínuo. Uma presença digital deve acompanhar a evolução do negócio.</p><div className="social-links"><a className="text-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div></section><Process /><FinalCTA /></>;
}
