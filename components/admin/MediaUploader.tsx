"use client";
import { useRef, useState, type FormEvent } from "react";
export default function MediaUploader({ onUploaded }: { onUploaded: () => void | Promise<void> }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(""); const [credit, setCredit] = useState("");
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      const file = fileRef.current?.files?.[0];
      if (!file) throw new Error("Choisissez une image.");
      const form = new FormData();
      form.append("file", file); form.append("title", title || file.name); form.append("credit", credit);
      const response = await fetch("/api/media/upload", { method: "POST", body: form });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Impossible d'importer l'image.");
      setMessage("Image importée : " + result.url);
      if (fileRef.current) fileRef.current.value = "";
      setTitle(""); setCredit("");
      await onUploaded();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Échec du téléversement."); }
    finally { setBusy(false); }
  }
  return <form onSubmit={(event) => void send(event)} className="space-y-3 rounded-2xl border border-[#d4af37]/20 bg-[#0b1827] p-5">
    <h3 className="font-semibold text-white">Importer une image</h3>
    <p className="text-xs text-slate-400">JPEG, PNG, WebP ou AVIF · 4 Mo maximum. Import réservé à l'administration.</p>
    <input ref={fileRef} type="file" required accept="image/jpeg,image/png,image/webp,image/avif" className="block w-full text-sm text-slate-300" />
    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre / légende" maxLength={160} className="w-full rounded-lg border border-white/15 bg-[#07111f] px-3 py-2 text-white" />
    <input value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Crédit / provenance" maxLength={250} className="w-full rounded-lg border border-white/15 bg-[#07111f] px-3 py-2 text-white" />
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    {message && <p role="status" className="break-all text-xs text-emerald-300">{message}</p>}
    <button disabled={busy} className="rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#07111f] disabled:opacity-50">{busy ? "Import en cours..." : "Importer"}</button>
  </form>;
}
