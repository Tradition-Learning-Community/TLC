import Link from 'next/link'

export default function ProfilesPage(){
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Annuaire</span>
        <h1 className="content-title">Profils Membres</h1>
        <p className="content-lead">
          Liste publique des membres, avec les domaines d'expertise et les
          contributions en cours au sein de TLC.
        </p>
      </header>

      <article className="content-panel mt-8">
        <h2 className="content-panel-title">Accès API</h2>
        <p className="content-panel-copy">
          Explorez les profils exposés par l'API pour alimenter l'annuaire ou
          intégrer des cartes membres.
        </p>
        <div className="mt-4">
          <Link href="/api/profiles" className="content-api-link">Voir l'API des profils</Link>
        </div>
      </article>
    </section>
  )
}
