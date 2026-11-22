import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <Link className="footer-logo" href="/home" aria-label="TLC, accueil"><Image src="/tlc-logo-hd.png" alt="TLC — Moins de données, plus d’intelligence" width={340} height={340}/></Link>
      <p className="footer-note">Une communauté de recherche ouverte pour construire une intelligence artificielle plus sobre, accessible et utile.</p>
      <div className="footer-links"><strong>Explorer</strong><Link href="/projects">Projets</Link><Link href="/community">Contributeurs</Link><Link href="/events">Événements</Link><Link href="/resources">Publications</Link><Link href="/about">Notre mission</Link></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TLC — Tradition Learning Community</span><Link href="https://github.com/Tradition-Learning-Community" target="_blank" rel="noreferrer">GitHub ↗</Link></div>
    </div>
  </footer>;
}
