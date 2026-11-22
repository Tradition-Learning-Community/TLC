"use client";

import { useState } from "react";
import { Check, Code2, Handshake, HeartHandshake, Users } from "lucide-react";
import InquiryForm from "@/components/inquiry-form";
import type { InquiryKind } from "@/lib/inquiries";
import "./editorial-pages.css";

const options = [
  { kind: "join", title: "Rejoindre TLC", description: "Prendre part aux activités et aux échanges de la communauté.", detail: "Présentez votre parcours et les sujets qui vous intéressent.", icon: Users },
  { kind: "project", title: "Contribuer aux travaux", description: "Recherche, développement, documentation, tests ou expérimentation.", detail: "Indiquez le travail auquel vous souhaitez contribuer et ce que vous pouvez apporter.", icon: Code2 },
  { kind: "partnership", title: "Devenir partenaire", description: "Construire une coopération scientifique, technique ou institutionnelle.", detail: "Présentez votre organisation et la collaboration que vous envisagez.", icon: Handshake },
  { kind: "support", title: "Soutenir TLC", description: "Apporter du temps, du matériel, un financement ou un appui logistique.", detail: "Décrivez le soutien que vous souhaitez proposer à la communauté.", icon: HeartHandshake },
] satisfies { kind: InquiryKind; title: string; description: string; detail: string; icon: typeof Users }[];

export default function ParticipationChoices() {
  const [kind, setKind] = useState<InquiryKind>("join");
  const selected = options.find(option => option.kind === kind) || options[0];
  return <div className="participation-layout">
    <div className="participation-options"><div className="section-head"><span className="eyebrow">VOTRE CONTRIBUTION</span><h2 className="section-title">Quelle place souhaitez-vous prendre ?</h2><p className="section-copy">Choisissez la proposition qui correspond à votre démarche.</p></div>
      <div className="participation-choices" role="group" aria-label="Choisir le type de participation">{options.map(option => {
        const Icon = option.icon;
        return <button key={option.kind} type="button" className="participation-choice" aria-pressed={kind === option.kind} aria-controls="participation-request" onClick={() => setKind(option.kind)}><span className="editorial-icon"><Icon aria-hidden="true" size={23} /></span><span><strong>{option.title}</strong><span>{option.description}</span></span><span className="participation-check" aria-hidden="true">{kind === option.kind && <Check size={18} />}</span></button>;
      })}</div>
      <p className="participation-note">Les demandes sont examinées par l’équipe TLC selon les activités et les possibilités de collaboration.</p>
    </div>
    <div className="participation-form" id="participation-request"><div className="participation-form-heading" aria-live="polite" aria-atomic="true"><span className="eyebrow">VOTRE DEMANDE</span><h2>{selected.title}</h2><p>{selected.detail}</p></div><InquiryForm kind={kind} /></div>
  </div>;
}
