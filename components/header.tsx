"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  ["Accueil", "/home"], ["Tradition Learning", "/tradition-learning"], ["tllib", "/tllib"],
  ["TLC", "/tlc"], ["Actualités", "/actualites"], ["Ressources", "/resources"],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  if (path?.startsWith("/admin") || path?.startsWith("/x-admin")) return null;
  return <header className="site-header">
    <nav className="site-nav" aria-label="Navigation principale">
      <Link href="/home" className="brand" onClick={() => setOpen(false)} aria-label="TLC, accueil">
        <span className="brand-symbol"><Image src="/tlc-logo-hd.png" alt="" width={64} height={64}/></span><span className="brand-name"><strong>TLC</strong><small>TRADITION LEARNING COMMUNITY</small></span>
      </Link>
      <button className="menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <div className={`nav-content${open ? " is-open" : ""}`}>
        <div className="nav-links">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={path === href || (path?.startsWith(href + "/") ?? false) ? "active" : ""}>{label}</Link>)}</div>
        <div className="nav-actions">
          <button className="theme-switch" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}>{theme === "dark" ? <Sun/> : <Moon/>}</button>
          <Link className="button button-gold nav-cta" href="/participer">Participer <span aria-hidden>↗</span></Link>
        </div>
      </div>
    </nav>
  </header>;
}
