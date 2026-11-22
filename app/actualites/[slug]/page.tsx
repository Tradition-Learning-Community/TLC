import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedArticleBySlug } from "@/lib/editorial";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const article = await publishedArticleBySlug(slug);
  return { title: article ? article.title + " — TLC" : "Actualité — TLC", description: article?.summary };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await publishedArticleBySlug(slug);
  if (!article) notFound();
  return <article className="container section" style={{ maxWidth: 900, paddingTop: 80 }}>
    <Link href="/actualites" className="text-link">← Toutes les actualités</Link>
    <p className="eyebrow" style={{ marginTop: 45 }}>{article.category} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(article.publishedAt!))}</p>
    <h1 className="section-title" style={{ fontSize: "clamp(38px,5vw,62px)", marginBottom: 22 }}>{article.title}</h1>
    <p className="section-copy" style={{ fontSize: 20 }}>{article.summary}</p>
    <p className="small-note" style={{ marginTop: 18 }}>Par {article.author}</p>
    {article.coverImage && <img src={article.coverImage} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", margin: "36px 0" }} />}
    <div style={{ marginTop: 36, fontSize: 17, lineHeight: 1.9, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{article.body}</div>
    <div style={{ marginTop: 64 }}><Link className="button button-dark" href="/actualites">Retour aux actualités</Link></div>
  </article>;
}
