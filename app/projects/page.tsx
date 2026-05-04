"use client";
import { useState } from 'react'
import ProjectForm from '@/components/projects/ProjectForm'
import ProjectList from '@/components/projects/ProjectList'

export default function ProjectsPage(){
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <section className="content-shell">
      <header className="content-header">
        <span className="content-kicker">Pilotage</span>
        <h1 className="content-title">Projets</h1>
        <p className="content-lead">
          Créez de nouvelles initiatives, suivez l'avancement et consultez les
          projets existants de la communauté TLC.
        </p>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="content-panel">
          <h2 className="content-panel-title">Créer un projet</h2>
          <ProjectForm onCreated={() => setRefreshKey(k => k + 1)} />
        </div>

        <div className="content-panel">
          <h2 className="content-panel-title">Projets existants</h2>
          <ProjectList refreshKey={refreshKey} />
        </div>
      </div>
    </section>
  )
}
