import Link from "next/link";

export const metadata = {
  title: "Communauté & contribution — TLC",
  description: "Participer à la recherche, aux spécifications, à la bibliothèque tllib et à la communauté Tradition Learning.",
};

const paths = [
  {
    title: "Recherche et spécifications",
    description: "Participer à la formalisation, à la revue et à la traçabilité des contrats scientifiques et techniques.",
    href: "https://github.com/Tradition-Learning-Community/tllib-specs",
    label: "Voir tllib-specs",
  },
  {
    title: "Développement de tllib",
    description: "Contribuer au moteur C++20, aux interfaces C++ et Python, aux tests et à la documentation du produit.",
    href: "https://github.com/Tradition-Learning-Community/tllib",
    label: "Voir tllib",
  },
  {
    title: "Plateforme TLC",
    description: "Améliorer le site officiel, sa documentation et ses parcours de contribution.",
    href: "https://github.com/Tradition-Learning-Community/TLC",
    label: "Voir le dépôt du site",
  },
];

export default function CommunityPage() {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Communauté scientifique ouverte</span>
        <h1 className="content-title">Contribuer à Tradition Learning</h1>
        <p className="content-lead">
          TLC réunit les personnes qui étudient Tradition Learning, produisent
          ses spécifications, développent tllib et organisent sa validation.
          La Communauté de la théorie TL est une entité scientifique différente
          de la communauté humaine Tradition Learning Community.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold text-[#062147] dark:text-white">Trois portes d’entrée</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {paths.map((path) => (
            <article key={path.title} className="content-panel">
              <h3 className="content-panel-title">{path.title}</h3>
              <p className="content-panel-copy">{path.description}</p>
              <Link className="content-api-link mt-5" href={path.href} target="_blank" rel="noopener noreferrer">{path.label}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article className="content-panel">
          <h2 className="content-panel-title">Comment participer ?</h2>
          <p className="content-panel-copy">
            Parcourez les travaux ouverts, consultez les guides de contribution
            du dépôt concerné, puis choisissez une tâche adaptée à votre spécialité.
            Les contributions scientifiques et logicielles suivent des procédures distinctes.
          </p>
          <Link className="content-api-link mt-4" href="https://github.com/Tradition-Learning-Community/tllib/blob/main/CONTRIBUTING.md">Guide tllib</Link>
        </article>
        <article className="content-panel">
          <h2 className="content-panel-title">Travaux et résultats</h2>
          <p className="content-panel-copy">
            La bibliothèque tllib est en développement. Les interfaces natives,
            le runtime et les outils de conformité disposent de fondations techniques ;
            la couverture complète des fonctionnalités scientifiques n’est pas encore annoncée.
          </p>
          <Link className="content-api-link mt-4" href="https://github.com/Tradition-Learning-Community/tllib/blob/main/README.md">État officiel du produit</Link>
        </article>
      </section>

      <article className="content-panel mt-5">
        <h2 className="content-panel-title">Activité communautaire</h2>
        <p className="content-panel-copy">
          Les statistiques, témoignages, événements et profils historiques d’exemple
          ne sont pas présentés ici comme des faits. Les prochaines publications
          communautaires seront reliées à des sources ou à des contributions vérifiées.
        </p>
        <Link className="content-api-link mt-4" href="https://github.com/Tradition-Learning-Community">Voir les projets et contributions GitHub</Link>
      </article>
    </section>
  );
}
