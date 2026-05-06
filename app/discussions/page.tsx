export default function DiscussionsPage(){
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Forum technique</span>
        <h1 className="content-title">Discussions</h1>
        <p className="content-lead">
          Espace de discussion pour les threads communautaires, questions de
          recherche et retours sur les projets.
        </p>
      </header>

      <article className="content-panel mt-8">
        <h2 className="content-panel-title">Accès API</h2>
        <p className="content-panel-copy">Consultez la liste des discussions via l'endpoint dédié.</p>
        <div className="mt-4">
          <a href="/api/discussions" className="content-api-link">/api/discussions</a>
        </div>
      </article>
    </section>
  )
}
