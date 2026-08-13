import { describe, expect, it } from "vitest";
import { createGradientBackground, shouldAnimateGradient } from "../client/src/components/ui/gradient-shimmer";

describe("createGradientBackground", () => {
  it("creates a muted leaf gradient around the base text colour", () => {
    const gradient = createGradientBackground("leaf");
    expect(gradient).toContain("linear-gradient(105deg");
    expect(gradient).toContain("var(--shimmer-base)");
    expect(gradient).toContain("#7e8b72");
  });

  it("keeps the mist variant distinct for future fashion-story use", () => {
    expect(createGradientBackground("mist")).toContain("#d8ddd6");
    expect(createGradientBackground("mist")).not.toBe(createGradientBackground("leaf"));
  });

  it("keeps the shimmer static when reduced motion is requested", () => {
    expect(shouldAnimateGradient(true, true)).toBe(false);
    expect(shouldAnimateGradient(false, false)).toBe(false);
    expect(shouldAnimateGradient(false, true)).toBe(true);
  });
});
