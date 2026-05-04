"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Project = { id: string; title: string; description?: string };

export default function ProjectList({ refreshKey }: { refreshKey?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);

  async function load() {
    const res = await fetch('/api/projects');
    if (res.ok) setProjects(await res.json());
  }

  useEffect(() => { load(); }, [refreshKey]);

  return (
    <div className="space-y-4">
      {projects.length === 0 && <p>Aucun projet.</p>}
      {projects.map(p => (
        <div key={p.id} className="rounded border p-4">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-zinc-700">{p.description}</p>
          <div className="mt-2">
            <Link href={`/projects/${p.id}`} className="text-primary">Voir</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
