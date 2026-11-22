import { randomUUID } from "node:crypto";
import { removeUploadedImage, uploadImage } from "./media-storage";
import { appendRecord } from "./database";
import { mediaMimeTypes } from "./media-validation";
export type MediaRecord = {
  id: string; title: string; alt: string; credit: string;
  url: string; published: false; createdAt: string;
};
export async function storeMedia(file: File, details: { title: string; alt: string; credit: string },
  upload: (path: string, image: File, mime: string) => Promise<{ url: string }> =
    (path, image, mime) => uploadImage({path,body:image,mime}),
  persist: (item: MediaRecord) => Promise<unknown> = item => appendRecord("media", item, "media"),
  cleanup: (path: string, url: string) => Promise<void> = removeUploadedImage): Promise<MediaRecord> {
  const extension = mediaMimeTypes[file.type];
  if (!extension) throw new Error("Unsupported media type");
  const path = "tlc/" + randomUUID() + "." + extension;
  const blob = await upload(path, file, file.type);
  const record: MediaRecord = { id: randomUUID(), ...details, url: blob.url, published: false,
    createdAt: new Date().toISOString() };
  try {
    await persist(record);
  } catch (error) {
    // Never mask the database error if the remote provider cannot remove the orphan.
    try { await cleanup(path, blob.url); }
    catch (cleanupError) { console.error("TLC media orphan cleanup failed", cleanupError); }
    throw error;
  }
  return record;
}
