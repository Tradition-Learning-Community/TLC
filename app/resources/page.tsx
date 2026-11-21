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
          La théorie Tradition Learning, les spécifications et la bibliothèque tllib
          sont documentées pour les étudiants, les chercheurs et les développeurs.
        </p>
      </header>

      <div className="content-grid">
        <article className="content-panel">
          <h2 className="content-panel-title">Découvrir Tradition Learning</h2>
          <ul className="content-list">
            <li className="content-list-item"><a href="/about#what-is">Introduction à Tradition Learning</a></li>
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib-specs">Spécifications tllib-specs</a></li>
            <li className="content-list-item"><a href="https://github.com/Tradition-Learning-Community/tllib">Bibliothèque tllib</a></li>
          </ul>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Approfondir la recherche et les outils</h2>
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

      <article id="licence-open-source" className="content-panel mt-5">
        <h2 className="content-panel-title">Licences et informations</h2>
        <p className="content-panel-copy">
          Le code du site TLC est publié sous licence MIT. Les projets de recherche
          et les bibliothèques disposent de leurs propres licences.
        </p>
        <p className="content-panel-copy mt-3">
          Pour une question institutionnelle, une demande de document ou un partenariat,
          contactez TLC.
        </p>
        <a href="/contact" className="content-api-link mt-4">Contacter TLC</a>
      </article>
    </section>
  )
}

export default RessourcesPage