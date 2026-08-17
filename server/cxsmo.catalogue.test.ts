import { describe, expect, it } from "vitest";
import { cxsmoCategories, cxsmoProducts, formatCxsmoPrice, getCxsmoProduct } from "../client/src/lib/cxsmo";

describe("C✦SMO portfolio catalogue", () => {
  it("keeps unique, route-ready fictional products", () => {
    expect(cxsmoProducts).toHaveLength(60);
    expect(new Set(cxsmoProducts.map((product) => product.id)).size).toBe(cxsmoProducts.length);
    expect(getCxsmoProduct("gravity-01").name).toBe("Gravity Puddle Jean");
    expect(getCxsmoProduct("bluestar-09").name).toBe("Bluestar C✦SMO Jersey");
    expect(getCxsmoProduct("blxck-pants-10").name).toBe("BLXCK UNIV3RSE Pants");
    expect(getCxsmoProduct("mercury-belt-13").name).toBe("Mercury Orbit Belt");
    expect(getCxsmoProduct("chrome-puddle-14").name).toBe("Chrome Puddle Sweatpant");
    expect(getCxsmoProduct("lunar-veil-15").name).toBe("Lunar Veil Eyewear");
    expect(getCxsmoProduct("redline-moto-16").name).toBe("Redline Moto Jacket");
    expect(getCxsmoProduct("silver-crown-case-17").name).toBe("Silver Crown Crimson Sling Bag");
    expect(getCxsmoProduct("stellar-cargo-18").name).toBe("Stellar Cargo Pants");
    expect(getCxsmoProduct("loud-enough-shirt-19").name).toBe("LOUD ENOUGH Longsleeve");
    expect(getCxsmoProduct("core-tee-40").name).toBe("Core Oval Tee");
    expect(getCxsmoProduct("lunar-visor-67").name).toBe("Lunar Visor");
    expect(getCxsmoProduct("chain-star-moto-77").name).toBe("Chain Star Moto");
    expect(getCxsmoProduct("star-chain-cargo-82").name).toBe("Star Chain Cargo");
    expect(getCxsmoProduct("missing-product").id).toBe("gravity-01");
  });

  it("keeps category discovery and fictional pricing internally consistent", () => {
    expect(cxsmoCategories).toContain("Accessories");
    expect(cxsmoCategories).toContain("Beauty");
    expect(cxsmoCategories).toContain("Bottoms");
    expect(new Set(cxsmoProducts.map((product) => product.category))).toEqual(new Set(["Denim", "Bottoms", "Graphics", "Outerwear", "Tailoring", "Accessories", "Footwear", "Beauty", "Lifestyle"]));
    expect(formatCxsmoPrice(184)).toBe("$184");
    expect(cxsmoProducts.every((product) => product.image.includes("/images/") && product.details.length > 0 && product.price > 0)).toBe(true);
    expect(getCxsmoProduct("starlight-03").image).toBe("/images/cxsmo-starlight-shell-alpha-fallback_a7406211.png");
    expect(getCxsmoProduct("gloss-07").image).toBe("/images/cxsmo-static-bloom-lip-glaze-alpha_40b6478e.png");
    expect(getCxsmoProduct("orbit-05").image).toBe("/images/cxsmo-key-charm-alpha-fallback_3dd702fb.png");
    expect(getCxsmoProduct("tread-06").image).toBe("/images/cxsmo-tread-phase-sneaker-alpha_d319a0ce.png");
    expect(getCxsmoProduct("mercury-belt-13").image).toBe("/images/cxsmo-mercury-orbit-belt-13.png");
    expect(getCxsmoProduct("chrome-puddle-14").image).toBe("/images/cxsmo-chrome-puddle-14.png");
    expect(getCxsmoProduct("lunar-veil-15").image).toBe("/images/cxsmo-lunar-veil-15.png");
    expect(getCxsmoProduct("redline-moto-16").image).toBe("/images/cxsmo-redline-moto-16.png");
    expect(getCxsmoProduct("silver-crown-case-17").image).toBe("/images/cxsmo-silver-crown-sling-17.png");
    expect(getCxsmoProduct("stellar-cargo-18").image).toBe("/images/cxsmo-stellar-cargo-18.png");
    expect(getCxsmoProduct("stellar-cargo-18").image).not.toContain("regenerated");
    expect(getCxsmoProduct("star-beanie-46").image).toBe("/images/cxsmo-star-beanie-46-regenerated.png");
    expect(getCxsmoProduct("bolt-raglan-48").image).toBe("/images/cxsmo-bolt-raglan-48-regenerated.png");
    expect(getCxsmoProduct("star-ruched-top-52").image).toBe("/images/cxsmo-star-ruched-top-52-regenerated.png");
    expect(getCxsmoProduct("midnight-star-sweatpant-58").image).toBe("/images/cxsmo-midnight-star-sweatpant-58-regenerated.png");
    expect(getCxsmoProduct("silver-crown-case-17").category).toBe("Lifestyle");
    expect(getCxsmoProduct("loud-enough-shirt-19").image).toBe("/images/cxsmo-loud-enough-y2k-shirt-alpha_a1936a15.png");
    expect(getCxsmoProduct("loud-enough-shirt-19").category).toBe("Graphics");
    expect(getCxsmoProduct("starburst-knit-41").image).toBe("/images/cxsmo-smart-cxsmo-catalogue-10-starburst-knit.png");
    expect(getCxsmoProduct("lunar-visor-67").image).toBe("/images/cxsmo-smart-cxsmo-catalogue-39-lunar-visor.png");
  });
});
