import Link from "next/link";

export const metadata = {
  title: "Ressources et documentation — TLC",
  description: "Consulter les sources scientifiques, les contrats de tllib et la documentation du projet Tradition Learning.",
};

const references = [
  {
    title: "tllib-specs",
    description: "Spécifications mathématiques, algorithmiques et techniques de la bibliothèque, avec contrats, traçabilité et tests d’acceptation.",
    href: "https://github.com/Tradition-Learning-Community/tllib-specs",
    action: "Consulter les spécifications",
  },
  {
    title: "tllib",
    description: "Bibliothèque en développement : moteur C++20, runtime, interfaces C++ et Python, documentation et état de la V1.",
    href: "https://github.com/Tradition-Learning-Community/tllib",
    action: "Consulter la bibliothèque",
  },
  {
    title: "TLC",
    description: "Code et documentation du site de la communauté scientifique Tradition Learning.",
    href: "https://github.com/Tradition-Learning-Community/TLC",
    action: "Consulter le dépôt du site",
  },
];

export default function ResourcesPage() {
  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Sources de référence</span>
        <h1 className="content-title">Ressources</h1>
        <p className="content-lead">
          Accédez aux documents et dépôts actuellement disponibles. Les sources
          scientifiques, les contrats de la bibliothèque et le produit logiciel
          sont distincts et ne remplissent pas les mêmes fonctions.
        </p>
      </header>
      <div className="content-grid">
        {references.map((resource) => (
          <article className="content-panel" key={resource.title}>
            <h2 className="content-panel-title">{resource.title}</h2>
            <p className="content-panel-copy">{resource.description}</p>
            <Link className="content-api-link mt-4" href={resource.href} target="_blank" rel="noopener noreferrer">
              {resource.action}
            </Link>
          </article>
        ))}
        <article className="content-panel">
          <h2 className="content-panel-title">Le manuscrit Tradition Learning</h2>
          <p className="content-panel-copy">
            Le manuscrit constitue la source scientifique de la théorie.
            Son édition publique de référence et son mode de diffusion doivent être
            confirmés avant d’ajouter un document téléchargeable sur ce site.
          </p>
          <Link className="content-api-link mt-4" href="/contact">Contacter TLC</Link>
        </article>
      </div>

      <article className="content-panel mt-5" id="securite">
        <h2 className="content-panel-title">Traçabilité et publication</h2>
        <p className="content-panel-copy">
          Les spécifications ne prouvent pas à elles seules l’exécution scientifique :
          les implémentations, les tests et les résultats expérimentaux possèdent
          leurs propres critères de validation.
        </p>
      </article>
      <article className="content-panel mt-5" id="statuts-asbl">
        <h2 className="content-panel-title">Documents institutionnels</h2>
        <p className="content-panel-copy">
          Les statuts, règles de confidentialité, charte et autres documents
          institutionnels ne sont pas publiés ici tant que leurs versions
          officielles ne sont pas disponibles.
        </p>
        <div id="charte-communautaire" /><div id="politique-confidentialite" /><div id="cookies" /><div id="licence-open-source" />
        <Link className="content-api-link mt-4" href="/contact">Demander une information</Link>
      </article>
    </section>
  );
}
