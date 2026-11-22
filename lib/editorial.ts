import { randomUUID } from "node:crypto";
import { appendRecord, readCollection, replaceRecordIfVersion } from "./database";

export type PublicationStatus = "draft" | "review" | "published" | "archived";
export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  author: string;
  coverImage: string;
  status: PublicationStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  version: number;
};
export type ArticleInput = Pick<Article, "title" | "summary" | "body" | "category" | "author" | "coverImage" | "status" | "featured">;
const statuses: PublicationStatus[] = ["draft", "review", "published", "archived"];

function stringField(data: Record<string, unknown>, key: string, max: number): string {
  const raw = data[key];
  return typeof raw === "string" ? raw.trim().slice(0, max + 1) : "";
}
export function validateArticle(input: unknown): { ok: true; data: ArticleInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Contenu invalide." };
  const data = input as Record<string, unknown>;
  const title = stringField(data, "title", 180);
  const summary = stringField(data, "summary", 600);
  const body = stringField(data, "body", 30000);
  const category = stringField(data, "category", 80) || "Actualités";
  const author = stringField(data, "author", 160) || "Tradition Learning Community";
  const coverImage = stringField(data, "coverImage", 1000);
  const status = data.status;
  if (title.length < 5 || title.length > 180) return { ok: false, error: "Titre : 5 à 180 caractères." };
  const complete = status === "published" || status === "review";
  if (summary.length > 600 || (complete && summary.length < 10)) return { ok: false, error: "Résumé : 10 à 600 caractères pour publier ou valider." };
  if (body.length > 30000 || (complete && body.length < 30)) return { ok: false, error: "Texte : 30 à 30 000 caractères pour publier ou valider." };
  if (category.length > 80 || author.length > 160) return { ok: false, error: "Catégorie ou auteur trop long." };
  if (coverImage && !(coverImage.startsWith("https://") || (coverImage.startsWith("/") && !coverImage.startsWith("//")))) return { ok: false, error: "L'image doit avoir une URL HTTPS ou un chemin local." };
  if (!statuses.includes(status as PublicationStatus)) return { ok: false, error: "Statut de publication invalide." };
  return { ok: true, data: { title, summary, body, category, author, coverImage, status: status as PublicationStatus, featured: data.featured === true } };
}
export function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "article";
}
export function newArticle(input: ArticleInput): Article {
  const now = new Date().toISOString();
  const id = randomUUID();
  return { ...input, id, slug: slugify(input.title) + "-" + id.slice(0, 8), createdAt: now, updatedAt: now, publishedAt: input.status === "published" ? now : null, version: 1 };
}
export async function allArticles(): Promise<Article[]> {
  return (await readCollection<Article>("articles")).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
export async function publicArticles(): Promise<Article[]> {
  const list = await readCollection<Article>("articles");
  return list.filter((article) => article.status === "published" && Boolean(article.publishedAt))
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}
export async function publishedArticleBySlug(slug: string): Promise<Article | undefined> {
  return (await publicArticles()).find((article) => article.slug === slug);
}
export async function createArticle(input: ArticleInput) {
  return appendRecord("articles", newArticle(input), "article");
}
export async function editArticle(id: string, input: ArticleInput, version: number) {
  const existing = (await allArticles()).find((item) => item.id === id);
  if (!existing) return { result: "not-found" as const };
  if (existing.version !== version) return { result: "conflict" as const };
  const now = new Date().toISOString();
  const article: Article = {
    ...existing, ...input, updatedAt: now, version: existing.version + 1,
    publishedAt: input.status === "published" ? (existing.status === "published" ? existing.publishedAt || now : now) : existing.publishedAt,
  };
  const updated = await replaceRecordIfVersion("articles", article, version);
  return updated ? { result: "ok" as const, article } : { result: "conflict" as const };
}
