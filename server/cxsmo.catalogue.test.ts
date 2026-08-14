import { describe, expect, it } from "vitest";
import { cxsmoCategories, cxsmoProducts, formatCxsmoPrice, getCxsmoProduct } from "../client/src/lib/cxsmo";

describe("C✦SMO portfolio catalogue", () => {
  it("keeps unique, route-ready fictional products", () => {
    expect(cxsmoProducts).toHaveLength(12);
    expect(new Set(cxsmoProducts.map((product) => product.id)).size).toBe(cxsmoProducts.length);
    expect(getCxsmoProduct("gravity-01").name).toBe("Gravity Puddle Jean");
    expect(getCxsmoProduct("bluestar-09").name).toBe("Bluestar C✦SMO Jersey");
    expect(getCxsmoProduct("blxck-pants-10").name).toBe("BLXCK UNIV3RSE Pants");
    expect(getCxsmoProduct("missing-product").id).toBe("gravity-01");
  });

  it("keeps category discovery and fictional pricing internally consistent", () => {
    expect(cxsmoCategories).toContain("Accessories");
    expect(cxsmoCategories).toContain("Beauty");
    expect(new Set(cxsmoProducts.map((product) => product.category))).toEqual(new Set(["Denim", "Graphics", "Outerwear", "Tailoring", "Accessories", "Footwear", "Beauty", "Lifestyle"]));
    expect(formatCxsmoPrice(184)).toBe("$184");
    expect(cxsmoProducts.every((product) => product.image.includes("/manus-storage/") && product.details.length > 0 && product.price > 0)).toBe(true);
    expect(getCxsmoProduct("starlight-03").image).toBe("/manus-storage/cxsmo-starlight-shell-v3_d0c90120.webp");
    expect(getCxsmoProduct("gloss-07").image).toBe("/manus-storage/cxsmo-static-lip-glaze-v2_7f407941.webp");
    expect(getCxsmoProduct("orbit-05").image).toBe("/manus-storage/cxsmo-key-charm-v2_2f9d899d.webp");
  });
});
