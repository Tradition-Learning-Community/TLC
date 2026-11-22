import { NextRequest, NextResponse } from "next/server";
import { deniedPermission } from "@/lib/staff-auth";
import { allArticles, createArticle, publicArticles, validateArticle } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  if (all) { const denied = await deniedPermission(request, "editorial:write"); if (denied) return denied; }
  const data = all ? await allArticles() : await publicArticles();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const denied = await deniedPermission(request, "editorial:write"); if (denied) return denied;
  const input = validateArticle(await request.json().catch(() => null));
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });
  if (input.data.status === "published" || input.data.status === "archived") { const forbidden = await deniedPermission(request, "editorial:publish"); if (forbidden) return forbidden; }
  const article = await createArticle(input.data);
  return NextResponse.json(article, { status: 201 });
}
