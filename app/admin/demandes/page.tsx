"use client";
import { useCallback, useEffect, useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/inquiries";
const labels: Record<InquiryStatus, string> = { new: "Nouvelle", "in-progress": "En cours", closed: "Clôturée" };
export default function DemandesAdmin() {
  const [items, setItems] = useState<Inquiry[]>([]); const [error, setError] = useState(""); const [busy, setBusy] = useState("");
  const load = useCallback(async () => {
    const response = await fetch("/api/inquiries", { cache: "no-store" });
    if (!response.ok) throw new Error("Chargement impossible.");
    setItems(await response.json());
  }, []);
  useEffect(() => { void load().catch(() => setError("Chargement impossible.")); }, [load]);
  async function change(item: Inquiry, status: InquiryStatus) {
    setBusy(item.id); setError("");
    try {
      const response = await fetch("/api/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status }) });
      if (!response.ok) throw new Error("Modification impossible.");
      await load();
    } catch { setError("Impossible de modifier cette demande."); }
    finally { setBusy(""); }
  }
  return <div className="space-y-6">
    <header><p className="text-xs uppercase tracking-widest text-[#d4af37]">Relations TLC</p><h1 className="mt-2 text-3xl text-white">Demandes reçues</h1>
    <p className="mt-2 text-sm text-slate-400">Candidatures, partenariats, soutien et contacts — accès réservé à l'administration.</p></header>
    {error && <p role="alert" className="text-red-300">{error}</p>}
    {items.length === 0 ? <div className="rounded-2xl border border-white/10 p-8 text-slate-400">Aucune demande reçue.</div> :
      <div className="space-y-3">{items.map(item => <article key={item.id} className="rounded-xl border border-white/10 bg-[#0b1827] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-medium text-white">{item.name}</h2><p className="text-xs text-slate-400">{item.kind} · {new Date(item.createdAt).toLocaleDateString("fr-FR")} · {labels[item.status]}</p></div>
          <select aria-label={"Statut pour " + item.name} disabled={busy === item.id} value={item.status}
            onChange={(e) => void change(item, e.target.value as InquiryStatus)} className="rounded-lg border border-white/20 bg-[#07111f] px-3 py-2 text-sm text-white">
            <option value="new">Nouvelle</option><option value="in-progress">En cours</option><option value="closed">Clôturée</option>
          </select></div>
        <p className="mt-3 text-sm text-slate-200">{item.profile ? item.profile + " · " : ""}<a className="underline" href={"mailto:" + item.email}>{item.email}</a></p>
        {item.context && <p className="mt-1 text-xs text-slate-400">Contexte : {item.context}</p>}
        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">{item.message || "Aucun message joint."}</p>
      </article>)}</div>}
  </div>;
}
