import { describe, expect, it } from "vitest";
import { permissionsFor, hasPermission, isStaffRole } from "../lib/staff-permissions";
import { tokenHash, secureTokenEqual, publicStaffAccount, sameOrigin } from "../lib/staff-auth";

describe("staff permissions", () => {
  it("restricts privileges by role", () => {
    expect(hasPermission("owner", "staff:manage")).toBe(true);
    expect(hasPermission("publisher", "staff:manage")).toBe(false);
    expect(hasPermission("publisher", "editorial:publish")).toBe(true);
    expect(hasPermission("editor", "editorial:publish")).toBe(false);
    expect(hasPermission("editor", "media:upload")).toBe(true);
    expect(hasPermission("relations", "inquiries:read")).toBe(true);
    expect(hasPermission("relations", "data:manage")).toBe(false);
    expect(permissionsFor("owner").length).toBeGreaterThan(permissionsFor("editor").length);
    expect(isStaffRole("owner")).toBe(true);
    expect(isStaffRole("admin")).toBe(false);
  });
  it("protects activation secrets and excludes them from API output", () => {
    const a = tokenHash("an-invitation-secret");
    expect(secureTokenEqual(a,a)).toBe(true);
    expect(secureTokenEqual(a,tokenHash("wrong"))).toBe(false);
    const record = { id:"123", email:"someone@example.org", inviteHash:a, role:"editor" };
    expect(publicStaffAccount(record as never)).not.toHaveProperty("inviteHash");
  });
  it("rejects cross-site browser mutations", () => {
    expect(sameOrigin(new Request("https://tlc.test/api/admin/staff", {method:"POST", headers:{origin:"https://untrusted.test"}}))).toBe(false);
    expect(sameOrigin(new Request("https://tlc.test/api/admin/staff", {method:"POST", headers:{origin:"https://tlc.test"}}))).toBe(true);
  });
});
