"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit, Eye, Factory, FlaskConical, MessageSquareText } from "lucide-react";

export const studioScenarios = [
  {
    id: "sante",
    label: "Santé",
    Icon: Eye,
    situation: "Un centre de santé souhaite étudier un outil d’aide à l’identification de pathologies oculaires. Les images disponibles ne représentent pas suffisamment les patients de sa région.",
    mission: "Concevoir et étudier un système adapté à l’identification de pathologies oculaires dans son contexte.",
    probleme: "Disposer de connaissances et d’observations pertinentes malgré une représentativité limitée des images disponibles.",
    ressources: "Images existantes, expertise médicale, observations locales à collecter et moyens de calcul disponibles.",
    roles: "Maître(s) et Disciple(s) à identifier ou constituer selon leurs Capacités ; Communauté et relations initiales à organiser.",
    capacites: "Analyse d’images, acquisition d’observations, évaluation et adaptation au contexte.",
  },
  {
    id: "industrie",
    label: "Industrie",
    Icon: Factory,
    situation: "Une équipe de maintenance souhaite améliorer le suivi d’équipements industriels. Les historiques de panne sont incomplets et les conditions d’utilisation varient selon les sites.",
    mission: "Étudier un système capable d’accompagner le suivi et l’anticipation des incidents d’équipement.",
    probleme: "Articuler des observations hétérogènes, l’expertise du terrain et des événements peu documentés.",
    ressources: "Historique de maintenance, mesures disponibles, spécialistes des équipements et environnement de test.",
    roles: "Maître(s), Disciple(s) et Communauté à constituer selon les expertises, les ressources et les conditions pertinentes.",
    capacites: "Observation de séries temporelles, diagnostic, suivi des interventions et évaluation.",
  },
] as const;

export default function TLStudioPreview() {
  const [selected, setSelected] = useState<(typeof studioScenarios)[number]["id"]>("sante");
  const scenario = studioScenarios.find(item => item.id === selected)!;
  return (
    <section className="tlstudio-preview" aria-labelledby="studio-preview-title">
      <div className="tlstudio-preview-heading">
        <div>
          <span className="eyebrow">APERÇU D’INTERFACE</span>
          <h2 id="studio-preview-title">Partir d’une situation concrète.</h2>
          <p>Deux exemples montrent comment TL Studio pourrait aider à passer d’une description libre à une proposition de constitution TL.</p>
        </div>
        <span className="tlstudio-preview-tag">Concept interactif</span>
      </div>

      <div className="tlstudio-preview-layout">
        <div className="tlstudio-brief">
          <div className="tlstudio-brief-top"><MessageSquareText size={23} aria-hidden="true" /><strong>Décrire le besoin</strong></div>
          <div className="tlstudio-scenario-tabs" role="group" aria-label="Exemple à explorer">
            {studioScenarios.map(item => {
              const Icon = item.Icon;
              return <button key={item.id} type="button" aria-pressed={selected === item.id}
                className={selected === item.id ? "is-active" : ""} onClick={() => setSelected(item.id)}>
                <Icon size={17} aria-hidden="true" /> {item.label}
              </button>;
            })}
          </div>
          <div className="tlstudio-prompt">
            <span>Situation décrite par l’utilisateur</span>
            <p>{scenario.situation}</p>
          </div>
          <div className="tlstudio-ai-pill"><BrainCircuit size={18} aria-hidden="true" /> Assistance par modèle de langage envisagée</div>
        </div>
        <div className="tlstudio-preview-arrow" aria-hidden="true"><ArrowRight size={23}/></div>
        <div className="tlstudio-result">
          <div className="tlstudio-result-head"><FlaskConical size={22} aria-hidden="true" /><div><strong>Proposition à examiner</strong><span>Éléments initiaux d’un système Tradition Learning</span></div></div>
          <div className="tlstudio-result-grid" aria-live="polite">
            <article><span>Mission</span><p>{scenario.mission}</p></article>
            <article><span>Problème</span><p>{scenario.probleme}</p></article>
            <article><span>Ressources</span><p>{scenario.ressources}</p></article>
            <article><span>Rôles initiaux</span><p>{scenario.roles}</p></article>
            <article className="tlstudio-result-wide"><span>Capacités à associer</span><p>{scenario.capacites}</p></article>
          </div>
          <div className="tlstudio-objects-panel"><strong>Contenus à approfondir avec TL Studio</strong><p>Message, Principes, Valeurs, Vertus, Compétences, Pratique et Expérience vécue : les objets pertinents et leurs relations pourront être explorés et précisés avec l’utilisateur au fil de la constitution.</p></div>
        </div>
      </div>
      <p className="tlstudio-preview-note">Cet aperçu illustre l’interface envisagée. Les propositions sont des exemples de conception ; aucun système n’est exécuté ici.</p>
    </section>
  );
}
