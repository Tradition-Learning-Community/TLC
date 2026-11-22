import Link from "next/link";
import { publishedProjects } from "@/lib/public-content";
export const dynamic = "force-dynamic";
export const metadata = { title: "Projets — TLC", description: "Les travaux et projets de la communauté Tradition Learning." };
export default async function ProjectsPage() {
  const projects = await publishedProjects();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">RECHERCHE · DÉVELOPPEMENT</span><h1>Nos projets</h1><p>Des travaux qui font progresser Tradition Learning, de la théorie aux outils.</p></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Projet logiciel principal</h2></div><article className="card">
      <span className="eyebrow">BIBLIOTHÈQUE EN DÉVELOPPEMENT</span><h3>tllib</h3><p>La bibliothèque qui permettra de constituer, faire fonctionner et poursuivre des systèmes Tradition Learning, à partir de contrats scientifiques.</p>
      <Link className="card-link" href="/tllib">Découvrir le produit →</Link>
    </article></section>
    {projects.length>0 && <section className="section container"><div className="section-head"><h2 className="section-title">Autres travaux</h2></div><div className="grid-3">{projects.map(p=>
      <article className="card" key={p.id || p.title}><span className="eyebrow">{p.status || "Projet"}</span><h3>{p.title}</h3><p>{p.description}</p>{p.url && <a href={p.url} className="card-link" target="_blank" rel="noopener noreferrer">En savoir plus ↗</a>}</article>
    )}</div></section>}
  </div>;
}
