"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'

type Task = { id: string; title: string; done: boolean };

export default function ProjectDetail(){
  // Note: useParams in client components works with next/navigation
  const params = useParams() as { id: string };
  const [project, setProject] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState('');

  async function load(){
    const res = await fetch(`/api/projects/${params.id}`);
    if (res.ok) setProject(await res.json());
  }

  async function addTask(e: React.FormEvent){
    e.preventDefault();
    if (!taskTitle) return;
    await fetch(`/api/projects/${params.id}/tasks`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title: taskTitle })
    });
    setTaskTitle('');
    load();
  }

  async function toggleTask(tid: string, done: boolean){
    await fetch(`/api/projects/${params.id}/tasks/${tid}`, {
      method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ done: !done })
    });
    load();
  }

  useEffect(() => { if (params?.id) load(); }, [params?.id]);

  if (!project) return <div className="mx-auto max-w-3xl px-6 py-16">Chargement...</div>

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">{project.title}</h1>
      <p className="mt-2 text-zinc-700">{project.description}</p>

      <h2 className="mt-6 text-lg font-medium">Tâches</h2>
      <form onSubmit={addTask} className="mt-2 flex gap-2">
        <input className="flex-1 rounded border px-3 py-2" value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} placeholder="Nouvelle tâche" />
        <button className="rounded bg-primary px-3 py-2 text-white">Ajouter</button>
      </form>

      <ul className="mt-4 space-y-2">
        {project.tasks?.map((t: Task) => (
          <li key={t.id} className="flex items-center justify-between rounded border p-2">
            <div className={t.done ? 'line-through' : ''}>{t.title}</div>
            <div className="flex gap-2">
              <button onClick={()=>toggleTask(t.id, t.done)} className="text-sm text-primary">{t.done ? 'Réouvrir' : 'Terminer'}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
