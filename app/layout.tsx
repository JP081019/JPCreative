import type { Metadata } from "next";
import { Josefin_Sans, Outfit } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const josefin = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "JPCreative | Experiências digitais que posicionam",
  description: "Sites, sistemas e experiências digitais pensados para transmitir confiança, organizar processos e criar oportunidades.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${outfit.variable} ${josefin.variable}`}><body>{children}</body></html>;
}
