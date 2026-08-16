import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const checkoutSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoCheckoutSimulation.tsx"), "utf8");
const demoSource = readFileSync(resolve(process.cwd(), "client/src/contexts/CxsmoDemoContext.tsx"), "utf8");
const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const promotionPopupSource = readFileSync(resolve(process.cwd(), "client/src/components/CxsmoPromotionPopup.tsx"), "utf8");

describe("C✦SMO locale and checkout simulation", () => {
  it("keeps the delivery map as a browser-only preview with an explicit staged-state boundary", () => {
    expect(checkoutSource).toContain('const steps = ["Review", "Address", "Delivery", "Confirm"]');
    expect(checkoutSource).toContain("MapView");
    expect(checkoutSource).toContain('title: "Browser-only delivery preview"');
    expect(checkoutSource).toContain("No payment, order, address, or contact information is transmitted or retained by C✦SMO");
    expect(checkoutSource).toContain('disabled={!acknowledged}');
    expect(checkoutSource).toContain("No order reference, receipt, payment, or personal-data record has been created.");
    expect(checkoutSource).not.toContain("fetch(");
  });

  it("keeps locale preferences browser-local with region-aware default currencies", () => {
    expect(demoSource).toContain('const storageKey = "cxsmo-demo-state"');
    expect(demoSource).toContain("navigator.language");
    expect(demoSource).toContain('currency: "PHP" as const, fallbackRate: 58');
    expect(demoSource).toContain('currency: "JPY" as const, fallbackRate: 155');
    expect(demoSource).toContain('https://open.er-api.com/v6/latest/USD');
    expect(demoSource).toContain("currencyRate");
    expect(demoSource).toContain('window.localStorage.setItem(storageKey');
  });

  it("keeps the legal-information routes publicly registered", () => {
    ["/cxsmo/legal", "/cxsmo/privacy", "/cxsmo/terms", "/cxsmo/disclosure"].forEach((path) => expect(appSource).toContain(`path="${path}"`));
  });

  it("keeps the owner-controlled promotion popup focus-trapped and browser-dismissible", () => {
    expect(promotionPopupSource).toContain('role="dialog"');
    expect(promotionPopupSource).toContain('aria-modal="true"');
    expect(promotionPopupSource).toContain('event.key === "Escape"');
    expect(promotionPopupSource).toContain('event.key !== "Tab"');
    expect(promotionPopupSource).toContain('document.body.style.overflow = "hidden"');
    expect(promotionPopupSource).toContain('previous?.isConnected');
    expect(promotionPopupSource).toContain('window.sessionStorage.setItem(key, "true")');
  });
});
