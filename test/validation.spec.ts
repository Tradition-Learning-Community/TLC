import { describe, expect, it } from "vitest";
import { checkRateLimit, clearRateLimit, recordRateLimitFailure } from "../lib/rate-limit";
import { validateDataRecord } from "../lib/validation";

describe("server validation", () => {
  it("rejects incomplete projects", () => {
    const result = validateDataRecord("projects", { title: "" });
    expect(result.ok).toBe(false);
  });

  it("accepts a valid project", () => {
    const result = validateDataRecord("projects", {
      title: "TLC project",
      description: "A test project",
      members: [],
      tasks: [],
    });
    expect(result.ok).toBe(true);
  });
});

describe("admin login rate limit", () => {
  it("blocks after the configured number of failures", () => {
    const key = `test-${Date.now()}`;
    const options = { limit: 2, windowMs: 60_000 };

    recordRateLimitFailure(key, options);
    recordRateLimitFailure(key, options);

    expect(checkRateLimit(key, options).allowed).toBe(false);
    clearRateLimit(key);
    expect(checkRateLimit(key, options).allowed).toBe(true);
  });
});

