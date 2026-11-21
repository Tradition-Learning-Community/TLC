import postgres from "postgres";
import { randomUUID } from "node:crypto";

let client: ReturnType<typeof postgres> | undefined;

function getClient() {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL must be configured for TLC");
  client = postgres(url, { max: 5, idle_timeout: 20, connect_timeout: 10 });
  return client;
}

export async function readCollection<T>(collection: string): Promise<T[]> {
  const rows = await getClient()`SELECT data FROM records WHERE collection = ${collection} ORDER BY seq`;
  return rows.map((row) => row.data as T);
}

export async function appendRecord<T extends { id?: string }>(
  collection: string,
  item: T,
  idPrefix: string,
): Promise<T & { id: string }> {
  const id = item.id ?? `${idPrefix}-${randomUUID()}`;
  const record = { ...item, id } as T & { id: string };
  await getClient()`INSERT INTO records (collection, id, data)
    VALUES (${collection}, ${id}, ${JSON.stringify(record)}::jsonb)`;
  return record;
}

export async function appendRecords<T extends { id: string }>(
  collection: string,
  items: T[],
): Promise<number> {
  if (!items.length) return 0;
  const payload = JSON.stringify(items);
  const rows = await getClient()`INSERT INTO records (collection, id, data)
    SELECT ${collection}, item->>'id', item
    FROM jsonb_array_elements(${payload}::jsonb) AS item
    RETURNING id`;
  return rows.length;
}

export async function updateRecord<T extends { id: string }>(
  collection: string,
  item: T,
): Promise<boolean> {
  const rows = await getClient()`UPDATE records
    SET data = ${JSON.stringify(item)}::jsonb, updated_at = NOW()
    WHERE collection = ${collection} AND id = ${item.id}
    RETURNING id`;
  return rows.length > 0;
}

export async function deleteRecord(collection: string, id: string): Promise<boolean> {
  const rows = await getClient()`DELETE FROM records
    WHERE collection = ${collection} AND id = ${id} RETURNING id`;
  return rows.length > 0;
}

export async function closeDatabase() {
  if (client) {
    await client.end();
    client = undefined;
  }
}
