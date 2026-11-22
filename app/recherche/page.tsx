import Link from "next/link";
import { BookOpen, Code2, FileCheck2, FlaskConical, Microscope } from "lucide-react";
import EditorialSection from "@/components/editorial/EditorialSection";
import { readCollection } from "@/lib/database";
import { publishedProjects } from "@/lib/public-content";
import "@/components/editorial/editorial-pages.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Recherche — TLC", description: "Fondements, projets, protocoles et résultats des travaux de recherche sur Tradition Learning." };
type Experiment = { id: string; title: string; notes?: string; published?: boolean; status?: string; resultUrl?: string };
function publicUrl(value?: string): value is string { return Boolean(value && (value.startsWith("https://") || (value.startsWith("/") && !value.startsWith("//")))); }

export default async function RecherchePage() {
  const [projects, studies] = await Promise.all([publishedProjects(), readCollection<Experiment>("experiments")]);
  const experiments = studies.filter(study => study.published === true);
  return <div className="directory-content editorial-page">
    <section className="hero-band editorial-hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING</span><h1>Recherche</h1><p>Étudier les fondements, construire les outils, éprouver les résultats. Les travaux de TLC relient théorie et expérimentation.</p><div className="hero-actions"><a className="button button-gold" href="#travaux">Explorer les travaux</a><Link className="button button-outline" href="/participer">Proposer une contribution</Link></div></div><div className="editorial-hero-summary"><Microscope size={36} aria-hidden="true" /><p>Un résultat prend son sens avec un protocole, des observations et des limites documentées.</p></div></div></section>
    <EditorialSection eyebrow="DÉMARCHE SCIENTIFIQUE" title="Du cadre théorique à l’expérience" description="Chaque travail rend explicite ce qu’il étudie, ce qu’il implémente et ce qu’il permet d’observer.">
      <div className="research-approach">
        <article><BookOpen aria-hidden="true" /><h3>Formaliser</h3><p>Définir les entités, les objets, les relations et les conditions scientifiques de Tradition Learning.</p><Link className="text-link" href="/tradition-learning">Explorer les fondements</Link></article>
        <article><Code2 aria-hidden="true" /><h3>Implémenter</h3><p>Traduire les contrats en opérations documentées et testables dans la bibliothèque tllib.</p><Link className="text-link" href="/tllib">Découvrir la bibliothèque</Link></article>
        <article><FileCheck2 aria-hidden="true" /><h3>Évaluer</h3><p>Comparer les observations au protocole annoncé et publier les résultats avec leurs conditions et leurs limites.</p><Link className="text-link" href="/experiments">Consulter les expérimentations</Link></article>
      </div>
    </EditorialSection>
    <EditorialSection id="travaux" tone="muted" eyebrow="RECHERCHE ET DÉVELOPPEMENT" title="Les travaux publiés" description="Les projets présentés ici proviennent des fiches rendues publiques par TLC." aside={<Link className="text-link" href="/projects">Tous les projets</Link>}>
      {projects.length > 0 ? <div className="research-projects">{projects.map(project => <article className="research-project" key={project.id || project.title}>
        <div><span className="chip">{project.status || "Projet publié"}</span><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}</div>
        <div className="research-project-links">{project.id && <Link className="text-link" href={`/projects/${encodeURIComponent(project.id)}`}>Voir la fiche<span className="sr-only"> : {project.title}</span></Link>}{publicUrl(project.url) && <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Consulter le travail<span className="sr-only"> : {project.title} (nouvel onglet)</span></a>}</div>
      </article>)}</div> : <div className="editorial-empty"><Code2 aria-hidden="true" /><div><h3>Le développement de tllib</h3><p>Aucune fiche de projet complémentaire n’est publiée pour le moment. Le développement de la bibliothèque se suit dans son dépôt.</p><a className="text-link" href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Suivre le dépôt tllib<span className="sr-only"> (nouvel onglet)</span></a></div></div>}
    </EditorialSection>
    <EditorialSection id="experiences" eyebrow="EXPÉRIMENTATIONS" title="Protocoles, observations et résultats" description="Les bénéfices sur la généralisation, la robustesse, les biais ou le volume de données se mesurent dans les conditions de chaque étude.">
      {experiments.length > 0 ? <div className="research-studies">{experiments.map(study => <article className="research-study" key={study.id}><div className="research-study-heading"><span className="editorial-icon"><FlaskConical aria-hidden="true" /></span><div><span className="chip">{study.status || "Étude publiée"}</span><h3>{study.title}</h3></div></div>{study.notes && <div className="research-study-notes"><h4>Présentation de l’étude</h4><p>{study.notes}</p></div>}{publicUrl(study.resultUrl) ? <a className="text-link" href={study.resultUrl} target="_blank" rel="noopener noreferrer">Consulter les résultats<span className="sr-only"> : {study.title} (nouvel onglet)</span></a> : <p className="research-study-availability">Aucun document de résultats associé à cette fiche.</p>}</article>)}</div> : <div className="editorial-empty"><FlaskConical aria-hidden="true" /><div><h3>Les résultats seront présentés avec leurs études</h3><p>Aucun résultat expérimental n’est encore publié sur cette page.</p></div></div>}
    </EditorialSection>
    <section className="research-invitation"><div className="container"><div><span className="eyebrow">CONSTRUIRE ENSEMBLE</span><h2>Contribuer aux prochains travaux</h2><p>Proposez une expérience, une contribution scientifique, du code ou une collaboration.</p></div><Link href="/participer" className="button button-gold">Participer à la recherche</Link></div></section>
  </div>;
}
