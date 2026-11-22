import { describe, expect, it } from "vitest";
import { newArticle, slugify, validateArticle } from "../lib/editorial";
const valid = {
  title: "Tradition Learning : premières études",
  summary: "Présentation de nos travaux scientifiques en cours.",
  body: "La communauté mène un programme de recherche. Les expériences documentent les hypothèses et leurs limites.",
  category: "Recherche", author: "TLC", coverImage: "", status: "draft", featured: false,
};
describe("editorial content", () => {
  it("rejects invalid article fields", () => {
    expect(validateArticle({ ...valid, title: "" }).ok).toBe(false);
    expect(validateArticle({ ...valid, body: "Court", status: "published" }).ok).toBe(false);
    expect(validateArticle({ ...valid, coverImage: "javascript:alert(1)" }).ok).toBe(false);
    expect(validateArticle({ ...valid, status: "something" }).ok).toBe(false);
  });
  it("allows an unfinished draft but not an empty publication", () => {
    expect(validateArticle({ ...valid, summary: "", body: "", status: "draft" }).ok).toBe(true);
    expect(validateArticle({ ...valid, summary: "", body: "", status: "published" }).ok).toBe(false);
  });
  it("accepts a valid draft", () => {
    const result = validateArticle(valid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const article = newArticle(result.data);
    expect(article.status).toBe("draft");
    expect(article.publishedAt).toBe(null);
    expect(article.version).toBe(1);
    expect(article.slug).toContain("tradition-learning-premieres-etudes");
  });
  it("sets publication date only for published content", () => {
    const result = validateArticle({ ...valid, status: "published" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(newArticle(result.data).publishedAt).toBeTruthy();
  });
  it("slugifies accents and punctuation", () => {
    expect(slugify("Transmission & évolution !")).toBe("transmission-evolution");
  });
});
