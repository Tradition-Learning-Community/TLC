import { appendJsonItem, readJsonArray } from "@/lib/community-store";
import { deniedPermission } from "@/lib/staff-auth";

type MemberItem = {
  id?: string;
  published?: boolean;
  name: string;
  role: string;
  skills?: string[];
  points?: number;
  projects?: number;
};

export async function GET() {
  try {
    const members = await readJsonArray<MemberItem>("profiles.json");
    return Response.json(members.filter(item => item.published === true));
  } catch {
    return Response.json({ error: "Failed to load members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
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
