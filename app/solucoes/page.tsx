import { FinalCTA, PageIntro, Partnership, Process, ServicesList } from "../components/Editorial";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata("Soluções", "Websites institucionais, experiências digitais, manutenção e divulgação. Soluções pensadas para o momento da sua empresa.", "/solucoes");
export default function SolutionsPage() {
  return <><PageIntro label="Estratégia em ação" title="O digital a serviço do seu próximo passo."><p>Começamos pelo que sua empresa precisa. A solução nasce dessa conversa, com escopo claro e escolhas que fazem sentido.</p></PageIntro><section className="shell" aria-label="Nossas soluções"><ServicesList expanded /></section><Process /><Partnership /><FinalCTA /></>;
}
