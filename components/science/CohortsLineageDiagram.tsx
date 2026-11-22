"use client";

import { useId, useState } from "react";
import { GitBranch, Users } from "lucide-react";
import ScientificDiagramShell from "./ScientificDiagramShell";
import { cohortsAt, lineageNodes, lineagePath, lineageReferences, lineageSnapshots, lineageViews, visibleLineageNodes, type LineageView } from "@/lib/scientific-content/lineage";
import useDiagramGeometry, { connectorPath, type DiagramGeometry } from "./useDiagramGeometry";
import "./science-diagrams.css";

function transmissionPath(id: string, parentId: string, geometry: DiagramGeometry) {
  const a = geometry.nodes[parentId]; const b = geometry.nodes[id];
  if (!a || !b) return null;
  const targetApproach = b.top - 12;
  let points: [number, number][];
  if (id === "d7") {
    const lane = Math.max(4, Math.min(...["d1", "d4", "d7"].flatMap((node) => geometry.nodes[node] ? [geometry.nodes[node].left] : [])) - 12);
    points = [[a.left - 2, a.cy], [lane, a.cy], [lane, targetApproach], [b.cx, targetApproach], [b.cx, b.top - 2]];
  } else if (id === "d6") {
    const lane = Math.min(geometry.width - 4, Math.max(...["d2", "d3", "d6"].flatMap((node) => geometry.nodes[node] ? [geometry.nodes[node].right] : [])) + 12);
    points = [[a.right + 2, a.cy], [lane, a.cy], [lane, targetApproach], [b.cx, targetApproach], [b.cx, b.top - 2]];
  } else if (id === "d5") {
    const lane = (a.right + (geometry.nodes.d2?.left ?? geometry.width * .65)) / 2;
    points = [[a.right + 2, a.cy], [lane, a.cy], [lane, targetApproach], [b.cx, targetApproach], [b.cx, b.top - 2]];
  } else if (id === "d3") {
    points = [[a.cx, a.bottom + 2], [a.cx, targetApproach], [b.cx, targetApproach], [b.cx, b.top - 2]];
  } else {
    const lane = (a.bottom + b.top) / 2;
    points = [[a.cx, a.bottom + 2], [a.cx, lane], [b.cx, lane], [b.cx, b.top - 2]];
  }
  return connectorPath(points);
}

