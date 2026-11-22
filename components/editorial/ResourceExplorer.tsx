"use client";

import { useId, useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import type { TLCResource } from "@/lib/public-content";
import "./editorial-pages.css";

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
}

function publicUrl(value: string | undefined): value is string {
  return Boolean(value && (value.startsWith("https://") || (value.startsWith("/") && !value.startsWith("//"))));
}

export default function ResourceExplorer({ resources }: { resources: readonly TLCResource[] }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const available = useMemo(() => resources.filter(item => item.published === true && publicUrl(item.url)), [resources]);
  const categories = useMemo(() => Array.from(new Set(available.map(item => item.category))).sort((a, b) => a.localeCompare(b, "fr")), [available]);
  const filtered = useMemo(() => {
    const terms = searchable(query.trim()).split(/\s+/).filter(Boolean);
    return available.filter(item => (category === null || item.category === category) &&
      terms.every(term => searchable([item.title, item.category, item.description || ""].join(" ")).includes(term)));
  }, [available, category, query]);

  if (available.length === 0) {
    return <div className="editorial-empty"><BookOpen aria-hidden="true" /><div><h3>Le catalogue s’enrichit au fil des publications</h3><p>Aucune ressource publiée pour le moment. Les documents de référence sont accessibles ci-dessus.</p></div></div>;
  }

  return <div className="resource-explorer">
    <div className="resource-search">
      <label htmlFor={searchId}>Rechercher une ressource</label>
      <div className="resource-search-input"><Search aria-hidden="true" size={20} /><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Titre, sujet, mot-clé…" autoComplete="off" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche"><X size={18} aria-hidden="true" /></button>}</div>
    </div>
    <div className="resource-filters" role="group" aria-label="Filtrer les ressources par catégorie">
      <button type="button" aria-pressed={category === null} className="resource-filter" onClick={() => setCategory(null)}>Toutes les catégories <span>{available.length}</span></button>
      {categories.map(value => <button type="button" key={value} aria-pressed={category === value} className="resource-filter" onClick={() => setCategory(value)}>{value} <span>{available.filter(item => item.category === value).length}</span></button>)}
    </div>
    <p className="resource-count" role="status" aria-live="polite" aria-atomic="true">{filtered.length} ressource{filtered.length !== 1 ? "s" : ""} affichée{filtered.length !== 1 ? "s" : ""}</p>
    {filtered.length === 0 ? <div className="editorial-empty"><Search aria-hidden="true" /><div><h3>Aucune ressource ne correspond</h3><p>Essayez un autre mot-clé ou élargissez la catégorie.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory(null); }}>Réinitialiser les filtres</button></div></div> :
      <div className="resource-results">{filtered.map(item => <article className="resource-card" key={item.id}>
        <div className="resource-card-top"><span className="editorial-icon"><BookOpen aria-hidden="true" size={22} /></span><span className="chip">{item.category}</span></div>
        <h3>{item.title}</h3>{item.description && <p>{item.description}</p>}
        <a className="text-link" href={item.url} {...(item.url?.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Consulter la ressource<span className="sr-only"> : {item.title}{item.url?.startsWith("https://") ? " (nouvel onglet)" : ""}</span></a>
      </article>)}</div>}
  </div>;
}
