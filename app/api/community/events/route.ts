import { appendJsonItem, readJsonArray } from "@/lib/community-store";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

type EventItem = {
  id?: string;
  title: string;
  date: string;
  type: string;
  description?: string;
};

export async function GET() {
  try {
    const events = await readJsonArray<EventItem>("events.json");
    return Response.json(events);
  } catch {
    return Response.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const body = (await request.json()) as EventItem;

    if (!body?.title || !body?.date || !body?.type) {
      return Response.json(
        { error: "title, date and type are required" },
        { status: 400 }
      );
    }

    const created = await appendJsonItem<EventItem>("events.json", body, "ev");
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
