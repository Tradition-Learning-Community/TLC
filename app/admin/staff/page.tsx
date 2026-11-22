"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { roles, roleLabels, type StaffRole } from "@/lib/staff-permissions";
type Account = { id: string; name: string; email: string; role: StaffRole; status: "invited" | "active" | "disabled"; activatedAt: string | null };
const styles = "w-full rounded-lg border border-white/15 bg-[#07111f] p-2.5 text-sm text-white";
export default function StaffPage() {
  const [users, setUsers] = useState<Account[]>([]);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffRole>("editor"); const [link, setLink] = useState("");
  const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false); const [legacyEnabled, setLegacyEnabled] = useState<boolean | null>(null);
  const [actorKind, setActorKind] = useState("");
  const load = useCallback(async () => {
    const [staff, legacy, verify] = await Promise.all([
      fetch("/api/admin/staff", { cache: "no-store" }),
      fetch("/api/admin/legacy", { cache: "no-store" }),
      fetch("/api/admin/verify", { cache: "no-store" }),
    ]);
    if (!staff.ok) throw new Error("Vous n'avez pas accès aux comptes.");
    setUsers(await staff.json());
    if (legacy.ok) setLegacyEnabled((await legacy.json()).enabled === true);
    if (verify.ok) setActorKind((await verify.json()).actor.kind);
  }, []);
  useEffect(() => { void load().catch((caught) => setError(String(caught))); }, [load]);
  async function invite(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError(""); setSuccess(""); setLink("");
    try {
      const response = await fetch("/api/admin/staff", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Invitation impossible.");
      const url = location.origin + "/admin/activate#token=" + encodeURIComponent(data.invitationToken);
      setLink(url); setSuccess("Compte invité. Transmettez le lien personnel par un canal sûr : il ne sera plus affiché.");
      setName(""); setEmail(""); await load();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Échec de l'invitation."); }
    finally { setSaving(false); }
  }
  async function update(account: Account, role: StaffRole, status: "active" | "disabled") {
    setError(""); setSuccess("");
    try {
      const response = await fetch("/api/admin/staff", { method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id, role, status }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Modification impossible.");
      await load(); setSuccess("Droits enregistrés.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Erreur."); }
  }
  async function toggleLegacy() {
    if (!legacyEnabled || !["staff","local"].includes(actorKind)) return;
    if (!confirm("Désactiver l'ancien mot de passe commun ? Confirmez d'abord que votre compte nominatif fonctionne.")) return;
    const response = await fetch("/api/admin/legacy", { method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }) });
    if (!response.ok) { setError("L'ancien accès n'a pas été désactivé."); return; }
    await load(); setSuccess("Ancien accès désactivé.");
  }
  return <div className="space-y-7 text-white">
    <header><p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Accès & responsabilités</p><h1 className="mt-2 text-3xl">Équipe administrative</h1><p className="mt-2 text-sm text-slate-400">Invitations nominatives, droits et révocation des accès.</p></header>
    {error && <p role="alert" className="rounded-lg bg-red-950/30 p-4 text-red-300">{error}</p>}
    {success && <p role="status" className="rounded-lg bg-emerald-950/30 p-4 text-emerald-200">{success}</p>}
    <form onSubmit={(e) => void invite(e)} className="grid gap-3 rounded-xl border border-white/10 bg-[#0b1827] p-5 sm:grid-cols-2">
      <h2 className="text-lg font-semibold sm:col-span-2">Inviter une personne</h2>
      <label className="text-sm">Nom<input required minLength={2} maxLength={140} value={name} onChange={(e) => setName(e.target.value)} className={styles}/></label>
      <label className="text-sm">Adresse e-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles}/></label>
      <label className="text-sm">Rôle<select value={role} onChange={(e) => setRole(e.target.value as StaffRole)} className={styles}>{roles.map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}</select></label>
      <button disabled={saving} className="self-end rounded-lg bg-[#d4af37] p-2.5 font-semibold text-[#07111f] disabled:opacity-50">{saving ? "Enregistrement..." : "Créer l'invitation"}</button>
      {link && <div className="sm:col-span-2"><label className="block text-sm text-amber-200">Lien personnel à transmettre (affiché une seule fois)</label>
        <input readOnly value={link} className={styles} onFocus={(e) => e.target.select()}/>
        <button type="button" onClick={() => void navigator.clipboard.writeText(link)} className="mt-2 text-sm text-[#d4af37]">Copier le lien</button></div>}
    </form>
    <section className="space-y-3"><h2 className="text-xl">Accès enregistrés</h2>
      {users.length === 0 ? <p className="text-sm text-slate-400">Aucun compte individuel. Invitez le premier responsable pour commencer.</p> :
      users.map(account => <article key={account.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#0b1827] p-4">
        <div className="min-w-60 flex-1"><h3 className="font-semibold">{account.name}</h3><p className="text-sm text-slate-400">{account.email} · {account.status === "invited" ? "Invitation en attente" : account.status === "disabled" ? "Désactivé" : "Actif"}</p></div>
        {account.status === "invited" ? <span className="text-xs text-slate-500">Activation attendue</span> : <>
          <select aria-label={"Rôle de " + account.name} value={account.role} onChange={e => void update(account, e.target.value as StaffRole, account.status as "active" | "disabled")} className="rounded-lg bg-[#07111f] p-2 text-sm">{roles.map(r=><option key={r} value={r}>{roleLabels[r]}</option>)}</select>
          <button onClick={() => void update(account, account.role, account.status === "active" ? "disabled" : "active")} className="rounded-lg border border-white/15 px-3 py-2 text-sm">{account.status === "active" ? "Désactiver" : "Réactiver"}</button>
        </>}
      </article>)}</section>
    <section className="rounded-xl border border-white/10 bg-[#0b1827] p-5"><h2 className="text-lg">Accès historique</h2>
      <p className="mt-2 text-sm text-slate-400">Statut : {legacyEnabled === null ? "Non vérifié" : legacyEnabled ? "Actif pendant la transition" : "Désactivé"}</p>
      {legacyEnabled && ["staff","local"].includes(actorKind) && <button onClick={() => void toggleLegacy()} className="mt-3 rounded-lg border border-amber-500/40 px-4 py-2 text-sm text-amber-200">Désactiver l'ancien mot de passe commun</button>}
    </section>
  </div>;
}
