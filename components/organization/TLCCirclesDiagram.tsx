"use client";

import { useId, useState } from "react";
import { Code, FlaskConical, MessageSquare, Network, Server, ShieldCheck, Wallet } from "lucide-react";
import ScientificDiagramShell from "@/components/science/ScientificDiagramShell";
import { organizationReferences, tlcCircles, tlcCoreTeam } from "@/lib/scientific-content/organization";
import "@/components/tllib/product-diagrams.css";

const icons = [FlaskConical, Code, ShieldCheck, MessageSquare, Wallet, Server];

export default function TLCCirclesDiagram() {
  const instance = useId();
  const [selected, setSelected] = useState("core-team");
  const current = tlcCircles.find(circle => circle.id === selected) || tlcCoreTeam;
  const detailId = `${instance}-circle-detail`;

  return <ScientificDiagramShell
    id="organisation"
    eyebrow="Les responsabilités de TLC"
    title="Six cercles, une coordination commune"
    description="Le document d’organisation propose six cercles autonomes dans leur domaine, représentés au Core Team. Explorez leurs responsabilités."
    mode="institutional"
    references={organizationReferences}
    className="product-diagram organization-diagram"
  >
    <div className="diagram-layout">
      <div className="diagram-canvas organization-canvas">
        <button type="button" className={`diagram-node organization-core ${selected === "core-team" ? "is-active" : ""}`} aria-pressed={selected === "core-team"} aria-controls={detailId} onClick={() => setSelected("core-team")}><Network size={26} aria-hidden="true"/><strong>Core Team</strong><span>Présidence et leads des cercles</span></button>
        <svg className="organization-bridge" viewBox="0 0 600 50" preserveAspectRatio="none" aria-hidden="true"><path d="M300 0v20M100 50V20h400v30M300 20v30"/><circle cx="300" cy="20" r="4"/></svg>
        <div className="organization-circles" aria-label="Les six cercles proposés">
          {tlcCircles.map((circle, index) => {
            const Icon = icons[index];
            return <button key={circle.id} type="button" className={`diagram-node organization-circle ${selected === circle.id ? "is-active" : ""}`} aria-pressed={selected === circle.id} aria-controls={detailId} onClick={() => setSelected(circle.id)}><Icon size={23} aria-hidden="true"/><strong>{circle.label}</strong><span>{circle.subtitle}</span></button>;
          })}
        </div>
      </div>
      <div id={detailId} className="diagram-detail product-detail" aria-live="polite" aria-atomic="true">
        <span className="diagram-label">Organisation proposée</span>
        <h3>{current.label === "Core Team" ? current.label : `Cercle ${current.label.toLowerCase()}`}</h3>
        <p>{current.description}</p>
        <ul className="organization-responsibilities">{current.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
        <p className="diagram-source">Organisation de TLC · {current.sourceSection}</p>
      </div>
    </div>
    <p className="diagram-note">Cette vue présente la structure proposée dans le document d’organisation. Elle ne constitue pas un annuaire de titulaires ou de mandats en vigueur.</p>
    <details className="product-text-alternative">
      <summary>Lire la version textuelle complète</summary>
      <div>{[tlcCoreTeam, ...tlcCircles].map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.description}</p><ul className="organization-responsibilities">{item.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}</ul><p className="diagram-source">Organisation de TLC · {item.sourceSection}</p></article>)}</div>
    </details>
    <details className="organization-governance">
      <summary>Les instances de gouvernance prévues</summary>
      <dl className="product-definition-list">
        <div><dt>Fondateur / BDFL</dt><dd>Garant de la vision et arbitre en dernier recours. Le document décrit ce rôle comme unique et non héréditaire.</dd></div>
        <div><dt>Conseil d’administration</dt><dd>Orientations stratégiques, supervision de l’organisation et transparence financière.</dd></div>
        <div><dt>Présidence / CEO</dt><dd>Exécution des décisions et animation du Core Team, dont la présidence est membre.</dd></div>
      </dl>
    </details>
  </ScientificDiagramShell>;
}
