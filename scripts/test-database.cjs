/* eslint @typescript-eslint/no-require-imports: "off" */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../lib/database.ts"), "utf8");
assert.match(source, /DATABASE_URL/, "Database adapter must require DATABASE_URL");
assert.match(source, /from "postgres"/, "Database adapter must use PostgreSQL");
assert.doesNotMatch(source, /better-sqlite3/, "SQLite must not be used in production");
const profiles = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/profiles.json"), "utf8"));
assert.ok(profiles.some((profile) => profile.id === "user-alice"), "Seed profiles must include user-alice");
console.log("PostgreSQL adapter contract and seed data checks passed");
