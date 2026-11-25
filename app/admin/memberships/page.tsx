"use client";

import { useCallback, useEffect, useState } from "react";
import type { PublicMember, MemberStatus } from "@/lib/membership";
import { memberInterests, memberProfiles } from "@/lib/membership";

const statusLabels: Record<MemberStatus, string> = {
  pending: "En attente", approved: "Membre actif", rejected: "Refusée",
};
const interestLabels: Record<string, string> = Object.fromEntries(memberInterests.map(x => [x.value,x.label]));
const profileLabels: Record<string, string> = Object.fromEntries(memberProfiles.map(x => [x.value,x.label]));

export default function MembershipAdminPage() {
  const [applications, setApplications] = useState<PublicMember[]>([]);
  const [filter, setFilter] = useState<MemberStatus | "all">("pending");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/memberships", { cache: "no-store" });
      if (!response.ok) throw new Error("Impossible de charger les demandes.");
      const data = await response.json() as PublicMember[];
      setApplications(Array.isArray(data) ? data : []);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Chargement impossible."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function review(id: string, status: MemberStatus) {
    setWorking(id); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/memberships", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.error || "Décision non enregistrée.");
      }
      setNotice(status === "approved" ? "Compte approuvé et accessible au membre." : status === "rejected" ? "Demande refusée." : "Demande remise en attente.");
      await load();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Action indisponible."); }
    finally { setWorking(null); }
  }

  const shown = applications.filter(item => filter === "all" || item.status === filter);
  const count = (status: MemberStatus) => applications.filter(x => x.status === status).length;

  return <div className="space-y-6">
    <header>
      <span className="text-xs font-semibold tracking-[.14em] text-amber-700">COMMUNAUTÉ TLC</span>
      <h1 className="mt-2 text-3xl font-semibold">Adhésions et membres</h1>
      <p className="mt-2 max-w-3xl text-slate-600">Examinez les demandes et activez les comptes des membres. Ces informations restent réservées à l’administration.</p>
    </header>
    <div className="flex flex-wrap gap-2">
      {([["pending",`En attente (${count("pending")})`],["approved",`Actifs (${count("approved")})`],["rejected",`Refusés (${count("rejected")})`],["all",`Tous (${applications.length})`]] as const).map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-2.5 text-sm font-semibold border ${filter===value?"bg-[#06142d] text-white border-[#06142d]":"bg-white border-slate-200 text-slate-800"}`}>{label}</button>)}
      <button onClick={() => void load()} disabled={loading} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">Actualiser</button>
    </div>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
    {notice && <p role="status" className="rounded-xl bg-emerald-50 p-4 text-emerald-800">{notice}</p>}
    {loading ? <p>Chargement des demandes…</p> : shown.length === 0 ? <p className="rounded-2xl border border-slate-200 bg-white p-6">Aucune demande dans cette catégorie.</p> : <div className="grid gap-4">
      {shown.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="text-xl font-semibold text-slate-900">{item.name}</h2><a href={`mailto:${item.email}`} className="text-sm text-amber-800 underline">{item.email}</a></div>
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">{statusLabels[item.status]}</span>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <p><strong>Profil :</strong> {profileLabels[item.profile] || item.profile}</p>
          <p><strong>Pays :</strong> {item.country || "Non renseigné"}</p>
          {item.organization && <p><strong>Organisation :</strong> {item.organization}</p>}
          <p><strong>Demande :</strong> {new Date(item.createdAt).toLocaleDateString("fr-FR")}</p>
        </div>
        <p className="mt-3 text-sm"><strong>Participation :</strong> {item.interests.map(i => interestLabels[i] || i).join(", ")}</p>
        {item.message && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{item.message}</p>}
        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
          {item.status!=="approved"&&<button disabled={working===item.id} onClick={() => void review(item.id,"approved")} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white">Accepter et activer le compte</button>}
          {item.status!=="rejected"&&<button disabled={working===item.id} onClick={() => void review(item.id,"rejected")} className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-800">Refuser</button>}
          {item.status!=="pending"&&<button disabled={working===item.id} onClick={() => void review(item.id,"pending")} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Mettre en attente</button>}
        </div>
      </article>)}
    </div>}
  </div>;
}
