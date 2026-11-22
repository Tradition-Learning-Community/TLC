"use client";

import { useEffect, useState } from "react";
import ImportButton from "@/components/admin/ImportButton";
import MediaUploader from "@/components/admin/MediaUploader";
import ImageField from "@/components/admin/ImageField";

type RecordItem = { id?: string; title?: string; name?: string; [key: string]: unknown };
type Field = { key: string; label: string; type?: "text" | "url" | "date" | "number" | "textarea" | "list" | "select" | "checkbox"; options?: string[]; placeholder?: string };

const TEMPLATES: Record<string, { title: string; expected: string; tips: string[]; template: RecordItem }> = {
  contributors: { title: "Contributeurs", expected: "Nom et URL GitHub requis. L’image est facultative.", tips: ["Utilisez une URL GitHub complète."], template: { name: "", github: "https://github.com/username", avatar: "", roles: ["Contributeur"], published: true } },
  profiles: { title: "Profils communauté", expected: "Nom et rôle requis.", tips: ["Ajoutez les compétences une par ligne."], template: { name: "", role: "", skills: [], points: 0, projects: 0, published: false } },
  projects: { title: "Projets", expected: "Nom du projet requis.", tips: ["Ajoutez les membres et tâches dans les sections dédiées."], template: { title: "", description: "", members: [], tasks: [], published: false } },
  events: { title: "Événements", expected: "Publiez uniquement les événements confirmés.", tips: ["La publication rend l'événement visible dans l'agenda."], template: { title: "", date: "", type: "Atelier", time: "", location: "", registrationUrl: "", description: "", published: false } },
  resources: { title: "Ressources", expected: "Titre et catégorie requis.", tips: ["Un élément reste privé tant qu'il n'est pas publié."], template: { title: "", category: "Documentation", url: "", description: "", published: false } },
  organizations: { title: "Organisations", expected: "Nommez une organisation et sa relation confirmée avec TLC.", tips: ["Affichage public uniquement si publié."], template: { name: "", category: "Partenaire", logo: "", url: "", description: "", published: false } },
  media: { title: "Médiathèque", expected: "Choisissez une image sur votre appareil ou ajoutez un lien si nécessaire.", tips: ["Les nouvelles images restent non publiées avant validation."], template: { title: "", url: "", alt: "", credit: "", published: false } },
  experiments: { title: "Expériences", expected: "Titre requis.", tips: ["Décrivez le contexte et les résultats dans les notes."], template: { title: "", notes: "", published: false } },
  "open-calls": { title: "Appels ouverts", expected: "Titre et description requis.", tips: ["Choisissez un niveau d’urgence."], template: { title: "", description: "", urgency: "medium", published: false } },
  discussions: { title: "Discussions", expected: "Sujet requis.", tips: ["Les messages initiaux sont facultatifs."], template: { title: "", messages: [], published: false } },
};

