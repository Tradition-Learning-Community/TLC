import Link from "next/link";
import { BookOpen, Code, Cpu, GitBranch, Layers, Network, Package, ShieldCheck } from "lucide-react";
import EditorialSection from "@/components/editorial/EditorialSection";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import SystemConstitutionDiagram from "@/components/tllib/SystemConstitutionDiagram";
import TllibArchitectureDiagram from "@/components/tllib/TllibArchitectureDiagram";
import { tllibRepository } from "@/lib/scientific-content/product";

export const metadata = {
  title: "tllib — Bibliothèque Tradition Learning",
  description: "Constituer, faire fonctionner et poursuivre des systèmes TL : explorez la constitution, le moteur C++20, les API C++ et Python et l’état de développement de tllib.",
};

const documentation = [
  { title: "Comprendre le produit", description: "Périmètre, responsabilités des interfaces et conditions de publication de V1.", path: "docs/v1/PRODUCT-CONTRACT.md", icon: BookOpen },
  { title: "Construire et contribuer", description: "Environnement de développement, compilation et accès aux outils C++ et Python.", path: "docs/v1/CONTRIBUTOR-QUICKSTART.md", icon: Code },
  { title: "Choisir un composant", description: "Noyau, bindings, données, conformité, performance, distribution ou documentation.", path: "docs/v1/COMPONENTS-AND-CONTRIBUTION.md", icon: Package },
];

export default function TllibPage() {
  return <div className="directory-content product-page">
    <section className="hero-band product-hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Le produit scientifique</span>
          <h1>tllib</h1>
          <p>La bibliothèque pour constituer, faire fonctionner et poursuivre des systèmes Tradition Learning, depuis C++ ou Python.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#constitution">Explorer le fonctionnement</a>
            <a className="button button-outline" href={tllibRepository} target="_blank" rel="noopener noreferrer">Code et documentation<span className="sr-only"> (nouvel onglet)</span></a>
          </div>
        </div>
        <div className="product-hero-art" aria-hidden="true">
          <div className="product-hero-interfaces"><span>C++</span><span>Python</span></div>
          <svg className="product-hero-wire" viewBox="0 0 240 48"><path d="M60 0v20h120V0M120 20v28"/></svg>
          <div className="product-hero-engine"><Cpu size={36}/><div><strong>Moteur C++20</strong><span>Une implémentation scientifique</span></div></div>
          <p>Contrats · runtime · providers · conformité</p>
        </div>
      </div>
    </section>

    <div className="container"><div className="product-status"><strong>V1 en développement</strong><p>Les fondations techniques sont en place. Les fonctionnalités scientifiques des domaines restent à réaliser et à valider.</p></div></div>

    <EditorialSection id="fonctionnement" eyebrow="Les usages de la bibliothèque" title="Donner une fondation à un système TL" description="Le développeur apporte une formulation, des ressources, des capacités et les conditions nécessaires. tllib organise les structures permises par les contrats et s’intègre à l’application qui l’utilise.">
      <div className="product-uses">
        <article className="product-use"><Network size={25} aria-hidden="true"/><h3>Fonder un système</h3><p>Constituer une base initiale adaptée à la mission. Les participants, les acquis et les contenus peuvent ensuite évoluer selon les conditions scientifiques.</p></article>
        <article className="product-use"><Layers size={25} aria-hidden="true"/><h3>Réutiliser une Tradition</h3><p>Mobiliser un héritage existant dans un nouveau contexte, en vérifiant les conditions de sa réutilisation. La Tradition conserve sa signification scientifique.</p></article>
        <article className="product-use"><GitBranch size={25} aria-hidden="true"/><h3>Poursuivre un système</h3><p>Continuer le développement d’un système déjà constitué. Ce mode se distingue de la fondation et de l’héritage interne entre générations.</p></article>
      </div>
    </EditorialSection>

    <div className="container product-diagram-section"><RevealOnScroll><SystemConstitutionDiagram/></RevealOnScroll></div>
    <div className="container product-diagram-section"><RevealOnScroll><TllibArchitectureDiagram/></RevealOnScroll></div>

    <EditorialSection id="developpement" eyebrow="État du produit" title="Une V1 construite avec des preuves" tone="muted" description="Les possibilités de la bibliothèque dépendent des fonctionnalités réellement implémentées, des providers disponibles et de leurs vérifications.">
      <div className="product-availability">
        <article><h3>Les fondations disponibles</h3><p>Le dépôt documente le noyau natif, le runtime, les providers, l’intégration Python et les outils de conformité.</p><ul><li>Une architecture commune en C++20, exposée en C++ et Python.</li><li>Des interfaces numériques et des providers explicites.</li><li>Un snapshot scientifique verrouillé et une traçabilité des contrats.</li></ul></article>
        <article><h3>La qualification scientifique</h3><p>La V1 scientifique complète reste en développement. Sa publication exige la qualification de tout le catalogue visé.</p><ul><li>Comportements exécutables implémentés et vérifiés.</li><li>Fonctionnalités conditionnelles reliées à leurs providers.</li><li>Structures présentées avec leur niveau réel de support.</li><li>Interfaces installables, documentation et contrôles de release satisfaits.</li></ul></article>
      </div>
      <p className="product-source-note">État documenté dans le <a href={`${tllibRepository}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">README de tllib</a> et critères du <a href={`${tllibRepository}/blob/main/docs/v1/PRODUCT-CONTRACT.md#fin-de-v1`} target="_blank" rel="noopener noreferrer">contrat produit</a>.</p>
    </EditorialSection>

    <EditorialSection id="documentation" eyebrow="Travailler avec tllib" title="Du contrat au code" description="Les références du projet donnent le périmètre, les commandes applicables et les parcours de contribution.">
      <div className="product-document-links">{documentation.map(item => <a key={item.path} href={`${tllibRepository}/blob/main/${item.path}`} target="_blank" rel="noopener noreferrer"><item.icon size={24} aria-hidden="true"/><strong>{item.title}</strong><span>{item.description}</span><span className="sr-only">Ouvrir dans un nouvel onglet</span></a>)}</div>
      <p className="product-source-note"><ShieldCheck size={16} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }}/><a href="https://github.com/Tradition-Learning-Community/tllib-specs" target="_blank" rel="noopener noreferrer">Les spécifications scientifiques</a> définissent les contrats de conformité. <Link href="/recherche">Les travaux de recherche</Link> présentent les études et évaluations publiées.</p>
    </EditorialSection>
  </div>;
}
