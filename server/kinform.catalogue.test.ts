import { describe, expect, it } from "vitest";
import { getKinformProduct, kinformProducts } from "../client/src/lib/kinform";

describe("KINFORM portfolio catalogue", () => {
  it("keeps four fictional products with the information required by public and owner routes", () => {
    expect(kinformProducts).toHaveLength(4);
    for (const product of kinformProducts) {
      expect(product.name).toBeTruthy();
      expect(product.image).toContain("/manus-storage/");
      expect(product.detailImage).toContain("/manus-storage/");
      expect(product.price).toBeGreaterThan(0);
      expect(product.details.length).toBeGreaterThan(0);
    }
  });

  it("returns the Line Tee as a safe product-route fallback", () => {
    expect(getKinformProduct("line-01").name).toBe("Line Tee");
    expect(getKinformProduct("missing-object").id).toBe("line-01");
  });
});
