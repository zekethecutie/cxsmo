import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const soundSource = readFileSync(resolve(process.cwd(), "client/src/contexts/CxsmoSoundContext.tsx"), "utf8");

describe("C✦SMO optional sound contract", () => {
  it("keeps the supplied library plus the dedicated modern technology-select cue mapped to hover controls", () => {
    expect(soundSource.match(/mixkit-[^"']+\.wav/g)).toHaveLength(15);
    expect(soundSource).toContain('hover: "/manus-storage/cxsmo-modern-technology-select_c5dbba14.wav"');
    expect(soundSource).toContain('zoom: "/manus-storage/cxsmo-modern-technology-select_c5dbba14.wav"');
    ["open", "click", "success", "theme", "shutter", "launch", "chapter", "finish", "nav", "primary", "select", "treasure", "lock", "double", "replay", "hover", "zoom"].forEach((cue) => expect(soundSource).toContain(`${cue}:`));
  });

  it("keeps short cues audible while preserving optional, touch-safe, throttled playback", () => {
    expect(soundSource).toContain("hover: .27");
    expect(soundSource).toContain("zoom: .27");
    expect(soundSource).toContain("double: .2");
    expect(soundSource).toContain("stored === null ? true");
    expect(soundSource).toContain("if (enabledRef.current) playRaw(cue)");
    expect(soundSource).toContain('if (event.pointerType === "touch") return');
    expect(soundSource).toContain("now - lastPlayed.current < 80");
    expect(soundSource).toContain("hoverTargets.current.get(element) ?? 0) < 340");
  });
});
