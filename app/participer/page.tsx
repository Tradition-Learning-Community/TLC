"use client";
import { useState } from "react";
import InquiryForm from "@/components/inquiry-form";
import type { InquiryKind } from "@/lib/inquiries";
const options: { kind: InquiryKind; title: string; description: string }[] = [
 { kind: "join", title: "Rejoindre TLC", description: "Participer aux activités de la communauté." },
 { kind: "project", title: "Contribuer aux travaux", description: "Recherche, développement, documentation, tests ou expérimentation." },
 { kind: "partnership", title: "Devenir partenaire", description: "Proposer une coopération scientifique, technique ou institutionnelle." },
 { kind: "support", title: "Soutenir TLC", description: "Proposer un soutien humain, matériel, financier ou logistique." },
];
export default function ParticiperPage() {
  const [kind, setKind] = useState<InquiryKind>("join");
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">CONTRIBUER À TLC</span><h1>Participer</h1><p>La recherche progresse grâce aux personnes et aux organisations qui y consacrent leurs idées, leurs compétences et leurs ressources.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="grid-3">{options.map(o=><button key={o.kind} type="button" onClick={() => setKind(o.kind)} aria-pressed={kind===o.kind}
      className={"card text-left cursor-pointer " + (kind === o.kind ? "ring-2 ring-[var(--gold)]" : "")}><h3>{o.title}</h3><p>{o.description}</p></button>)}</div>
      <div className="mt-12 max-w-3xl rounded-xl border border-[var(--line)] bg-[var(--card)] p-6 md:p-9" id="demande">
        <h2 className="section-title" style={{fontSize:32}}>{options.find(o=>o.kind===kind)?.title}</h2><p className="section-copy">Présentez votre demande à l'équipe TLC.</p>
        <InquiryForm key={kind} kind={kind}/>
      </div>
    </section>
  </div>;
}
