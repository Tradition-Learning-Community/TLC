import Link from "next/link";
export const metadata = { title: "Recherche — TLC", description: "Les axes de recherche et les expériences autour de Tradition Learning." };
export default function RecherchePage() {
 return <div className="directory-content"><section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING</span><h1>Recherche</h1><p>Fondements, modèles scientifiques, expérimentations et validation.</p></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
 <section className="section container"><div className="section-head"><h2 className="section-title">Du cadre théorique à l'expérience</h2></div>
  <div className="grid-3"><article className="card"><h3>Théorie</h3><p>Définir les relations et les mécanismes scientifiques qui constituent Tradition Learning.</p><Link className="card-link" href="/tradition-learning">Comprendre TL →</Link></article>
   <article className="card"><h3>Implémentation</h3><p>Mettre les contrats en œuvre dans une bibliothèque utilisable et testable.</p><Link className="card-link" href="/tllib">Découvrir tllib →</Link></article>
   <article className="card"><h3>Validation</h3><p>Conduire des expériences reproductibles et publier ce qu'elles montrent réellement.</p><Link className="card-link" href="/experiments">Consulter les expérimentations →</Link></article>
  </div></section></div>;
}
