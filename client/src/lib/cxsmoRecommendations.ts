export const cxsmoTasteMatches: Record<string, string[]> = {
  "Baggy denim": ["gravity-01", "signal-04"],
  "Graphic layers": ["orbit-02", "starlight-03"],
  "Chrome objects": ["orbit-05", "transit-08"],
  "Soft tailoring": ["signal-04", "starlight-03"],
  "Beauty detail": ["gloss-07", "orbit-05"],
  "Skate profile": ["tread-06", "gravity-01"],
};

export function getCxsmoRecommendationIds(tastes: string[]) {
  return Array.from(new Set(tastes.flatMap((taste) => cxsmoTasteMatches[taste] ?? [])));
}
