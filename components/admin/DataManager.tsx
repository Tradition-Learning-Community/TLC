"use client"
import { useEffect, useState } from 'react'

type Item = any

const TYPE_HELP: Record<string, { title: string; expected: string; tips: string[]; template: any }> = {
  contributors: {
    title: 'Contributeurs',
    expected: 'Champs recommandes: name, github, avatar (optionnel).',
    tips: [
      'Utiliser une URL GitHub valide (https://github.com/username).',
      'L avatar peut etre derive automatiquement depuis github + .png.',
    ],
    template: { name: '', github: 'https://github.com/', avatar: '' },
  },
  profiles: {
    title: 'Profils communaute',
    expected: 'Champs recommandes: name, role, skills[], points, projects.',
    tips: [
      'skills doit etre un tableau de competences.',
      'points et projects doivent etre des nombres.',
    ],
    template: { name: '', role: '', skills: [], points: 0, projects: 0 },
  },
  projects: {
    title: 'Projets',
    expected: 'Champs recommandes: title, description, members[], tasks[].',
    tips: [
      'Chaque tache peut contenir: id, title, done.',
      'members doit etre une liste d identifiants ou noms courts.',
    ],
    template: { title: '', description: '', members: [], tasks: [{ id: 't1', title: '', done: false }] },
  },
  events: {
    title: 'Evenements',
    expected: 'Champs recommandes: title, date, type, description.',
    tips: [
      'Format date recommande: YYYY-MM-DD.',
      'type ex: Workshop, Webinaire, Hackathon.',
    ],
    template: { title: '', date: '2026-01-01', type: 'Workshop', description: '' },
  },
  resources: {
    title: 'Ressources',
    expected: 'Champs recommandes: title, category, url.',
    tips: [
      'Eviter url="#" sur la plateforme en production.',
      'category ex: Documentation, Code, Donnees, Recherche.',
    ],
    template: { title: '', category: 'Documentation', url: 'https://example.com' },
  },
  experiments: {
    title: 'Experiences',
    expected: 'Champs recommandes: title, notes.',
    tips: [
      'Ajouter des notes claires pour expliquer le contexte test.',
      'Inclure une conclusion ou etat si possible.',
    ],
    template: { title: '', notes: '' },
  },
  'open-calls': {
    title: 'Appels ouverts',
    expected: 'Champs recommandes: title, description, urgency.',
    tips: [
      'urgency ex: low, medium, high.',
      'Decrire precisement le besoin et les competences.',
    ],
    template: { title: '', description: '', urgency: 'medium' },
  },
  discussions: {
    title: 'Discussions',
    expected: 'Champs recommandes: title, messages[].',
    tips: [
      'messages est un tableau: { id, author, text }.',
      'Garder les titres de discussion courts et explicites.',
    ],
    template: { title: '', messages: [{ id: 'm1', author: 'admin', text: '' }] },
  },
}

export default function DataManager({ type }: { type: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<Item | null>(null)
  const [editorValue, setEditorValue] = useState('')
  const help = TYPE_HELP[type] ?? {
    title: type,
    expected: 'Aucun schema predefini pour ce type.',
    tips: ['Respecter la structure attendue par la page qui lit ce fichier.'],
    template: { title: '' },
  }

  async function fetchItems() {
    try {
      const res = await fetch(`/api/data/${type}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setItems([])
    }
  }

  useEffect(() => {
    fetchItems()
  }, [type])

  function startNew() {
    setEditing(null)
    setEditorValue(JSON.stringify(help.template, null, 2))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function startEdit(item: Item) {
    setEditing(item)
    setEditorValue(JSON.stringify(item, null, 2))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function save() {
    try {
      const parsed = JSON.parse(editorValue)
      setLoading(true)
      let res
      if (editing && editing.id) {
        parsed.id = editing.id
        res = await fetch(`/api/data/${type}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
      } else {
        res = await fetch(`/api/data/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
      }
      if (res.ok) {
        await fetchItems()
        setEditing(null)
        setEditorValue('')
      } else {
        alert('Erreur serveur')
      }
    } catch (e) {
      alert('JSON invalide')
    }
    setLoading(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cet élément ?')) return
    setLoading(true)
    await fetch(`/api/data/${type}?id=${id}`, { method: 'DELETE' })
    await fetchItems()
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestion — {help.title}</h2>
        <div className="flex gap-2">
          <button onClick={startNew} className="rounded-md bg-[#d4af37] px-3 py-2 text-black">Nouvel élément</button>
          <button onClick={fetchItems} className="rounded-md bg-white/5 px-3 py-2 text-white">Rafraîchir</button>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold text-white">Structure attendue</div>
        <div className="mt-1 text-sm text-slate-300">{help.expected}</div>
        <ul className="mt-2 list-disc pl-5 text-xs text-slate-400 space-y-1">
          {help.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="rounded-lg bg-white/3 p-4">
            <div className="mb-2 text-sm text-slate-300">Éditeur JSON</div>
            <textarea className="w-full h-40 rounded bg-black/10 p-3 text-sm" value={editorValue} onChange={(e) => setEditorValue(e.target.value)} />
            <div className="mt-2 flex gap-2">
              <button onClick={save} disabled={loading} className="rounded-md bg-[#d4af37] px-3 py-2 text-black">{loading ? 'Enregistrement...' : 'Enregistrer'}</button>
              <button onClick={() => setEditorValue(JSON.stringify(help.template, null, 2))} className="rounded-md bg-white/5 px-3 py-2 text-white">Modele</button>
              <button onClick={() => { setEditing(null); setEditorValue('') }} className="rounded-md bg-white/5 px-3 py-2 text-white">Annuler</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="rounded-lg bg-white/3 p-4 max-h-[60vh] overflow-auto">
            <div className="text-sm text-slate-300 mb-2">Éléments ({items.length})</div>
            <ul className="space-y-2">
              {items.map((it: any) => (
                <li key={it.id} className="flex items-center justify-between gap-2">
                  <div className="truncate">{it.title || it.name || it.id}</div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(it)} className="rounded-md bg-white/5 px-2 py-1 text-sm text-white">Éditer</button>
                    <button onClick={() => remove(it.id)} className="rounded-md bg-red-600 px-2 py-1 text-sm text-white">Suppr</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
