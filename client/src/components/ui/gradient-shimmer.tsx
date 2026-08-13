import { createElement, type CSSProperties, type ElementType, type HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";

type GradientPreset = "mist" | "leaf";

type GradientShimmerProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children: string;
  gradient?: GradientPreset;
  duration?: number;
  pauseBetween?: number;
  baseColor?: string;
  as?: ElementType;
};

const palettes: Record<GradientPreset, string[]> = {
  mist: ["#d8ddd6", "#a8b1a5", "#eef0eb", "#8f9c83"],
  leaf: ["#aeb9a4", "#7e8b72", "#d9ddd3", "#84927a"],
};

export function createGradientBackground(gradient: GradientPreset) {
  const colors = palettes[gradient];
  return `linear-gradient(105deg, var(--shimmer-base) 0%, var(--shimmer-base) 34%, ${colors[0]} 42%, ${colors[1]} 47%, ${colors[2]} 52%, ${colors[3]} 57%, var(--shimmer-base) 66%, var(--shimmer-base) 100%)`;
}

function supportsClip() {
  return typeof window === "undefined" || typeof window.CSS?.supports !== "function" || window.CSS.supports("background-clip", "text") || window.CSS.supports("-webkit-background-clip", "text");
}

export function shouldAnimateGradient(reducedMotion: boolean, animationSupported: boolean) {
  return !reducedMotion && animationSupported;
}

export function GradientShimmer({ children, gradient = "leaf", duration = 1.55, pauseBetween = 1400, baseColor = "currentColor", as = "span", className, style, ...rest }: GradientShimmerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const backgroundImage = useMemo(() => createGradientBackground(gradient), [gradient]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !supportsClip() || !shouldAnimateGradient(reducedMotion, typeof element.animate === "function")) return;
    let visible = true;
    let scrolling = false;
    let cancelled = false;
    let animation: Animation | undefined;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      const width = element.getBoundingClientRect().width || 110;
      element.style.backgroundSize = `${width + 96}px 100%`;
      return width;
    };
    const play = () => {
      if (cancelled || !visible || scrolling) return;
      const width = measure();
      const next = element.animate([{ backgroundPosition: `${-48 - width / 2}px center` }, { backgroundPosition: `${width + 48 - width / 2}px center` }], { duration: Math.max(500, duration * 1000), easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" });
      animation?.cancel();
      animation = next;
      next.onfinish = () => { pauseTimer = setTimeout(play, Math.max(0, pauseBetween)); };
    };
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); if (visible && !scrolling) animation?.play(); else animation?.pause(); }, { rootMargin: "120px" });
    observer.observe(element);
    const onScroll = () => { scrolling = true; animation?.pause(); clearTimeout(scrollTimer); scrollTimer = setTimeout(() => { scrolling = false; if (visible) { animation?.play(); if (!animation) play(); } }, 130); };
    window.addEventListener("scroll", onScroll, { passive: true });
    play();
    return () => { cancelled = true; observer.disconnect(); window.removeEventListener("scroll", onScroll); animation?.cancel(); clearTimeout(pauseTimer); clearTimeout(scrollTimer); };
  }, [duration, pauseBetween, reducedMotion]);

  const clipSupported = supportsClip();
  const mergedStyle: CSSProperties = clipSupported
    ? { color: baseColor, backgroundImage, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", ["--shimmer-base" as string]: baseColor, ...style }
    : { color: baseColor, ["--shimmer-base" as string]: baseColor, ...style };
  return createElement(as, { ...rest, ref, className, style: mergedStyle }, children);
}
