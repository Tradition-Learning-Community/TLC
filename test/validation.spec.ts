import { describe, expect, it } from "vitest";
import { checkRateLimit, clearRateLimit, recordRateLimitFailure } from "../lib/rate-limit";
import { validateDataRecord } from "../lib/validation";

describe("server validation", () => {
  it("rejects incomplete projects", () => {
    const result = validateDataRecord("projects", { title: "" });
    expect(result.ok).toBe(false);
  });

  it("validates optional published event image URLs", () => {
    const event = {title:"TLC workshop",date:"2026-12-01",type:"Atelier"};
    expect(validateDataRecord("events", {...event,image:"https://cdn.example.org/tlc/event.jpg"}).ok).toBe(true);
    expect(validateDataRecord("events", {...event,image:"/images/event.png"}).ok).toBe(true);
    expect(validateDataRecord("events", {...event,image:"javascript:alert(1)"}).ok).toBe(false);
    expect(validateDataRecord("events", {...event,image:"//untrusted.example/image.jpg"}).ok).toBe(false);
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

