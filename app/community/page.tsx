export const metadata = {
  title: "Communauté — TLC",
  description:
    "Rejoignez la communauté TLC : contribuer, collaborer et partager des ressources en IA.",
};

const CommunityPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Communauté</h1>

      <p className="mt-6 text-zinc-700">
        La communauté TLC regroupe des chercheurs, ingénieurs et passionnés qui
        contribuent à des projets open-source, organisent des événements et
        partagent des ressources pédagogiques.
      </p>

      <h2 className="mt-8 text-xl font-medium">Comment contribuer</h2>
      <ol className="mt-2 list-decimal pl-6 text-zinc-700">
        <li>Consultez le guide de contribution (`CONTRIBUTING.md`).</li>
        <li>Ouvrez une issue pour proposer une idée ou signaler un bug.</li>
        <li>Soumettez une Pull Request avec une description claire.</li>
      </ol>

      <h2 className="mt-8 text-xl font-medium">Canaux</h2>
      <p className="mt-2 text-zinc-700">Nous recommandons : Discord / Slack / GitHub.</p>
    </section>
  );
};

export default CommunityPage;
