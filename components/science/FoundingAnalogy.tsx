"use client";

import { useState } from "react";
import { ArrowRight, CircleDot, GitBranch, Lightbulb, Users } from "lucide-react";
import HistoricalPath from "./HistoricalPath";
import { analogyMotifs, historicalPaths, type AnalogyView } from "./founding-analogy-data";
import "./founding-analogy.css";

const motifIcons = [CircleDot, ArrowRight, Users, GitBranch];

export default function FoundingAnalogy() {
  const [view, setView] = useState<AnalogyView>("overview");
  const [selected, setSelected] = useState<Record<string, string>>({});

  const selectNode = (pathId: string, id: string) => {
    setView("detailed");
    setSelected(current => ({ ...current, [pathId]: id }));
  };

  return (
    <section className="new-section new-section-tint tl-analogy" id="analogie" aria-labelledby="tl-analogy-title">
      <div className="new-container">
        <header className="tl-analogy-intro">
          <span className="eyebrow">L’ANALOGIE FONDATRICE</span>
          <h2 id="tl-analogy-title">Et si l’apprentissage ne commençait pas par des livres ?</h2>
          <p>Les systèmes modernes d’IA mobilisent souvent de grandes quantités de données. Pourtant, certaines traditions durables se sont développées sans vaste corpus écrit initial. Leurs enseignements ont traversé des relations humaines, des pratiques et des communautés.</p>
          <p>Bouddha, Socrate et Jésus offrent trois exemples historiques qui ont nourri la réflexion à l’origine de Tradition Learning.</p>
        </header>

        <div className="tl-analogy-toolbar">
          <div className="tl-analogy-legend" aria-label="Légende des parcours historiques">
            <span><CircleDot size={16} aria-hidden="true" /> Source initiale</span>
            <span><ArrowRight size={16} aria-hidden="true" /> Transmission</span>
            <span><Users size={16} aria-hidden="true" /> Communautés</span>
            <span><GitBranch size={16} aria-hidden="true" /> Prolongements</span>
          </div>
          <div className="tl-analogy-switch" role="group" aria-label="Mode de consultation">
            <button type="button" className={view === "overview" ? "is-active" : ""} aria-pressed={view === "overview"} onClick={() => setView("overview")}>Vue d’ensemble</button>
            <button type="button" className={view === "detailed" ? "is-active" : ""} aria-pressed={view === "detailed"} onClick={() => setView("detailed")}>Vue détaillée</button>
          </div>
        </div>

        <div className="tl-analogy-grid">
          {historicalPaths.map(path => (
            <HistoricalPath
              key={path.id}
              path={path}
              view={view}
              selectedId={selected[path.id]}
              onSelect={id => selectNode(path.id, id)}
            />
          ))}
        </div>

        <section className="tl-analogy-motifs" aria-labelledby="tl-analogy-motifs-title">
          <div className="tl-analogy-motifs-heading">
            <span className="eyebrow">LECTURE TRANSVERSALE</span>
            <h3 id="tl-analogy-motifs-title">Un motif commun, plusieurs histoires</h3>
          </div>
          <div className="tl-analogy-motif-grid">
            {analogyMotifs.map((motif, index) => {
              const Icon = motifIcons[index];
              return <div className="tl-analogy-motif" key={motif.label}>
                <Icon size={21} aria-hidden="true" />
                <strong>{motif.label}</strong>
                <p>{motif.description}</p>
              </div>;
            })}
          </div>
          
        </section>

        <div className="tl-analogy-conclusion">
          <Lightbulb size={30} strokeWidth={1.7} aria-hidden="true" />
          <div>
            <h3>De l’observation historique à la théorie</h3>
            <p>Ces exemples ont inspiré une question : comment des systèmes d’apprentissage peuvent-ils transmettre, transformer et développer un héritage vivant entre participants et générations ? Tradition Learning étudie cette question avec trois entités — Maître, Disciple et Communauté — et huit objets fondamentaux : Message, Principes, Valeurs, Vertus, Capacités, Compétences, Pratique et Expérience vécue.</p>
            <p>La mission peut rester ouverte. Les Disciples peuvent découvrir, contribuer et, sous les conditions scientifiques pertinentes, devenir Maîtres-relais.</p>
            <a className="tl-analogy-link" href="#entites">Explorer les fondements scientifiques <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
