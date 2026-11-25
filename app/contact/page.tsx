export const metadata = {
  title: "Contact — TLC",
  description: "Contactez l'équipe TLC pour des collaborations, contributions ou questions.",
};

const ContactPage = () => {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Restons en lien</span>
        <h1 className="content-title">Contact</h1>
        <p className="content-lead">
          Vous souhaitez découvrir TL, contribuer aux recherches, proposer une application,
          soutenir une initiative ou construire un partenariat avec TLC ?
          Présentez-nous votre projet ou votre question.
        </p>
      </header>

      <div className="mt-8 space-y-5">
        <article className="content-panel">
          <h2 className="content-panel-title">Email</h2>
          <p className="content-panel-copy">
            Écrivez-nous en précisant si votre message concerne la recherche,
            une contribution, un partenariat institutionnel, un financement
            ou une autre forme de soutien.
          </p>
          <p className="mt-4 text-lg font-semibold text-[#062147] dark:text-white">
            <a href="mailto:tlccommunitymanager2@gmail.com" className="text-primary">
              tlccommunitymanager2@gmail.com
            </a>
          </p>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Participer autrement</h2>
          <p className="content-panel-copy">
            Étudiants, développeurs, bénévoles et chercheurs peuvent découvrir
            les possibilités de contribution depuis l’espace Communauté.
            Les questions techniques peuvent ensuite être suivies dans les dépôts du projet.
          </p>
          <a href="/join" className="content-api-link mt-4">Devenir membre de TLC</a>
        </article>
      </div>
    </section>
  )
}

export default ContactPage
