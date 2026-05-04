export const metadata = {
  title: "À propos — TLC",
  description:
    "En savoir plus sur la mission, l'équipe et la vision de TLC — Tradition Learning.",
};

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">À propos de TLC</h1>

      <p className="mt-6 text-lg text-zinc-700">
        TLC (Tradition Learning Community) est une plateforme collaborative dédiée
        à la recherche et au développement d'approches d'intelligence
        artificielle axées sur l'efficacité des données, l'interprétabilité et
        l'accessibilité. Nous rassemblons chercheurs, développeurs et
        contributeurs pour construire des modèles et des outils open-source.
      </p>

      <h2 className="mt-8 text-xl font-medium">Mission</h2>
      <p className="mt-2 text-zinc-700">
        Favoriser l'innovation responsable en IA en donnant accès à des
        ressources, outils et modèles reproductibles, et en soutenant la
        collaboration entre acteurs académiques et industriels.
      </p>

      <h2 className="mt-8 text-xl font-medium">Équipe & Contribution</h2>
      <p className="mt-2 text-zinc-700">
        Le projet est ouvert à toute contribution. Consultez la page
        Contributions pour apprendre comment participer, proposer des idées ou
        rejoindre une équipe.
      </p>
    </section>
  );
};

export default AboutPage;