const FIELDS: Record<string, Field[]> = {
  contributors: [
    { key: "name", label: "Nom affiché", placeholder: "Ex. Alex Martin" },
    { key: "github", label: "Profil GitHub", type: "url", placeholder: "https://github.com/username" },

    { key: "roles", label: "Participation / rôles publics", type: "list", placeholder: "Contributeur, Bénévole, Membre, Responsable..." },
    { key: "published", label: "Afficher publiquement", type: "checkbox" },
  ],
  profiles: [
    { key: "name", label: "Nom" }, { key: "role", label: "Rôle" },
    { key: "skills", label: "Compétences", type: "list", placeholder: "Une compétence par ligne" },
    { key: "points", label: "Points", type: "number" }, { key: "projects", label: "Projets réalisés", type: "number" },
    { key: "published", label: "Afficher publiquement", type: "checkbox" },
  ],
  projects: [
    { key: "title", label: "Nom du projet" }, { key: "description", label: "Description", type: "textarea" },
    { key: "members", label: "Membres", type: "list", placeholder: "Un nom ou identifiant par ligne" }, { key: "published", label: "Afficher publiquement", type: "checkbox" },
  ],
  events: [
    { key: "title", label: "Nom de l’événement" }, { key: "date", label: "Date", type: "date" },
    { key: "type", label: "Type", placeholder: "Atelier, webinaire…" }, { key: "time", label: "Heure / période" }, { key: "location", label: "Lieu ou modalité" },
    { key: "registrationUrl", label: "Lien d'inscription", type: "url" }, { key: "description", label: "Description", type: "textarea" }, { key: "published", label: "Publier sur le site", type: "checkbox" },
  ],
  resources: [
    { key: "title", label: "Titre" }, { key: "category", label: "Catégorie", placeholder: "Documentation, code…" },
    { key: "url", label: "Lien", type: "url", placeholder: "https://…" }, { key: "description", label: "Description", type: "textarea" }, { key: "published", label: "Publier sur le site", type: "checkbox" },
  ],
  organizations: [{ key: "name", label: "Nom" }, { key: "category", label: "Relation", type: "select", options: ["Partenaire","Sponsor","Donateur","Institution"] }, { key: "url", label: "Site internet", type: "url" }, { key: "description", label: "Présentation", type: "textarea" }, { key: "published", label: "Afficher publiquement", type: "checkbox" }],
  media: [{ key: "title", label: "Nom du média" }, { key: "url", label: "Lien direct HTTPS", type: "url", placeholder: "https://…/image.jpg" }, { key: "alt", label: "Description de l'image" }, { key: "credit", label: "Crédit / provenance" }, { key: "published", label: "Visible publiquement", type: "checkbox" }],
  experiments: [{ key: "title", label: "Titre" }, { key: "notes", label: "Notes", type: "textarea" }, { key: "published", label: "Afficher publiquement", type: "checkbox" }],
  "open-calls": [
    { key: "title", label: "Titre" }, { key: "description", label: "Description", type: "textarea" },
    { key: "urgency", label: "Urgence", type: "select", options: ["low", "medium", "high"] },
    { key: "published", label: "Afficher publiquement", type: "checkbox" },
  ],
  discussions: [{ key: "title", label: "Sujet" }, { key: "published", label: "Afficher publiquement", type: "checkbox" }],
};

const REQUIRED_FIELDS: Record<string, string[]> = {
  contributors: ["name", "github"], profiles: ["name", "role"], projects: ["title"],
  events: ["title", "date", "type"], resources: ["title", "category"],
  organizations: ["name", "category"], media: ["title", "url"],
  experiments: ["title"], "open-calls": ["title", "description"], discussions: ["title"],
};

const inputClass = "mt-1.5 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/10";