export default function CohortsLineageDiagram() {
  const [view, setView] = useState<LineageView>("cohorts");
  const [snapshot, setSnapshot] = useState(3);
  const [selectedId, setSelectedId] = useState("d4");
  const uid = useId();
  const activeSnapshot = view === "evolution" ? snapshot : 3;
  const { canvasRef, geometry } = useDiagramGeometry(activeSnapshot);
  const detailId = `${uid}-lineage-detail`;
  const nodes = visibleLineageNodes(activeSnapshot);
  const selected = nodes.find((node) => node.id === selectedId) || nodes[0];
  const path = lineagePath(selected.id);
  const activeView = lineageViews.find((item) => item.id === view)!;
  const cohorts = cohortsAt(activeSnapshot);
  const isRelay = selected.relayFrom !== undefined && activeSnapshot >= selected.relayFrom;
  const cohort = cohorts.find((item) => item.members.includes(selected.id));
  const descendants = nodes.filter((node) => node.parentId === selected.id);
  const labelsForPath = path.map((id) => lineageNodes.find((node) => node.id === id)!.label);

  return <ScientificDiagramShell id="filiations" eyebrow="TRANSMETTRE ET ÉVOLUER" title="Des cohortes aux cascades" description="Un même réseau permet de distinguer les regroupements de Disciples, les filiations et les branches de transmission." mode="illustrative" references={lineageReferences} className="theory-diagram">
    <div className="diagram-controls" role="group" aria-label="Vue des cohortes et filiations">{lineageViews.map((item) => <button key={item.id} type="button" className={`diagram-control ${view === item.id ? "is-active" : ""}`} aria-pressed={view === item.id} onClick={() => setView(item.id)}>{item.label}</button>)}</div>
    <p className="lineage-view-description" aria-live="polite">{activeView.description}</p>
    {view !== "evolution" && <p className="lineage-snapshot-context">Scénario représenté : {lineageSnapshots[activeSnapshot].label}.</p>}
    {view === "evolution" && <div className="lineage-snapshots" role="group" aria-label="Instantané du scénario">{lineageSnapshots.map((item, index) => <button key={item.label} type="button" className={`diagram-control ${snapshot === index ? "is-active" : ""}`} aria-pressed={snapshot === index} onClick={() => setSnapshot(index)}>{item.label}</button>)}</div>}
    <div className="diagram-layout">
      <div>
        <div ref={canvasRef} className={`diagram-canvas lineage-canvas lineage-view-${view}`} role="group" aria-label="Participants du scénario illustratif">
          <svg className="science-connections" viewBox={`0 0 ${geometry?.width || 600} ${geometry?.height || 520}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id={`${uid}-lineage-arrow`} viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--science-edge-color,#257d94)" /></marker>
              <marker id={`${uid}-lineage-arrow-b`} viewBox="0 0 10 10" refX="10" refY="5" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--gold-ink,#785b12)" /></marker>
            </defs>
            {(view === "cohorts" || view === "evolution") && cohorts.map((item) => <rect key={item.id} x={item.x * (geometry?.width || 600) / 100} y={item.y * (geometry?.height || 520) / 100} width={item.width * (geometry?.width || 600) / 100} height={item.height * (geometry?.height || 520) / 100} rx="18" className={`cohort-outline cohort-${item.id}`} />)}
            {geometry && nodes.filter((node) => node.parentId).map((node) => {
              const parent = nodes.find((candidate) => candidate.id === node.parentId)!;
              const highlighted = view !== "cascades" || (path.includes(node.id) && path.includes(parent.id));
              const branchB = view === "branches" && (node.parentId === "d2" || node.id === "d2");
              const route = transmissionPath(node.id, parent.id, geometry);
              return route ? <path key={node.id} className={`science-edge lineage-edge ${highlighted ? "is-active" : ""} ${branchB ? "is-branch-b" : ""}`} d={route} markerEnd={`url(#${uid}-lineage-arrow${branchB ? "-b" : ""})`} /> : null;
            })}
          </svg>
          {(view === "cohorts" || view === "evolution") && cohorts.map((item) => <span key={item.id} className="lineage-cohort-label" style={{ left: `${item.x + 2}%`, top: `${item.y + 1}%` }}>{item.label}</span>)}
          {nodes.map((node) => {
            const relay = node.relayFrom !== undefined && activeSnapshot >= node.relayFrom;
            return <button key={node.id} data-science-node={node.id} type="button" className={`diagram-node lineage-node ${selected.id === node.id ? "is-active" : ""} ${relay || node.id === "m" ? "is-transmitter" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} aria-pressed={selected.id === node.id} aria-controls={detailId} aria-label={`${node.label}${relay ? ", Disciple et Maître-relais dans ce scénario" : node.id === "m" ? "" : ", Disciple"}`} onClick={() => setSelectedId(node.id)}>
              <strong>{node.label}</strong><span>{node.id === "m" ? "Transmet" : relay ? "Maître-relais" : "Disciple"}</span>
            </button>;
          })}
        </div>
        <div className="diagram-legend lineage-legend"><span><i className="legend-line"/>Relation de transmission</span>{(view === "cohorts" || view === "evolution") && <span><Users size={15} aria-hidden="true"/>Regroupement de Disciples</span>}{view === "branches" && <span><i className="legend-line branch-b"/>Branche issue de D2</span>}</div>
      </div>
      <div id={detailId} className="diagram-detail" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">PARTICIPANT DE L’EXEMPLE</span><h3>{selected.label}</h3>
        <p>{selected.id === "m" ? "Le Maître initial accompagne les premiers Disciples. Ses relations se poursuivent lorsque de nouvelles branches apparaissent." : isRelay ? `${selected.label} reste ici Disciple dans sa relation au Maître initial et assure un rôle de Maître-relais auprès d’autres Disciples. Le scénario suppose les conditions de transmission secondaire remplies et la reconnaissance acquise.` : `${selected.label} est un Disciple qui reçoit, transforme et peut contribuer. Sa position dans ce dessin sert à rendre les relations lisibles.`}</p>
        <dl className="lineage-facts"><div><dt>Filiation représentée</dt><dd>{labelsForPath.join(" → ")}</dd></div><div><dt>Regroupement</dt><dd>{cohort?.label || (selected.id === "m" ? "Les cohortes regroupent les Disciples." : "Aucune cohorte représentée à cet instant.")}</dd></div><div><dt>Transmission vers</dt><dd>{descendants.length ? descendants.map((node) => node.label).join(", ") : "Aucune relation représentée à cet instant."}</dd></div></dl>
        <p className="diagram-note"><GitBranch size={17} aria-hidden="true"/>La filiation dépend des relations. Une cohorte peut réunir plusieurs générations.</p>
      </div>
    </div>
    {view === "evolution" && <div className="lineage-event" aria-live="polite"><h3>{lineageSnapshots[snapshot].label}</h3><p>{lineageSnapshots[snapshot].description}</p></div>}
    <details className="science-static-reading"><summary>Lire le scénario sous forme de texte</summary><ol>{lineageSnapshots.map((item) => <li key={item.label}><strong>{item.label}.</strong> {item.description}</li>)}</ol><p>La reconnaissance d’un Maître-relais repose sur les conditions scientifiques de transmission secondaire ; aucun seuil n’est évalué par cette illustration.</p></details>
  </ScientificDiagramShell>;
}
