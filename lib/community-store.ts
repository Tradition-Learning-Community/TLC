import { appendRecord, readCollection } from "@/lib/database";

export async function readJsonArray<T>(fileName: string): Promise<T[]> {
  return readCollection<T>(fileName.replace(/\.json$/, ""));
}

export async function appendJsonItem<T extends { id?: string }>(
  fileName: string,
  item: T,
  idPrefix: string
) {
  return appendRecord(fileName.replace(/\.json$/, ""), item, idPrefix);
}
