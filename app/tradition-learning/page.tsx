import Link from "next/link";
export const metadata = { title: "Tradition Learning — TLC", description: "Comprendre Tradition Learning, sa théorie et ses mécanismes fondamentaux." };
const objects = ["Message","Principes","Valeurs","Vertus","Capacités","Compétences","Pratique","Expérience vécue"];
export default function TraditionLearningPage() {
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">LA THÉORIE SCIENTIFIQUE</span><h1>Tradition Learning</h1><p>Une recherche sur l'apprentissage par transmission, transformation et évolution d'une Tradition.</p><div className="hero-actions"><a className="button button-gold" href="#fondements">Découvrir les fondements ↓</a><Link className="button button-outline" href="/recherche">Les travaux de recherche ↗</Link></div></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
    <section className="section container"><div className="section-head"><span className="eyebrow">ORIGINE</span><h2 className="section-title">Une recherche née face aux limites des données disponibles</h2></div>
      <p className="section-copy">À Kindu, en 2021, des travaux portant sur une application d'intelligence artificielle ont soulevé une difficulté : les données disponibles ne permettaient pas toujours d'aborder correctement le problème étudié. Tradition Learning s'est développé à partir de cette réflexion.</p>
      <p className="section-copy">La question dépasse aujourd'hui le seul manque de données. TL étudie des mécanismes de transmission, de transformation, de régulation et de mémoire susceptibles de soutenir différents systèmes d'apprentissage. Il ne se limite pas à un algorithme, un type de modèle ou une modalité.</p>
    </section>
    <section className="section container" id="fondements"><div className="section-head"><span className="eyebrow">CADRE SCIENTIFIQUE</span><h2 className="section-title">Une Tradition vivante</h2></div>
      <p className="section-copy">La Tradition est un héritage vivant, intégré, évolutif et transmissible. Elle n'est ni une solution préconçue, ni un modèle, ni un ensemble de poids ou un simple document. Sa constitution et son développement impliquent des participants, des relations et des transformations.</p>
      <div className="grid-3">{[
        ["Maître","Une entité scientifique participant à la transmission de la Tradition ; elle peut ignorer la solution finale."],
        ["Disciple","Une entité scientifique qui apprend, transforme et peut contribuer à produire des connaissances nouvelles."],
        ["Communauté","Une entité scientifique intervenant dans les relations, la mémoire et la régulation du système, distincte de l'association TLC."],
      ].map(([name,copy])=><article className="card" key={name}><h3>{name}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Les huit objets fondamentaux</h2><p className="section-copy">Ils possèdent des fonctions et des relations scientifiques propres. Leurs définitions formelles sont établies dans le manuscrit.</p></div>
      <div className="grid-3">{objects.map((item,i)=><article className="card" key={item}><span className="eyebrow">{String(i+1).padStart(2,"0")}</span><h3>{item}</h3></article>)}</div>
    </section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Transmission, générations et contributions</h2></div>
      <p className="section-copy">TL étudie les relations entre participants, la transmission et la transformation, l'évaluation-régulation, la mémoire, les cohortes, les filiations générationnelles, les branches, les Maîtres-relais et les cascades. Les générations désignent une filiation scientifique, pas une progression uniforme par niveaux.</p>
      <p className="section-copy">Une mission peut rester ouverte : les Disciples peuvent découvrir des réponses et faire évoluer la Tradition au fil de leurs contributions.</p>
    </section>
    <section className="cta-band"><h2>De la théorie aux systèmes TL</h2><p>TLC développe la bibliothèque tllib pour rendre ces mécanismes utilisables et évaluables.</p><Link href="/tllib" className="button button-gold">Découvrir tllib</Link></section>
  </div>;
}
