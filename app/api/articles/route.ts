import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { allArticles, createArticle, publicArticles, validateArticle } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  if (all && !isAdminRequest(request)) return unauthorizedResponse();
  const data = all ? await allArticles() : await publicArticles();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const input = validateArticle(await request.json().catch(() => null));
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });
  const article = await createArticle(input.data);
  return NextResponse.json(article, { status: 201 });
}
