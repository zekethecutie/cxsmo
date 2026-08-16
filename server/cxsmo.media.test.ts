import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const productSource = read("client/src/lib/cxsmo.ts");
const fallbackSource = read("client/src/components/CxsmoPublicMediaFallback.tsx");
const storefrontSource = read("client/src/pages/CxsmoStorefront.tsx");
const contentSource = read("client/src/lib/cxsmoContent.ts");
const fitSource = read("client/src/components/CxsmoFitCarousel.tsx");
const soundSource = read("client/src/contexts/CxsmoSoundContext.tsx");

describe("C✦SMO portable public media contract", () => {
  it("uses Git-tracked public assets directly without a managed-storage path or runtime fallback", () => {
    [productSource, fallbackSource, storefrontSource, contentSource, fitSource, soundSource].forEach((source) => {
      expect(source).not.toContain("/manus-storage/");
      expect(source).not.toContain("preferCxsmoPublicMedia");
    });
    expect(productSource).toContain('image: "/images/');
    expect(storefrontSource).toContain('const heroImage = "/images/');
    expect(contentSource).toContain('assetUrl: "/images/');
    expect(fitSource).toContain('image: "/images/');
    expect(soundSource).toContain('new Audio(soundSources[cue])');
    expect(fallbackSource).toContain("return null");
  });
});
