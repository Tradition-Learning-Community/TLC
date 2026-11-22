import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedProjects } from "@/lib/public-content";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export default async function ProjectPage({ params }: Context) {
  const { id } = await params;
  const project = (await publishedProjects()).find(p => p.id === id);
  if (!project) notFound();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy">
      <span className="eyebrow">PROJET TLC</span><h1>{project.title}</h1><p>{project.description}</p>
      <div className="hero-actions"><Link href="/participer" className="button button-gold">Proposer une contribution</Link><Link href="/projects" className="button button-outline">Tous les projets</Link></div>
    </div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="section-head"><span className="eyebrow">{project.status || "Projet"}</span><h2 className="section-title">Présentation</h2></div><p className="section-copy">{project.description}</p>
      {project.url && <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">En savoir plus ↗</a>}
    </section>
  </div>;
}
