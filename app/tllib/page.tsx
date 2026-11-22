import Link from "next/link";
export const metadata = { title: "tllib — Bibliothèque Tradition Learning", description: "La bibliothèque tllib : constitution et fonctionnement de systèmes Tradition Learning." };
export default function TllibPage() {
 return <div className="directory-content">
  <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">LE PRODUIT SCIENTIFIQUE</span><h1>tllib</h1><p>La bibliothèque destinée à constituer, faire fonctionner et poursuivre des systèmes Tradition Learning.</p><div className="hero-actions"><a className="button button-gold" href="#fonctionnement">Comment fonctionne-t-elle ? ↓</a><a className="button button-outline" href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Code et documentation ↗</a></div></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
  <section className="section container" id="fonctionnement"><div className="section-head"><h2 className="section-title">De la théorie à la pratique</h2></div>
    <p className="section-copy">tllib fournit des structures et des opérations pour que les développeurs constituent des systèmes TL à partir d'une mission, d'un problème, de ressources, de capacités et de conditions scientifiques. Elle ne remplace pas les autres logiciels de l'application qui l'utilise.</p>
    <div className="grid-3">{[
      ["Constituer","Définir la mission et le problème, inventorier les ressources et constituer les rôles initiaux selon les contrats disponibles."],
      ["Faire fonctionner","Mobiliser des capacités et des opérations scientifiques dans les conditions établies par la théorie et les spécifications."],
      ["Poursuivre","Permettre de reprendre des systèmes existants et de réutiliser une Tradition sans les confondre avec l'héritage interne d'un système."],
    ].map(([name,text])=><article className="card" key={name}><h3>{name}</h3><p>{text}</p></article>)}</div>
  </section>
  <section className="section container"><div className="section-head"><h2 className="section-title">État du développement</h2></div>
    <p className="section-copy">Les fondations techniques reposent sur un moteur C++20, un runtime, des interfaces C++ et Python et des providers explicites. La V1 scientifique complète est encore en développement : une structure déclarative ne constitue pas à elle seule une exécution scientifique validée.</p>
    <div className="grid-3"><article className="card"><h3>Bibliothèque</h3><p>Code, architecture, tests et documentation du produit.</p><a className="card-link" href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Accéder à tllib ↗</a></article>
    <article className="card"><h3>Spécifications</h3><p>Contrats formalisés et critères de conformité des différentes fonctionnalités.</p><a className="card-link" href="https://github.com/Tradition-Learning-Community/tllib-specs" target="_blank" rel="noopener noreferrer">Accéder à tllib-specs ↗</a></article>
    <article className="card"><h3>Recherche</h3><p>Études et évaluations destinées à vérifier les résultats des systèmes TL.</p><Link className="card-link" href="/recherche">Explorer les travaux →</Link></article></div>
  </section>
 </div>;
}
