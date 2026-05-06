export default function EventsPage(){
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Agenda TLC</span>
        <h1 className="content-title">Événements</h1>
        <p className="content-lead">
          Hackathons, webinaires et rencontres de la communauté pour faire
          avancer les travaux et diffuser les bonnes pratiques.
        </p>
      </header>

      <article className="content-panel mt-8">
        <h2 className="content-panel-title">Accès API</h2>
        <p className="content-panel-copy">Récupérez les événements programmés depuis l'endpoint.</p>
        <div className="mt-4">
          <a href="/api/events" className="content-api-link">/api/events</a>
        </div>
      </article>
    </section>
  )
}
