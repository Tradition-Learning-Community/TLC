export const metadata = {
  title: "À propos — TLC",
  description:
    "En savoir plus sur la mission, l'équipe et la vision de TLC — Tradition Learning.",
};

const AboutPage = () => {
  return (
    <section className="content-shell">
      <header className="content-header">
        <span className="content-kicker">Vision TLC</span>
        <h1 className="content-title">À propos de TLC</h1>
        <p className="content-lead">
          TLC (Tradition Learning Community) est une plateforme collaborative
          dédiée à la recherche et au développement d'approches d'intelligence
          artificielle axées sur l'efficacité des données, l'interprétabilité et
          l'accessibilité. Nous produisons des guides pratiques, des jeux de
          données annotés et des exemples reproductibles pour aider les
          chercheurs et praticiens à construire des systèmes plus fiables.
        </p>
      </header>

      <div className="content-grid">
        <article id="what-is" className="content-panel">
          <h2 className="content-panel-title">Qu’est-ce que le Tradition Learning ?</h2>
          <p className="content-panel-copy">
            Tradition Learning est une démarche qui favorise la simplicité et
            l'explicabilité : modèles compacts, pipelines documentés et
            évaluations reproductibles. Plutôt que complexifier inutilement,
            nous cherchons des solutions robustes, interprétables et faciles à
            maintenir dans le temps.
          </p>
          <p className="content-panel-copy">
            Les contributions vont des protocoles d'évaluation aux jeux de
            données nettoyés, en passant par des tutoriels et des implémentations
            prêtes à l'emploi. L'objectif est de réduire la barrière d'entrée
            pour des pratiques d'IA responsables.
          </p>
        </article>

        <article id="vision" className="content-panel">
          <h2 className="content-panel-title">Vision & Mission</h2>
          <p className="content-panel-copy">
            Notre mission est de rendre l'IA utile et compréhensible pour le
            plus grand nombre. Nous facilitons le partage de méthodes qui limitent
            la consommation de données et privilégient l'interprétabilité.
          </p>
          <div className="content-chip-row">
            <span className="content-chip">Reproductible</span>
            <span className="content-chip">Collaboratif</span>
            <span className="content-chip">Responsable</span>
          </div>
          <p className="content-panel-copy mt-3">
            À court terme, nous visons à créer un catalogue d'expériences
            reproductibles ; à moyen terme, un hub communautaire pour l'échange
            de ressources et d'ateliers pratiques.
          </p>
        </article>

        <article id="values" className="content-panel">
          <h2 className="content-panel-title">Valeurs & Éthique</h2>
          <p className="content-panel-copy">
            Transparence, équité et prudence guident nos choix. Nous documentons
            les limites des modèles, encourageons les évaluations sur des jeux
            de données diversifiés et promouvons des licences ouvertes lorsque
            possible.
          </p>
          <p className="content-panel-copy">
            Les contributions doivent inclure des notes sur les biais potentiels
            et des recommandations pour une utilisation responsable en production.
          </p>
        </article>

        <article id="team" className="content-panel">
          <h2 className="content-panel-title">L’Équipe</h2>
          <p className="content-panel-copy">
            TLC rassemble des chercheurs, ingénieurs et étudiants motivés par
            l'IA explicable. L'équipe est distribuée et fonctionne par projets
            collaboratifs ouverts — rejoignez-nous pour proposer des idées ou
            prendre en charge des expérimentations.
          </p>
          <ul className="content-list">
            <li className="content-list-item">Proposer une amélioration</li>
            <li className="content-list-item">Contribuer au code source</li>
            <li className="content-list-item">Participer aux revues techniques</li>
          </ul>
        </article>

        <article id="roadmap" className="content-panel">
          <h2 className="content-panel-title">Roadmap</h2>
          <p className="content-panel-copy">
            Nos priorités : 1) standardiser des protocoles d'évaluation, 2)
            publier des jeux de données annotés, 3) organiser des ateliers
            thématiques et 4) développer des outils légers pour le déploiement
            reproductible. Les jalons seront publiés et discutés publiquement.
          </p>
        </article>

        <article id="faq" className="content-panel">
          <h2 className="content-panel-title">FAQ</h2>
          <p className="content-panel-copy">
            Vous trouverez ici des réponses aux questions fréquentes sur la
            contribution, l'utilisation des ressources et les licences. Pour
            toute question spécifique, contactez l'équipe via la page Contact.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutPage;