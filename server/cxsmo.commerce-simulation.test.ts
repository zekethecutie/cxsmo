import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const context = source("client/src/contexts/CxsmoDemoContext.tsx");
const productDetail = source("client/src/pages/CxsmoProductDetail.tsx");
const checkout = source("client/src/components/CxsmoCheckoutSimulation.tsx");
const storefront = source("client/src/pages/CxsmoStorefront.tsx");
const promotion = source("client/src/lib/cxsmoContent.ts");
const catalogue = source("client/src/lib/cxsmo.ts");

describe("C✦SMO browser-local commerce simulation", () => {
  it("carries selected product colours alongside sizes in the local bag", () => {
    expect(context).toContain('color?: string');
    expect(context).toContain('addToBag: (product: CxsmoProduct, size: string, color?: string)');
    expect(context).toContain('color: color ?? product.color');
    expect(productDetail).toContain('const colorOptions');
    expect(productDetail).toContain('Finish selection');
  });

  it("keeps promotion and bag incentives visibly non-transactional", () => {
    expect(promotion).toContain('SIGNAL WEEK / PORTFOLIO EVENT');
    expect(storefront).toContain('No discount, voucher, or delivery promise is applied.');
    expect(storefront).toContain('Voucher layout preview selected');
    expect(storefront).toContain('location === "/cxsmo"');
  });

  it("provides a session-only map pin without retaining an address", () => {
    expect(checkout).toContain('map.addListener("click"');
    expect(checkout).toContain('Click the map to stage a browser-session location pin.');
    expect(checkout).toContain('They are not used to create a delivery address.');
  });

  it("keeps the product discussion surface honest instead of inventing social proof", () => {
    expect(productDetail).toContain('customer reviews, ratings, and endorsements empty rather than inventing social proof');
    expect(productDetail).toContain('Nothing is published or sent.');
    expect(productDetail).not.toContain('verified buyer');
  });

  it("correctly identifies the repaired technical cargo object as pants", () => {
    expect(catalogue).toContain('name: "Midnight Cargo Pant"');
    expect(catalogue).toContain('fit: "Low-rise, wide-leg pooled hem"');
  });
});
