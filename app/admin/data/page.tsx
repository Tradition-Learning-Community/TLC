import Link from "next/link";
import { ArrowUpRight, BookOpen, Building2, CalendarDays, FlaskConical, FolderKanban, Images, Layers3, MessageSquare, Radio, Users, type LucideIcon } from "lucide-react";

const TYPES: { key: string; title: string; description: string; icon: LucideIcon; color: string }[] = [
  { key: "contributors", title: "Contributeurs", description: "Personnes présentées sur la page d’accueil.", icon: Users, color: "text-amber-200 bg-amber-300/10" },
  { key: "organizations", title: "Organisations", description: "Partenaires, sponsors et structures ayant accepté la publication.", icon: Building2, color: "text-sky-200 bg-sky-300/10" },
  { key: "media", title: "Médiathèque", description: "Images et fichiers référencés par TLC.", icon: Images, color: "text-indigo-200 bg-indigo-300/10" },
  { key: "profiles", title: "Profils communauté", description: "Rôles, compétences et participation des membres.", icon: Users, color: "text-violet-200 bg-violet-300/10" },
  { key: "projects", title: "Projets", description: "Projets, membres associés et tâches.", icon: FolderKanban, color: "text-sky-200 bg-sky-300/10" },
  { key: "events", title: "Événements", description: "Ateliers, webinaires et rendez-vous.", icon: CalendarDays, color: "text-emerald-200 bg-emerald-300/10" },
  { key: "resources", title: "Ressources", description: "Guides, liens et références utiles.", icon: BookOpen, color: "text-cyan-200 bg-cyan-300/10" },
  { key: "experiments", title: "Expériences", description: "Prototypes, notes et résultats de tests.", icon: FlaskConical, color: "text-fuchsia-200 bg-fuchsia-300/10" },
  { key: "open-calls", title: "Appels ouverts", description: "Missions et besoins de contribution.", icon: Radio, color: "text-rose-200 bg-rose-300/10" },
  { key: "discussions", title: "Discussions", description: "Sujets et échanges de la communauté.", icon: MessageSquare, color: "text-orange-200 bg-orange-300/10" },
];

export default function AdminDataIndex() {
  return (
    <div className="space-y-8">
      <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Contenu</p><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Collections de données</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Choisissez une collection pour consulter, ajouter ou modifier les informations visibles sur la plateforme.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TYPES.map(({ key, title, description, icon: Icon, color }) => (
          <Link key={key} href={`/admin/data/${key}`} className="group rounded-2xl border border-white/[0.08] bg-[#0b1827] p-5 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-[#0e1d2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]">
            <div className="flex items-start justify-between"><div className={`rounded-xl p-2.5 ${color}`}><Icon size={19} /></div><ArrowUpRight size={17} className="text-slate-600 transition group-hover:text-slate-300" /></div>
            <h2 className="mt-5 font-semibold text-white">{title}</h2><p className="mt-1.5 min-h-10 text-sm leading-5 text-slate-400">{description}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-slate-500"><Layers3 size={13} />Collection <code className="rounded bg-white/[0.04] px-1.5 py-0.5 text-slate-400">{key}</code></div>
          </Link>
        ))}
      </div>
      <div className="flex gap-3 rounded-2xl border border-sky-300/10 bg-sky-300/[0.04] p-4 text-sm text-slate-400"><span className="text-sky-200">i</span><p>Les modifications sont enregistrées dans la base de données et utilisées par les pages publiques correspondantes.</p></div>
    </div>
  );
}
