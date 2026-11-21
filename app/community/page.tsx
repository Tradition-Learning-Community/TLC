"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BellRing, BrainCircuit, Sparkles, UsersRound } from "lucide-react";

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

        const loadedEvents = await eventsRes.json();
        setEvents(Array.isArray(loadedEvents) ? loadedEvents.filter((event: { published?: boolean; date?: string }) => event.published === true && typeof event.date === 'string' && event.date >= new Date().toISOString().slice(0, 10)) : []);
        const loadedMembers = await membersRes.json();
        setMembers(Array.isArray(loadedMembers) ? loadedMembers.filter((member: { published?: boolean }) => member.published === true) : []);
        const loadedResources = await resourcesRes.json();
        setResources(Array.isArray(loadedResources) ? loadedResources.filter((item: { published?: boolean; url?: string }) => item.published === true && Boolean(item.url) && item.url !== '#') : []);
        const loadedCalls = await callsRes.json();
        setOpenCalls(Array.isArray(loadedCalls) ? loadedCalls.filter((call: { published?: boolean }) => call.published === true) : []);
      } catch (error) {
        console.error("Failed to load community data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Ces repères décrivent les travaux réels, sans statistiques artificielles.
  const stats = [
    { label: "Étudiants et curieux", value: "Découvrir" },
    { label: "Chercheurs et enseignants", value: "Explorer" },
    { label: "Développeurs et bénévoles", value: "Contribuer" },
    { label: "Organisations et partenaires", value: "Soutenir" },
  ];

  if (loading) {
    return (
      <section className="content-shell pt-40">
        <div className="py-16 text-center">Chargement des données...</div>
      </section>
    );
  }

  return (
    <section className="content-shell pt-40">
      <header className="content-header">
        <span className="content-kicker">Travaux ouverts</span>
        <h1 className="content-title">Communauté</h1>
        <p className="content-lead">
          TLC est ouverte à celles et ceux qui veulent comprendre, étudier,
          développer ou soutenir Tradition Learning. Vous pouvez participer
          sans être spécialiste du code : la recherche a aussi besoin
          de dialogue, de formation, de collaborations et de ressources.
        </p>
      </header>

      {/* Statistiques */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Il y a plusieurs façons de participer
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white p-6 text-center dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)]"
            >
              <div className="text-xl md:text-2xl font-bold text-[#0b3d91] dark:text-[#d4af37]">
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
                Découvrez la recherche et partagez vos questions ou vos idées
              </li>
              <li className="content-list-item">
                Contribuez à une étude, une expérimentation ou à la documentation
              </li>
              <li className="content-list-item">
                Développez, testez ou améliorez les outils si vous êtes informaticien
              </li>
              <li className="content-list-item">
                Proposez un partenariat, des ressources ou un soutien à la recherche
              </li>
            </ul>
          </article>

          <article className="content-panel">
            <h2 className="content-panel-title">Entrer en contact</h2>
            <p className="content-panel-copy">
              Présentez votre intérêt, votre question ou votre proposition à TLC.
              Les dépôts techniques restent accessibles à ceux qui souhaitent y contribuer.
            </p>
            <div className="content-chip-row">
              <Link className="content-chip" href="/contact">Contacter TLC</Link>
              <Link className="content-chip" href="/resources">Explorer les ressources</Link>
              <a className="content-chip" href="https://github.com/Tradition-Learning-Community">Contribuer sur GitHub</a>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <div className="content-header text-left md:text-center">
          <span className="content-kicker">Des contributions complémentaires</span>
          <h2 className="content-title">Chaque contribution peut faire avancer la recherche</h2>
          <p className="content-lead">
            Les progrès scientifiques et techniques s’appuient sur des compétences diverses, ainsi que sur des collaborations et des soutiens durables.
          </p>
        </div>

        <div className="mt-8 grid gap-5 animate-stagger lg:grid-cols-4">
          {[
            {
              icon: <BrainCircuit className="h-5 w-5 text-[#d4af37]" />,
              title: "Recherche",
              text: "Étudier les idées, proposer des hypothèses et organiser des expériences pour vérifier les résultats."
            },
            {
              icon: <UsersRound className="h-5 w-5 text-[#d4af37]" />,
              title: "Développement",
              text: "Concevoir, programmer, tester, documenter et améliorer les outils issus des travaux TL."
            },
            {
              icon: <BellRing className="h-5 w-5 text-[#d4af37]" />,
              title: "Partenariats",
              text: "Associer universités, organisations et acteurs publics à des projets de recherche ou de terrain."
            },
            {
              icon: <Sparkles className="h-5 w-5 text-[#d4af37]" />,
              title: "Transmission et partage",
              text: "Faire connaître les travaux, animer des échanges et ouvrir des portes aux nouvelles générations."
            }
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[rgba(11,61,145,0.12)] bg-white p-5 shadow-[0_18px_35px_rgba(6,33,71,0.08)] transition-all duration-300 hover:shadow-[0_24px_48px_rgba(11,61,145,0.12)] hover:border-[#d4af37]/40 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)] dark:hover:border-[#d4af37]/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b3d91]/10 dark:bg-white/5">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#062147] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {events.length > 0 && (

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Événements référencés
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
      )}

      {resources.length > 0 && (

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
      )}

      {members.length > 0 && (

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-[#062147] dark:text-white">
          Profils publiés
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
      )}

      {openCalls.length > 0 && (

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
      )}

      {/* Principes de collaboration */}
      <section className="mt-12">
        <div className="rounded-3xl border border-[rgba(11,61,145,0.12)] bg-white p-6 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)] md:p-8">
          <h2 className="text-xl font-semibold text-[#062147] dark:text-white">
            Contribuer aux projets
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            La collaboration repose sur le respect, la traçabilité et la qualité des contributions.
            Les projets TLC sont ouverts à des contributions scientifiques,
            techniques et documentaires. Retrouvez les travaux en cours dans
            nos espaces de collaboration.
          </p>
          <a href="https://github.com/Tradition-Learning-Community/tllib/blob/main/CONTRIBUTING.md" className="mt-4 inline-block rounded-full border border-[#0b3d91] px-4 py-2 text-sm font-medium text-[#0b3d91] transition-colors hover:bg-[#0b3d91] hover:text-white dark:border-[#d4af37] dark:text-[#d4af37] dark:hover:bg-[#d4af37]/20">
            Lire le guide de contribution
          </a>
        </div>
      </section>


    </section>
  );
}
