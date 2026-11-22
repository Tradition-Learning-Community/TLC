import { createHash, timingSafeEqual } from "node:crypto";
import type { StaffAccount } from "./staff-auth";
export const tokenHash = (value: string) => createHash("sha256").update(value).digest("hex");
export function publicStaffAccount(account: StaffAccount) {
  const { inviteHash: _hash, ...rest } = account;
  void _hash;
  return rest;
}
export function secureTokenEqual(left: string, right: string) {
  if (!/^[a-f0-9]{64}$/.test(left) || !/^[a-f0-9]{64}$/.test(right)) return false;
  return timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
}
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
