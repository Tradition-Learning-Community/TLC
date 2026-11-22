import { appendJsonItem, readJsonArray } from "@/lib/community-store";
import { deniedPermission } from "@/lib/staff-auth";

type EventItem = {
  id?: string;
  published?: boolean;
  title: string;
  date: string;
  type: string;
  description?: string;
};

export async function GET() {
  try {
    const events = await readJsonArray<EventItem>("events.json");
    return Response.json(events.filter(item => item.published === true));
  } catch {
    return Response.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
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
