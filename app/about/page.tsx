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
          Tradition Learning (TL) est une théorie scientifique de l'apprentissage.
          Tradition Learning Community (TLC) est la communauté de chercheurs,
          mathématiciens, ingénieurs et développeurs qui étudient la théorie,
          la formalisent et développent la bibliothèque tllib.
        </p>
      </header>

      <div className="content-grid">
        <article id="what-is" className="content-panel">
          <h2 className="content-panel-title">Qu’est-ce que Tradition Learning ?</h2>
          <p className="content-panel-copy">
            Tradition Learning explore un apprentissage fondé sur un héritage vivant, intégré, évolutif et transmissible : la Tradition. Sa recherche examine notamment les situations où les données disponibles sont limitées, sans se réduire à un type de modèle ou à une modalité.
          </p>
          <p className="content-panel-copy">
            Les entités fondamentales sont le Maître, le Disciple et la Communauté ; les huit objets sont Message, Principes, Valeurs, Vertus, Capacités, Compétences, Pratique et Expérience vécue. Transmission, transformation, mémoire, cohortes, générations, relations et régulation concourent au fonctionnement des systèmes TL.
          </p>
        </article>

        <article id="vision" className="content-panel">
          <h2 className="content-panel-title">Vision & mission de TLC</h2>
          <p className="content-panel-copy">
            TLC développe un programme de recherche scientifique et une bibliothèque permettant de constituer et faire fonctionner des systèmes Tradition Learning. Le travail va de la théorie aux spécifications, à l'implémentation et aux tests.
          </p>
          <div className="content-chip-row">
            <span className="content-chip">Recherche</span>
            <span className="content-chip">Spécifications</span>
            <span className="content-chip">Implémentation</span>
          </div>
          <p className="content-panel-copy mt-3">
            tllib-specs publie les contrats ; tllib est la bibliothèque en développement, avec moteur C++20 et API C++ et Python. La V1 scientifique complète n'est pas encore publiée.
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
            TLC rassemble des personnes qui contribuent à la recherche, aux spécifications, à la bibliothèque tllib, aux tests et à la documentation. La Communauté, entité scientifique de TL, est distincte de l'organisation humaine TLC.
          </p>
          <ul className="content-list">
            <li className="content-list-item">Proposer une amélioration</li>
            <li className="content-list-item">Contribuer au code source</li>
            <li className="content-list-item">Participer aux revues techniques</li>
          </ul>
        </article>

        <article id="roadmap" className="content-panel">
          <h2 className="content-panel-title">État des travaux</h2>
          <p className="content-panel-copy">
            Les spécifications tllib-specs couvrent les contrats des 36 domaines. Les fondations du moteur C++20, du runtime et des interfaces sont présentes dans tllib, mais les fonctionnalités scientifiques et leur conformité complète restent en développement. Consultez les README des dépôts pour l'état actualisé.
          </p>
        </article>

        <article id="faq" className="content-panel">
          <h2 className="content-panel-title">Sources de référence</h2>
          <p className="content-panel-copy">
            Le manuscrit Tradition Learning est la source théorique ; tllib-specs constitue le référentiel contractuel ; tllib est le produit logiciel. Consultez les ressources et les dépôts pour les textes et les informations de développement.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutPage;