import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <Link className="footer-logo" href="/home" aria-label="TLC, accueil"><Image src="/tlc-logo-hd.png" alt="Tradition Learning Community" width={340} height={340}/></Link>
      <p className="footer-note">Communauté scientifique consacrée à Tradition Learning, au développement de tllib et à la recherche ouverte.</p>
      <div className="footer-links"><strong>Explorer</strong><Link href="/tradition-learning">Tradition Learning</Link><Link href="/tllib">tllib</Link><Link href="/recherche">Recherche</Link><Link href="/actualites">Actualités</Link><Link href="/events">Événements</Link><Link href="/medias">Médias</Link><Link href="/community">Communauté</Link><Link href="/resources">Ressources</Link><Link href="/tlc">TLC</Link><Link href="/participer">Participer</Link></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TLC — Tradition Learning Community</span><Link href="https://github.com/Tradition-Learning-Community" target="_blank" rel="noreferrer">GitHub ↗</Link></div>
    </div>
  </footer>;
}
