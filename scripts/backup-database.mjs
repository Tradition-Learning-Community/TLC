import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "tlc.sqlite");
const backupDirectory = path.join(dataDirectory, "backups");

if (!fs.existsSync(databasePath)) {
  console.error("Database not found. Start the app once before creating a backup.");
  process.exit(1);
}

fs.mkdirSync(backupDirectory, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(backupDirectory, `tlc-${stamp}.sqlite`);
const database = new Database(databasePath, { readonly: true });
await database.backup(backupPath);
database.close();
console.log(`Database backup created: ${backupPath}`);

