import { afterEach, describe, expect, it } from "vitest";
import { adminCookieHeader, isAdminRequest } from "../lib/admin-auth";

const originalPassword = process.env.ADMIN_PASSWORD;
const originalSecret = process.env.ADMIN_SESSION_SECRET;

afterEach(() => {
  process.env.ADMIN_PASSWORD = originalPassword;
  process.env.ADMIN_SESSION_SECRET = originalSecret;
});

describe("admin authentication", () => {
  it("rejects requests when the server is not configured", () => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
    expect(isAdminRequest(new Request("http://localhost/api/admin/verify"))).toBe(false);
  });

  it("accepts only a valid signed session cookie", () => {
    process.env.ADMIN_PASSWORD = "test-password";
    process.env.ADMIN_SESSION_SECRET = "test-secret-that-is-long-enough";

    const cookie = adminCookieHeader().split(";")[0];
    expect(
      isAdminRequest(
        new Request("http://localhost/api/admin/verify", {
          headers: { cookie },
        }),
      ),
    ).toBe(true);

    expect(
      isAdminRequest(
        new Request("http://localhost/api/admin/verify", {
          headers: { cookie: "tlc_admin=1" },
        }),
      ),
    ).toBe(false);
  });
});
