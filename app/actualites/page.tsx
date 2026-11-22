import Link from "next/link";
import { publicArticles } from "@/lib/editorial";
export const dynamic = "force-dynamic";
export const metadata = { title: "Actualités — Tradition Learning Community", description: "Les actualités scientifiques et communautaires de TLC." };
export default async function Actualites() {
  const articles = await publicArticles();
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy">
      <span className="eyebrow">TRADITION LEARNING COMMUNITY</span>
      <h1>Actualités</h1><p>Recherche, développement, événements et nouvelles de TLC.</p>
    </div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container" aria-label="Articles publiés">
      <div className="section-head"><span className="eyebrow">PUBLICATIONS</span><h2 className="section-title">Dernières nouvelles</h2></div>
      {articles.length === 0 ? <p className="section-copy">Aucune actualité publiée pour le moment.</p> :
      <div className="grid-3">{articles.map((article) => <article className="card" key={article.id}>
        {article.coverImage ? <img src={article.coverImage} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", marginBottom: 18 }} /> : null}
        <span className="eyebrow">{article.category} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(article.publishedAt!))}</span>
        <h3>{article.title}</h3><p>{article.summary}</p>
        <Link className="card-link" href={"/actualites/" + article.slug}>Lire l'article →</Link>
      </article>)}</div>}
    </section>
  </div>;
}
