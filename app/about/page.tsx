export const metadata = {
  title: "À propos — TLC",
  description:
    "En savoir plus sur la mission, l'équipe et la vision de TLC — Tradition Learning.",
};

const AboutPage = () => {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Vision TLC</span>
        <h1 className="content-title">À propos de TLC</h1>
        <p className="content-lead">
          Tradition Learning Community (TLC) est une communauté scientifique née
          d’une ambition : explorer de nouvelles façons d’apprendre pour les
          intelligences artificielles. Elle rassemble des personnes qui
          souhaitent comprendre, développer, expérimenter et faire progresser
          Tradition Learning (TL), une théorie de l’apprentissage.
        </p>
      </header>

      <div className="content-grid">
        <article id="what-is" className="content-panel">
          <h2 className="content-panel-title">Qu’est-ce que Tradition Learning ?</h2>
          <p className="content-panel-copy">
            De nombreuses méthodes d’IA reposent sur d’importantes quantités de données. TL étudie une autre voie : faire évoluer l’apprentissage par des relations, la transmission, la transformation et la régulation d’une Tradition, héritage vivant et transmissible. Cette recherche ne se limite ni à un type de modèle ni à un domaine d’application.
          </p>
          <p className="content-panel-copy">
            Le cadre scientifique distingue trois entités : Maître, Disciple et Communauté, ainsi que huit objets : Message, Principes, Valeurs, Vertus, Capacités, Compétences, Pratique et Expérience vécue. La mémoire, les générations, les cohortes et les contributions participent à l’évolution des systèmes TL. Ces termes possèdent des significations scientifiques précises.
          </p>
        </article>

        <article id="vision" className="content-panel">
          <h2 className="content-panel-title">Vision & mission de TLC</h2>
          <p className="content-panel-copy">
            TLC travaille à faire passer Tradition Learning de la théorie à des systèmes utilisables et vérifiables. Sa mission associe recherche, mathématiques, développement logiciel, expériences et échanges entre personnes d’horizons différents.
          </p>
          <div className="content-chip-row">
            <span className="content-chip">Recherche</span>
            <span className="content-chip">Spécifications</span>
            <span className="content-chip">Implémentation</span>
          </div>
          <p className="content-panel-copy mt-3">
            TLC développe notamment tllib, une bibliothèque destinée à constituer et faire fonctionner des systèmes Tradition Learning. Elle est encore en développement ; ses performances devront être établies par l’expérimentation.
          </p>
        </article>

        <article id="values" className="content-panel">
          <h2 className="content-panel-title">Rigueur & transparence</h2>
          <p className="content-panel-copy">
            Nous distinguons les propositions théoriques, les contrats, les choix d'implémentation et les résultats expérimentaux. Les bénéfices espérés sur les faibles volumes de données, la robustesse et les biais doivent être mesurés.
          </p>
          <p className="content-panel-copy">
            Les contributions doivent rester traçables aux sources scientifiques et aux spécifications, et signaler clairement les limites et les questions ouvertes.
          </p>
        </article>

        <article id="team" className="content-panel">
          <h2 className="content-panel-title">La communauté TLC</h2>
          <p className="content-panel-copy">
            TLC accueille des chercheurs, informaticiens, étudiants, enseignants, bénévoles et personnes intéressées par la recherche. Des institutions, entreprises et partenaires peuvent aussi contribuer par leurs compétences, des ressources ou un soutien. La Communauté de la théorie TL est une entité scientifique, distincte de l’organisation humaine TLC.
          </p>
          <ul className="content-list">
            <li className="content-list-item">Découvrir la recherche et participer aux échanges</li>
            <li className="content-list-item">Contribuer aux travaux scientifiques ou techniques</li>
            <li className="content-list-item">Proposer une collaboration ou un soutien</li>
          </ul>
        </article>

        <article id="roadmap" className="content-panel">
          <h2 className="content-panel-title">État des travaux</h2>
          <p className="content-panel-copy">
            La théorie et les spécifications sont documentées. La bibliothèque tllib possède des fondations techniques, mais sa première version scientifique complète reste en développement. Les travaux expérimentaux doivent encore établir les bénéfices et les limites de l’approche.
          </p>
        </article>

        <article id="faq" className="content-panel">
          <h2 className="content-panel-title">Sources de référence</h2>
          <p className="content-panel-copy">
            Les fondements de Tradition Learning sont développés dans le manuscrit scientifique. Les travaux de formalisation et de développement sont accessibles dans les spécifications et la bibliothèque tllib.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutPage;