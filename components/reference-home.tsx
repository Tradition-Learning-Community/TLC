"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InquiryForm from "@/components/inquiry-form";
import type { Article } from "@/lib/editorial";
import type { TLCEvent, TLCOrganization } from "@/lib/public-content";

type Person = { id:string; name:string; avatar:string; github:string };
type Dialog = { kind:"profile"|"project"|"event"|"join"; title?:string; person?:Person } | null;


export default function ReferenceHome({ articles, events, contributors: people, organizations }: { articles: Article[]; events: TLCEvent[]; contributors: Person[]; organizations: TLCOrganization[] }){
 const [dialog,setDialog]=useState<Dialog>(null);const [success,setSuccess]=useState(false);
 useEffect(()=>{const nodes=Array.from(document.querySelectorAll(".home-content section:not(.hero-band):not(.cta-band)"));nodes.forEach(node=>node.classList.add("scroll-reveal"));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.01});nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!dialog)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setDialog(null)};document.addEventListener("keydown",close);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",close);document.body.style.overflow=""}},[dialog]);
 const open=(value:Dialog)=>{setSuccess(false);setDialog(value)};

 return <div id="top" className="home-content">
  <section className="hero-band home-hero"><div className="hero-inner"><div className="hero-copy">
    <div className="eyebrow"><span className="hero-eyebrow-rule"/> TRADITION LEARNING COMMUNITY</div>
    <h1>Tradition Learning,<br/>une autre voie pour l’apprentissage des IA.</h1>
    <p>Découvrez la théorie Tradition Learning, la bibliothèque <strong>tllib</strong> qui permet de constituer des systèmes TL et la communauté scientifique qui porte leur développement.</p>
    <div className="hero-actions"><Link href="/tradition-learning" className="button button-gold">Comprendre Tradition Learning</Link><Link href="/tllib" className="button button-outline">Découvrir tllib</Link></div>
    </div><div className="hero-image-frame"><Image src="/Réseau néon de l’Afrique futuriste.png" alt="Représentation artistique d’un réseau de connexions" fill priority sizes="(max-width: 700px) 100vw, 42vw"/></div></div></section>


  <section className="mission-intro section"><div className="container mission-grid">
    <div><span className="eyebrow">L’ORGANISATION</span><h2 className="section-title">Tradition Learning Community</h2>
      <p className="section-copy">TLC est une communauté scientifique consacrée à la recherche sur Tradition Learning, au développement de tllib et aux collaborations autour de ces travaux.</p>
      <Link href="/about" className="text-link">Découvrir TLC et son organisation →</Link>
    </div><div className="mission-points">
      <article className="mission-point"><span>01</span><div><h3>Recherche scientifique</h3><p>Étudier, formaliser et évaluer Tradition Learning à partir de ses fondements théoriques.</p></div></article>
      <article className="mission-point"><span>02</span><div><h3>Développement de tllib</h3><p>Concevoir, implémenter et tester une bibliothèque C++ et Python pour les systèmes TL.</p></div></article>
      <article className="mission-point"><span>03</span><div><h3>Participation et échanges</h3><p>Associer chercheurs, développeurs, contributeurs et partenaires à des travaux documentés.</p></div></article>
    </div></div></section>



  <section className="workframe section"><div className="container">
    <div className="section-head"><span className="eyebrow">EXPLORER</span><h2 className="section-title">Une théorie, une bibliothèque, une communauté</h2><p className="section-copy">Trois portes d’entrée complémentaires, réunies sur le site public de TLC.</p></div>
    <div className="grid-3">
      <article className="card"><span className="eyebrow">01 · THÉORIE</span><h3>Tradition Learning</h3><p>Ses entités fondamentales, ses huit objets, les relations, la transmission et l’évolution des Traditions.</p><Link href="/tradition-learning" className="card-link">Explorer la théorie →</Link></article>
      <article className="card"><span className="eyebrow">02 · BIBLIOTHÈQUE</span><h3>tllib</h3><p>La bibliothèque de référence pour constituer et faire fonctionner des systèmes Tradition Learning, avec ses API et ses contrats.</p><Link href="/tllib" className="card-link">Découvrir le développement →</Link></article>
      <article className="card"><span className="eyebrow">03 · ORGANISATION</span><h3>La communauté TLC</h3><p>Son organisation, ses participants, les projets ouverts et les possibilités de contribution ou de collaboration.</p><Link href="/community" className="card-link">Rencontrer la communauté →</Link></article>
    </div></div></section>

  <section className="steps section"><div className="container"><div className="section-head"><h2 className="section-title">Rejoindre TLC en quatre étapes</h2></div><div className="grid-4 steps-grid">{[["01","Présenter votre intérêt","Transmettez vos coordonnées et les domaines auxquels vous aimeriez contribuer."],["02","Découvrir les travaux","Parcourez Tradition Learning, tllib et les projets effectivement publiés."],["03","Échanger avec TLC","L’équipe examine votre proposition et vous oriente selon les possibilités."],["04","Participer","Contribuez à la recherche, au développement, à la documentation ou aux activités ouvertes."]].map(([n,title,copy])=><article className="step-card" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

{people.length > 0 && <section className="contributors-home section"><div className="container"><div className="section-head"><h2 className="section-title">Ils contribuent à TLC</h2><p className="section-copy">Découvrez les personnes référencées dans les projets de notre communauté.</p></div><div className="flex flex-wrap gap-4">{people.slice(0,10).map(person=><a key={person.id} href={person.github.startsWith("https://") ? person.github : "https://github.com/" + person.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] py-2 pl-2 pr-5 transition hover:border-[var(--gold)]"><img src={person.avatar} alt="" className="h-12 w-12 rounded-full object-cover" /><span className="text-sm font-semibold">{person.name}</span></a>)}</div><p className="mt-5"><Link className="text-link" href="/community">Découvrir la communauté →</Link></p></div></section>}
  {organizations.length > 0 && <section className="section container"><div className="section-head"><h2 className="section-title">Organisations et soutiens</h2></div><div className="flex flex-wrap gap-6">{organizations.slice(0,8).map(org=><div key={org.id} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">{org.logo && <img src={org.logo} alt="" className="h-12 w-20 object-contain"/>}<div><strong>{org.name}</strong><small className="block text-[var(--muted)]">{org.category}</small></div></div>)}</div><Link className="text-link" href="/community">Voir les organisations →</Link></section>}

{articles.length > 0 && <section className="news-home section"><div className="container"><div className="section-head"><h2 className="section-title">Actualités TLC</h2><p className="section-copy">Les dernières nouvelles de la recherche, des projets et de la communauté.</p></div><div className="grid-3">{articles.slice(0,3).map(article=><article className="card" key={article.id}>{article.coverImage && <img src={article.coverImage} alt="" loading="lazy" style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",marginBottom:18}}/>}<span className="eyebrow">{article.category} · {article.publishedAt?.slice(0,10)}</span><h3>{article.title}</h3><p>{article.summary}</p><Link className="card-link" href={"/actualites/"+article.slug}>Lire l'article →</Link></article>)}</div><Link className="text-link" href="/actualites">Toutes les actualités →</Link></div></section>}
  {events.length > 0 && <section className="events-home section"><div className="container"><div className="section-head"><h2 className="section-title">Événements à venir</h2><p className="section-copy">Les rencontres et activités annoncées par TLC.</p></div>{events.length === 0 ? <p className="section-copy">Aucun événement annoncé pour le moment.</p> : <div className="event-table">{events.map(event=><article className="event-row" key={event.id}><div className="event-date">{new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium"}).format(new Date(event.date+"T12:00:00Z"))}</div><div className="event-time">◷　{event.time || "Horaire à confirmer"}</div><div className="event-description"><h3>{event.title}</h3><span>{event.location || event.description || ""}</span></div>{event.registrationUrl?<a className="event-register" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Informations ↗</a>:<button className="event-register" onClick={()=>open({kind:"event",title:event.title})}>Se renseigner ↗</button>}</article>)}</div>}<div className="event-more"><Link href="/events">Voir l'agenda →</Link></div></div></section>}



  <section className="join-band section" id="join"><div className="container join-grid"><div><span className="eyebrow">PARTICIPER À TLC</span><h2 className="section-title">Rejoindre la communauté</h2><p className="section-copy">Présentez votre parcours et le domaine qui vous intéresse. L’équipe TLC examinera votre proposition et pourra vous orienter vers les travaux ouverts.</p><small>Vos informations servent uniquement à traiter votre demande d’adhésion.</small></div><JoinForm/></div></section>

  <section className="faq-home section"><div className="container faq-grid"><div><h2 className="section-title">Questions fréquentes</h2><p className="section-copy">Les premières réponses sur Tradition Learning et TLC.</p></div><div className="faq">
    {[
      ["Qu’est-ce que Tradition Learning ?","Tradition Learning est une approche scientifique fondée sur la transmission, la transformation et le développement d’une Tradition vivante. Elle n’est pas limitée à un type de modèle ou une modalité d’IA."],
      ["À quoi sert tllib ?","tllib vise à permettre aux développeurs de constituer et de faire fonctionner des systèmes Tradition Learning à travers une bibliothèque C++ et Python."],
      ["Qui peut contribuer à TLC ?","Chercheurs, développeurs, documentalistes, bénévoles et organisations peuvent proposer une contribution selon les activités ouvertes."],
      ["Où suivre les avancées ?","Le site TLC rassemble les présentations publiques, les actualités publiées, la documentation et les liens vers les dépôts techniques."],
    ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </div></div></section>



  {dialog&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setDialog(null)}}><section className="modal-panel reference-modal" role="dialog" aria-modal="true" aria-labelledby="home-modal-title"><button className="modal-close" onClick={()=>setDialog(null)} aria-label="Fermer">×</button>{dialog.kind==="profile"&&dialog.person?<> <span className="eyebrow">CONTRIBUTEUR TLC</span><div className="modal-profile"><img src={dialog.person.avatar} alt={dialog.person.name} width={94} height={94}/><div><h2 id="home-modal-title">{dialog.person.name}</h2><span className="person-role">Profil GitHub</span></div></div><a className="button button-gold" href={dialog.person.github} target="_blank" rel="noreferrer">Voir le profil GitHub ↗</a></>:<><span className="eyebrow">{dialog.kind==="event"?"INSCRIPTION À L’ÉVÉNEMENT":dialog.kind==="project"?"CANDIDATURE":"CANDIDATURE À TLC"}</span><h2 id="home-modal-title">{dialog.title|| (dialog.kind==="join"?"Rejoindre la communauté TLC":"Contribuer aux travaux de TLC")}</h2><div className="gold-rule"/><p className="section-copy">{dialog.kind==="event"?"Confirmez votre présence à ce rendez-vous de la communauté.":"Présentez votre profil et votre motivation. Nous reviendrons vers vous pour la suite."}</p>{success?<div className="notice" role="status">Votre demande a bien été transmise à TLC.</div>:<InquiryForm kind={dialog.kind==="profile"?"join":dialog.kind} context={dialog.title || ""} onSent={()=>setSuccess(true)}/>}</>}</section></div>}
 </div>;
}

function JoinForm(){ return <div className="home-join-form"><InquiryForm kind="join" compact /></div>; }
