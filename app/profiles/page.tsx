import Link from 'next/link'

export default function ProfilesPage(){
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Profils Membres</h1>
      <p className="mt-4 text-zinc-700">Liste publique des membres (seed).</p>
      <div className="mt-6">
        <Link href="/api/profiles" className="text-primary">Voir l'API des profils</Link>
      </div>
    </section>
  )
}
