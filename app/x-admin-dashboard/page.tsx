"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
};

type MemberItem = {
  id: string;
  name: string;
  role: string;
  projects?: number;
};

type ResourceItem = {
  id: string;
  title: string;
  category: string;
};

type CallItem = {
  id: string;
  title: string;
  urgency?: "low" | "medium" | "high";
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [calls, setCalls] = useState<CallItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    type: "Workshop",
    description: "",
  });
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    projects: "1",
  });
  const [resourceForm, setResourceForm] = useState({
    title: "",
    category: "Documentation",
    url: "#",
  });
  const [callForm, setCallForm] = useState({
    title: "",
    description: "",
    urgency: "medium" as "low" | "medium" | "high",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin-auth");
    if (!token) {
      router.push("/x-admin-auth");
    } else {
      setIsAuthenticated(true);
      loadAll();
    }
  }, [router]);

  async function loadAll() {
    setIsLoading(true);
    setStatus("");
    try {
      const [eventsRes, membersRes, resourcesRes, callsRes] = await Promise.all([
        fetch("/api/community/events", { cache: "no-store" }),
        fetch("/api/community/members", { cache: "no-store" }),
        fetch("/api/community/resources", { cache: "no-store" }),
        fetch("/api/community/calls", { cache: "no-store" }),
      ]);

      if (!eventsRes.ok || !membersRes.ok || !resourcesRes.ok || !callsRes.ok) {
        throw new Error("Impossible de charger les donnees");
      }

      setEvents(await eventsRes.json());
      setMembers(await membersRes.json());
      setResources(await resourcesRes.json());
      setCalls(await callsRes.json());
    } catch {
      setStatus("Erreur: chargement des donnees impossible");
    } finally {
      setIsLoading(false);
    }
  }

  async function createItem(url: string, payload: unknown, successMessage: string) {
    setStatus("");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error || "Requete invalide");
    }

    setStatus(successMessage);
    await loadAll();
  }

  async function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createItem("/api/community/events", eventForm, "Evenement ajoute");
      setEventForm({ title: "", date: "", type: "Workshop", description: "" });
    } catch (error) {
      setStatus(error instanceof Error ? `Erreur: ${error.message}` : "Erreur");
    }
  }

  async function onSubmitMember(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createItem(
        "/api/community/members",
        {
          ...memberForm,
          projects: Number(memberForm.projects) || 0,
        },
        "Membre ajoute"
      );
      setMemberForm({ name: "", role: "", projects: "1" });
    } catch (error) {
      setStatus(error instanceof Error ? `Erreur: ${error.message}` : "Erreur");
    }
  }

  async function onSubmitResource(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createItem(
        "/api/community/resources",
        resourceForm,
        "Ressource ajoutee"
      );
      setResourceForm({ title: "", category: "Documentation", url: "#" });
    } catch (error) {
      setStatus(error instanceof Error ? `Erreur: ${error.message}` : "Erreur");
    }
  }

  async function onSubmitCall(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await createItem("/api/community/calls", callForm, "Appel ajoute");
      setCallForm({ title: "", description: "", urgency: "medium" });
    } catch (error) {
      setStatus(error instanceof Error ? `Erreur: ${error.message}` : "Erreur");
    }
  }

  function logout() {
    localStorage.removeItem("admin-auth");
    router.push("/x-admin-auth");
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-slate-500">Redirection...</div>
      </div>
    );
  }

  return (
    <section className="content-shell">
      <div className="flex items-center justify-between">
        <header className="content-header flex-1">
          <span className="content-kicker">Back-office</span>
          <h1 className="content-title">Tableau de bord Admin</h1>
          <p className="content-lead">
            Gestion des evenements, membres, ressources et appels a contribution.
          </p>
        </header>
        <button
          onClick={logout}
          className="ml-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/20 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>

      {status ? (
        <p className="mt-6 rounded-xl border border-[rgba(11,61,145,0.15)] bg-white px-4 py-3 text-sm dark:bg-[rgba(7,24,51,0.8)]">
          {status}
        </p>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="content-panel">
          <h2 className="content-panel-title">Ajouter un evenement</h2>
          <form className="mt-4 space-y-3" onSubmit={onSubmitEvent}>
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Titre"
              value={eventForm.title}
              onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))}
            />
            <input
              required
              type="date"
              className="w-full rounded-xl border px-3 py-2"
              value={eventForm.date}
              onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))}
            />
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Type (Workshop, Webinaire, ... )"
              value={eventForm.type}
              onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value }))}
            />
            <textarea
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Description"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((p) => ({ ...p, description: e.target.value }))
              }
            />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
              Ajouter
            </button>
          </form>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Ajouter un membre</h2>
          <form className="mt-4 space-y-3" onSubmit={onSubmitMember}>
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Nom"
              value={memberForm.name}
              onChange={(e) => setMemberForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Role"
              value={memberForm.role}
              onChange={(e) => setMemberForm((p) => ({ ...p, role: e.target.value }))}
            />
            <input
              type="number"
              min={0}
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Projets"
              value={memberForm.projects}
              onChange={(e) =>
                setMemberForm((p) => ({ ...p, projects: e.target.value }))
              }
            />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
              Ajouter
            </button>
          </form>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Ajouter une ressource</h2>
          <form className="mt-4 space-y-3" onSubmit={onSubmitResource}>
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Titre"
              value={resourceForm.title}
              onChange={(e) =>
                setResourceForm((p) => ({ ...p, title: e.target.value }))
              }
            />
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Categorie"
              value={resourceForm.category}
              onChange={(e) =>
                setResourceForm((p) => ({ ...p, category: e.target.value }))
              }
            />
            <input
              className="w-full rounded-xl border px-3 py-2"
              placeholder="URL"
              value={resourceForm.url}
              onChange={(e) => setResourceForm((p) => ({ ...p, url: e.target.value }))}
            />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
              Ajouter
            </button>
          </form>
        </article>

        <article className="content-panel">
          <h2 className="content-panel-title">Ajouter un appel</h2>
          <form className="mt-4 space-y-3" onSubmit={onSubmitCall}>
            <input
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Titre"
              value={callForm.title}
              onChange={(e) => setCallForm((p) => ({ ...p, title: e.target.value }))}
            />
            <textarea
              required
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Description"
              value={callForm.description}
              onChange={(e) =>
                setCallForm((p) => ({ ...p, description: e.target.value }))
              }
            />
            <select
              className="w-full rounded-xl border px-3 py-2"
              value={callForm.urgency}
              onChange={(e) =>
                setCallForm((p) => ({
                  ...p,
                  urgency: e.target.value as "low" | "medium" | "high",
                }))
              }
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
              Ajouter
            </button>
          </form>
        </article>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="content-panel">
          <h3 className="content-panel-title">Evenements ({events.length})</h3>
          {isLoading ? (
            <p className="content-panel-copy">Chargement...</p>
          ) : (
            <ul className="content-list">
              {events.slice(0, 6).map((item) => (
                <li key={item.id} className="content-list-item">
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="content-panel">
          <h3 className="content-panel-title">Membres ({members.length})</h3>
          {isLoading ? (
            <p className="content-panel-copy">Chargement...</p>
          ) : (
            <ul className="content-list">
              {members.slice(0, 6).map((item) => (
                <li key={item.id} className="content-list-item">
                  {item.name} - {item.role}
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="content-panel">
          <h3 className="content-panel-title">Ressources ({resources.length})</h3>
          {isLoading ? (
            <p className="content-panel-copy">Chargement...</p>
          ) : (
            <ul className="content-list">
              {resources.slice(0, 6).map((item) => (
                <li key={item.id} className="content-list-item">
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="content-panel">
          <h3 className="content-panel-title">Appels ({calls.length})</h3>
          {isLoading ? (
            <p className="content-panel-copy">Chargement...</p>
          ) : (
            <ul className="content-list">
              {calls.slice(0, 6).map((item) => (
                <li key={item.id} className="content-list-item">
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </section>
  );
}
