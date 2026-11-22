import Link from "next/link";
import { Newspaper } from "lucide-react";
import EditorialSection from "@/components/editorial/EditorialSection";
import { publicArticles, type Article } from "@/lib/editorial";
import "@/components/editorial/editorial-pages.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Actualités — Tradition Learning Community", description: "Les actualités scientifiques et communautaires de TLC : recherche, développement, événements et collaborations." };
function publicationDate(value: string | null) { const date = new Date(value || ""); return Number.isNaN(date.getTime()) ? null : new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Lubumbashi" }).format(date); }
function ArticleMeta({ article }: { article: Article }) { const date = publicationDate(article.publishedAt); return <div className="news-meta"><span>{article.category}</span>{date && <time dateTime={article.publishedAt || undefined}>{date}</time>}</div>; }

export default async function Actualites() {
  const articles = await publicArticles();
  const featured = articles.find(article => article.featured) || articles[0];
  const remaining = featured ? articles.filter(article => article.id !== featured.id) : [];
  return <div className="directory-content editorial-page">
    <section className="hero-band editorial-hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING COMMUNITY</span><h1>Actualités</h1><p>Recherche, développement, événements et nouvelles de TLC. Les publications de la communauté au fil de ses travaux.</p></div><div className="editorial-hero-summary"><Newspaper size={34} aria-hidden="true" /><p>La vie du projet, racontée par celles et ceux qui y contribuent.</p></div></div></section>
    <EditorialSection eyebrow="PUBLICATIONS" title={featured?.featured ? "À la une" : "Dernières nouvelles"}>
      {!featured ? <div className="editorial-empty"><Newspaper aria-hidden="true" /><div><h3>Les nouvelles de TLC paraîtront ici</h3><p>Aucune actualité publiée pour le moment.</p><Link className="text-link" href="/recherche">Découvrir les travaux scientifiques</Link></div></div> :
        <article className={`news-featured${featured.coverImage ? " news-featured-with-image" : ""}`}>
          {featured.coverImage && <Link href={`/actualites/${featured.slug}`} className="news-featured-image" aria-label={`Lire : ${featured.title}`}><img src={featured.coverImage} alt="" width={960} height={640} loading="lazy" /></Link>}
          <div className="news-featured-copy"><ArticleMeta article={featured} /><h3><Link href={`/actualites/${featured.slug}`}>{featured.title}</Link></h3><p>{featured.summary}</p><p className="news-author">Par {featured.author}</p><Link className="text-link" href={`/actualites/${featured.slug}`}>Lire l’article<span className="sr-only"> : {featured.title}</span></Link></div>
        </article>}
    </EditorialSection>
    {remaining.length > 0 && <EditorialSection tone="muted" title="Toutes les publications"><div className="news-grid">{remaining.map(article => <article className="news-card" key={article.id}>
      {article.coverImage && <Link href={`/actualites/${article.slug}`} className="news-card-image" aria-label={`Lire : ${article.title}`}><img src={article.coverImage} alt="" width={720} height={405} loading="lazy" /></Link>}
      <div className="news-card-body"><ArticleMeta article={article} /><h3><Link href={`/actualites/${article.slug}`}>{article.title}</Link></h3><p>{article.summary}</p><Link className="text-link" href={`/actualites/${article.slug}`}>Lire l’article<span className="sr-only"> : {article.title}</span></Link></div>
    </article>)}</div></EditorialSection>}
  </div>;
}
