"use client";

import { useId, useState } from "react";
import { Braces, Code, Cpu, Database, FileCheck, Network, Plug, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScientificDiagramShell from "@/components/science/ScientificDiagramShell";
import { architectureParts, productReferences } from "@/lib/scientific-content/product";
import "./product-diagrams.css";

const icons: Record<string, LucideIcon> = { specs: FileCheck, cpp: Code, python: Braces, core: Cpu, runtime: Network, providers: Plug, arrays: Database, conformance: ShieldCheck };

export default function TllibArchitectureDiagram() {
  const instance = useId();
  const [selected, setSelected] = useState("core");
  const current = architectureParts.find(part => part.id === selected) || architectureParts[3];
  const detailId = `${instance}-architecture-detail`;

  function part(id: string, className = "") {
    const item = architectureParts.find(candidate => candidate.id === id)!;
    const Icon = icons[id];
    return <button type="button" key={id} className={`diagram-node architecture-node ${className} ${selected === id ? "is-active" : ""}`} aria-pressed={selected === id} aria-controls={detailId} onClick={() => setSelected(id)}>
      <Icon size={23} aria-hidden="true"/>
      <span><strong>{item.label}</strong><small>{item.subtitle}</small></span>
    </button>;
  }

  return <ScientificDiagramShell
    id="architecture"
    eyebrow="Architecture de tllib"
    title="Deux interfaces, un moteur scientifique"
    description="L’API C++ et l’API Python donnent accès à une même implémentation C++20. Sélectionnez une couche pour comprendre sa responsabilité et consulter sa documentation."
    mode="technical"
    references={productReferences}
    className="product-diagram architecture-diagram"
  >
    <div className="diagram-layout">
      <div className="diagram-canvas architecture-canvas">
        <div className="architecture-specs">{part("specs")}<p>Construction et validation · hors dépendances d’exécution</p></div>
        <div className="architecture-apis">{part("cpp")}{part("python")}</div>
        <svg className="architecture-bridge" viewBox="0 0 600 48" preserveAspectRatio="none" aria-hidden="true"><path d="M150 0v22h300V0M300 22v26"/><circle cx="300" cy="22" r="4"/></svg>
        {part("core", "architecture-core")}
        <p className="architecture-services-label">Services et interfaces d’exécution</p>
        <div className="architecture-services">{part("runtime")}{part("providers")}{part("arrays")}</div>
        {part("conformance", "architecture-conformance")}
      </div>
      <div id={detailId} className="diagram-detail product-detail" aria-live="polite" aria-atomic="true">
        <span className="diagram-label">Responsabilité technique</span>
        <h3>{current.label}</h3>
        <p>{current.description}</p>
        <p className="product-detail-subtitle">{current.subtitle}</p>
        <a className="diagram-source" href={current.url} target="_blank" rel="noopener noreferrer">Lire la documentation : {current.section}<span className="sr-only"> (nouvel onglet)</span></a>
      </div>
    </div>
    <p className="diagram-note">Cette carte explique l’architecture documentée. Le niveau de support scientifique se vérifie pour chaque fonctionnalité du catalogue.</p>
    <details className="product-text-alternative">
      <summary>Lire la version textuelle complète</summary>
      <div>{architectureParts.map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.description}</p><a className="diagram-source" href={item.url} target="_blank" rel="noopener noreferrer">Documentation : {item.section}<span className="sr-only"> (nouvel onglet)</span></a></article>)}</div>
    </details>
  </ScientificDiagramShell>;
}
