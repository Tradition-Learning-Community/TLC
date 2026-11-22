import Link from "next/link";
import FundamentalEntitiesDiagram from "@/components/science/FundamentalEntitiesDiagram";
import FundamentalObjectsExplorer from "@/components/science/FundamentalObjectsExplorer";
import CohortsLineageDiagram from "@/components/science/CohortsLineageDiagram";
import "@/components/science/science-diagrams.css";

export const metadata = {
  title: "Tradition Learning — Fondements et transmission | TLC",
  description: "Explorez les trois entités, les huit objets fondamentaux, les cohortes et les filiations de Tradition Learning à travers des visualisations interactives sourcées.",
};

const specs = "https://github.com/Tradition-Learning-Community/tllib-specs";

export default function TraditionLearningPage() {
  return <div className="directory-content theory-page">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy">
      <span className="eyebrow">LA THÉORIE SCIENTIFIQUE</span>
      <h1>Tradition Learning</h1>
      <p>Comprendre l’apprentissage par la transmission, la transformation et le développement d’un héritage vivant.</p>
      <div className="hero-actions"><a className="button button-gold" href="#fondements">Explorer les fondements</a><Link className="button button-outline" href="/recherche">Les travaux de recherche</Link></div>
    </div></div></section>

    <div className="container"><nav className="theory-navigation" aria-label="Dans cette page"><a href="#fondements">La Tradition</a><a href="#entites">Trois entités</a><a href="#objets">Huit objets</a><a href="#filiations">Cohortes et filiations</a><a href="#approfondir">Approfondir</a></nav></div>

    <section className="section container theory-introduction" id="fondements" aria-labelledby="tradition-title">
      <div><span className="eyebrow">LE CADRE SCIENTIFIQUE</span><h2 className="section-title" id="tradition-title">Une Tradition vivante</h2><div className="gold-rule" /></div>
      <div className="theory-body"><p className="theory-quote">Un héritage intégré, évolutif et transmissible, que les participants peuvent enrichir.</p><p>La Tradition se développe à travers les relations, les pratiques, la mémoire et les transformations de ses participants. Une solution, un modèle ou des poids peuvent contribuer à son expression ; ils ne suffisent pas à la définir.</p><p>Le Maître peut guider une mission dont la solution reste inconnue. Les Disciples apprennent, découvrent et contribuent. La Communauté soutient les interactions, la reconnaissance et la continuité de cet héritage.</p><p>Ces rôles scientifiques et leurs conditions s’étudient dans des systèmes variés. Classification, régression, génération ou décision constituent des contextes d’application possibles, sans enfermer TL dans un algorithme ou une modalité.</p></div>
    </section>

    <div className="container"><FundamentalEntitiesDiagram /></div>
    <div className="container"><FundamentalObjectsExplorer /></div>
    <div className="container"><CohortsLineageDiagram /></div>

    <section className="section theory-reading" id="approfondir" aria-labelledby="theory-reading-title"><div className="container">
      <div className="section-head"><span className="eyebrow">POURSUIVRE LA LECTURE</span><h2 className="section-title" id="theory-reading-title">Des mécanismes à étudier ensemble</h2><p className="section-copy">Les explorateurs introduisent le cadre. Le manuscrit et les spécifications en développent les définitions, les conditions et les mathématiques.</p></div>
      <div className="theory-reading-grid">
        <article><h3>Transmission et transformation</h3><p>La transmission implique une interprétation et une transformation situées. Les relations, les capacités des participants, les pratiques et le contexte déterminent les conditions à examiner. L’évaluation et la régulation permettent d’étudier ce qui change et ce qui se conserve.</p><a href={`${specs}/tree/main/maths/34-transmission-lifecycle`} target="_blank" rel="noopener noreferrer">Lire le cycle de transmission<span className="sr-only"> (nouvel onglet)</span></a></article>
        <article><h3>Mémoire et continuité</h3><p>L’héritage interne entre générations soutient la continuité d’une Tradition vivante. La réutilisation d’une Tradition par un développeur et la continuation d’un système existant sont des possibilités distinctes, à comprendre selon leurs conditions propres.</p><a href={`${specs}/tree/main/maths/23-memory`} target="_blank" rel="noopener noreferrer">Explorer la mémoire<span className="sr-only"> (nouvel onglet)</span></a></article>
      </div>
    </div></section>

    <section className="section container theory-introduction" aria-labelledby="theory-origin-title">
      <div><span className="eyebrow">ORIGINE</span><h2 className="section-title" id="theory-origin-title">Une question née à Kindu</h2></div>
      <div className="theory-body"><p>En 2021, à Kindu, des travaux sur une application d’intelligence artificielle ont rencontré une difficulté : les données disponibles ne permettaient pas toujours d’aborder correctement le problème étudié. Tradition Learning s’est développé à partir de cette réflexion.</p><p>La recherche couvre aujourd’hui la transmission, la transformation, la régulation, la mémoire et l’évolution des Traditions. Les effets attendus sur la généralisation, la robustesse et l’usage des données font l’objet d’un travail de formalisation et d’évaluation.</p><Link className="text-link" href="/resources">Consulter les ressources scientifiques</Link></div>
    </section>

    <section className="cta-band"><span className="eyebrow">DE LA THÉORIE AUX SYSTÈMES</span><h2>Constituer et faire fonctionner un système TL</h2><p>Découvrez la bibliothèque tllib, son architecture et la manière dont elle organise la constitution des systèmes Tradition Learning.</p><Link href="/tllib" className="button button-gold">Découvrir tllib</Link></section>
  </div>;
}