export default function DataManager({ type }: { type: string }) {
  const help = TEMPLATES[type] ?? { title: type, expected: "Respectez les champs attendus pour cette collection.", tips: [], template: { title: "" } };
  const [items, setItems] = useState<RecordItem[]>([]);
  const [form, setForm] = useState<RecordItem>({});
  const [editorValue, setEditorValue] = useState("");
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [mediaFormOpen, setMediaFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jsonError, setJsonError] = useState("");

  async function fetchItems() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/data/${type}`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setError("Impossible de charger les données."); setItems([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { void fetchItems(); }, [type]);

  function setFormValue(next: RecordItem) {
    setForm(next);
    setEditorValue(JSON.stringify(next, null, 2));
    setJsonError("");
  }

  function startNew() {
    setEditing(null);
    if (type === "media") setMediaFormOpen(true);
    setError(""); setSuccess("");
    setFormValue(JSON.parse(JSON.stringify(help.template)) as RecordItem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(item: RecordItem) {
    setEditing(item);
    if (type === "media") setMediaFormOpen(true);
    setError(""); setSuccess("");
    setFormValue(JSON.parse(JSON.stringify(item)) as RecordItem);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateField(key: string, value: unknown) {
    setFormValue({ ...form, [key]: value });
  }

  function updateJson(value: string) {
    setEditorValue(value);
    try {
      const parsed: unknown = JSON.parse(value);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
      setForm(parsed as RecordItem);
      setJsonError("");
    } catch { setJsonError("Le JSON doit être un objet valide avant l’enregistrement."); }
  }

  function updateNested(field: "tasks" | "messages", index: number, key: string, value: unknown) {
    const rows = Array.isArray(form[field]) ? [...form[field] as RecordItem[]] : [];
    rows[index] = { ...rows[index], [key]: value };
    updateField(field, rows);
  }

  function addNested(field: "tasks" | "messages") {
    const rows = Array.isArray(form[field]) ? [...form[field] as RecordItem[]] : [];
    rows.push(field === "tasks"
      ? { id: `task-${crypto.randomUUID()}`, title: "", done: false }
      : { id: `message-${crypto.randomUUID()}`, author: "", text: "" });
    updateField(field, rows);
  }

  function removeNested(field: "tasks" | "messages", index: number) {
    const rows = Array.isArray(form[field]) ? [...form[field] as RecordItem[]] : [];
    updateField(field, rows.filter((_, rowIndex) => rowIndex !== index));
  }

  async function save() {
    if (jsonError) { setError(jsonError); return; }
    const missingField = (REQUIRED_FIELDS[type] ?? []).find((key) => {
      const value = form[key];
      return typeof value !== "string" || !value.trim();
    });
    if (missingField) {
      const label = FIELDS[type]?.find((field) => field.key === missingField)?.label ?? missingField;
      setError(`Le champ « ${label} » est obligatoire.`);
      return;
    }
    setLoading(true); setError(""); setSuccess("");
    const payload = { ...form };
    if (editing?.id) payload.id = editing.id;
    try {
      const response = await fetch(`/api/data/${type}`, {
        method: editing?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Erreur lors de l’enregistrement.");
      }
      await fetchItems();
      setEditing(null); setForm({}); setEditorValue("");
      if (type === "media") setMediaFormOpen(false);
      setSuccess(editing ? "Modifications enregistrées." : "Élément ajouté avec succès.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Impossible d’enregistrer les données."); }
    finally { setLoading(false); }
  }

  async function remove(id?: string) {
    if (!id || !confirm("Supprimer cet élément ?")) return;
    setLoading(true); setError(""); setSuccess("");
    try {
      const response = await fetch(`/api/data/${type}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Impossible de supprimer cet élément.");
      await fetchItems(); setSuccess("Élément supprimé.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Erreur de suppression."); }
    finally { setLoading(false); }
  }

  const nestedRows = (field: "tasks" | "messages") => Array.isArray(form[field]) ? form[field] as RecordItem[] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Collection</p><h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{help.title}</h2><p className="mt-1 text-sm text-slate-400">Ajoutez, modifiez ou retirez des éléments.</p></div>
        <div className="flex flex-wrap gap-2"><ImportButton type={type} sample={help.template} onImported={fetchItems} /><button onClick={startNew} className="rounded-xl bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-[#14110a] transition hover:bg-[#efd779]">{type === "media" ? "Ajouter par lien" : "Nouvel élément"}</button><button onClick={fetchItems} disabled={loading} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50">Actualiser</button></div>
      </div>

      {error && <div role="alert" className="rounded-xl border border-red-400/30 bg-red-950/30 p-3 text-sm text-red-200">{error}</div>}
      {success && <div role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-950/20 p-3 text-sm text-emerald-200">{success}</div>}

      <div className="rounded-2xl border border-white/[0.08] bg-[#0b1827] p-4 sm:p-5"><div className="text-sm font-semibold text-white">À propos des champs</div><p className="mt-1 text-sm text-slate-400">{help.expected}</p>{help.tips.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500">{help.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>}</div>

      {type === "media" && <MediaUploader onUploaded={async () => {setMediaFormOpen(false);setEditing(null);setForm({}); await fetchItems();}} />}

      {(type !== "media" || mediaFormOpen) && <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className="md:col-span-2 rounded-2xl border border-white/[0.08] bg-[#0b1827] p-4 sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-3"><div><h3 className="text-base font-semibold text-white">{editing ? "Modifier les informations" : "Informations de l’élément"}</h3><p className="mt-1 text-xs text-slate-500">Remplissez les champs ci-dessous. Les champs obligatoires sont marqués d’un astérisque.</p></div><span className="shrink-0 rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-400">{editing ? "Modification" : "Nouvel élément"}</span></div>

          {FIELDS[type] ? <div className="grid gap-4 sm:grid-cols-2">{FIELDS[type].map((field) => {
            const value = form[field.key];
            const wide = field.type === "textarea" || field.type === "list";
            const required = (REQUIRED_FIELDS[type] ?? []).includes(field.key);
            return <label key={field.key} className={`block text-xs font-medium text-slate-400 ${wide ? "sm:col-span-2" : ""}`}>{field.label}{required ? " *" : ""}
              {field.type === "checkbox" ? <input type="checkbox" checked={value === true} onChange={(event) => updateField(field.key, event.target.checked)} className="h-5 w-5 accent-[#d4af37]" />
                : field.type === "textarea" || field.type === "list" ? <textarea rows={field.type === "list" ? 3 : 4} required={required} value={field.type === "list" ? (Array.isArray(value) ? value.join("\n") : "") : String(value ?? "")} onChange={(event) => updateField(field.key, field.type === "list" ? event.target.value.split(/[\n,]/).map((entry) => entry.trim()).filter(Boolean) : event.target.value)} placeholder={field.placeholder || (field.type === "list" ? "Un élément par ligne" : "")} className={inputClass} />
                : field.type === "select" ? <select value={String(value ?? field.options?.[0] ?? "")} onChange={(event) => updateField(field.key, event.target.value)} className={inputClass}>{field.options?.map((option) => <option key={option} value={option} className="bg-[#0b1827]">{option}</option>)}</select>
                  : <input type={field.type || "text"} required={required} value={String(value ?? "")} onChange={(event) => updateField(field.key, field.type === "number" ? (event.target.value === "" ? "" : Number(event.target.value)) : event.target.value)} placeholder={field.placeholder} className={inputClass} />}
            </label>;
          })}</div> : <p className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-3 text-sm text-amber-100">Aucun formulaire standard n’est défini pour cette collection. Utilisez le JSON dans les options avancées.</p>}

          {type === "contributors" && <div className="mt-5"><ImageField label="Photo ou avatar" value={String(form.avatar||"")}
            title={String(form.name||"")} onChange={url=>updateField("avatar",url)} disabled={loading}/></div>}
          {type === "organizations" && <div className="mt-5"><ImageField label="Logo de l'organisation" value={String(form.logo||"")}
            title={String(form.name||"")} onChange={url=>updateField("logo",url)} disabled={loading}/></div>}

          {type === "projects" && <div className="mt-5 rounded-xl border border-white/[0.07] p-4"><div className="mb-3 flex items-center justify-between"><div><h4 className="text-sm font-medium text-slate-200">Tâches du projet</h4><p className="mt-1 text-xs text-slate-500">Ajoutez les tâches et cochez celles qui sont terminées.</p></div><button type="button" onClick={() => addNested("tasks")} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5">Ajouter une tâche</button></div>
            {nestedRows("tasks").map((task, index) => <div key={String(task.id ?? index)} className="mb-2 flex items-center gap-2"><input aria-label="Titre de la tâche" value={String(task.title ?? "")} onChange={(event) => updateNested("tasks", index, "title", event.target.value)} placeholder="Description de la tâche" className={`${inputClass} mt-0`} /><label className="flex shrink-0 items-center gap-2 text-xs text-slate-400"><input type="checkbox" checked={Boolean(task.done)} onChange={(event) => updateNested("tasks", index, "done", event.target.checked)} className="accent-[#d4af37]" />Terminée</label><button type="button" aria-label="Retirer la tâche" onClick={() => removeNested("tasks", index)} className="rounded-lg px-2 py-2 text-slate-500 hover:bg-red-400/10 hover:text-red-300">×</button></div>)}
            {nestedRows("tasks").length === 0 && <p className="text-xs text-slate-500">Aucune tâche ajoutée.</p>}</div>}

          {type === "discussions" && <div className="mt-5 rounded-xl border border-white/[0.07] p-4"><div className="mb-3 flex items-center justify-between"><div><h4 className="text-sm font-medium text-slate-200">Messages</h4><p className="mt-1 text-xs text-slate-500">Ajoutez les messages initiaux de la discussion.</p></div><button type="button" onClick={() => addNested("messages")} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5">Ajouter un message</button></div>
            {nestedRows("messages").map((message, index) => <div key={String(message.id ?? index)} className="mb-3 grid gap-2 rounded-xl bg-white/[0.02] p-3 sm:grid-cols-[1fr_2fr_auto]"><input aria-label="Auteur" value={String(message.author ?? "")} onChange={(event) => updateNested("messages", index, "author", event.target.value)} placeholder="Auteur" className={`${inputClass} mt-0`} /><input aria-label="Message" value={String(message.text ?? "")} onChange={(event) => updateNested("messages", index, "text", event.target.value)} placeholder="Texte du message" className={`${inputClass} mt-0`} /><button type="button" onClick={() => removeNested("messages", index)} className="rounded-lg px-2 py-2 text-slate-500 hover:bg-red-400/10 hover:text-red-300">Retirer</button></div>)}
            {nestedRows("messages").length === 0 && <p className="text-xs text-slate-500">Aucun message ajouté.</p>}</div>}

          <details className="mt-5 rounded-xl border border-white/[0.07] p-4"><summary className="cursor-pointer text-sm font-medium text-slate-300">Options avancées · modifier le JSON</summary><div className="mt-3"><textarea spellCheck={false} aria-label="Éditeur JSON avancé" className="min-h-56 w-full rounded-xl border border-white/10 bg-[#07111f] p-4 font-mono text-xs leading-6 text-slate-200 outline-none transition focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/10" value={editorValue} onChange={(event) => updateJson(event.target.value)} /><p className={`mt-2 text-xs ${jsonError ? "text-red-300" : "text-slate-500"}`}>{jsonError || "Les changements JSON sont synchronisés avec le formulaire ci-dessus."}</p></div></details>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4"><button onClick={save} disabled={loading || !Object.keys(form).length || Boolean(jsonError)} className="rounded-xl bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-[#14110a] transition hover:bg-[#efd779] disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Enregistrement…" : editing ? "Enregistrer les modifications" : "Ajouter à la plateforme"}</button><button onClick={() => { setEditing(null); setForm({}); setEditorValue(""); setJsonError(""); setError(""); setSuccess(""); }} className="rounded-xl px-4 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">Réinitialiser</button></div>
        </section>

        <aside className="max-h-[70vh] overflow-auto rounded-2xl border border-white/[0.08] bg-[#0b1827] p-4 sm:p-5"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Éléments</h3><span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-slate-400">{items.length}</span></div>{items.length === 0 && !loading && <p className="rounded-xl border border-dashed border-white/10 px-3 py-8 text-center text-xs text-slate-500">Aucun élément. Ajoutez le premier pour commencer.</p>}<ul className="space-y-2">{items.map((item) => <li key={item.id} className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5"><button onClick={() => startEdit(item)} className="min-w-0 flex-1 truncate text-left text-sm text-slate-300 hover:text-white">{item.title || item.name || item.id}</button><div className="flex shrink-0 gap-1"><button onClick={() => startEdit(item)} aria-label={`Modifier ${item.title || item.name || "cet élément"}`} className="rounded-lg px-2 py-1 text-xs text-slate-300 hover:bg-white/5">Modifier</button><button onClick={() => remove(item.id)} aria-label={`Supprimer ${item.title || item.name || "cet élément"}`} className="rounded-lg px-2 py-1 text-xs text-red-300 hover:bg-red-400/10">Supprimer</button></div></li>)}</ul></aside>
      </div>}
      {type === "media" && !mediaFormOpen && <div className="rounded-2xl border border-white/10 bg-[#0b1827] p-4 text-sm text-slate-400">Pour modifier ou publier une image déjà importée, sélectionnez-la dans la liste des médias.</div>}
    </div>
  );
}
