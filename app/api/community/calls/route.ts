import { appendJsonItem, readJsonArray } from "@/lib/community-store";
import { deniedPermission } from "@/lib/staff-auth";

type CallItem = {
  id?: string;
  published?: boolean;
  title: string;
  description: string;
  urgency?: "low" | "medium" | "high";
};

export async function GET() {
  try {
    const calls = await readJsonArray<CallItem>("open-calls.json");
    return Response.json(calls.filter(item => item.published === true));
  } catch {
    return Response.json({ error: "Failed to load open calls" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  try {
    const body = (await request.json()) as CallItem;

    if (!body?.title || !body?.description) {
      return Response.json(
        { error: "title and description are required" },
        { status: 400 }
      );
    }

    const created = await appendJsonItem<CallItem>(
      "open-calls.json",
      body,
      "call"
    );
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
