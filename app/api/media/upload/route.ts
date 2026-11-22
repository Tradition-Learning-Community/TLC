import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { appendRecord } from "@/lib/database";
import { deniedPermission } from "@/lib/staff-auth";

export const runtime = "nodejs";
const types: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
};
export async function POST(request: Request) {
  const denied = await deniedPermission(request, "media:upload"); if (denied) return denied;
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
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const matches = file.type === "image/jpeg" ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    : file.type === "image/png" ? [137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)
    : file.type === "image/webp" ? new TextDecoder().decode(bytes.slice(0,4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8,12)) === "WEBP"
    : file.type === "image/avif" ? new TextDecoder().decode(bytes.slice(4,12)).includes("ftypavif") || new TextDecoder().decode(bytes.slice(4,12)).includes("ftypavis") : false;
  if (!matches) return Response.json({ error: "Le contenu ne correspond pas au format de l'image." }, { status: 400 });
  const blob = await put("tlc/" + randomUUID() + "." + types[file.type], file, {
    access: "public", addRandomSuffix: false, contentType: file.type,
  });
  const id = randomUUID();
  const record = { id, title, alt, credit, url: blob.url, published: false, createdAt: new Date().toISOString() };
  await appendRecord("media", record, "media");
  return Response.json(record, { status: 201 });
}
