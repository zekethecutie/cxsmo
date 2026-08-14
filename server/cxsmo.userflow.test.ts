import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const storefront = source("client/src/pages/CxsmoStorefront.tsx");
const poster = source("client/src/pages/CxsmoPosterHome.tsx");
const account = source("client/src/components/CxsmoAccountPanel.tsx");
const demo = source("client/src/contexts/CxsmoDemoContext.tsx");
const player = source("client/src/components/CxsmoGuidedShowcase.tsx");
const userflowStyle = source("client/src/pages/cxsmo-userflow.css");
const studio = source("client/src/pages/CxsmoAdminPage.tsx");

describe("C✦SMO presentation-first user flow", () => {
  it("keeps a browser-dismissible portfolio notice and permanent footer boundary", () => {
    expect(storefront).toContain('"cxsmo-disclaimer-hidden"');
    expect(storefront).toContain("Dismiss portfolio disclosure for this session");
    expect(storefront).toContain("Fictional fashion-commerce UI/UX presentation");
  });

  it("adds catalogue search and an honest empty discovery state", () => {
    expect(storefront).toContain('const [query, setQuery] = useState("")');
    expect(storefront).toContain("Search the drop");
    expect(storefront).toContain("No signal found.");
    expect(storefront).toContain("This search only reads the twelve fictional catalogue objects in the browser.");
  });

  it("keeps account access browser-local without credentials", () => {
    expect(demo).toContain("isSignedIn: boolean");
    expect(demo).toContain("startLocalAccount");
    expect(demo).toContain("signOutLocalAccount");
    expect(account).toContain("no credentials");
    expect(account).toContain("Sign out on this device");
  });

  it("keeps the animated navigation keyboard-safe and dismissal-safe", () => {
    expect(storefront).toContain('window.addEventListener("pointerdown", dismissOnPointer)');
    expect(storefront).toContain('window.addEventListener("keydown", dismissOnEscape)');
    expect(storefront).toContain("closeAndRestoreFocus");
    expect(storefront).toContain('event.key === "ArrowDown"');
    expect(storefront).toContain('event.key === "ArrowUp"');
    expect(storefront).toContain('event.key === "Home"');
    expect(storefront).toContain('event.key === "End"');
  });

  it("makes shopper and operator paths explicit without fabricating commerce records", () => {
    expect(account).toContain('SHOPPER FLOW / LOCAL ONLY');
    expect(account).toContain('Nothing becomes a customer profile, payment, or fulfilment record.');
    expect(account).toContain('state: "No order"');
    expect(studio).toContain('STORE FLOW / HONEST HANDOFF');
    expect(studio).toContain('The final stage stays visibly disconnected until a real commerce source exists.');
    expect(studio).toContain('label: "Connect operations"');
  });

  it("adds product-forward landing motion and an exit-only explainer film", () => {
    expect(poster).toContain("poster-entry-flow");
    expect(poster).toContain("poster-product-conveyor");
    expect(userflowStyle).toContain("@keyframes cxsmo-conveyor");
    expect(player).toContain("PRODUCT + PLATFORM FILM");
    expect(player).toContain("setPlaying(reducedMotion !== true)");
    expect(player).not.toContain("Pause film");
    expect(player).not.toContain("Next shot");
    expect(player).not.toContain("Restart");
  });
});
