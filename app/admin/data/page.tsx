import Link from 'next/link'

const TYPES = [
  { key: 'contributors', title: 'Contributeurs', description: 'Profils affiches sur la page d accueil (nom, github, avatar).' },
  { key: 'profiles', title: 'Profils communaute', description: 'Fiches membres: role, competences, points et participation projets.' },
  { key: 'projects', title: 'Projets', description: 'Projets en cours et taches associees pour le suivi de la communaute.' },
  { key: 'events', title: 'Evenements', description: 'Ateliers, webinaires, hackathons et dates importantes de la plateforme.' },
  { key: 'resources', title: 'Ressources', description: 'Guides, liens, jeux de donnees, tutoriels et references utiles.' },
  { key: 'experiments', title: 'Experiences', description: 'Experiences techniques, notes et resultats de tests ou prototypes.' },
  { key: 'open-calls', title: 'Appels ouverts', description: 'Besoins de contribution, sujets de recherche et missions urgentes.' },
  { key: 'discussions', title: 'Discussions', description: 'Canaux de discussion et historique de messages de la communaute.' },
]

export default function AdminDataIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des données</h1>
      <p className="text-slate-300 mb-4">Choisis une collection a gerer pour ajouter, modifier ou supprimer des elements.</p>

      <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-lg font-semibold">Comment gerer les donnees</h2>
        <ol className="mt-2 list-decimal pl-5 text-sm text-slate-300 space-y-1">
          <li>Choisis une collection ci-dessous.</li>
          <li>Clique sur "Nouvel element" pour creer une entree.</li>
          <li>Utilise le JSON modele propose pour eviter les erreurs de structure.</li>
          <li>Enregistre puis verifie le rendu sur la page publique correspondante.</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TYPES.map((item) => (
          <Link key={item.key} href={`/admin/data/${item.key}`} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/8">
            <div className="font-semibold">{item.title}</div>
            <div className="mt-1 text-xs text-slate-400">`{item.key}.json`</div>
            <div className="mt-2 text-sm text-slate-300">{item.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
