"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Article, ArticleInput, PublicationStatus } from "@/lib/editorial";

const base: ArticleInput = {
  title: "", summary: "", body: "", category: "Actualités",
  author: "Tradition Learning Community", coverImage: "", status: "draft", featured: false,
};
const statusNames: Record<PublicationStatus, string> = {
  draft: "Brouillon", review: "En validation", published: "Publié", archived: "Archivé",
};
const fieldClass = "w-full rounded-lg border border-white/15 bg-[#081626] px-3 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]";
const labelClass = "block space-y-1.5 text-sm text-slate-300";

export default function PublicationsAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState<ArticleInput>({ ...base });
  const [editing, setEditing] = useState<Article | null>(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const response = await fetch("/api/articles?all=1", { cache: "no-store" });
    if (!response.ok) throw new Error("Impossible de charger les articles.");
    setArticles(await response.json());
  }, []);
  useEffect(() => { void load().catch(() => setError("Chargement impossible.")); }, [load]);
  function update<K extends keyof ArticleInput>(field: K, value: ArticleInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }
  function reset() { setForm({ ...base }); setEditing(null); setPreview(false); setMessage(""); setError(""); }
  function edit(article: Article) {
    setEditing(article);
    setForm({
      title: article.title, summary: article.summary, body: article.body, category: article.category,
      author: article.author, coverImage: article.coverImage, status: article.status, featured: article.featured,
    });
    setError(""); setMessage(""); setPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function uploadCover(file: File | undefined) {
    if (!file) return;
    setUploading(true); setError("");
    try {
      const data = new FormData(); data.append("file", file); data.append("title", form.title || file.name);
      const response = await fetch("/api/media/upload", { method: "POST", body: data });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Impossible d'importer l'image.");
      update("coverImage", result.url as string);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Erreur d'import."); }
    finally { setUploading(false); }
  }
  async function save(status: PublicationStatus) {
    setBusy(true); setError(""); setMessage("");
    try {
      const endpoint = editing ? "/api/articles/" + editing.id : "/api/articles";
      const response = await fetch(endpoint, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status, ...(editing ? { version: editing.version } : {}) }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Échec de l'enregistrement.");
      await load();
      setEditing(data as Article);
      setForm({ title: data.title, summary: data.summary, body: data.body, category: data.category, author: data.author, coverImage: data.coverImage, status: data.status, featured: data.featured });
      setMessage(status === "published" ? "Article publié." : "Modifications enregistrées.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Échec de l'enregistrement."); }
    finally { setBusy(false); }
  }
  return <div className="space-y-7">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">TLC · Rédaction</p>
        <h1 className="mt-2 text-3xl text-white">Actualités & articles</h1>
        <p className="mt-2 text-sm text-slate-400">Rédiger, prévisualiser et publier des nouvelles de TLC.</p>
      </div>
      <div className="flex gap-3"><Link href="/actualites" className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white">Voir les actualités</Link><button onClick={reset} className="rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#081626]">Nouvel article</button></div>
    </header>
    {error && <p role="alert" className="rounded-xl border border-red-400/25 bg-red-950/40 p-4 text-sm text-red-200">{error}</p>}
    {message && <p role="status" className="rounded-xl border border-emerald-400/25 bg-emerald-950/40 p-4 text-sm text-emerald-200">{message}</p>}
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
      <section className="rounded-2xl border border-white/10 bg-[#0b1827] p-5 sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl text-white">{editing ? "Modifier l'article" : "Nouvel article"}</h2>
          <button type="button" onClick={() => setPreview((value) => !value)} className="rounded-lg border border-[#d4af37]/40 px-3 py-2 text-xs text-[#e6c879]">{preview ? "Modifier le texte" : "Prévisualiser"}</button>
        </div>
        {preview ? <article className="space-y-4 text-slate-200">
          <p className="text-xs uppercase tracking-widest text-[#d4af37]">{form.category}</p>
          <h3 className="text-3xl text-white">{form.title || "Titre de l'article"}</h3>
          <p className="text-lg text-slate-300">{form.summary}</p>
          {form.coverImage && <img src={form.coverImage} alt="" className="max-h-80 w-full object-cover" />}
          <p className="whitespace-pre-wrap break-words leading-8">{form.body}</p>
        </article> : <div className="space-y-5">
          <label className={labelClass}>Titre <input className={fieldClass} value={form.title} maxLength={180} onChange={(e) => update("title", e.target.value)} /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>Catégorie <input className={fieldClass} value={form.category} maxLength={80} onChange={(e) => update("category", e.target.value)} /></label>
            <label className={labelClass}>Auteur affiché <input className={fieldClass} value={form.author} maxLength={160} onChange={(e) => update("author", e.target.value)} /></label>
          </div>
          <label className={labelClass}>Résumé <textarea className={fieldClass} rows={3} maxLength={600} value={form.summary} onChange={(e) => update("summary", e.target.value)} /></label>
          <label className={labelClass}>Contenu de l'article <textarea className={fieldClass + " min-h-80"} rows={13} value={form.body} onChange={(e) => update("body", e.target.value)} placeholder="Rédigez le contenu avec des paragraphes séparés par une ligne vide." /></label>
          <label className={labelClass}>Importer une image de couverture <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploading} onChange={(e) => void uploadCover(e.target.files?.[0])} className="block w-full text-xs text-slate-300" />{uploading && <span>Import en cours...</span>}</label>
          <label className={labelClass}>URL de l'image de couverture <input className={fieldClass} value={form.coverImage} placeholder="https://... ou /images/..." onChange={(e) => update("coverImage", e.target.value)} /></label>
          <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" className="accent-[#d4af37]" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> Mettre en avant sur l'accueil</label>
        </div>}
        <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <button type="button" disabled={busy} onClick={() => void save("draft")} className="rounded-lg border border-white/20 px-4 py-2.5 text-sm text-white disabled:opacity-50">Enregistrer le brouillon</button>
          <button type="button" disabled={busy} onClick={() => void save("review")} className="rounded-lg border border-white/20 px-4 py-2.5 text-sm text-white disabled:opacity-50">Soumettre à validation</button>
          <button type="button" disabled={busy} onClick={() => void save("published")} className="rounded-lg bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#081626] disabled:opacity-50">{busy ? "Enregistrement..." : "Publier"}</button>
          {editing && <button type="button" disabled={busy} onClick={() => void save("archived")} className="rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:text-white">Archiver</button>}
        </div>
        <p className="mt-3 text-xs text-slate-500">Les brouillons et articles en validation restent invisibles aux visiteurs. Les publications apparaissent immédiatement après enregistrement.</p>
      </section>
      <aside className="rounded-2xl border border-white/10 bg-[#0b1827] p-5">
        <h2 className="mb-4 text-lg text-white">Articles enregistrés</h2>
        {articles.length === 0 ? <p className="text-sm text-slate-400">Aucun article pour le moment.</p> : <ul className="space-y-2">
          {articles.map((item) => <li key={item.id}><button onClick={() => edit(item)} className="w-full rounded-lg border border-white/10 px-3 py-3 text-left hover:border-[#d4af37]/60">
            <span className="block text-sm font-medium text-white">{item.title}</span>
            <span className="mt-1 block text-xs text-slate-400">{statusNames[item.status]} · {item.category}</span>
          </button></li>)}
        </ul>}
      </aside>
    </div>
  </div>;
}
