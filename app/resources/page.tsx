export const metadata = {
  title: "Ressources — TLC",
  description:
    "Ressources pédagogiques, articles et datasets recommandés par la communauté TLC.",
};

const RessourcesPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Ressources</h1>

      <p className="mt-6 text-zinc-700">
        Cette page centralise des cours, articles, jeux de données et outils
        utiles pour travailler avec les approches Tradition Learning.
      </p>

      <h2 className="mt-8 text-xl font-medium">Guides</h2>
      <ul className="mt-2 list-disc pl-6 text-zinc-700">
        <li>Introduction à Tradition Learning — Guide rapide</li>
        <li>Pratiques recommandées pour l'évaluation des modèles</li>
        <li>Outils et bibliothèques utiles</li>
      </ul>

      <h2 className="mt-8 text-xl font-medium">Datasets</h2>
      <ul className="mt-2 list-disc pl-6 text-zinc-700">
        <li>Dataset public A — description courte</li>
        <li>Dataset public B — description courte</li>
      </ul>

      <h2 className="mt-8 text-xl font-medium">Liens utiles</h2>
      <ul className="mt-2 list-disc pl-6 text-zinc-700">
        <li><a href="#" className="text-primary">Tutoriels</a></li>
        <li><a href="#" className="text-primary">Articles scientifiques</a></li>
      </ul>
    </section>
  )
}

export default RessourcesPage