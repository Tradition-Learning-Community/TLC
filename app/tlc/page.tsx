import Link from "next/link";
export const metadata = { title: "Tradition Learning Community — TLC", description: "L'histoire, la mission et l'organisation Tradition Learning Community." };
export default function AboutPage() {
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING COMMUNITY</span><h1>À propos de TLC</h1><p>TLC est une communauté scientifique et technique née autour de la recherche Tradition Learning.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container" id="mission"><div className="section-head"><span className="eyebrow">NOTRE MISSION</span><h2 className="section-title">Faire avancer Tradition Learning</h2></div>
      <p className="section-copy">TLC réunit des personnes qui étudient la théorie Tradition Learning, construisent les outils nécessaires à sa mise en œuvre et mènent des expériences pour en comprendre les résultats et les limites.</p>
      <p className="section-copy">Le projet trouve son origine dans les difficultés rencontrées lors de travaux d'intelligence artificielle en contexte de données limitées, à Kindu, en République démocratique du Congo. Son programme scientifique est ouvert à d'autres contextes et domaines.</p>
    </section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Une organisation, plusieurs contributions</h2></div>
      <div className="grid-3"><article className="card"><h3>Recherche scientifique</h3><p>Formalisation de la théorie, études et expérimentation.</p></article><article className="card"><h3>Développement</h3><p>Bibliothèque tllib, logiciels, documentation et conformité technique.</p></article><article className="card"><h3>Vie communautaire</h3><p>Participation, coordination, diffusion des travaux et partenariats.</p></article></div>
    </section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Participer et soutenir</h2></div><p className="section-copy">Chercheurs, étudiants, développeurs, bénévoles, entreprises et institutions peuvent proposer une contribution ou un partenariat.</p>
      <Link href="/participer" className="button button-dark">Contacter la communauté →</Link>
    </section>
  </div>;
}
