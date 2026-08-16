import { describe, expect, it } from "vitest";
import { cxsmoFitLibrary } from "../client/src/components/CxsmoFitCarousel";
import { cxsmoProducts } from "../client/src/lib/cxsmo";

describe("C✦SMO Fit Edits catalogue reconciliation", () => {
  it("links only to product identifiers present in the active catalogue", () => {
    const catalogueIds = new Set(cxsmoProducts.map((product) => product.id));
    cxsmoFitLibrary.forEach((fit) => {
      expect(new Set(fit.listedIds).size).toBe(fit.listedIds.length);
      fit.listedIds.forEach((productId) => expect(catalogueIds.has(productId)).toBe(true));
    });
  });

  it("retains only verified visual matches as listed pieces and leaves unavailable garments planned", () => {
    expect(cxsmoFitLibrary.find((fit) => fit.index === "M / 06")?.listedIds).toEqual(["black-star-overshirt-68", "star-chain-cargo-82"]);
    expect(cxsmoFitLibrary.find((fit) => fit.index === "M / 15")?.listedIds).toEqual(["chain-star-moto-77", "star-chain-cargo-82"]);
    expect(cxsmoFitLibrary.find((fit) => fit.index === "W / 03")?.listedIds).toEqual(["lace-corset-50", "pleated-belt-skirt-54", "buckle-stack-boot-63"]);
    expect(cxsmoFitLibrary.find((fit) => fit.index === "W / 01")?.listedIds).toEqual([]);
    expect(cxsmoFitLibrary.find((fit) => fit.index === "W / 01")?.plannedPieces).toHaveLength(3);
  });
});
