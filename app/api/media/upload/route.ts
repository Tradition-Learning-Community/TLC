import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { appendRecord } from "@/lib/database";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";
const types: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
};
export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID)
    return Response.json({ error: "Stockage des médias non configuré." }, { status: 503 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4_200_000) return Response.json({ error: "Fichier trop volumineux (4 Mo maximum)." }, { status: 413 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !types[file.type] || file.size < 1 || file.size > 4_000_000) {
    return Response.json({ error: "Image JPEG, PNG, WebP ou AVIF requise (4 Mo maximum)." }, { status: 400 });
  }
  const title = String(form?.get("title") || file.name).trim().slice(0, 160);
  const alt = String(form?.get("alt") || title).trim().slice(0, 200);
  const credit = String(form?.get("credit") || "").trim().slice(0, 250);
  if (!title) return Response.json({ error: "Nom du média requis." }, { status: 400 });
  const blob = await put("tlc/" + randomUUID() + "." + types[file.type], file, {
    access: "public", addRandomSuffix: false, contentType: file.type,
  });
  const id = randomUUID();
  const record = { id, title, alt, credit, url: blob.url, published: false, createdAt: new Date().toISOString() };
  await appendRecord("media", record, "media");
  return Response.json(record, { status: 201 });
}
