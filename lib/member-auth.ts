import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = "tlc_member";
const SESSION_SECONDS = 7 * 24 * 60 * 60;

function sessionSecret() {
  const secret = process.env.MEMBER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret || secret.length < 16) throw new Error("Member session secret is not configured");
  return secret;
}

export function memberId(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function hashMemberPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const bytes = await scrypt(password, Buffer.from(salt, "hex"), 64) as Buffer;
  return `scrypt:${salt}:${bytes.toString("hex")}`;
}

export async function verifyMemberPassword(password: string, encoded: string) {
  const parts = encoded.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt" || !/^[0-9a-f]{32}$/.test(parts[1]) || !/^[0-9a-f]{128}$/.test(parts[2])) return false;
  const expected = Buffer.from(parts[2], "hex");
  const actual = await scrypt(password, Buffer.from(parts[1], "hex"), 64) as Buffer;
  return timingSafeEqual(expected, actual);
}

function sign(id: string, expires: number) {
  return createHmac("sha256", sessionSecret()).update(`${id}.${expires}`).digest("hex");
}

export function memberSessionCookie(id: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = `${id}.${expires}.${sign(id, expires)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_SECONDS}${secure}`;
}

export function clearMemberSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function memberSessionId(request: Request): string | null {
  const header = request.headers.get("cookie") || "";
  const raw = header.split(";").map(s => s.trim()).find(s => s.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!raw) return null;
  const [id, expiresRaw, signature] = raw.split(".");
  if (!/^[a-f0-9]{64}$/.test(id || "") || !/^\d+$/.test(expiresRaw || "") || !/^[0-9a-f]{64}$/.test(signature || "")) return null;
  const expires = Number(expiresRaw);
  if (!Number.isSafeInteger(expires) || expires < Date.now() / 1000) return null;
  const expected = Buffer.from(sign(id, expires), "hex");
  return timingSafeEqual(expected, Buffer.from(signature, "hex")) ? id : null;
}
