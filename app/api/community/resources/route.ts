import { appendJsonItem, readJsonArray } from "@/lib/community-store";

type ResourceItem = {
  id?: string;
  title: string;
  category: string;
  url?: string;
};

export async function GET() {
  try {
    const resources = await readJsonArray<ResourceItem>("resources.json");
    return Response.json(resources);
  } catch {
    return Response.json({ error: "Failed to load resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
