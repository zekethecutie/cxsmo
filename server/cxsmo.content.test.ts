import { describe, expect, it } from "vitest";
import { cxsmoProducts } from "../client/src/lib/cxsmo";
import { defaultCxsmoHero, resolveCxsmoProduct } from "../client/src/lib/cxsmoContent";

describe("C✦SMO centralized content defaults", () => {
  it("sets the approved three-person campaign as the editable hero default", () => {
    expect(defaultCxsmoHero.assetUrl).toContain("cxsmo-hero-campaign_f5a1c0fc");
    expect(defaultCxsmoHero.assetAlt).toMatch(/three adult/i);
  });

  it("applies display overrides without changing the product’s core identity or price", () => {
    const source = cxsmoProducts[0];
    const result = resolveCxsmoProduct(source, { name: "Gravity / edited", image: "/manus-storage/studio-test.png" });
    expect(result).toMatchObject({ id: source.id, price: source.price, category: source.category, name: "Gravity / edited", image: "/manus-storage/studio-test.png" });
  });
});
