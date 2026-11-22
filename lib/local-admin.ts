import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readCollection, replaceRecordIfVersion } from "./database";

const COOKIE = "tlc_local_admin";
const ID = "admin";
const TTL = 24 * 60 * 60;
export type LocalAdminRecord = {
  id: "admin";
  username: string;
  name: string;
  salt: string;
  passwordHash: string;
  version: number;
  mustChange: boolean;
  createdAt: string;
  updatedAt: string;
};

function signingSecret() { return process.env.ADMIN_SESSION_SECRET || ""; }
function digest(payload: string) {
  return createHmac("sha256", signingSecret()).update("tlc-local-admin-v1:" + payload).digest("hex");
}
function sameHex(a: string, b: string) {
  if (!/^[a-f0-9]{64}$/.test(a) || !/^[a-f0-9]{64}$/.test(b)) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}
export function hashLocalPassword(password: string, salt: string): string {
  return scryptSync(password, Buffer.from(salt, "hex"), 64, { maxmem: 64 * 1024 * 1024 }).toString("hex");
}
export function newLocalPasswordSalt() { return randomBytes(32).toString("hex"); }
export function checkLocalPassword(password: string, account: LocalAdminRecord) {
  if (!password || password.length > 256 || !/^[a-f0-9]{64}$/.test(account.salt) || !/^[a-f0-9]{128}$/.test(account.passwordHash)) return false;
  const actual = Buffer.from(hashLocalPassword(password, account.salt), "hex");
  return timingSafeEqual(actual, Buffer.from(account.passwordHash, "hex"));
}
export async function getLocalAdmin() {
  const accounts = await readCollection<LocalAdminRecord>("staff_local_credentials");
  return accounts.find(record => record.id === ID) || null;
}
export function localAdminCookie(account: LocalAdminRecord) {
  if (!signingSecret()) throw new Error("ADMIN_SESSION_SECRET missing");
  const payload = [Math.floor(Date.now()/1000) + TTL, account.version, randomBytes(12).toString("hex")].join(".");
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${payload}.${digest(payload)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TTL}${secure}`;
}
export function clearLocalAdminCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
export function getLocalCookieVersion(request: Request): number | null {
  if (!signingSecret()) return null;
  const cookies = request.headers.get("cookie") || "";
  const raw = cookies.split(";").map(part=>part.trim()).find(part=>part.startsWith(COOKIE + "="))?.slice(COOKIE.length+1);
  if (!raw) return null;
  const bits = raw.split(".");
  if (bits.length !== 4) return null;
  const [expires, version, nonce, signature] = bits;
  const expiry = Number(expires), revision = Number(version);
  if (!Number.isSafeInteger(expiry) || expiry <= Math.floor(Date.now()/1000) || !Number.isSafeInteger(revision) ||
      revision < 1 || !/^[a-f0-9]{24}$/.test(nonce)) return null;
  return sameHex(signature, digest([expires, version, nonce].join("."))) ? revision : null;
}
export async function authorizedLocalAdmin(request: Request) {
  const version = getLocalCookieVersion(request);
  if (version === null) return null;
  const account = await getLocalAdmin();
  return account?.version === version ? account : null;
}
export function validUsername(username: string) {
  return /^[a-zA-Z][a-zA-Z0-9._-]{2,39}$/.test(username);
}
export function validNewPassword(password: string, username: string) {
  return password.length >= 12 && password.length <= 128 &&
    /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) &&
    password.toLowerCase() !== username.toLowerCase() && password.toLowerCase() !== "admin";
}
export async function changeLocalCredentials(account: LocalAdminRecord, current: string, next: string, username: string): Promise<{ok:true;account:LocalAdminRecord}|{ok:false;reason:"invalid"|"weak"|"conflict"}> {
  if (!checkLocalPassword(current, account)) return { ok:false, reason:"invalid" as const };
  if (!validUsername(username) || !validNewPassword(next, username) || next === current)
    return { ok:false, reason:"weak" as const };
  const salt = newLocalPasswordSalt();
  const updated: LocalAdminRecord = { ...account, username, salt,
    passwordHash:hashLocalPassword(next, salt), version:account.version+1,
    mustChange:false, updatedAt:new Date().toISOString() };
  const saved = await replaceRecordIfVersion("staff_local_credentials", updated, account.version);
  return saved ? { ok:true, account:updated } as const : { ok:false, reason:"conflict" as const };
}
