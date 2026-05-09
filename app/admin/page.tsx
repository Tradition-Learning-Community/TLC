"use client"
import { useEffect, useState } from 'react'

type Contributor = { id: string; name: string; github: string; avatar?: string }

export default function AdminHome() {
  const [items, setItems] = useState<Contributor[]>([])

  useEffect(() => {
    fetch('/api/contributors').then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg bg-white/3 p-4">
          <div className="text-sm text-slate-300">Contributeurs</div>
          <div className="text-2xl font-bold">{items.length}</div>
        </div>

        <div className="rounded-lg bg-white/3 p-4">
          <div className="text-sm text-slate-300">Derniers ajoutés</div>
          <div className="mt-2 flex flex-col gap-2 max-h-32 overflow-auto">
            {items.slice().reverse().slice(0, 6).map(it => (
              <div key={it.id} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.avatar || `${it.github.replace(/\/$/, '')}.png`} alt={it.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="truncate">{it.name}</div>
              </div>
            ))}
            {items.length === 0 && <div className="text-slate-400">Aucun</div>}
          </div>
        </div>

        <div className="rounded-lg bg-white/3 p-4">
          <div className="text-sm text-slate-300">Actions rapides</div>
          <div className="mt-3 flex gap-2">
            <a href="/admin/contributors" className="rounded-md bg-[#d4af37] px-3 py-2 text-black">Gérer contributeurs</a>
            <a href="/admin/data" className="rounded-md bg-white/8 px-3 py-2 text-white">Gérer toutes les données</a>
          </div>
        </div>
      </div>
    </div>
  )
}
