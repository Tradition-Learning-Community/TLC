export const metadata = {
  title: "Ressources — TLC",
  description:
    "Ressources pédagogiques, articles et datasets recommandés par la communauté TLC.",
};

const RessourcesPage = () => {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Base de connaissances</span>
        <h1 className="content-title">Ressources</h1>
        <p className="content-lead">
          Cette page centralise des cours, articles, jeux de données et outils
          utiles pour travailler avec les approches Tradition Learning.
        </p>
      </header>

      <div className="content-grid">
        <article className="content-panel">
          <h2 className="content-panel-title">Guides</h2>
          <ul className="content-list">
            <li className="content-list-item">Introduction à Tradition Learning</li>
            <li className="content-list-item">Évaluation des modèles</li>
            <li className="content-list-item">Outils et bibliothèques utiles</li>
          </ul>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Datasets</h2>
          <ul className="content-list">
            <li className="content-list-item">Dataset public A</li>
            <li className="content-list-item">Dataset public B</li>
          </ul>
        </article>
      </div>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Liens utiles</h2>
        <div className="content-chip-row">
          <a href="#" className="content-chip">Tutoriels</a>
          <a href="#" className="content-chip">Articles scientifiques</a>
        </div>
      </article>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Légal & Transparence</h2>
        <div className="content-list">
          <div id="statuts-asbl" className="content-list-item">
            <strong>Statuts ASBL</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Informations institutionnelles et cadre juridique de la communauté TLC.
            </p>
          </div>

          <div id="charte-communautaire" className="content-list-item">
            <strong>Charte communautaire</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Principes de collaboration, respect mutuel et bonnes pratiques.
            </p>
          </div>

          <div id="politique-confidentialite" className="content-list-item">
            <strong>Politique de confidentialité</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Règles de collecte, traitement et protection des données personnelles.
            </p>
          </div>

          <div id="cookies" className="content-list-item">
            <strong>Cookies</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Détails sur l'utilisation des cookies et options de consentement.
            </p>
          </div>

          <div id="licence-open-source" className="content-list-item">
            <strong>Licence open-source</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Modalités de réutilisation du code et des ressources publiées.
            </p>
          </div>

          <div id="securite" className="content-list-item">
            <strong>Sécurité</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Processus de signalement responsable et mesures de sécurité appliquées.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default RessourcesPage