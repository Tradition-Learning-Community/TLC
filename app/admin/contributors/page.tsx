"use client"
import { useEffect, useState } from "react"

type Contributor = {
  id: string
  name: string
  github: string
  avatar?: string
}

export default function AdminContributorsPage() {
  const [items, setItems] = useState<Contributor[]>([])
  const [name, setName] = useState("")
  const [github, setGithub] = useState("")
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState<null | boolean>(null)
  const [password, setPassword] = useState("")

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/verify')
      setAuth(res.ok)
      if (res.ok) fetchItems()
    } catch (e) {
      setAuth(false)
    }
  }

  async function fetchItems() {
    const res = await fetch('/api/contributors')
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { checkAuth() }, [])

  async function login(e: any) {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    const res = await fetch('/api/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ password }) })
    if (res.ok) {
      setAuth(true)
      await fetchItems()
    } else {
      alert('Mot de passe incorrect')
      setAuth(false)
    }
    setLoading(false)
  }

  async function addContributor(e: any) {
    e.preventDefault()
    if (!name || !github) return
    setLoading(true)
    const res = await fetch('/api/contributors', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, github }) })
    if (res.ok) {
      setName('')
      setGithub('')
      await fetchItems()
    }
    setLoading(false)
  }

  async function removeContributor(id: string) {
    if (!confirm('Supprimer ce contributeur ?')) return
    setLoading(true)
    await fetch(`/api/contributors?id=${id}`, { method: 'DELETE' })
    await fetchItems()
    setLoading(false)
  }

  if (auth === null) return <main className="content-shell py-10"><div className="max-w-4xl mx-auto">Chargement…</div></main>

  if (!auth) {
    return (
      <main className="content-shell py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="content-title">Connexion administrateur</h1>
          <p className="content-lead">Entrez le mot de passe administrateur pour accéder au tableau de bord.</p>
          <form onSubmit={login} className="mt-6 flex gap-3">
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Mot de passe admin" className="flex-1 rounded-md border px-3 py-2" />
            <button disabled={loading} className="rounded-md bg-[#d4af37] px-4 py-2 font-semibold">{loading ? 'Connexion...' : 'Se connecter'}</button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="content-shell py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="content-title">Gestion des contributeurs</h1>
        <p className="content-lead">Ajouter, modifier ou supprimer les profils qui apparaissent sur la page d'accueil.</p>
        <p className="text-sm text-slate-500 mt-2">
          Astuce : pour ajouter automatiquement l'avatar, entrez l'URL GitHub (ex. https://github.com/username). L'API utilisera <em>https://github.com/username.png</em> si aucun avatar n'est fourni.
        </p>

        <form onSubmit={addContributor} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nom" className="flex-1 rounded-md border px-3 py-2" />
          <input value={github} onChange={e=>setGithub(e.target.value)} placeholder="https://github.com/username" className="flex-1 rounded-md border px-3 py-2" />
          <button disabled={loading} className="rounded-md bg-[#d4af37] px-4 py-2 font-semibold">{loading ? 'Enregistrement...' : 'Ajouter'}</button>
        </form>

        <div className="mt-8 grid gap-3">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <img src={it.avatar || `${it.github.replace(/\/$/, '')}.png`} alt={it.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <a className="text-sm text-slate-500" href={it.github} target="_blank" rel="noreferrer">{it.github}</a>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => removeContributor(it.id)} className="rounded-md bg-red-500 px-3 py-1 text-white text-sm">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
