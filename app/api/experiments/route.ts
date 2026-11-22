import { NextResponse } from "next/server";
import { readCollection } from "@/lib/database";

export async function GET() {
  return NextResponse.json((await readCollection<{ published?: boolean }>("experiments")).filter(item => item.published === true));
}
