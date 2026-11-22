import { publishedMedia } from "@/lib/public-content";
export const dynamic = "force-dynamic";
export const metadata = { title: "Médias — TLC", description: "Photographies et médias publiés par Tradition Learning Community." };
export default async function MediaPage() {
  const items = await publishedMedia();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">VIE DE TLC</span><h1>Photographies & médias</h1><p>Les activités et travaux documentés de Tradition Learning Community.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Galerie</h2></div>
      {items.length === 0 ? <p className="section-copy">Aucune photographie publiée pour le moment.</p> :
      <div className="grid-3">{items.map(item=><figure className="card" key={item.id}>
        <img src={item.url} alt={item.alt || item.title} loading="lazy" style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",marginBottom:16}} />
        <figcaption><strong>{item.title}</strong>{item.credit && <small className="block text-[var(--muted)]">{item.credit}</small>}</figcaption>
      </figure>)}</div>}
    </section>
  </div>;
}
