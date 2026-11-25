"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const primaryLinks = [
  ["Accueil", "/home"], ["Contributeurs", "/community"],
  ["\u00c9v\u00e9nements", "/events"], ["Actualit\u00e9s", "/blog"], ["\u00c0 propos", "/about"],
] as const;
const projectLinks = [
  ["Tradition Learning", "/resources/tradition-learning"],
  ["tllib", "/resources/tllib"],
  ["TL Studio", "/tl-studio"],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [publicationsOpen, setPublicationsOpen] = useState(false);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);
  useEffect(() => { setThemeReady(true); }, []);
  const isPublicationsActive = path === "/projects" || path?.startsWith("/projects/") || path === "/resources" || path?.startsWith("/resources/") || path === "/tl-studio";
  const closeMenus = () => { setOpen(false); setPublicationsOpen(false); };
  useEffect(() => {
    if (!publicationsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!publicationsRef.current?.contains(event.target as Node)) setPublicationsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPublicationsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [publicationsOpen]);

  if (path?.startsWith("/admin") || path?.startsWith("/x-admin")) return null;
  return <header className="site-header">
    <nav className="site-nav" aria-label="Navigation principale">
      <Link href="/home" className="brand" onClick={closeMenus} aria-label="TLC, accueil">
        <span className="brand-symbol"><Image src="/tlc-logo-hd.png" alt="" width={64} height={64}/></span><span className="brand-name"><strong>TLC</strong><small>TRADITION LEARNING COMMUNITY</small></span>
      </Link>
      <button className="menu-toggle" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <div className={`nav-content${open ? " is-open" : ""}`}>
        <div className="nav-links">
          {primaryLinks.slice(0, 1).map(([label, href]) => <Link key={href} href={href} onClick={closeMenus} className={path === href ? "active" : ""}>{label}</Link>)}
          <div ref={publicationsRef} className={`nav-publications${publicationsOpen ? " is-open" : ""}`}>
            <Link href="/projects" onClick={closeMenus} className={isPublicationsActive ? "active" : ""} aria-current={path === "/projects" ? "page" : undefined}>Nos travaux</Link>
            <button type="button" className="nav-publications-toggle" aria-label="Afficher les rubriques des travaux" aria-expanded={publicationsOpen} onClick={() => setPublicationsOpen(!publicationsOpen)}><ChevronDown size={14}/></button>
            <div className="nav-publications-menu" aria-label="Rubriques des travaux">
              <div className="nav-work-group"><Link href="/projects" className="nav-work-heading" onClick={closeMenus}>Projets</Link>{projectLinks.map(([label, href]) => <Link key={href} href={href} onClick={closeMenus} className={`nav-work-child${path === href ? " active" : ""}`}>{label}</Link>)}</div><Link href="/resources" onClick={closeMenus} className={`nav-work-publications${path === "/resources" ? " active" : ""}`}>Publications</Link>
            </div>
          </div>
          {primaryLinks.slice(1).map(([label, href]) => <Link key={href} href={href} onClick={closeMenus} className={path === href || path?.startsWith(href + "/") ? "active" : ""}>{label}</Link>)}
        </div>
        <div className="nav-actions">
          <button className="theme-switch" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={!themeReady ? "Changer le theme" : resolvedTheme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}>{themeReady && resolvedTheme === "dark" ? <Sun/> : <Moon/>}</button>
          <Link className="button button-gold nav-cta" href="/join" onClick={closeMenus}>Rejoindre la communaut&#233; <span aria-hidden>&#8599;</span></Link>
        </div>
      </div>
    </nav>
  </header>;
}
