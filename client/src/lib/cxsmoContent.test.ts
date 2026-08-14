import { describe, expect, it } from "vitest";
import { cxsmoProducts } from "./cxsmo";
import { defaultCxsmoHero, resolveCxsmoProduct } from "./cxsmoContent";

describe("C✦SMO sitewide content defaults", () => {
  it("uses the approved three-person campaign media as the editable hero default", () => {
    expect(defaultCxsmoHero.assetUrl).toContain("cxsmo-hero-campaign_f5a1c0fc");
    expect(defaultCxsmoHero.assetAlt).toMatch(/three adult/i);
  });

  it("overrides presentation fields without altering a product’s commerce-safe core data", () => {
    const source = cxsmoProducts[0];
    const resolved = resolveCxsmoProduct(source, {
      name: "Gravity / edited",
      image: "/manus-storage/studio-test.png",
    });
    expect(resolved.name).toBe("Gravity / edited");
    expect(resolved.image).toBe("/manus-storage/studio-test.png");
    expect(resolved.id).toBe(source.id);
    expect(resolved.price).toBe(source.price);
    expect(resolved.category).toBe(source.category);
  });
});
