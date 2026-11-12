import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

type StoredRecord = { id: string; collection: string; data: string };

const databaseDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(databaseDirectory, "tlc.sqlite");
const sourceDirectory = path.join(process.cwd(), "data");

let database: Database.Database | undefined;

function migrateJsonData(db: Database.Database) {
  const insert = db.prepare(
    "INSERT OR IGNORE INTO records (collection, id, data) VALUES (?, ?, ?)",
  );

  const migrate = db.transaction(() => {
    for (const fileName of fs.readdirSync(sourceDirectory)) {
      if (!fileName.endsWith(".json")) continue;
      const collection = fileName.slice(0, -5);
      const filePath = path.join(sourceDirectory, fileName);
      let parsed: unknown;
      try {
        parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        continue;
      }
      if (!Array.isArray(parsed)) continue;

      for (const item of parsed) {
        if (!item || typeof item !== "object") continue;
        const record = item as { id?: unknown };
        const id = typeof record.id === "string" ? record.id : randomUUID();
        insert.run(collection, id, JSON.stringify({ ...item, id }));
      }
    }
  });

  migrate();
}

export function getDatabase() {
  if (database) return database;

  fs.mkdirSync(databaseDirectory, { recursive: true });
  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS records (
      collection TEXT NOT NULL,
      id TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (collection, id)
    )
  `);

  migrateJsonData(database);
  return database;
}

export function readCollection<T>(collection: string): T[] {
  const rows = getDatabase()
    .prepare("SELECT data FROM records WHERE collection = ? ORDER BY rowid")
    .all(collection) as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as T);
}

export function appendRecord<T extends { id?: string }>(
  collection: string,
  item: T,
  idPrefix: string,
) {
  const id = item.id ?? `${idPrefix}-${randomUUID()}`;
  const record = { ...item, id } as T & { id: string };
  getDatabase()
    .prepare("INSERT INTO records (collection, id, data) VALUES (?, ?, ?)")
    .run(collection, id, JSON.stringify(record));
  return record;
}

export function updateRecord<T extends { id: string }>(collection: string, item: T) {
  const result = getDatabase()
    .prepare(
      "UPDATE records SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE collection = ? AND id = ?",
    )
    .run(JSON.stringify(item), collection, item.id);
  return result.changes > 0;
}

export function deleteRecord(collection: string, id: string) {
  const result = getDatabase()
    .prepare("DELETE FROM records WHERE collection = ? AND id = ?")
    .run(collection, id);
  return result.changes > 0;
}
