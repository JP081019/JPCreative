import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { site } from "./data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const dm = DM_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "JP Creative — Construímos o próximo nível.", template: "%s | JP Creative" },
  description: "Estratégia, design e tecnologia para marcas que querem evoluir.",
  applicationName: site.name,
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#F6F6F2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}/Logo%20JPCreative/Identidade%20Minimalista%20JP%20Creative.png`, sameAs: [site.instagram, site.linkedin, site.github] };
  return <html lang="pt-BR" className={`${jakarta.variable} ${dm.variable}`}><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
