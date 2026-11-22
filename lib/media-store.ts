import { randomUUID } from "node:crypto";
import { uploadImage } from "./media-storage";
import { appendRecord } from "./database";
import { mediaMimeTypes } from "./media-validation";
export type MediaRecord = {
  id: string; title: string; alt: string; credit: string;
  url: string; published: false; createdAt: string;
};
export async function storeMedia(file: File, details: { title: string; alt: string; credit: string },
  upload: (path: string, image: File, mime: string) => Promise<{ url: string }> =
    (path, image, mime) => uploadImage({path,body:image,mime}),
  persist: (item: MediaRecord) => Promise<unknown> = item => appendRecord("media", item, "media")): Promise<MediaRecord> {
  const extension = mediaMimeTypes[file.type];
  if (!extension) throw new Error("Unsupported media type");
  const blob = await upload("tlc/" + randomUUID() + "." + extension, file, file.type);
  const record: MediaRecord = { id: randomUUID(), ...details, url: blob.url, published: false,
    createdAt: new Date().toISOString() };
  await persist(record);
  return record;
}
