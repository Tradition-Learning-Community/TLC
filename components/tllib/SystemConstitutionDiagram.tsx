"use client";

import { useId, useState } from "react";
import { Box, Database, Fingerprint, ScanLine, Target, Users } from "lucide-react";
import ScientificDiagramShell from "@/components/science/ScientificDiagramShell";
import { constitutionReference, constitutionResponsibilities, productReferences, systemReadings } from "@/lib/scientific-content/product";
import "./product-diagrams.css";

const icons = [Target, Database, Users, Fingerprint, ScanLine, Box];

export default function SystemConstitutionDiagram() {
  const instance = useId();
  const [selected, setSelected] = useState(0);
  const [reading, setReading] = useState(0);
  const responsibility = constitutionResponsibilities[selected];
  const currentReading = systemReadings[reading];
  const detailId = `${instance}-responsibility`;
  const readingId = `${instance}-reading`;

  return <ScientificDiagramShell
    id="constitution"
    eyebrow="Constituer un système TL"
    title="Six responsabilités, une fondation évolutive"
    description="Explorez les éléments à réunir pour constituer un système. Ces responsabilités s’articulent selon le contexte ; elles n’imposent pas six étapes successives."
    mode="technical"
    references={[constitutionReference, ...productReferences]}
    className="product-diagram constitution-diagram"
  >
    <div className="diagram-layout">
      <div className="diagram-canvas constitution-canvas">
        <div className="constitution-scope">
          <svg viewBox="0 0 160 48" aria-hidden="true" className="constitution-symbol"><path d="M18 24h124M42 8v32M80 3v42M118 8v32"/><circle cx="42" cy="24" r="6"/><circle cx="80" cy="24" r="9"/><circle cx="118" cy="24" r="6"/></svg>
          <span>Responsabilités associées</span>
        </div>
        <div className="constitution-grid" aria-label="Responsabilités de constitution">
          {constitutionResponsibilities.map((item, index) => {
            const Icon = icons[index];
            return <button
              key={item.id}
              type="button"
              className={`diagram-node constitution-node ${selected === index ? "is-active" : ""}`}
              aria-pressed={selected === index}
              aria-controls={detailId}
              onClick={() => setSelected(index)}
            >
              <Icon size={23} aria-hidden="true"/>
              <strong>{item.label}</strong>
              <span>{item.summary}</span>
            </button>;
          })}
        </div>
      </div>
      <div className="diagram-detail product-detail" id={detailId} aria-live="polite" aria-atomic="true">
        <span className="diagram-label">Responsabilité sélectionnée</span>
        <h3>{responsibility.label}</h3>
        <p>{responsibility.description}</p>
        <dl className="product-definition-list">
          <div><dt>Ce que fournit le développeur</dt><dd>{responsibility.developer}</dd></div>
          <div><dt>Ce que la constitution organise</dt><dd>{responsibility.system}</dd></div>
        </dl>
      </div>
    </div>
    <div className="system-readings">
      <h3>Quatre distinctions pour lire le résultat</h3>
      <p>Chacune répond à une question différente. La constitution du système ne suffit pas à établir son apprentissage.</p>
      <div className="diagram-controls system-reading-controls" aria-label="Distinctions scientifiques">
        {systemReadings.map((item, index) => <button key={item.id} type="button" className={`diagram-control ${reading === index ? "is-active" : ""}`} aria-pressed={reading === index} aria-controls={readingId} onClick={() => setReading(index)}>{item.label}</button>)}
      </div>
      <div id={readingId} className="system-reading-detail" aria-live="polite" aria-atomic="true">
        <div><h4>{currentReading.title}</h4><p>{currentReading.description}</p></div>
        <div className="system-reading-evidence"><span className="diagram-label">Éléments à établir</span><p>{currentReading.evidence}</p></div>
      </div>
    </div>
    <details className="product-text-alternative">
      <summary>Lire la version textuelle complète</summary>
      <div>{constitutionResponsibilities.map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.description}</p><dl className="product-definition-list"><div><dt>Apport du développeur</dt><dd>{item.developer}</dd></div><div><dt>Constitution</dt><dd>{item.system}</dd></div></dl></article>)}</div>
      <div>{systemReadings.map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.description}</p><p><strong>Éléments à établir : </strong>{item.evidence}</p></article>)}</div>
    </details>
  </ScientificDiagramShell>;
}
