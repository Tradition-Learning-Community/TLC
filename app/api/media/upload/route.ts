import { deniedPermission } from "@/lib/staff-auth";
import { hasValidImageSignature, mediaMimeTypes } from "@/lib/media-validation";
import { storeMedia } from "@/lib/media-store";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const denied = await deniedPermission(request, "media:upload"); if (denied) return denied;
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID)
    return Response.json({ error: "Stockage des médias non configuré." }, { status: 503 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4_200_000) return Response.json({ error: "Fichier trop volumineux (4 Mo maximum)." }, { status: 413 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !mediaMimeTypes[file.type] || file.size < 1 || file.size > 4_000_000) {
    return Response.json({ error: "Image JPEG, PNG, WebP ou AVIF requise (4 Mo maximum)." }, { status: 400 });
  }
  const title = String(form?.get("title") || file.name).trim().slice(0, 160);
  const alt = String(form?.get("alt") || title).trim().slice(0, 200);
  const credit = String(form?.get("credit") || "").trim().slice(0, 250);
  if (!title) return Response.json({ error: "Nom du média requis." }, { status: 400 });
  if (!await hasValidImageSignature(file))
    return Response.json({ error: "Le contenu ne correspond pas au format de l'image." }, { status: 400 });
  const record = await storeMedia(file, { title, alt, credit });
  return Response.json(record, { status: 201 });
}
