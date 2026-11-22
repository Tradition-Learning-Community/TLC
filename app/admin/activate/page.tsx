"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/neon-auth-client";
export default function ActivateStaff() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [existing, setExisting] = useState(false);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    setToken(fragment.get("token") || "");
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      if (token.length < 40) throw new Error("Lien d'invitation absent ou invalide.");
      const credentials = { email: email.trim().toLowerCase(), password };
      const response = existing ? await authClient.signIn.email(credentials) :
        await authClient.signUp.email({ ...credentials, name: name.trim() });
      if (response.error) throw new Error(response.error.message || "Identification impossible.");
      const result = await fetch("/api/admin/staff/activate", { method: "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
      const data = await result.json().catch(() => null);
      if (!result.ok) throw new Error(data?.error || "Invitation non activée.");
      window.history.replaceState(null, "", "/admin/activate");
      router.replace("/admin"); router.refresh();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Activation impossible."); }
    finally { setLoading(false); }
  }
  return <div className="flex min-h-screen items-center justify-center bg-[#07111f] p-4">
    <div className="w-full max-w-lg space-y-5 rounded-3xl border border-white/10 bg-[#0b1827] p-7 text-white">
      <h1 className="text-2xl font-semibold">Activer mon accès TLC</h1>
      <p className="text-sm text-slate-300">Votre invitation nominative est nécessaire pour obtenir un rôle administratif.</p>
      {error && <p role="alert" className="rounded-lg bg-red-950/30 p-3 text-sm text-red-300">{error}</p>}
      <form onSubmit={(e) => void submit(e)} className="space-y-4">
        {!existing && <label className="block text-sm">Nom complet<input value={name} required minLength={2} maxLength={140} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-[#07111f] p-3"/></label>}
        <label className="block text-sm">Adresse e-mail invitée<input value={email} required type="email" autoComplete="username" onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-[#07111f] p-3"/></label>
        <label className="block text-sm">Mot de passe<input value={password} required type="password" minLength={8} autoComplete={existing ? "current-password" : "new-password"} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-[#07111f] p-3"/></label>
        <button type="submit" disabled={loading || !token} className="w-full rounded-lg bg-[#d4af37] p-3 font-semibold text-[#07111f] disabled:opacity-50">{loading ? "Activation..." : existing ? "Me connecter et activer" : "Créer mon compte et activer"}</button>
      </form>
      <button onClick={() => { setExisting(!existing); setError(""); }} className="text-sm text-[#d4af37]">{existing ? "Je n'ai pas encore de compte" : "J'ai déjà un compte Neon Auth"}</button>
      <p className="text-xs text-slate-400">L'invitation est personnelle et utilisable une seule fois. Ne la partagez pas.</p>
      <Link href="/admin/login" className="block text-sm text-slate-400">Retour à la connexion</Link>
    </div>
  </div>;
}
