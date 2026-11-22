import Link from "next/link";
import { publishedResources } from "@/lib/public-content";
export const dynamic = "force-dynamic";
export const metadata = { title: "Ressources — TLC", description: "Sources scientifiques, bibliothèque, guides et ressources de Tradition Learning." };
export default async function ResourcesPage() {
  const resources = await publishedResources();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">APPRENDRE · APPROFONDIR</span><h1>Ressources</h1><p>Tradition Learning, les travaux scientifiques et les outils de TLC.</p></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Commencer par l'essentiel</h2></div><div className="grid-3">
      <article className="card"><span className="eyebrow">THÉORIE</span><h3>Découvrir Tradition Learning</h3><p>Origine, problème scientifique, entités, objets fondamentaux et fonctionnement.</p><Link className="card-link" href="/tradition-learning">Comprendre TL →</Link></article>
      <article className="card"><span className="eyebrow">BIBLIOTHÈQUE</span><h3>La bibliothèque tllib</h3><p>Les fonctionnalités disponibles, les fondations techniques et la documentation du produit.</p><Link className="card-link" href="/tllib">Découvrir tllib →</Link></article>
      <article className="card"><span className="eyebrow">RECHERCHE</span><h3>Les travaux de TLC</h3><p>Projets et expérimentations, avec un état et des résultats documentés.</p><Link className="card-link" href="/recherche">Explorer les travaux →</Link></article>
    </div></section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Documentation technique</h2><p className="section-copy">Ces dépôts fournissent les textes de référence et le code de développement.</p></div>
      <div className="grid-3">
        <article className="card"><h3>tllib</h3><p>Bibliothèque de Tradition Learning, interfaces et documentation.</p><a className="card-link" href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Voir la documentation ↗</a></article>
        <article className="card"><h3>tllib-specs</h3><p>Contrats, spécifications et références de conformité.</p><a className="card-link" href="https://github.com/Tradition-Learning-Community/tllib-specs" target="_blank" rel="noopener noreferrer">Consulter les spécifications ↗</a></article>
      </div>
    </section>
    {resources.length > 0 && <section className="section container"><div className="section-head"><h2 className="section-title">Ressources publiées</h2></div><div className="grid-3">{resources.map(item=>
      <article className="card" key={item.id}><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><a className="card-link" href={item.url} target="_blank" rel="noopener noreferrer">Consulter ↗</a></article>
    )}</div></section>}
  </div>;
}
