import Link from "next/link";
import FundamentalEntitiesDiagram from "@/components/science/FundamentalEntitiesDiagram";
import FundamentalObjectsExplorer from "@/components/science/FundamentalObjectsExplorer";
import CohortsLineageDiagram from "@/components/science/CohortsLineageDiagram";
import FoundingAnalogy from "@/components/science/FoundingAnalogy";
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

    <div className="container"><nav className="theory-navigation" aria-label="Dans cette page"><a href="#fondements">La Tradition</a><a href="#analogie">Analogie fondatrice</a><a href="#entites">Trois entités</a><a href="#objets">Huit objets</a><a href="#filiations">Cohortes et filiations</a><a href="#approfondir">Approfondir</a></nav></div>

    <section className="section container theory-introduction" id="fondements" aria-labelledby="tradition-title">
      <div><span className="eyebrow">LE CADRE SCIENTIFIQUE</span><h2 className="section-title" id="tradition-title">Une Tradition vivante</h2><div className="gold-rule" /></div>
      <div className="theory-body"><p className="theory-quote">Un héritage intégré, évolutif et transmissible, que les participants peuvent enrichir.</p><p>La Tradition se développe à travers les relations, les pratiques, la mémoire et les transformations de ses participants. Une solution, un modèle ou des poids peuvent contribuer à son expression ; ils ne suffisent pas à la définir.</p><p>Le Maître peut guider une mission dont la solution reste inconnue. Les Disciples apprennent, découvrent et contribuent. La Communauté soutient les interactions, la reconnaissance et la continuité de cet héritage.</p><p>Ces rôles scientifiques et leurs conditions s’étudient dans des systèmes variés. Classification, régression, génération ou décision constituent des contextes d’application possibles, sans enfermer TL dans un algorithme ou une modalité.</p></div>
    </section>

    <FoundingAnalogy />

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

    <section className="section container theory-introduction" id="origine" aria-labelledby="theory-origin-title">
      <div><span className="eyebrow">ORIGINE</span><h2 className="section-title" id="theory-origin-title">De Kindu à Tradition Learning</h2><div className="gold-rule" /><p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--muted)]">D’une application de santé confrontée au manque de données représentatives à la naissance d’une communauté scientifique.</p></div>
      <div className="theory-body">
        <p>En 2022, à <strong>Kindu, en République démocratique du Congo</strong>, l’accès limité aux soins ophtalmologiques spécialisés conduit <strong>Gilbert BEMWIZ</strong>, alors étudiant en génie informatique, à concevoir une application d’intelligence artificielle pour détecter des pathologies oculaires. Faute d’images médicales locales suffisantes, il entraîne son modèle avec des données ouvertes recueillies sur Internet. L’application prend forme et le projet lui vaut un <strong>prix d’innovation</strong>.</p>
        <p>Mais les essais auprès de personnes de sa région révèlent une limite décisive : les résultats sont moins satisfaisants que sur les données utilisées pendant le développement. Ces images, principalement issues de sources étrangères, notamment occidentales, ne représentent pas nécessairement les patients et les conditions d’acquisition locales. Une question s’impose : <strong>comment concevoir une IA utile là où les données représentatives sont rares ?</strong></p>
        <p>Lors de son passage chez <strong>Neotex.ai</strong>, ses échanges avec la dirigeante de l’entreprise élargissent cette interrogation. Le manque de données n’est pas propre à l’ophtalmologie : il traverse de nombreux domaines de l’IA, particulièrement dans les régions où leur collecte exige des moyens difficiles à réunir. Cette prise de conscience approfondit sa recherche.</p>
        <p>En observant la transmission et l’évolution des acquis dans la nature et dans l’histoire des sociétés humaines, il développe progressivement les fondements de <strong>Tradition Learning</strong> : une approche scientifique articulant Maître, Disciple, Communauté et développement d’une Tradition vivante.</p>
        <p>Le <strong>19 décembre 2025</strong>, il présente l’idée au <strong>DevFest Lubumbashi</strong>. La rencontre réunit les premiers intéressés et marque les débuts de <strong>Tradition Learning Community (TLC)</strong>, consacrée à la recherche, à l’expérimentation et au développement de la bibliothèque tllib.</p>
        <ol className="mt-7 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-3" aria-label="Repères de l’histoire de Tradition Learning">
          <li className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"><span className="text-xs font-bold tracking-widest text-[var(--gold)]">2022 · KINDU</span><p className="mt-2 text-sm leading-relaxed">Application ophtalmologique et limites des données d’entraînement.</p></li>
          <li className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"><span className="text-xs font-bold tracking-widest text-[var(--gold)]">RECHERCHE</span><p className="mt-2 text-sm leading-relaxed">Neotex.ai, question des données et élaboration de Tradition Learning.</p></li>
          <li className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4"><span className="text-xs font-bold tracking-widest text-[var(--gold)]">19 DÉC. 2025</span><p className="mt-2 text-sm leading-relaxed">Présentation au DevFest Lubumbashi et premiers pas de TLC.</p></li>
        </ol>
        <p className="mt-6 text-sm text-[var(--muted)]">La recherche se poursuit sur la transmission, la transformation, la régulation, la mémoire et l’évolution des Traditions. Les bénéfices attendus sur la généralisation et la robustesse restent à mesurer.</p>
        <Link className="text-link" href="/resources">Consulter les ressources scientifiques</Link>
      </div>
    </section>

    <section className="cta-band"><span className="eyebrow">DE LA THÉORIE AUX SYSTÈMES</span><h2>Constituer et faire fonctionner un système TL</h2><p>Découvrez la bibliothèque tllib, son architecture et la manière dont elle organise la constitution des systèmes Tradition Learning.</p><Link href="/tllib" className="button button-gold">Découvrir tllib</Link></section>
  </div>;
}
