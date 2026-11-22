import { NextResponse } from "next/server";
import { publishedEvents } from "@/lib/public-content";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await publishedEvents(), { headers: { "Cache-Control": "no-store" } });
}
