import { describe, expect, it } from "vitest";
import { getCxsmoRecommendationIds } from "../client/src/lib/cxsmoRecommendations";

describe("C✦SMO local taste recommendations", () => {
  it("merges taste-led recommendation identifiers without duplicate objects", () => {
    expect(getCxsmoRecommendationIds(["Baggy denim", "Skate profile"])).toEqual(["gravity-01", "signal-04", "tread-06"]);
  });

  it("ignores unknown taste labels instead of creating a fabricated recommendation", () => {
    expect(getCxsmoRecommendationIds(["Unknown signal"])).toEqual([]);
  });
});
