export const metadata = {
  title: "Contact — TLC",
  description: "Contactez l'équipe TLC pour des collaborations, contributions ou questions.",
};

const ContactPage = () => {
  return (
    <section className="content-shell">
      <header className="content-header">
        <span className="content-kicker">Restons en lien</span>
        <h1 className="content-title">Contact</h1>
        <p className="content-lead">
          Pour toute question, collaboration ou contribution, contactez l'équipe
          TLC via email ou via le dépôt GitHub.
        </p>
      </header>

      <div className="mt-8 space-y-5">
        <article className="content-panel">
          <h2 className="content-panel-title">Email</h2>
          <p className="content-panel-copy">
            Réponse rapide pour les partenariats, questions techniques et
            demandes de collaboration.
          </p>
          <p className="mt-4 text-lg font-semibold text-[#062147] dark:text-white">
            <a href="mailto:contact@tlc.example" className="text-primary">
              contact@tlc.example
            </a>
          </p>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">GitHub</h2>
          <p className="content-panel-copy">
            Ouvrez une issue sur le dépôt pour discuter d'un sujet précis,
            proposer une amélioration ou signaler un bug.
          </p>
        </article>
      </div>
    </section>
  )
}

export default ContactPage