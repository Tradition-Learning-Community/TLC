"use client";
import { useEffect, useState, type FormEvent } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
export default function SecurityPage() {
  const [username,setUsername]=useState("admin");
  const [currentPassword,setCurrentPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [mustChange,setMustChange]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(false);
  const [local,setLocal]=useState<boolean|null>(null);
  useEffect(()=>{
    fetch("/api/admin/security",{cache:"no-store"}).then(async r=>{
      if(!r.ok){setLocal(false);return;}
      const data=await r.json();setUsername(data.username);setMustChange(data.mustChange);setLocal(true);
    }).catch(()=>setLocal(false));
  },[]);
  async function submit(event:FormEvent) {
    event.preventDefault(); setError("");setSaved(false);
    if(newPassword!==confirm){setError("Les mots de passe ne correspondent pas.");return;}
    setBusy(true);
    try {
      const r=await fetch("/api/admin/security",{method:"PATCH",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,currentPassword,newPassword})});
      const data=await r.json().catch(()=>null);
      if(!r.ok)throw new Error(data?.error||"Modification impossible.");
      setCurrentPassword("");setNewPassword("");setConfirm("");setMustChange(false);setSaved(true);
      window.location.replace("/admin");
    } catch(e){setError(e instanceof Error?e.message:"Échec de mise à jour.");}
    finally{setBusy(false);}
  }
  return <div className="mx-auto max-w-2xl space-y-6 text-white">
    <header><p className="text-xs uppercase tracking-widest text-[#d4af37]">Administration TLC</p>
      <h1 className="mt-2 flex items-center gap-3 text-3xl"><ShieldCheck className="text-[#d4af37]"/> Sécurité du compte</h1>
      <p className="mt-2 text-sm text-slate-400">Modifiez votre identifiant et votre mot de passe à tout moment.</p></header>
    {mustChange&&<div role="alert" className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
      Première connexion : définissez votre propre mot de passe pour accéder aux autres fonctions.</div>}
    {local===false?<div className="rounded-xl border border-white/10 p-5 text-slate-300">Cette page concerne le compte administrateur principal. Pour modifier le mot de passe d'un compte invité, utilisez la récupération de mot de passe Neon Auth.</div>:
      <form onSubmit={(e)=>void submit(e)} className="space-y-5 rounded-2xl border border-white/10 bg-[#0b1827] p-6">
        {error&&<p role="alert" className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-red-300">{error}</p>}
        {saved&&<p role="status" className="rounded-lg bg-green-900/30 p-3 text-green-200">Accès mis à jour.</p>}
        <label className="block text-sm">Identifiant<input required autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)}
          minLength={3} maxLength={40} className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111f] p-3 text-white"/></label>
        <label className="block text-sm">Mot de passe actuel<input type="password" required autoComplete="current-password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111f] p-3 text-white"/></label>
        <label className="block text-sm">Nouveau mot de passe<input type="password" required autoComplete="new-password" minLength={12} maxLength={128} value={newPassword} onChange={e=>setNewPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111f] p-3 text-white"/>
          <span className="mt-1 block text-xs text-slate-400">12 caractères minimum, avec majuscule, minuscule et chiffre.</span></label>
        <label className="block text-sm">Confirmer le nouveau mot de passe<input type="password" required autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#07111f] p-3 text-white"/></label>
        <button disabled={busy} className="flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 font-semibold text-[#07111f] disabled:opacity-50">
          <KeyRound size={17}/>{busy?"Enregistrement...":"Enregistrer mes nouveaux accès"}</button>
      </form>}
  </div>;
}
