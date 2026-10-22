import Image from "next/image";
import Link from "next/link";
import officialLogo from "../../public/Logo JPCreative/Identidade Minimalista JP Creative.png";

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" aria-label="JP Creative — início" className={`brand${footer ? " brand-footer" : ""}`}><Image src={officialLogo} alt="JP Creative — Agência Digital" sizes={footer ? "240px" : "210px"} preload={!footer} /></Link>;
}
