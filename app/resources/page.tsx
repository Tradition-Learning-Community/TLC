export const metadata = {
  title: "Ressources — TLC",
  description:
    "Sources officielles et documentation de Tradition Learning, tllib-specs et tllib.",
};

const RessourcesPage = () => {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Base de connaissances</span>
        <h1 className="content-title">Ressources</h1>
        <p className="content-lead">
          Retrouvez les sources scientifiques, les spécifications et la bibliothèque
          actuellement disponibles. Chaque document a un rôle distinct.
        </p>
      </header>

      <div className="content-grid">
        <article className="content-panel">
          <h2 className="content-panel-title">Guides</h2>
          <ul className="content-list">
            <li className="content-list-item"><a href="/about#what-is">Introduction à Tradition Learning</a></li>
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib-specs">Spécifications tllib-specs</a></li>
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib">Bibliothèque tllib</a></li>
          </ul>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Documentation technique</h2>
          <ul className="content-list">
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib/blob/main/README.md">État et architecture de tllib</a></li>
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib-specs/blob/main/README.md">Sources contractuelles</a></li>
          </ul>
        </article>
      </div>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Liens utiles</h2>
        <div className="content-chip-row">
          <a href="https://github.com/Tradition-Learning-Community/tllib" className="content-chip">Dépôt tllib</a>
          <a href="https://github.com/Tradition-Learning-Community/tllib-specs" className="content-chip">Dépôt tllib-specs</a>
        </div>
      </article>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Légal & Transparence</h2>
        <div className="content-list">
          <div id="statuts-asbl" className="content-list-item">
            <strong>Statuts ASBL</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Document officiel à publier après validation institutionnelle.
            </p>
          </div>

          <div id="charte-communautaire" className="content-list-item">
            <strong>Charte communautaire</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Les règles officielles de contribution sont accessibles dans les dépôts GitHub.
            </p>
          </div>

          <div id="politique-confidentialite" className="content-list-item">
            <strong>Politique de confidentialité</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Politique officielle à formaliser et publier avant de la présenter comme un document adopté.
            </p>
          </div>

          <div id="cookies" className="content-list-item">
            <strong>Cookies</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              L'information définitive dépend des traitements et outils réellement utilisés.
            </p>
          </div>

          <div id="licence-open-source" className="content-list-item">
            <strong>Licence open-source</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Le code du site TLC est publié sous licence MIT ; les autres dépôts ont leurs propres licences.
            </p>
          </div>

          <div id="securite" className="content-list-item">
            <strong>Sécurité</strong>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Les informations de signalement officielles sont disponibles dans les dépôts concernés.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default RessourcesPage