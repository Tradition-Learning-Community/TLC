"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import ImageField from "@/components/admin/ImageField";
type Contributor = { id: string; name: string; github: string; avatar?: string; roles?: string[]; published?: boolean };
const base = {name:"", github:"", avatar:"", roles:"Contributeur", published:true};
const input = "mt-1 w-full rounded-lg border border-white/15 bg-[#07111f] px-3 py-2.5 text-sm text-white";
export default function ContributorsAdmin() {
  const [items, setItems] = useState<Contributor[]>([]);
  const [form, setForm] = useState({...base});
  const [editing, setEditing] = useState<Contributor | null>(null);
  const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const response = await fetch("/api/data/contributors",{cache:"no-store"});
    if (!response.ok) throw new Error("Accès non autorisé aux données des contributeurs.");
    setItems(await response.json());
  }, []);
  useEffect(() => {void load().catch(e=>setError(String(e)));},[load]);
  function start(item: Contributor | null) {
    setEditing(item);
    setForm(item ? { name:item.name, github:item.github, avatar:item.avatar||"",
      roles:(item.roles||["Contributeur"]).join(", "), published:item.published!==false } : {...base});
    setError(""); setSuccess("");
  }
  async function save(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError(""); setSuccess("");
    const data={...form, roles:form.roles.split(",").map(s=>s.trim()).filter(Boolean), ...(editing ? {id:editing.id} : {})};
    try {
      const response = await fetch("/api/contributors",{method:editing?"PUT":"POST",
        headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const result = await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.error||"Enregistrement impossible.");
      await load(); start(null); setSuccess("Contributeur enregistré.");
    } catch (e){setError(e instanceof Error?e.message:"Erreur d'enregistrement.");}
    finally{setBusy(false);}
  }
  async function remove(id:string) {
    if(!confirm("Retirer définitivement ce profil ?"))return;
    const response=await fetch("/api/contributors?id="+encodeURIComponent(id),{method:"DELETE"});
    if(!response.ok){setError("Suppression impossible.");return;}
    await load(); setSuccess("Profil supprimé.");
  }
  return <div className="space-y-7 text-white">
    <header><p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">TLC · Communauté</p>
      <h1 className="mt-2 text-3xl">Contributeurs</h1><p className="mt-2 text-sm text-slate-400">Gérez les profils affichés sur le site.</p></header>
    {error && <p role="alert" className="rounded-lg bg-red-950/30 p-3 text-red-200">{error}</p>}
    {success && <p role="status" className="rounded-lg bg-emerald-950/30 p-3 text-emerald-200">{success}</p>}
    <form onSubmit={(e)=>void save(e)} className="grid gap-4 rounded-xl border border-white/10 bg-[#0b1827] p-5 sm:grid-cols-2">
      <h2 className="text-lg font-semibold sm:col-span-2">{editing?"Modifier le profil":"Ajouter un contributeur"}</h2>
      <label className="text-sm">Nom<input required maxLength={140} className={input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
      <label className="text-sm">Profil GitHub<input required className={input} value={form.github} onChange={e=>setForm({...form,github:e.target.value})}/></label>
      <div className="sm:col-span-2"><ImageField label="Photo du contributeur" value={form.avatar} title={form.name} onChange={avatar=>setForm({...form,avatar})} disabled={busy}/></div>
      <label className="text-sm">Participations / rôles (séparés par des virgules)<input className={input} value={form.roles} onChange={e=>setForm({...form,roles:e.target.value})}/></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})}/> Visible publiquement</label>
      <div className="flex gap-2"><button disabled={busy} className="rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#07111f]">{busy?"Enregistrement...":"Enregistrer"}</button>
        {editing && <button type="button" onClick={()=>start(null)} className="rounded-lg border border-white/20 px-4 py-2 text-sm">Annuler</button>}</div>
    </form>
    <section><h2 className="mb-4 text-lg font-semibold">Profils enregistrés ({items.length})</h2>
      <div className="grid gap-3 md:grid-cols-2">{items.map(item=><article key={item.id} className="rounded-xl border border-white/10 bg-[#0b1827] p-4">
        <h3 className="font-medium">{item.name}</h3><p className="mt-1 break-all text-xs text-slate-400">{item.github}</p>
        <p className="mt-2 text-xs text-slate-400">{(item.roles||[]).join(", ")} · {item.published===false?"Masqué":"Visible"}</p>
        <div className="mt-3 flex gap-3"><button onClick={()=>start(item)} className="text-sm text-[#d4af37]">Modifier</button>
          <button onClick={()=>void remove(item.id)} className="text-sm text-red-300">Supprimer</button></div>
      </article>)}</div></section>
  </div>;
}
