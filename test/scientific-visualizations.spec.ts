import { describe, expect, it } from "vitest";
import { entityRelations, fundamentalEntities } from "../lib/scientific-content/entities";
import { fundamentalObjects, objectRelations } from "../lib/scientific-content/fundamental-objects";
import { cohortsAt, lineageNodes, lineagePath, lineageSnapshots, visibleLineageNodes } from "../lib/scientific-content/lineage";
import { constitutionResponsibilities, systemReadings } from "../lib/scientific-content/product";
import type { DiagramReference } from "../lib/scientific-content/references";

function expectReference(reference: DiagramReference) {
  expect(reference.document.trim().length).toBeGreaterThan(0);
  expect(reference.section.trim().length).toBeGreaterThan(0);
  if (reference.url) {
    const url = new URL(reference.url);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("github.com");
    expect(url.pathname).toMatch(/^\/Tradition-Learning-Community\//);
  }
}

describe("Scientific presentation invariants", () => {
  it("retains the three entities and the eight canonical objects without additional categories", () => {
    expect(new Set(fundamentalEntities.map((entity) => entity.label))).toEqual(new Set(["Maître", "Disciple", "Communauté"]));
    expect(fundamentalEntities).toHaveLength(3);
    expect(new Set(fundamentalObjects.map((object) => object.label))).toEqual(new Set(["Message", "Principes", "Valeurs", "Vertus", "Capacités", "Compétences", "Pratique", "Expérience vécue"]));
    expect(fundamentalObjects).toHaveLength(8);
    expect(new Set(fundamentalObjects.map((object) => object.id)).size).toBe(fundamentalObjects.length);
  });

  it("connects existing entities and objects only, with a source for every description", () => {
    const entityIds = new Set<string>(fundamentalEntities.map((entity) => entity.id));
    const objectIds = new Set<string>(fundamentalObjects.map((object) => object.id));
    for (const [relations, ids] of [[entityRelations, entityIds], [objectRelations, objectIds]] as const) {
      expect(new Set(relations.map((relation) => relation.id)).size).toBe(relations.length);
      for (const relation of relations) {
        expect(ids.has(relation.sourceId)).toBe(true);
        expect(ids.has(relation.targetId)).toBe(true);
        expect(relation.sourceId).not.toBe(relation.targetId);
        expectReference(relation.reference);
      }
    }
    for (const node of [...fundamentalEntities, ...fundamentalObjects]) expectReference(node.reference);
  });

  it("does not encode Message as the mandatory center of all object relationships", () => {
    const messageNeighbors = new Set(objectRelations
      .filter((relation) => relation.sourceId === "message" || relation.targetId === "message")
      .map((relation) => relation.sourceId === "message" ? relation.targetId : relation.sourceId));
    expect(messageNeighbors.size).toBeLessThan(fundamentalObjects.length - 1);
    expect(objectRelations.some((relation) => relation.sourceId !== "message" && relation.targetId !== "message")).toBe(true);
    expect(fundamentalObjects.every((object) => !("parentId" in object) && !("center" in object))).toBe(true);
  });
});

describe("Illustrative lineage behavior", () => {
  it("follows two coexisting branches through their actual parent relationships", () => {
    expect(lineagePath("d4")).toEqual(["m", "d1", "d4"]);
    expect(lineagePath("d6")).toEqual(["m", "d2", "d6"]);
    expect(lineagePath("m")).toEqual(["m"]);
    expect(lineagePath("unknown")).toEqual([]);
  });

  it("applies arrivals and departure to the selected snapshot", () => {
    const idsAt = (snapshot: number) => visibleLineageNodes(snapshot).map((node) => node.id);
    expect(idsAt(0)).not.toContain("d3");
    expect(idsAt(1)).toContain("d3");
    expect(idsAt(1)).not.toContain("d4");
    expect(idsAt(2)).toEqual(expect.arrayContaining(["d4", "d5", "d6"]));
    expect(idsAt(2)).not.toContain("d7");
    expect(idsAt(3)).not.toContain("d3");
    expect(idsAt(3)).toContain("d7");
    // Historical filiation remains readable after a participant leaves the scene.
    expect(lineagePath("d3")).toEqual(["m", "d3"]);
  });

  it("never shows a child transmission before the scenario recognizes the relay", () => {
    for (let snapshot = 0; snapshot < lineageSnapshots.length; snapshot++) {
      const nodes = visibleLineageNodes(snapshot);
      for (const node of nodes) {
        if (!node.parentId) continue;
        const parent = nodes.find((candidate) => candidate.id === node.parentId);
        expect(parent).toBeDefined();
        if (parent?.parentId) {
          expect(parent.relayFrom).toBeDefined();
          expect(parent.relayFrom!).toBeLessThanOrEqual(snapshot);
        }
      }
    }
  });

  it("groups existing Disciples and excludes the initial Master from cohorts", () => {
    for (let snapshot = 0; snapshot < lineageSnapshots.length; snapshot++) {
      const nodes = visibleLineageNodes(snapshot);
      const ids = new Set(nodes.map((node) => node.id));
      for (const cohort of cohortsAt(snapshot)) {
        expect(cohort.members.length).toBeGreaterThan(0);
        expect(new Set(cohort.members).size).toBe(cohort.members.length);
        for (const member of cohort.members) {
          expect(ids.has(member)).toBe(true);
          // In this example, a parent reference identifies the participant's
          // Disciple relation, including an explicitly explained relay role.
          expect(nodes.find((node) => node.id === member)?.parentId).toBeTruthy();
        }
      }
    }
    expect(cohortsAt(3).flatMap((cohort) => cohort.members)).not.toContain("d3");
    expect(cohortsAt(3).some((cohort) => cohort.members.includes("d7"))).toBe(true);
  });

  it("keeps cohort membership independent from lineage depth and drawing position", () => {
    const cohort = cohortsAt(2).find((item) => item.members.includes("d1") && item.members.includes("d4"));
    expect(cohort).toBeDefined();
    expect(new Set(cohort!.members.map((id) => lineagePath(id).length)).size).toBeGreaterThan(1);
    // D4 and D6 have the same number of links to M but different positions.
    expect(lineagePath("d4").length).toBe(lineagePath("d6").length);
    expect(lineageNodes.find((node) => node.id === "d4")!.y).not.toBe(lineageNodes.find((node) => node.id === "d6")!.y);
    for (const node of lineageNodes) expect(new Set(lineagePath(node.id)).size).toBe(lineagePath(node.id).length);
  });
});

describe("Constitution and interpretation of a TL system", () => {
  it("describes six independently addressable responsibilities without a prescribed next step", () => {
    expect(new Set(constitutionResponsibilities.map((item) => item.id))).toEqual(new Set(["mission", "resources", "roles", "capacities", "conditions", "availability"]));
    expect(constitutionResponsibilities).toHaveLength(6);
    for (const responsibility of constitutionResponsibilities) {
      expect(responsibility.developer.length).toBeGreaterThan(0);
      expect(responsibility.system.length).toBeGreaterThan(0);
      expect("next" in responsibility || "previous" in responsibility || "step" in responsibility).toBe(false);
    }
  });

  it("separates structural constitution, executability, observed learning and Tradition development", () => {
    expect(new Set(systemReadings.map((reading) => reading.id))).toEqual(new Set(["constituted", "executable", "learning", "tradition"]));
    expect(systemReadings).toHaveLength(4);
    expect(new Set(systemReadings.map((reading) => reading.evidence)).size).toBe(4);
    for (const reading of systemReadings) expect(reading.evidence.trim().length).toBeGreaterThan(0);
  });
});
