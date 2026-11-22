"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  ["Accueil", "/home"], ["Tradition Learning", "/tradition-learning"], ["tllib", "/tllib"],
  ["TLC", "/tlc"], ["Recherche", "/recherche"], ["Actualités", "/actualites"], ["Ressources", "/resources"],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  if (path?.startsWith("/admin") || path?.startsWith("/x-admin")) return null;
  return <header className="site-header">
    <nav className="site-nav" aria-label="Navigation principale">
      <Link href="/home" className="brand" onClick={() => setOpen(false)} aria-label="TLC, accueil">
        <span className="brand-symbol"><Image src="/tlc-logo-hd.png" alt="" width={64} height={64}/></span><span className="brand-name"><strong>TLC</strong><small>TRADITION LEARNING COMMUNITY</small></span>
      </Link>
      <button ref={menuButton} className="menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="public-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
      <div id="public-navigation" className={`nav-content${open ? " is-open" : ""}`}>
        <div className="nav-links">{links.map(([label, href]) => { const active = path === href || (path?.startsWith(href + "/") ?? false); return <Link key={href} href={href} onClick={() => setOpen(false)} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{label}</Link>; })}</div>
        <div className="nav-actions">
          <button className="theme-switch" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Changer de thème"><Sun className="theme-icon-sun" aria-hidden="true"/><Moon className="theme-icon-moon" aria-hidden="true"/></button>
          <Link className="button button-gold nav-cta" href="/participer" onClick={() => setOpen(false)}>Participer</Link>
        </div>
      </div>
    </nav>
  </header>;
}
