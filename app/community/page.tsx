"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CommunityPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [openCalls, setOpenCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, membersRes, resourcesRes, callsRes] = await Promise.all([
          fetch("/api/community/events"),
          fetch("/api/community/members"),
          fetch("/api/community/resources"),
          fetch("/api/community/calls"),
        ]);

        setEvents(await eventsRes.json());
        setMembers(await membersRes.json());
        setResources(await resourcesRes.json());
        setOpenCalls(await callsRes.json());
      } catch (error) {
        console.error("Failed to load community data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Statistiques calculées
  const stats = [
    { label: "Contributeurs actifs", value: (members.length * 4).toString() + "+" },
    { label: "Projets open-source", value: members.reduce((sum: number, m: any) => sum + (m.projects || 0), 0).toString() },
    { label: "Pull Requests fusionnées", value: (members.reduce((sum: number, m: any) => sum + (m.points || 0), 0)).toString() + "+" },
    { label: "Discussions en cours", value: "85" },
  ];

  const testimonials = [
    {
      quote:
        "TLC m'a permis de contribuer à des projets d'IA responsables et bien documentés.",
      author: "Sophie M.",
      role: "Développeuse",
    },
    {
      quote:
        "L'accent sur la reproductibilité fait toute la différence pour nos recherches.",
      author: "Prof. Jean L.",
      role: "Chercheur",
    },
  ];

  if (loading) {
    return (
      <section className="content-shell">
        <div className="py-16 text-center">Chargement des données...</div>
      </section>
    );
  }

  return (
    <section className="content-shell">
      <header className="content-header">
        <span className="content-kicker">Réseau ouvert</span>
        <h1 className="content-title">Communauté</h1>
        <p className="content-lead">
          La communauté TLC regroupe des chercheurs, ingénieurs et passionnés qui
          contribuent à des projets open-source, organisent des événements et
          partagent des ressources pédagogiques. Rejoignez-nous et façonnez
          l'avenir d'une IA plus responsable.
        </p>
        <div className="mt-4 flex justify-center">
          <Link href="/community/admin" className="content-api-link">
            Ouvrir l'espace admin communauté
          </Link>
        </div>
      </header>

      {/* Statistiques */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Par les chiffres
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-6 text-center dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <div className="text-3xl font-bold text-[#0b3d91] dark:text-[#d4af37]">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment contribuer */}
      <section className="mt-12">
        <div className="content-grid">
          <article className="content-panel">
            <h2 className="content-panel-title">Comment contribuer</h2>
            <ul className="content-list">
              <li className="content-list-item">
                Consultez le guide CONTRIBUTING.md sur GitHub
              </li>
              <li className="content-list-item">
                Ouvrez une issue pour proposer une idée ou signaler un bug
              </li>
              <li className="content-list-item">
                Soumettez une Pull Request claire avec tests
              </li>
              <li className="content-list-item">
                Rejoignez nos discussions et partagez vos retours
              </li>
            </ul>
          </article>

          <article className="content-panel">
            <h2 className="content-panel-title">Canaux de communication</h2>
            <p className="content-panel-copy">
              Nous recommandons des échanges réguliers sur les canaux suivants.
            </p>
            <div className="content-chip-row">
              <span className="content-chip">Discord</span>
              <span className="content-chip">Slack</span>
              <span className="content-chip">GitHub Discussions</span>
            </div>
          </article>
        </div>
      </section>

      {/* Événements */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Événements à venir
        </h2>
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-4 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <div>
                <h3 className="font-medium text-[#062147] dark:text-white">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {new Date(event.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <span className="rounded-full bg-[#0b3d91]/10 px-3 py-1 text-xs font-medium text-[#0b3d91] dark:bg-white/10 dark:text-[#d4af37]">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Ressources partagées */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Ressources partagées
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-4 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <h3 className="font-medium text-[#062147] dark:text-white">
                {res.title}
              </h3>
              <span className="mt-2 inline-block rounded-full bg-[#d4af37]/10 px-2 py-1 text-xs font-medium text-[#0b3d91] dark:text-[#d4af37]">
                {res.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Membres en vedette */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Membres en vedette
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-6 text-center dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <div className="mb-2 inline-block h-12 w-12 rounded-full bg-[#0b3d91]/20" />
              <h3 className="font-semibold text-[#062147] dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {member.role}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {member.projects} projets actifs
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Appels à contribution */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Appels à contribution
        </h2>
        <div className="space-y-3">
          {openCalls.map((call) => (
            <div
              key={call.id}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-4 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <h3 className="font-medium text-[#062147] dark:text-white">
                {call.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {call.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code de conduite */}
      <section className="mt-12">
        <div className="rounded-3xl border border-[rgba(11,61,145,0.12)] bg-white p-6 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)] md:p-8">
          <h2 className="text-xl font-semibold text-[#062147] dark:text-white">
            Code de conduite
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            La communauté TLC s'engage à créer un environnement respectueux,
            inclusif et bienveillant. Tous les contributeurs doivent respecter
            notre code de conduite qui privilégie la transparence, l'équité et
            l'écoute mutuelle. Les violations seront traitées de manière juste
            et rapide.
          </p>
          <button className="mt-4 rounded-full border border-[#0b3d91] px-4 py-2 text-sm font-medium text-[#0b3d91] transition-colors hover:bg-[#0b3d91] hover:text-white dark:border-[#d4af37] dark:text-[#d4af37] dark:hover:bg-[#d4af37]/20">
            Lire le code complet
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Retours de la communauté
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-6 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <p className="italic text-slate-600 dark:text-slate-300">
                "{testimonial.quote}"
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#062147] dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
