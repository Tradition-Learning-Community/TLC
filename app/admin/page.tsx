"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, FolderKanban, Newspaper, Users } from "lucide-react";

type RecordItem = { id?: string; title?: string; name?: string; excerpt?: string; status?: string };
type CollectionKey = "contributors" | "projects" | "events" | "resources" | "news";
const sections: { key: CollectionKey; title: string; description: string; href: string; icon: typeof Users }[] = [
  { key: "contributors", title: "Contributeurs", description: "Profils et liens visibles dans l'annuaire.", href: "/admin/data/contributors", icon: Users },
  { key: "projects", title: "Projets", description: "Fiches de projets et suivi des travaux.", href: "/admin/data/projects", icon: FolderKanban },
  { key: "events", title: "Evenements", description: "Agenda public et rendez-vous de TLC.", href: "/admin/data/events", icon: CalendarDays },
  { key: "resources", title: "Publications", description: "Catalogue public, ressources et tllib.", href: "/admin/data/resources", icon: BookOpen },
  { key: "news", title: "Actualites", description: "Articles publies et brouillons du blog.", href: "/admin/data/news", icon: Newspaper },
];

export default function AdminHome() {
  const [collections, setCollections] = useState<Record<CollectionKey, RecordItem[]>>({
    contributors: [], projects: [], events: [], resources: [], news: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all(sections.map(async ({ key }) => {
      try {
        const response = await fetch("/api/data/" + key, { cache: "no-store" });
        const data = response.ok ? await response.json() : [];
        return [key, Array.isArray(data) ? data as RecordItem[] : []] as const;
      } catch { return [key, []] as const; }
    })).then((results) => {
      if (active) setCollections(Object.fromEntries(results) as Record<CollectionKey, RecordItem[]>);
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const metrics = [
    { key: "contributors" as const, label: "Contributeurs", icon: Users, href: "/admin/data/contributors" },
    { key: "projects" as const, label: "Projets", icon: FolderKanban, href: "/admin/data/projects" },
    { key: "events" as const, label: "Evenements", icon: CalendarDays, href: "/admin/data/events" },
    { key: "resources" as const, label: "Publications", icon: BookOpen, href: "/admin/data/resources" },
  ];

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:p-7">
        <div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7427]">TLC / Administration</p><h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Vue d&#8217;ensemble</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Pilotez les contenus qui alimentent les pages publiques de TLC.</p></div>
        <Link href="/home" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-semibold text-[#1a160d] transition hover:bg-[#e2c260]">Voir le site <ArrowUpRight size={16} /></Link>
      </section>

      <Link href="/admin/memberships" className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 font-semibold text-amber-900 hover:bg-amber-100">Examiner les demandes d’adhésion <ArrowRight size={18}/></Link>
      <section aria-label="Indicateurs du site" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ key, label, icon: Icon, href }) => <Link key={key} href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md">
          <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-[#9a7427]"><Icon size={19} /></span><ArrowUpRight size={16} className="text-slate-300 group-hover:text-[#9a7427]" /></div>
          <p className="mt-5 text-sm font-medium text-slate-500">{label}</p><p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{loading ? <span className="inline-block h-9 w-12 animate-pulse rounded bg-slate-100" /> : collections[key].length}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#80601c]">Gerer {label.toLowerCase()} <ArrowRight size={14} /></span>
        </Link>)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7427]">Acces direct</p><h2 className="mt-1 text-lg font-semibold text-slate-900">Gestion du site</h2></div><Link href="/admin/data" className="text-xs font-semibold text-[#80601c] hover:underline">Toutes les collections</Link></div>
          <div className="divide-y divide-slate-100">
            {sections.map(({ key, title, description, href, icon: Icon }) => <Link key={key} href={href} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-600"><Icon size={18} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-800">{title}</span><span className="mt-0.5 block text-xs text-slate-500">{description}</span></span><span className="text-xs font-medium text-slate-500">{loading ? "..." : collections[key].length}</span><ArrowRight size={15} className="text-slate-300" />
            </Link>)}
          </div>
        </div>

        <aside className="rounded-2xl border border-amber-200 bg-[#fffdf7] p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7427]">Publication</p><h2 className="mt-2 text-lg font-semibold text-slate-900">Actualites TLC</h2><p className="mt-2 text-sm leading-6 text-slate-600">Redigez une nouvelle, enregistrez-la en brouillon, puis publiez-la sur le blog.</p>
          <div className="mt-5 flex items-center justify-between border-t border-amber-100 pt-4"><span className="text-sm text-slate-600">{loading ? "..." : collections.news.filter((item) => item.status === "published").length} publiees</span><Link href="/admin/data/news" className="inline-flex items-center gap-2 rounded-lg bg-[#d4af37] px-3 py-2 text-xs font-semibold text-[#1a160d] hover:bg-[#e2c260]">Gerer <ArrowRight size={14} /></Link></div>
        </aside>
      </section>
    </div>
  );
}
