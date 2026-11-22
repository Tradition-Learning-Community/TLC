import Link from "next/link";
import { BookOpen, Code2, FlaskConical, LibraryBig, NotebookText } from "lucide-react";
import EditorialSection from "@/components/editorial/EditorialSection";
import ResourceExplorer from "@/components/editorial/ResourceExplorer";
import { publishedResources } from "@/lib/public-content";
import "@/components/editorial/editorial-pages.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ressources — TLC", description: "Sources scientifiques, bibliothèque, guides et ressources de Tradition Learning. Recherchez les publications de TLC par sujet et catégorie." };

export default async function ResourcesPage() {
  // Only these public fields may cross the server/client boundary.
  const resources = (await publishedResources()).map(({ id, title, category, url, description }) => ({
    id, title, category, url, description, published: true,
  }));
  return <div className="directory-content editorial-page">
    <section className="hero-band editorial-hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">LIRE · EXPLORER · APPROFONDIR</span><h1>Ressources</h1><p>Les textes, les outils et les publications pour comprendre Tradition Learning et suivre son développement.</p><div className="hero-actions"><a href="#catalogue" className="button button-gold">Explorer le catalogue</a></div></div><div className="editorial-hero-summary"><LibraryBig size={34} aria-hidden="true" /><p>Une entrée vers les fondements scientifiques, les contrats et la documentation de tllib.</p></div></div></section>
    <EditorialSection eyebrow="S’ORIENTER" title="Commencer par l’essentiel" description="Choisissez votre point d’entrée selon ce que vous souhaitez comprendre.">
      <div className="resource-entry-grid">
        <Link className="resource-entry" href="/tradition-learning"><BookOpen aria-hidden="true" /><h3>Comprendre la théorie</h3><p>Les entités, les huit objets, les relations et la transmission.</p><span>Tradition Learning</span></Link>
        <Link className="resource-entry" href="/tllib"><Code2 aria-hidden="true" /><h3>Explorer la bibliothèque</h3><p>La constitution d’un système TL, son architecture et ses interfaces.</p><span>tllib</span></Link>
        <Link className="resource-entry" href="/recherche"><FlaskConical aria-hidden="true" /><h3>Suivre les travaux</h3><p>Les projets et les expérimentations publiés par la communauté.</p><span>Recherche</span></Link>
      </div>
    </EditorialSection>
    <EditorialSection tone="muted" eyebrow="SOURCES DE RÉFÉRENCE" title="Documentation technique" description="Les dépôts rassemblent les contrats scientifiques et le code du produit.">
      <div className="resource-reference-list">
        <article><span className="editorial-icon"><NotebookText aria-hidden="true" /></span><div><h3>Spécifications scientifiques</h3><p>Domaines, contrats, registre et références de conformité de tllib-specs.</p><a className="text-link" href="https://github.com/Tradition-Learning-Community/tllib-specs" target="_blank" rel="noopener noreferrer">Consulter tllib-specs<span className="sr-only"> (nouvel onglet)</span></a></div></article>
        <article><span className="editorial-icon"><Code2 aria-hidden="true" /></span><div><h3>Code et documentation de tllib</h3><p>Architecture C++ et Python, contrat produit et parcours de contribution.</p><a className="text-link" href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Consulter tllib<span className="sr-only"> (nouvel onglet)</span></a></div></article>
      </div>
    </EditorialSection>
    <EditorialSection id="catalogue" eyebrow="CATALOGUE" title="Ressources publiées" description="Recherchez un titre, un sujet ou une catégorie dans les ressources rendues publiques par TLC."><ResourceExplorer resources={resources} /></EditorialSection>
  </div>;
}
