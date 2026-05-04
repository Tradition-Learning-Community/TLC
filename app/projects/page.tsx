"use client";
import { useState } from 'react'
import ProjectForm from '@/components/projects/ProjectForm'
import ProjectList from '@/components/projects/ProjectList'

export default function ProjectsPage(){
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Projets</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium">Créer un projet</h2>
          <ProjectForm onCreated={() => setRefreshKey(k => k + 1)} />
        </div>

        <div>
          <h2 className="text-lg font-medium">Projets existants</h2>
          <ProjectList refreshKey={refreshKey} />
        </div>
      </div>
    </section>
  )
}
