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
  return rows.map((row) => {
    const value: unknown = row.data;
    if (typeof value === "string") {
      try { return JSON.parse(value) as T; }
      catch { throw new Error("Malformed JSONB record in " + collection); }
    }
    return value as T;
  });
}

export async function appendRecord<T extends { id?: string }>(
  collection: string,
  item: T,
  idPrefix: string,
): Promise<T & { id: string }> {
  const id = item.id ?? `${idPrefix}-${randomUUID()}`;
  const record = { ...item, id } as T & { id: string };
  await getClient()`INSERT INTO records (collection, id, data)
    VALUES (${collection}, ${id}, ${getClient().json(record)})`;
  return record;
}

export async function appendRecords<T extends { id: string }>(
  collection: string,
  items: T[],
): Promise<number> {
  if (!items.length) return 0;
  const rows = await getClient()`INSERT INTO records (collection, id, data)
    SELECT ${collection}, item->>'id', item
    FROM jsonb_array_elements(${getClient().json(items)}) AS item
    RETURNING id`;
  return rows.length;
}

export async function updateRecord<T extends { id: string }>(
  collection: string,
  item: T,
): Promise<boolean> {
  const rows = await getClient()`UPDATE records
    SET data = ${getClient().json(item)}, updated_at = NOW()
    WHERE collection = ${collection} AND id = ${item.id}
    RETURNING id`;
  return rows.length > 0;
}

export async function deleteRecord(collection: string, id: string): Promise<boolean> {
  const rows = await getClient()`DELETE FROM records
    WHERE collection = ${collection} AND id = ${id} RETURNING id`;
  return rows.length > 0;
}

/**
 * Atomic compare-and-swap for editorial documents. Prevents lost updates
 * when two editors save the same version.
 */
export async function replaceRecordIfVersion<T extends { id: string; version: number }>(
  collection: string, item: T, expectedVersion: number,
): Promise<boolean> {
  const rows = await getClient()`UPDATE records
    SET data = ${getClient().json(item)}, updated_at = NOW()
    WHERE collection = ${collection} AND id = ${item.id}
    AND COALESCE((data->>'version')::integer, 1) = ${expectedVersion}
    RETURNING id`;
  return rows.length === 1;
}

/**
 * Shared PostgreSQL rate limit for public requests. Stores a salted one-way
 * client identifier, never a raw IP address.
 */
export async function recordPublicRequestAttempt(id: string, limit: number, windowMs: number): Promise<boolean> {
  const now = Date.now();
  const resetAt = now + windowMs;
  const rows = await getClient()`INSERT INTO records (collection, id, data)
    VALUES ('request-limits', ${id}, jsonb_build_object('count', 1, 'resetAt', ${resetAt}::bigint))
    ON CONFLICT (collection, id) DO UPDATE
    SET data = CASE WHEN (records.data->>'resetAt')::bigint < ${now}
      THEN jsonb_build_object('count', 1, 'resetAt', ${resetAt}::bigint)
      ELSE jsonb_build_object('count', COALESCE((records.data->>'count')::integer,0) + 1,
           'resetAt', (records.data->>'resetAt')::bigint) END,
      updated_at = NOW()
    RETURNING data`;
  return Number(rows[0].data.count) <= limit;
}

export async function closeDatabase() {
  if (client) {
    await client.end();
    client = undefined;
  }
}
