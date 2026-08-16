import { describe, expect, it } from "vitest";
import { cxsmoCategories, cxsmoProducts, formatCxsmoPrice, getCxsmoProduct } from "./cxsmo";

describe("C✦SMO catalogue", () => {
  it("uses unique product identifiers for route-level product lookup", () => {
    const ids = cxsmoProducts.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(getCxsmoProduct("gravity-01").name).toBe("Gravity Puddle Jean");
  });

  it("preserves the intended four public product categories", () => {
    expect(new Set(cxsmoProducts.map((product) => product.category))).toEqual(new Set(["Denim", "Graphics", "Outerwear", "Tailoring", "Accessories", "Footwear", "Beauty", "Lifestyle"]));
    expect(cxsmoCategories).toContain("Accessories");
    expect(cxsmoCategories).toContain("Beauty");
  });

  it("formats fictional portfolio pricing consistently without payment claims", () => {
    expect(formatCxsmoPrice(184)).toBe("$184");
    expect(formatCxsmoPrice(184, "en-PH", "PHP", 58)).toBe("₱10,672");
    expect(cxsmoProducts.every((product) => product.price > 0 && product.details.length > 0)).toBe(true);
  });
});
