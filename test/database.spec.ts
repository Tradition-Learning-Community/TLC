import { describe, expect, it } from "vitest";
import { readCollection } from "../lib/database";

describe("SQLite data layer", () => {
  it("migrates the seed profiles into SQLite", () => {
    const profiles = readCollection<{ id: string }>("profiles");
    expect(profiles.some((profile) => profile.id === "user-alice")).toBe(true);
  });
});
