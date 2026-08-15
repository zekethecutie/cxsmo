import { describe, expect, it } from "vitest";
import { cxsmoCategories, cxsmoProducts, formatCxsmoPrice, getCxsmoProduct } from "../client/src/lib/cxsmo";

describe("C✦SMO portfolio catalogue", () => {
  it("keeps unique, route-ready fictional products", () => {
    expect(cxsmoProducts).toHaveLength(17);
    expect(new Set(cxsmoProducts.map((product) => product.id)).size).toBe(cxsmoProducts.length);
    expect(getCxsmoProduct("gravity-01").name).toBe("Gravity Puddle Jean");
    expect(getCxsmoProduct("bluestar-09").name).toBe("Bluestar C✦SMO Jersey");
    expect(getCxsmoProduct("blxck-pants-10").name).toBe("BLXCK UNIV3RSE Pants");
    expect(getCxsmoProduct("mercury-belt-13").name).toBe("Mercury Orbit Belt");
    expect(getCxsmoProduct("chrome-puddle-14").name).toBe("Chrome Puddle Sweatpant");
    expect(getCxsmoProduct("lunar-veil-15").name).toBe("Lunar Veil Eyewear");
    expect(getCxsmoProduct("redline-moto-16").name).toBe("Redline Moto Jacket");
    expect(getCxsmoProduct("silver-crown-case-17").name).toBe("Silver Crown Cosmetic Case");
    expect(getCxsmoProduct("missing-product").id).toBe("gravity-01");
  });

  it("keeps category discovery and fictional pricing internally consistent", () => {
    expect(cxsmoCategories).toContain("Accessories");
    expect(cxsmoCategories).toContain("Beauty");
    expect(cxsmoCategories).toContain("Bottoms");
    expect(new Set(cxsmoProducts.map((product) => product.category))).toEqual(new Set(["Denim", "Bottoms", "Graphics", "Outerwear", "Tailoring", "Accessories", "Footwear", "Beauty", "Lifestyle"]));
    expect(formatCxsmoPrice(184)).toBe("$184");
    expect(cxsmoProducts.every((product) => product.image.includes("/manus-storage/") && product.details.length > 0 && product.price > 0)).toBe(true);
    expect(getCxsmoProduct("starlight-03").image).toBe("/manus-storage/cxsmo-starlight-shell-alpha-fallback_a7406211.png");
    expect(getCxsmoProduct("gloss-07").image).toBe("/manus-storage/cxsmo-static-bloom-lip-glaze-alpha_40b6478e.png");
    expect(getCxsmoProduct("orbit-05").image).toBe("/manus-storage/cxsmo-key-charm-alpha-fallback_3dd702fb.png");
    expect(getCxsmoProduct("tread-06").image).toBe("/manus-storage/cxsmo-tread-phase-sneaker-alpha_d319a0ce.png");
    expect(getCxsmoProduct("mercury-belt-13").image).toBe("/manus-storage/cxsmo-mercury-orbit-belt_a7333191.png");
    expect(getCxsmoProduct("chrome-puddle-14").image).toBe("/manus-storage/cxsmo-chrome-puddle-sweatpant_1351e925.png");
    expect(getCxsmoProduct("lunar-veil-15").image).toBe("/manus-storage/cxsmo-lunar-veil-eyewear_a4fe1c13.png");
    expect(getCxsmoProduct("redline-moto-16").image).toBe("/manus-storage/cxsmo-redline-moto-jacket_778ee18f.png");
    expect(getCxsmoProduct("silver-crown-case-17").image).toBe("/manus-storage/cxsmo-silver-crown-cosmetic-case_f85dd076.png");
  });
});
