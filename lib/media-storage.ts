import { del, put } from "@vercel/blob";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type MediaDriver = "vercel-blob" | "s3";
export function mediaDriver(): MediaDriver {
  return process.env.MEDIA_STORAGE_DRIVER === "s3" ? "s3" : "vercel-blob";
}
export function mediaStorageConfigured(): boolean {
  if (mediaDriver() === "vercel-blob") return !!process.env.BLOB_READ_WRITE_TOKEN;
  return !!(process.env.S3_BUCKET && process.env.S3_REGION && process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY && process.env.MEDIA_PUBLIC_BASE_URL);
}
export type StorageUpload = { path: string; body: File; mime: string };
export async function uploadImage({ path, body, mime }: StorageUpload): Promise<{ url: string }> {
  if (!mediaStorageConfigured()) throw new Error("Media storage is not configured");
  if (mediaDriver() === "vercel-blob") {
    const blob = await put(path, body, { access: "public", addRandomSuffix: false, contentType: mime });
    return { url: blob.url };
  }
  const base = process.env.MEDIA_PUBLIC_BASE_URL!.replace(/\/+$/, "");
  if (!/^https:\/\//i.test(base)) throw new Error("MEDIA_PUBLIC_BASE_URL must be an HTTPS URL");
  const client = s3Client();
  try {
    await client.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: path,
      Body: new Uint8Array(await body.arrayBuffer()),
      ContentType: mime,
      CacheControl: "public, max-age=31536000, immutable",
    }));
  } finally { client.destroy(); }
  return { url: base + "/" + path.split("/").map(encodeURIComponent).join("/") };
}

/** Remove an object only after a failed metadata write, never when merely unlinking it from a page. */
export async function removeUploadedImage(path: string, url: string): Promise<void> {
  if (!path.startsWith("tlc/") || !mediaStorageConfigured()) return;
  if (mediaDriver() === "vercel-blob") { await del(url); return; }
  const client = s3Client();
  try {
    await client.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: path }));
  } finally { client.destroy(); }
}

function s3Client(): S3Client {
  return new S3Client({
    region: process.env.S3_REGION!,
    ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false" } : {}),
    credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! },
  });
}
