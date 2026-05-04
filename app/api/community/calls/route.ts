import { appendJsonItem, readJsonArray } from "@/lib/community-store";

type CallItem = {
  id?: string;
  title: string;
  description: string;
  urgency?: "low" | "medium" | "high";
};

export async function GET() {
  try {
    const calls = await readJsonArray<CallItem>("open-calls.json");
    return Response.json(calls);
  } catch {
    return Response.json({ error: "Failed to load open calls" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
