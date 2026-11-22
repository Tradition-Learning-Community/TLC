"use client";

import { useId, useState } from "react";
import { BookOpen, Compass, Fingerprint, Gem, Layers, Network, Repeat2, Sparkles } from "lucide-react";
import ScientificDiagramShell from "./ScientificDiagramShell";
import { fundamentalObjects, objectRelations, objectReferences, objectStructures, type FundamentalObjectId } from "@/lib/scientific-content/fundamental-objects";
import useDiagramGeometry, { connectorPath } from "./useDiagramGeometry";
import "./science-diagrams.css";

const icons = [BookOpen, Compass, Gem, Fingerprint, Sparkles, Layers, Repeat2, Network];

export default function FundamentalObjectsExplorer() {
  const [selected, setSelected] = useState<FundamentalObjectId>("message");
  const [view, setView] = useState<"overview" | "relations">("overview");
  const uid = useId();
  const { canvasRef, geometry } = useDiagramGeometry();
  const detailId = `${uid}-object-detail`;
  const active = fundamentalObjects.find((object) => object.id === selected)!;
  const relationships = objectRelations.filter((relation) => relation.sourceId === selected || relation.targetId === selected);
  const related = new Set(relationships.flatMap((relation) => [relation.sourceId, relation.targetId]));

  return <ScientificDiagramShell id="objets" eyebrow="L’ARCHITECTURE DE LA TRADITION" title="Huit objets fondamentaux" description="Chaque objet possède sa définition, ses fonctions et ses relations. Leur complémentarité donne sa richesse à la Tradition." mode="scientific" references={objectReferences} className="theory-diagram">
    <div className="diagram-controls" role="group" aria-label="Mode de lecture des huit objets">
      <button type="button" className={`diagram-control ${view === "overview" ? "is-active" : ""}`} aria-pressed={view === "overview"} onClick={() => setView("overview")}>Vue d’ensemble</button>
      <button type="button" className={`diagram-control ${view === "relations" ? "is-active" : ""}`} aria-pressed={view === "relations"} onClick={() => setView("relations")}>Relations documentées</button>
    </div>
    <div className="diagram-layout">
      <div>
        <div ref={canvasRef} className={`diagram-canvas objects-canvas ${view === "relations" ? "show-relations" : ""}`} role="group" aria-label="Les huit objets fondamentaux">
          {view === "relations" && geometry && <svg className="science-connections" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
            <defs><marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--science-edge-color,#257d94)" /></marker></defs>
            {relationships.map((relation) => {
              const a = geometry.nodes[relation.sourceId]; const b = geometry.nodes[relation.targetId];
              if (!a || !b) return null;
              const lane = geometry.width / 2;
              const start = a.cx < lane ? a.right + 2 : a.left - 2;
              const end = b.cx < lane ? b.right + 2 : b.left - 2;
              const points: [number, number][] = [[start, a.cy], [lane, a.cy], [lane, b.cy], [end, b.cy]];
              return <path key={relation.id} className="science-edge is-active" d={connectorPath(points)} markerEnd={`url(#${uid}-arrow)`} />;
            })}
          </svg>}
          <div className="objects-node-grid">
            {fundamentalObjects.map((object, index) => {
              const Icon = icons[index];
              return <button key={object.id} data-science-node={object.id} id={`${uid}-object-${object.id}`} type="button" className={`diagram-node object-node ${selected === object.id ? "is-active" : ""} ${view === "relations" && related.has(object.id) ? "is-related" : ""}`} aria-pressed={selected === object.id} aria-controls={detailId} onClick={() => setSelected(object.id)}>
                <Icon size={23} strokeWidth={1.5} aria-hidden="true"/><strong>{object.label}</strong><span>{object.short}</span>
              </button>;
            })}
          </div>
        </div>
        <p className="diagram-legend">{view === "relations" ? "Les traits soulignent les articulations décrites ci-contre. Cette sélection ne représente pas l’ensemble des relations possibles." : "Sélectionnez un objet pour explorer sa définition. Les huit objets sont présentés sans centre ni classement hiérarchique."}</p>
      </div>
      <div id={detailId} className="diagram-detail object-detail" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">OBJET FONDAMENTAL</span><h3>{active.label}</h3><p>{active.description}</p>
        {view === "overview" ? <><ul className="science-function-list">{active.functions.map((item) => <li key={item}>{item}</li>)}</ul><details className="object-structure" key={active.id}><summary>Structure dans la définition</summary><ul>{objectStructures[active.id].map((item) => <li key={item}>{item}</li>)}</ul></details><a className="diagram-source" href={active.reference.url} target="_blank" rel="noopener noreferrer">{active.reference.section}<span className="sr-only"> (nouvel onglet)</span></a></> : <div className="object-relations"><h4>Articulations documentées</h4>{relationships.map((relation) => {
          const other = fundamentalObjects.find((object) => object.id === (relation.sourceId === selected ? relation.targetId : relation.sourceId))!;
          return <article key={relation.id}><p>{relation.relation}</p><button type="button" className="science-inline-button" onClick={() => { setSelected(other.id); document.getElementById(`${uid}-object-${other.id}`)?.focus(); }}>Explorer {other.label}</button><a className="diagram-source" href={relation.reference.url} target="_blank" rel="noopener noreferrer">{relation.reference.section}<span className="sr-only"> (nouvel onglet)</span></a></article>;
        })}</div>}
      </div>
    </div>
    <noscript><div className="science-static-reading"><h3>Définitions des huit objets</h3>{fundamentalObjects.map((object) => <details key={object.id}><summary>{object.label}</summary><p>{object.description}</p><a href={object.reference.url}>{object.reference.section}</a></details>)}<h3>Articulations documentées</h3>{objectRelations.map((relation) => <p key={relation.id}>{relation.relation} <a href={relation.reference.url}>Source</a></p>)}</div></noscript>
  </ScientificDiagramShell>;
}
