import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const mediaSource = read("client/src/lib/cxsmoMedia.ts");
const productSource = read("client/src/lib/cxsmo.ts");
const fallbackSource = read("client/src/components/CxsmoPublicMediaFallback.tsx");
const storefrontSource = read("client/src/pages/CxsmoStorefront.tsx");
const contentSource = read("client/src/lib/cxsmoContent.ts");
const fitSource = read("client/src/components/CxsmoFitCarousel.tsx");
const soundSource = read("client/src/contexts/CxsmoSoundContext.tsx");

describe("C✦SMO portable public media contract", () => {
  it("maps managed media basenames to Git-tracked /images URLs and retains the managed source resolver", () => {
    expect(mediaSource).toContain('const managedPrefix = "/manus-storage/"');
    expect(mediaSource).toContain('const publicPrefix = "/images/"');
    expect(mediaSource).toContain("export function cxsmoManagedMediaUrl");
    expect(mediaSource).toContain("export function preferCxsmoPublicMedia");
  });

  it("uses the committed public bundle by default while retaining managed fallback behavior", () => {
    expect(productSource).toContain("image: preferCxsmoPublicMedia(product.image)");
    expect(fallbackSource).toContain('const publicSource = preferCxsmoPublicMedia(declaredSource)');
    expect(fallbackSource).toContain('image.setAttribute("src", publicSource)');
    expect(fallbackSource).toContain('image.setAttribute("src", managedSource)');
    expect(fallbackSource).toContain("new MutationObserver");
    expect(mediaSource).toContain('import.meta.env.VITE_CXSMO_USE_MANAGED_MEDIA !== "true"');
    expect(storefrontSource).toContain('const heroImage = preferCxsmoPublicMedia');
    expect(contentSource).toContain('assetUrl: preferCxsmoPublicMedia(hero.assetUrl)');
    expect(contentSource).toContain('image: preferCxsmoPublicMedia(resolved.image)');
    expect(fitSource).toContain('image: preferCxsmoPublicMedia(fit.image)');
    expect(soundSource).toContain('const publicSource = preferCxsmoPublicMedia(managedSource)');
  });
});
