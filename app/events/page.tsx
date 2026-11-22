import Link from "next/link";
import { publishedEvents } from "@/lib/public-content";
export const dynamic = "force-dynamic";
export const metadata = { title: "Événements — TLC", description: "Les rendez-vous annoncés par Tradition Learning Community." };
export default async function EventsPage() {
  const events = await publishedEvents();
  const today = new Date().toISOString().slice(0,10);
  const upcoming = events.filter((event) => event.date >= today);
  const previous = events.filter((event) => event.date < today).reverse();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">RENDEZ-VOUS TLC</span><h1>Événements</h1><p>Rencontres, interventions, ateliers et activités publiés par TLC.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="section-head"><span className="eyebrow">AGENDA</span><h2 className="section-title">À venir</h2></div>
      {upcoming.length === 0 ? <p className="section-copy">Aucun événement annoncé pour le moment.</p> : upcoming.map((event) =>
        <article className="list-row" key={event.id}>
          <div style={{ width: 160, flexShrink: 0 }}><span className="eyebrow">{new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(event.date + "T12:00:00Z"))}</span><p className="text-4xl">{event.date.slice(-2)}</p></div>
          <div style={{ flex: 1 }}>{event.image && (event.image.startsWith("https://") || (event.image.startsWith("/") && !event.image.startsWith("//"))) &&
            <img src={event.image} alt={`Illustration de l'événement : ${event.title}`} loading="lazy" className="mb-4 w-full max-w-80 rounded-xl object-cover" style={{aspectRatio:"16 / 9"}}/>}
            <span className="chip">{event.type}</span><h3>{event.title}</h3>{event.description && <p>{event.description}</p>}<p>{[event.time,event.location].filter(Boolean).join(" · ")}</p></div>
          {event.registrationUrl && <a className="button button-dark" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Informations / inscription ↗</a>}
        </article>)}
    </section>
    {previous.length > 0 && <section className="section container"><div className="section-head"><h2 className="section-title">Archives</h2></div>
      <div className="grid-3">{previous.map(event=><article className="card" key={event.id}><span className="eyebrow">{event.date} · {event.type}</span><h3>{event.title}</h3><p>{event.description}</p></article>)}</div>
    </section>}
    <section className="cta-band"><h2>Une activité à proposer ?</h2><p>Échangez avec l'équipe TLC.</p><Link href="/contact" className="button button-gold">Contacter TLC</Link></section>
  </div>;
}
