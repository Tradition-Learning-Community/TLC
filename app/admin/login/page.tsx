"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LockKeyhole, ArrowLeft, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/neon-auth-client";

type Mode = "principal" | "staff" | "legacy";
export default function LoginPage() {
  const [mode,setMode]=useState<Mode>("principal");
  const [username,setUsername]=useState("admin");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();setLoading(true);setError("");
    try {
      let mustChange=false;
      if(mode==="staff") {
        const result=await authClient.signIn.email({email:email.trim().toLowerCase(),password});
        if(result.error)throw new Error(result.error.message||"Compte non reconnu.");
      }else{
        const response=await fetch("/api/admin/login",{method:"POST",
          headers:{"Content-Type":"application/json"},body:JSON.stringify(mode==="principal"?{username,password}:{password})});
        const result=await response.json().catch(()=>null);
        if(!response.ok)throw new Error(result?.error||"Identifiant ou mot de passe incorrect.");
        mustChange=result?.mustChange===true;
      }
      const verify=await fetch("/api/admin/verify",{cache:"no-store"});
      if(!verify.ok) {
        if(mode==="staff")await authClient.signOut();
        throw new Error("Ce compte n'a pas d'autorisation administrative.");
      }
      setPassword("");
      window.location.replace(mustChange?"/admin/security":"/admin");
    }catch(caught){setError(caught instanceof Error?caught.message:"Connexion impossible.");}
    finally{setLoading(false);}
  }
  const field="mt-2 w-full rounded-xl border border-white/15 bg-[#07111f] px-4 py-3 text-base text-white outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/15";
  return <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 py-12">
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1827] px-6 py-8 text-white shadow-2xl sm:p-9">
      <header className="mb-7 flex items-center gap-4">
        <div className="rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-3"><LockKeyhole size={25} className="text-[#d4af37]"/></div>
        <div><h1 className="text-2xl font-semibold tracking-tight">Administration TLC</h1><p className="text-sm text-slate-400">Espace d'administration</p></div>
      </header>
      <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-[#07111f] p-1 text-sm">
        <button type="button" aria-pressed={mode==="principal"} onClick={()=>{setMode("principal");setError("");}}
          className={"rounded-lg px-3 py-3 font-medium "+(mode==="principal"?"bg-[#d4af37] text-[#07111f]":"text-slate-300")}>Administrateur</button>
        <button type="button" aria-pressed={mode==="staff"} onClick={()=>{setMode("staff");setError("");}}
          className={"rounded-lg px-3 py-3 font-medium "+(mode==="staff"?"bg-[#d4af37] text-[#07111f]":"text-slate-300")}>Équipe TLC</button>
      </div>
      {error&&<p role="alert" className="mb-5 rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}
      <form onSubmit={e=>void submit(e)} className="space-y-5">
        {mode==="principal"&&<label className="block text-sm text-slate-200">Identifiant<input required autoComplete="username" value={username}
          onChange={e=>setUsername(e.target.value)} className={field}/></label>}
        {mode==="staff"&&<label className="block text-sm text-slate-200">Adresse e-mail<input required type="email" autoComplete="username" value={email}
          onChange={e=>setEmail(e.target.value)} className={field}/></label>}
        <label className="block text-sm text-slate-200">Mot de passe<input required type="password"
          autoComplete={mode==="legacy"?"off":"current-password"} value={password}
          onChange={e=>setPassword(e.target.value)} className={field}/></label>
        <button disabled={loading} className="w-full rounded-xl bg-[#d4af37] px-4 py-3.5 text-base font-semibold text-[#07111f] transition hover:bg-[#efd779] disabled:opacity-60">
          {loading?"Connexion...":"Se connecter"}</button>
      </form>
      {mode==="principal"&&<p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-400">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#d4af37]"/>
        L'identifiant et le mot de passe peuvent être changés à tout moment depuis « Mon accès ».</p>}
      {mode==="staff"&&<p className="mt-5 text-xs text-slate-400">Pour les membres de l'équipe ayant reçu une invitation nominative.</p>}
      {mode==="legacy"&&<p className="mt-4 text-xs text-slate-400">Accès historique temporaire, réservé à la récupération.</p>}
      <details className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-500">
        <summary className="cursor-pointer select-none">Accès technique temporaire</summary>
        <button type="button" onClick={()=>{setMode(mode==="legacy"?"principal":"legacy");setError("");}}
          className="mt-3 text-sm text-[#d4af37]">{mode==="legacy"?"Retour au compte principal":"Ancien accès"}</button>
      </details>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-[#d4af37]">
        <ArrowLeft size={16}/> Retour au site</Link>
    </div>
  </div>;
}
