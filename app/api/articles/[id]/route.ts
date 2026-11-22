import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { allArticles, editArticle, validateArticle } from "@/lib/editorial";

type Context = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  const article = (await allArticles()).find((item) => item.id === id);
  if (!article) return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  if (article.status !== "published" && !isAdminRequest(request)) return unauthorizedResponse();
  return NextResponse.json(article, { headers: { "Cache-Control": "no-store" } });
}
export async function PUT(request: NextRequest, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const validation = validateArticle(body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  const version = typeof body?.version === "number" ? body.version : NaN;
  if (!Number.isSafeInteger(version) || version < 1) return NextResponse.json({ error: "Version de document requise." }, { status: 400 });
  const outcome = await editArticle(id, validation.data, version);
  if (outcome.result === "not-found") return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  if (outcome.result === "conflict") return NextResponse.json({ error: "L'article a été modifié par ailleurs. Rechargez avant d'enregistrer." }, { status: 409 });
  return NextResponse.json(outcome.article);
}
