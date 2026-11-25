import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <Link className="footer-logo" href="/home" aria-label="TLC, accueil"><Image src="/tlc-logo-hd.png" alt="TLC &#8212; Moins de donn&#233;es, plus d&#8217;intelligence" width={340} height={340}/></Link>
      <p className="footer-note">TLC rassemble plus de 80 membres autour de la recherche Tradition Learning, du développement de tllib et du projet TL Studio. Une communauté scientifique à vocation internationale.</p>
      <nav className="footer-links" aria-label="Navigation de pied de page">
        <div className="footer-link-group"><strong>Explorer TLC</strong><Link href="/home">Accueil</Link><Link href="/about">&#192; propos</Link><Link href="/community">Contributeurs</Link><Link href="/events">&#201;v&#233;nements</Link><Link href="/blog">Actualit&#233;s</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-link-group"><strong>Publications</strong><Link href="/resources">Toutes les publications</Link><Link href="/projects">Projets de recherche</Link><Link href="/resources/tradition-learning">Tradition Learning</Link><Link href="/resources/tllib">tllib</Link><Link href="/tl-studio">TL Studio</Link></div>
      </nav>
      <div className="footer-bottom"><span>&#169; {new Date().getFullYear()} TLC &#8212; Tradition Learning Community</span><Link href="https://github.com/Tradition-Learning-Community" target="_blank" rel="noreferrer">GitHub &#8599;</Link></div>
    </div>
  </footer>;
}
