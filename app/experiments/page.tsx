import Link from "next/link";

export const metadata = {
  title: "Expérimentations | TLC",
  description: "Travaux expérimentaux et ressources de recherche de Tradition Learning Community.",
};

export default function ExperimentsPage() {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">RECHERCHE TLC</span>
        <h1 className="content-title">Expérimentations</h1>
        <p className="content-lead">
          Les expériences relient la théorie aux systèmes et aux observations.
          Protocoles, implémentations et résultats sont partagés à travers les ressources
          et les projets publiés par la communauté.
        </p>
      </header>
      <article className="content-panel mt-8">
        <h2 className="content-panel-title">Suivre les travaux</h2>
        <p className="content-panel-copy">
          Retrouvez les publications disponibles et les dépôts logiciels de TLC.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/resources" className="content-api-link">Consulter les ressources</Link>
          <Link href="/projects" className="content-api-link">Voir les projets</Link>
        </div>
        <details className="mt-6">
          <summary>Accès technique aux expériences</summary>
          <p className="content-panel-copy">
            Les données publiques de l’API restent accessibles aux développeurs.
          </p>
          <a href="/api/experiments" className="content-api-link">/api/experiments</a>
        </details>
      </article>
    </section>
  );
}
