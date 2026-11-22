import { appendJsonItem, readJsonArray } from "@/lib/community-store";
import { deniedPermission } from "@/lib/staff-auth";

type ResourceItem = {
  id?: string;
  published?: boolean;
  title: string;
  category: string;
  url?: string;
};

export async function GET() {
  try {
    const resources = await readJsonArray<ResourceItem>("resources.json");
    return Response.json(resources.filter(item => item.published === true));
  } catch {
    return Response.json({ error: "Failed to load resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  try {
    const body = (await request.json()) as ResourceItem;

    if (!body?.title || !body?.category) {
      return Response.json(
        { error: "title and category are required" },
        { status: 400 }
      );
    }

    const created = await appendJsonItem<ResourceItem>(
      "resources.json",
      body,
      "res"
    );
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
