"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpenText, Database, Mail, Newspaper, Plus, Users } from "lucide-react";

type Contributor = { id: string; name: string; github?: string; avatar?: string };
type Article = { status: string };
type Identity = { permissions?: string[] };

const panel = "rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#10233a] to-[#0c1929] p-5 sm:p-6";
const link = "mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#e8c96d] hover:text-[#f4df9e]";

export default function AdminHome() {
  const [people, setPeople] = useState<Contributor[]>([]);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [verifyResponse, contributorsResponse] = await Promise.all([
          fetch("/api/admin/verify", {cache:"no-store"}),
          fetch("/api/contributors", {cache:"no-store"})
        ]);
        if (!active) return;
        const actor = verifyResponse.ok ? ((await verifyResponse.json()).actor as Identity) : null;
        const authorized = actor?.permissions ?? [];
        setPermissions(authorized);
        if (contributorsResponse.ok) {
          const rows: unknown = await contributorsResponse.json();
          if (active) setPeople(Array.isArray(rows) ? rows as Contributor[] : []);
        }
        if (authorized.includes("editorial:write")) {
          const response = await fetch("/api/articles?all=1", {cache:"no-store"});
          if (response.ok) {
            const rows: unknown = await response.json();
            if (active) setArticles(Array.isArray(rows) ? rows as Article[] : []);
          }
        }
      } catch { /* no misleading counts when APIs are unavailable */ }
      finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, []);

  const can = (permission: string) => permissions.includes(permission);
  const published = articles?.filter(item => item.status === "published").length ?? 0;
  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">TLC · Administration</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Vue d'ensemble</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-400">Publications, personnes, demandes et données du site TLC.</p>
      </div>
      {can("editorial:write") && <Link href="/admin/publications" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-[#14110a] hover:bg-[#efd779]"><Plus size={16}/>Nouvel article</Link>}
    </div>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Synthèse de l'administration">
      <article className={panel}>
        <Users className="text-[#e8c96d]" size={22}/>
        <p className="mt-5 text-sm text-slate-400">Contributeurs visibles</p>
        <p className="mt-1 text-3xl font-semibold text-white" aria-live="polite">{loading ? "…" : people.length}</p>
        {can("contributors:manage") && <Link href="/admin/contributors" className={link}>Gérer les profils <ArrowRight size={15}/></Link>}
      </article>
      {can("editorial:write") && <article className={panel}>
        <Newspaper className="text-[#e8c96d]" size={22}/>
        <p className="mt-5 text-sm text-slate-400">Articles publiés</p>
        <p className="mt-1 text-3xl font-semibold text-white" aria-live="polite">{articles ? published : "—"}</p>
        <Link href="/admin/publications" className={link}>Gérer les articles <ArrowRight size={15}/></Link>
      </article>}
      {can("data:manage") && <article className={panel}>
        <Database className="text-[#e8c96d]" size={22}/>
        <p className="mt-5 text-sm text-slate-400">Contenus du portail</p>
        <p className="mt-1 text-xl font-semibold text-white">Collections administrables</p>
        <Link href="/admin/data" className={link}>Ouvrir les contenus <ArrowRight size={15}/></Link>
      </article>}
      {can("inquiries:read") && <article className={panel}>
        <Mail className="text-[#e8c96d]" size={22}/>
        <p className="mt-5 text-sm text-slate-400">Participation et partenariats</p>
        <p className="mt-1 text-xl font-semibold text-white">Demandes reçues</p>
        <Link href="/admin/demandes" className={link}>Consulter les demandes <ArrowRight size={15}/></Link>
      </article>}
    </section>

    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1827]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
        <div><h2 className="font-semibold text-white">Celles et ceux qui contribuent</h2>
          <p className="mt-1 text-xs text-slate-400">Personnes actuellement visibles sur le portail public.</p></div>
        <Link href="/community" className="inline-flex items-center gap-1 text-xs text-[#e8c96d]">Voir la communauté <BookOpenText size={14}/></Link>
      </div>
      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="col-span-full bg-[#0b1827] px-5 py-8 text-sm text-slate-400">Chargement des contributeurs…</p>
          : people.slice(0, 6).map(person => <div key={person.id} className="flex min-w-0 items-center gap-3 bg-[#0b1827] p-4">
            <img src={person.avatar || (person.github?.startsWith("https://github.com/") ? person.github.replace(/\/$/,"") + ".png" : "/tlc-logo-hd.png")}
              alt="" className="h-10 w-10 rounded-full border border-white/10 object-cover"/>
            <div className="min-w-0"><div className="truncate text-sm font-medium text-slate-200">{person.name}</div>
              <div className="truncate text-xs text-slate-400">{person.github || "TLC"}</div></div>
          </div>)}
        {!loading && people.length === 0 && <p className="col-span-full bg-[#0b1827] px-5 py-8 text-sm text-slate-400">Aucun contributeur publié.</p>}
      </div>
    </section>
  </div>;
}
