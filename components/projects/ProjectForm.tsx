"use client";
import { useState } from "react";

export default function ProjectForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (res.ok) {
      setTitle(''); setDescription('');
      onCreated && onCreated();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Titre</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <button type="submit" disabled={loading} className="rounded bg-primary px-4 py-2 text-white">
          {loading ? 'Envoi...' : 'Créer le projet'}
        </button>
      </div>
    </form>
  );
}
