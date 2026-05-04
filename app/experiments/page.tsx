export default function ExperimentsPage(){
  return (
    <section className="content-shell">
      <header className="content-header">
        <span className="content-kicker">Lab TLC</span>
        <h1 className="content-title">Espace Expérimentation</h1>
        <p className="content-lead">
          Zone dédiée aux notebooks, protocoles de test et prototypes orientés
          validation scientifique.
        </p>
      </header>

      <article className="content-panel mt-8">
        <h2 className="content-panel-title">Accès API</h2>
        <p className="content-panel-copy">
          Utilisez cet endpoint pour parcourir les expériences disponibles.
        </p>
        <div className="mt-4">
          <a href="/api/experiments" className="content-api-link">/api/experiments</a>
        </div>
      </article>
    </section>
  )
}
