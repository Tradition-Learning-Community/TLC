import { afterEach, describe, expect, it } from "vitest";
import { hashMemberPassword, verifyMemberPassword, memberSessionCookie, memberSessionId, memberId } from "../lib/member-auth";
import { validateMembershipInput, publicMember, type MemberAccount } from "../lib/membership";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const originalSecret = process.env.MEMBER_SESSION_SECRET;
afterEach(() => { process.env.MEMBER_SESSION_SECRET = originalSecret; });
const input = {
  name: "Nadia Exemple", email: "NADIA@example.org", password: "password-test-2026",
  profile: "development", country: "RDC", organization: "TLC",
  interests: ["member","volunteer","contributor"], message: "Participation aux travaux en Python", consent: true,
};

describe("Inscription TLC", () => {
  it("accepte les rôles multiples et normalise les emails", () => {
    const v = validateMembershipInput(input);
    expect(v.ok).toBe(true);
    if (v.ok) {
      expect(v.value.email).toBe("nadia@example.org");
      expect(v.value.interests).toEqual(["member","volunteer","contributor"]);
    }
  });
  it("refuse les rôles arbitraires et les données incompletes", () => {
    expect(validateMembershipInput({ ...input, interests: ["admin"] }).ok).toBe(false);
    expect(validateMembershipInput({ ...input, consent: false }).ok).toBe(false);
    expect(validateMembershipInput({ ...input, password: "short" }).ok).toBe(false);
    expect(validateMembershipInput({ ...input, interests: [] }).ok).toBe(false);
    expect(validateMembershipInput({ ...input, email: "bad-email" }).ok).toBe(false);
  });
  it("hache et vérifie le mot de passe sans l'enregistrer en clair", async () => {
    const encoded = await hashMemberPassword(input.password);
    expect(encoded).toMatch(/^scrypt:[0-9a-f]{32}:[0-9a-f]{128}$/);
    expect(encoded).not.toContain(input.password);
    expect(await verifyMemberPassword(input.password, encoded)).toBe(true);
    expect(await verifyMemberPassword("wrong-password", encoded)).toBe(false);
  });
  it("signe la session membre et refuse les modifications", () => {
    process.env.MEMBER_SESSION_SECRET = "test-member-secret-for-signing-2026";
    const id = memberId(input.email);
    const cookie = memberSessionCookie(id).split(";")[0];
    expect(memberSessionId(new Request("http://localhost/member", {headers:{cookie}}))).toBe(id);
    expect(memberSessionId(new Request("http://localhost/member", {headers:{cookie:cookie+"x"}}))).toBeNull();
    expect(memberSessionId(new Request("http://localhost/member"))).toBeNull();
  });
  it("ne révèle ni le hachage ni les champs de consentement aux administrateurs ou membres", () => {
    const a: MemberAccount = {
      ...input, id: memberId(input.email), email: input.email.toLowerCase(),
      passwordHash:"hash-value", status:"pending", createdAt:new Date().toISOString(),
      consentAt:new Date().toISOString(),
    };
    const result = publicMember(a);
    expect(result.email).toBe(a.email);
    expect(JSON.stringify(result)).not.toContain("passwordHash");
    expect(JSON.stringify(result)).not.toContain("consentAt");
  });
  it("n'expose pas les comptes privés via l'API générique du portail", () => {
    const api = readFileSync(resolve(process.cwd(),"app/api/data/[type]/route.ts"),"utf8");
    expect(api).not.toContain('"membership-accounts"');
    const admin = readFileSync(resolve(process.cwd(),"app/api/admin/memberships/route.ts"),"utf8");
    expect(admin).toContain("isAdminRequest(request)");
    const me = readFileSync(resolve(process.cwd(),"app/api/membership/me/route.ts"),"utf8");
    expect(me).toContain('item.status === "approved"');
    const login = readFileSync(resolve(process.cwd(),"app/api/membership/login/route.ts"),"utf8");
    expect(login).toContain('account.status !== "approved"');
  });
});
