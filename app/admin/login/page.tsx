"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Users } from "lucide-react";
import { authClient } from "@/lib/neon-auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"staff" | "legacy">("staff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      if (mode === "legacy") {
        const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
        if (!response.ok) throw new Error(response.status === 410 ? "L'ancien accès a été désactivé." : "Mot de passe incorrect ou accès temporairement limité.");
      } else {
        const result = await authClient.signIn.email({ email: email.trim().toLowerCase(), password });
        if (result.error) throw new Error(result.error.message || "Identifiants incorrects.");
      }
      const verify = await fetch("/api/admin/verify", { cache: "no-store" });
      if (!verify.ok) {
        if (mode === "staff") await authClient.signOut();
        throw new Error("Ce compte n'est pas autorisé à administrer TLC. Utilisez votre invitation.");
      }
      setPassword(""); router.replace("/admin"); router.refresh();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Connexion impossible."); }
    finally { setLoading(false); }
  }
  return <div className="flex min-h-screen items-center justify-center bg-[#07111f] p-4">
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1827] p-7 text-white shadow-xl sm:p-9">
      <div className="mb-5 flex items-center gap-3"><Lock size={24} className="text-[#d4af37]"/><div><h1 className="text-2xl font-semibold">TLC Studio</h1><p className="text-sm text-slate-400">Administration sécurisée</p></div></div>
      <div className="mb-6 flex rounded-lg border border-white/10 p-1 text-sm">
        <button type="button" onClick={() => { setMode("staff"); setError(""); }} className={"flex-1 rounded-md px-3 py-2 " + (mode === "staff" ? "bg-[#d4af37] font-semibold text-[#07111f]" : "text-slate-300")}>Compte individuel</button>
        <button type="button" onClick={() => { setMode("legacy"); setError(""); }} className={"flex-1 rounded-md px-3 py-2 " + (mode === "legacy" ? "bg-[#d4af37] font-semibold text-[#07111f]" : "text-slate-300")}>Ancien accès</button>
      </div>
      {error && <p className="mb-4 rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-300" role="alert">{error}</p>}
      <form onSubmit={(e) => void submit(e)} className="space-y-4">
        {mode === "staff" && <label className="block text-sm">Adresse e-mail<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-[#07111f] p-3" /></label>}
        <label className="block text-sm">Mot de passe<input type="password" autoComplete={mode === "staff" ? "current-password" : "off"} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-[#07111f] p-3" /></label>
        <button disabled={loading} className="w-full rounded-lg bg-[#d4af37] p-3 font-semibold text-[#07111f] disabled:opacity-50">{loading ? "Connexion..." : "Se connecter"}</button>
      </form>
      <p className="mt-5 text-xs leading-5 text-slate-400">{mode === "staff" ? "Vous devez avoir reçu une invitation de l'équipe TLC. Aucun compte ne reçoit de droits administratifs automatiquement." : "Accès de transition réservé au responsable historique. Il pourra être désactivé après activation du premier compte nominatif."}</p>
      <Link className="mt-6 inline-flex items-center gap-2 text-sm text-[#d4af37]" href="/"><Users size={15}/> Retour au site</Link>
    </div>
  </div>;
}
