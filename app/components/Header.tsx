"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/site";
import { Brand } from "./Brand";

export function Header() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => header.current?.toggleAttribute("data-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 901px)");
    const onResize = () => { if (query.matches) dialog.current?.close(); };
    query.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      query.removeEventListener("change", onResize);
    };
  }, [open]);

  function closeMenu() { dialog.current?.close(); }
  function active(href: string) { return href === "/" ? pathname === "/" : pathname.startsWith(href); }

  return <header className="site-header" ref={header}>
    <div className="shell header-inner"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(({ href, label }) => <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}>{label}</Link>)}</nav><Link href="/contato" className="header-contact">Vamos conversar <span aria-hidden="true">↗</span></Link><button className="menu-toggle" type="button" ref={trigger} aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>Menu <span aria-hidden="true">+</span></button></div>
    <dialog id="mobile-menu" className="mobile-menu" ref={dialog} aria-labelledby="menu-title" onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}><div className="mobile-menu-inner"><div className="mobile-menu-top"><span id="menu-title">Explore a JP Creative</span><button type="button" onClick={closeMenu} autoFocus aria-label="Fechar menu">Fechar <span aria-hidden="true">×</span></button></div><nav aria-label="Navegação mobile">{navigation.map(({ href, label }) => <Link key={href} href={href} onClick={closeMenu} aria-current={active(href) ? "page" : undefined}>{label}<span aria-hidden="true">↗</span></Link>)}</nav><p>Estratégia, design e tecnologia.<br />Impact + Evolve.</p></div></dialog>
  </header>;
}
