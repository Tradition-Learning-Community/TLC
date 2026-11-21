import Link from "next/link";

export const metadata = {
  title: "À propos de TLC et de Tradition Learning",
  description: "Découvrir Tradition Learning, Tradition Learning Community et la bibliothèque scientifique tllib.",
};

const elements = [
  ["Message", "Noyau symbolique et conceptuel qui donne un cadre commun de compréhension."],
  ["Principes", "Structures qui organisent le raisonnement et délimitent les conditions d’action."],
  ["Valeurs", "Orientations et priorités qui guident les choix dans la Tradition."],
  ["Vertus", "Dispositions cultivées qui contribuent à la qualité de l’action et de la transmission."],
  ["Capacités", "Potentiels susceptibles d’être révélés, activés et développés."],
  ["Compétences", "Aptitudes effectives permettant d’agir et de contribuer à la mission."],
  ["Pratique", "Activités et mises en situation qui participent à la consolidation et à l’adaptation."],
  ["Expérience vécue", "Dimension contextuelle et expérientielle de l’apprentissage et de la transmission."],
];

export default function AboutPage() {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Identité et recherche</span>
        <h1 className="content-title">Tradition Learning et TLC</h1>
        <p className="content-lead">
          Tradition Learning (TL) est une théorie et un programme de recherche en intelligence artificielle.
          Tradition Learning Community (TLC) est la communauté scientifique et technique qui contribue
          à son étude, sa formalisation, son expérimentation et son implémentation.
        </p>
      </header>

      <div className="content-grid">
        <article id="what-is" className="content-panel">
          <h2 className="content-panel-title">Pourquoi Tradition Learning ?</h2>
          <p className="content-panel-copy">
            La recherche TL étudie d’autres manières de constituer et de faire évoluer
            des systèmes d’apprentissage, notamment dans des environnements où les données
            disponibles sont limitées. La généralisation, la robustesse et les biais
            sont des enjeux de recherche, pas des résultats déjà acquis.
          </p>
          <p className="content-panel-copy">
            TL ne se réduit pas à l’utilisation de modèles compacts, à une méthode
            d’entraînement particulière ou à une seule famille d’intelligences artificielles.
          </p>
        </article>
        <article className="content-panel">
          <h2 className="content-panel-title">Une Tradition vivante</h2>
          <p className="content-panel-copy">
            Une Tradition désigne un héritage intégré, évolutif et transmissible. Sa transmission
            implique des relations, des transformations, de la pratique, de l’évaluation
            et une mémoire qui peut se prolonger au fil des générations.
            Elle n’est ni une solution déjà connue, ni un modèle ou un fichier de poids.
          </p>
          <p className="content-panel-copy">
            Un Maître peut transmettre une mission sans en connaître la solution finale.
            Les Disciples peuvent apprendre, transformer et contribuer à produire de nouvelles réponses.
          </p>
        </article>
      </div>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Trois entités scientifiques</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div><h3 className="font-semibold">Maître</h3><p className="content-panel-copy">Rôle de référence et de transmission dans un système TL, sous des conditions scientifiques définies.</p></div>
          <div><h3 className="font-semibold">Disciple</h3><p className="content-panel-copy">Rôle d’apprentissage et de transformation, capable de contributions et de découvertes.</p></div>
          <div><h3 className="font-semibold">Communauté</h3><p className="content-panel-copy">Entité scientifique de relations, de mémoire et de régulation collectives, distincte de l’association TLC.</p></div>
        </div>
      </article>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Les huit objets fondamentaux</h2>
        <p className="content-panel-copy">
          Ils possèdent des fonctions et des relations propres au cadre scientifique TL ;
          les descriptions ci-dessous sont des repères d’introduction, non des définitions normatives complètes.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {elements.map(([name, description]) => (
            <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <h3 className="font-semibold text-[#062147] dark:text-white">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="content-grid">
        <article id="vision" className="content-panel">
          <h2 className="content-panel-title">Mission de TLC</h2>
          <p className="content-panel-copy">
            Réunir chercheurs, mathématiciens, ingénieurs, développeurs et autres contributeurs
            pour faire progresser les fondements, les spécifications, l’implémentation et la
            validation expérimentale de Tradition Learning.
          </p>
        </article>
        <article id="values" className="content-panel">
          <h2 className="content-panel-title">Rigueur scientifique et transparence</h2>
          <p className="content-panel-copy">
            Distinguer théorie, contrats, implémentation, hypothèses et résultats testés.
            Publier des travaux traçables, expliciter les limites et ne pas annoncer
            une performance ou une conformité sans preuve.
          </p>
        </article>
        <article id="team" className="content-panel">
          <h2 className="content-panel-title">La communauté humaine</h2>
          <p className="content-panel-copy">
            TLC accueille les contributions scientifiques, logicielles, documentaires
            et expérimentales. Les projets GitHub indiquent les chantiers et les modalités de participation.
          </p>
          <Link className="content-api-link mt-4" href="https://github.com/Tradition-Learning-Community">Voir l’organisation GitHub</Link>
        </article>
        <article id="roadmap" className="content-panel">
          <h2 className="content-panel-title">État des travaux</h2>
          <p className="content-panel-copy">
            Les spécifications de tllib sont publiées dans tllib-specs. La bibliothèque
            tllib possède des fondations C++20, un runtime et des interfaces C++ et Python ;
            sa V1 scientifique reste en développement et n’est pas annoncée comme achevée.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="content-api-link" href="https://github.com/Tradition-Learning-Community/tllib">tllib</Link>
            <Link className="content-api-link" href="https://github.com/Tradition-Learning-Community/tllib-specs">tllib-specs</Link>
          </div>
        </article>
      </div>
      <article id="faq" className="content-panel mt-5">
        <h2 className="content-panel-title">Sources scientifiques et techniques</h2>
        <p className="content-panel-copy">
          Le manuscrit Tradition Learning établit les fondements de la théorie ;
          tllib-specs publie les contrats de la bibliothèque ; tllib réalise le produit.
          Les explications du site restent des introductions et renvoient aux sources pour les détails.
        </p>
        <Link className="content-api-link mt-4" href="/resources">Consulter les ressources</Link>
      </article>
    </section>
  );
}
