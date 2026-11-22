"use client";

import { useId, useState } from "react";
import { Compass, Sprout, Users } from "lucide-react";
import ScientificDiagramShell from "./ScientificDiagramShell";
import { fundamentalEntities, entityRelations, entityReferences, type FundamentalEntityId } from "@/lib/scientific-content/entities";
import useDiagramGeometry, { connectorPath } from "./useDiagramGeometry";
import "./science-diagrams.css";

const icons = { master: Compass, disciple: Sprout, community: Users };
const positions = { master: { left: "24%", top: "24%" }, disciple: { left: "76%", top: "24%" }, community: { left: "50%", top: "76%" } };

export default function FundamentalEntitiesDiagram() {
  const [selected, setSelected] = useState<FundamentalEntityId>("master");
  const uid = useId();
  const { canvasRef, geometry } = useDiagramGeometry();
  const detailId = `${uid}-entity-detail`;
  const active = fundamentalEntities.find((entity) => entity.id === selected)!;
  const relationships = entityRelations.filter((relation) => relation.sourceId === selected || relation.targetId === selected);

  return <ScientificDiagramShell id="entites" eyebrow="LES PARTICIPANTS" title="Trois entités, des relations vivantes" description="Explorez le rôle du Maître, du Disciple et de la Communauté dans la transmission et la transformation." mode="scientific" references={entityReferences} className="theory-diagram">
    <div className="diagram-layout">
      <div>
        <div ref={canvasRef} className="diagram-canvas entities-canvas" role="group" aria-label="Les trois entités fondamentales">
          {geometry && <svg className="science-connections" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
            {entityRelations.map((relation) => {
              const a = geometry.nodes[relation.sourceId]; const b = geometry.nodes[relation.targetId];
              if (!a || !b) return null;
              const points: [number, number][] = relation.id === "master-disciple"
                ? [[a.right + 2, a.cy], [b.left - 2, b.cy]]
                : [[a.cx, a.bottom + 2], [a.cx, b.cy], [relation.sourceId === "master" ? b.left - 2 : b.right + 2, b.cy]];
              return <path key={relation.id} d={connectorPath(points)} className={`science-edge ${relation.sourceId === selected || relation.targetId === selected ? "is-active" : ""}`} />;
            })}
          </svg>}
          {fundamentalEntities.map((entity) => {
            const Icon = icons[entity.id];
            return <button key={entity.id} data-science-node={entity.id} type="button" className={`diagram-node entity-node ${selected === entity.id ? "is-active" : ""}`} style={positions[entity.id]} aria-pressed={selected === entity.id} aria-controls={detailId} onClick={() => setSelected(entity.id)}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <strong>{entity.label}</strong><span>{entity.short}</span>
            </button>;
          })}
          <span className="entities-center-label" aria-hidden="true">RELATIONS TL</span>
        </div>
        <p className="diagram-legend">Les traits relient les entités en interaction. Sélectionnez une entité pour lire la nature de ses relations.</p>
      </div>
      <div id={detailId} className="diagram-detail" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">ENTITÉ FONDAMENTALE</span><h3>{active.label}</h3>
        <p>{active.description}</p>
        <ul className="science-function-list">{active.functions.map((item) => <li key={item}>{item}</li>)}</ul>
        <a className="diagram-source" href={active.reference.url} target="_blank" rel="noopener noreferrer">Définition scientifique<span className="sr-only"> (nouvel onglet)</span></a>
      </div>
    </div>
    <div className="entity-relationships" aria-label={`Relations du ${active.label}`}>
      {relationships.map((relation) => <article key={relation.id} className="entity-relationship"><h3>{relation.label}</h3><p>{relation.description}</p><p className="science-reference-text">{relation.reference.document} · {relation.reference.section}</p></article>)}
    </div>
    <noscript><div className="science-static-reading"><h3>Les trois entités</h3>{fundamentalEntities.map((entity) => <details key={entity.id}><summary>{entity.label}</summary><p>{entity.description}</p><a href={entity.reference.url}>Consulter la définition scientifique</a></details>)}<h3>Leurs relations</h3>{entityRelations.map((relation) => <p key={relation.id}><strong>{relation.label}.</strong> {relation.description}</p>)}</div></noscript>
  </ScientificDiagramShell>;
}
