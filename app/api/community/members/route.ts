import { appendJsonItem, readJsonArray } from "@/lib/community-store";

type MemberItem = {
  id?: string;
  name: string;
  role: string;
  skills?: string[];
  points?: number;
  projects?: number;
};

export async function GET() {
  try {
    const members = await readJsonArray<MemberItem>("profiles.json");
    return Response.json(members);
  } catch {
    return Response.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MemberItem;

    if (!body?.name || !body?.role) {
      return Response.json(
        { error: "name and role are required" },
        { status: 400 }
      );
    }

    const created = await appendJsonItem<MemberItem>("profiles.json", body, "user");
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
