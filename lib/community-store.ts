import { readFile, writeFile } from "fs/promises";
import path from "path";

function resolveDataFile(fileName: string) {
  return path.join(process.cwd(), "data", fileName);
}

export async function readJsonArray<T>(fileName: string): Promise<T[]> {
  const filePath = resolveDataFile(fileName);
  const raw = await readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export async function appendJsonItem<T extends { id?: string }>(
  fileName: string,
  item: T,
  idPrefix: string
) {
  const list = await readJsonArray<T>(fileName);
  const nextItem = {
    ...item,
    id: item.id ?? `${idPrefix}-${Date.now()}`,
  } as T;

  list.push(nextItem);
  const filePath = resolveDataFile(fileName);
  await writeFile(filePath, JSON.stringify(list, null, 2) + "\n", "utf-8");

  return nextItem;
}
