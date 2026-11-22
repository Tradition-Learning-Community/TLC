import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedArticleBySlug } from "@/lib/editorial";
import "@/components/editorial/editorial-pages.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await publishedArticleBySlug(slug);
  return { title: article ? `${article.title} — TLC` : "Actualité — TLC", description: article?.summary };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await publishedArticleBySlug(slug);
  if (!article) notFound();
  const date = new Date(article.publishedAt || "");
  const validDate = !Number.isNaN(date.getTime());
  return <article className="news-article">
    <header className="news-article-header container"><nav aria-label="Fil d’Ariane"><Link href="/home">Accueil</Link><span aria-hidden="true">/</span><Link href="/actualites">Actualités</Link></nav>
      <div className="news-meta"><span>{article.category}</span>{validDate && <time dateTime={article.publishedAt || undefined}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Lubumbashi" }).format(date)}</time>}</div>
      <h1>{article.title}</h1><p className="news-article-summary">{article.summary}</p><p className="news-author">Par {article.author}</p>
    </header>
    {article.coverImage && <div className="container"><img className="news-article-cover" src={article.coverImage} alt="" width={1200} height={675} /></div>}
    <div className="news-article-body container">{article.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    <footer className="news-article-footer container"><span>Tradition Learning Community</span><Link className="button button-dark" href="/actualites">Toutes les actualités</Link></footer>
  </article>;
}
