import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

export type CxsmoSoundCue = "open" | "click" | "success" | "theme" | "shutter" | "launch" | "chapter" | "finish" | "nav" | "primary" | "select" | "treasure" | "lock" | "double" | "replay" | "hover" | "zoom";
type SoundContextValue = { enabled: boolean; toggle: () => void; play: (cue: CxsmoSoundCue) => void };

const soundSources: Record<CxsmoSoundCue, string> = {
  open: "/manus-storage/mixkit-opening-software-interface-2578_66a94353.wav",
  click: "/manus-storage/mixkit-interface-device-click-2577_c336aeda.wav",
  success: "/manus-storage/mixkit-quick-positive-video-game-notification-interface-265_b60b25e0.wav",
  theme: "/manus-storage/mixkit-magic-sparkle-whoosh-2350_41bf53fc.wav",
  shutter: "/manus-storage/mixkit-camera-digital-shutter-1432_50c392db.wav",
  launch: "/manus-storage/mixkit-game-bonus-reached-2065_6a20f363.wav",
  chapter: "/manus-storage/mixkit-explainer-video-pops-whoosh-light-pop-3005_c618143d.wav",
  finish: "/manus-storage/mixkit-quick-win-video-game-notification-269_6c476a70.wav",
  nav: "/manus-storage/mixkit-game-click-1114_ccfb20bb.wav",
  primary: "/manus-storage/mixkit-hard-pop-click-2364_776e6480.wav",
  select: "/manus-storage/mixkit-select-click-1109_176ff20b.wav",
  treasure: "/manus-storage/mixkit-video-game-treasure-2066_800e9e65.wav",
  lock: "/manus-storage/mixkit-computer-digital-lock-2859_6e99bea6.wav",
  double: "/manus-storage/mixkit-fast-double-click-on-mouse-275_35c59510.wav",
  replay: "/manus-storage/mixkit-bonus-earned-in-video-game-2058_6edf4d2a.wav",
  hover: "/manus-storage/cxsmo-modern-technology-select_c5dbba14.wav",
  zoom: "/manus-storage/cxsmo-modern-technology-select_c5dbba14.wav",
};
const soundVolume: Record<CxsmoSoundCue, number> = { open: .3, click: .23, success: .34, theme: .36, shutter: .3, launch: .46, chapter: .32, finish: .4, nav: .23, primary: .3, select: .24, treasure: .34, lock: .29, double: .2, replay: .38, hover: .27, zoom: .27 };
const soundStorageKey = "cxsmo-sound-enabled";
const CxsmoSoundContext = createContext<SoundContextValue | undefined>(undefined);

export function CxsmoSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => { const stored = window.localStorage.getItem(soundStorageKey); return stored === null ? true : stored === "true"; });
  const enabledRef = useRef(enabled);
  const lastPlayed = useRef(0);
  const hoverTargets = useRef(new WeakMap<HTMLElement, number>());
  useEffect(() => { enabledRef.current = enabled; window.localStorage.setItem(soundStorageKey, String(enabled)); }, [enabled]);
  const playRaw = useCallback((cue: CxsmoSoundCue) => {
    const now = Date.now();
    if (["click", "nav", "select", "double", "hover"].includes(cue) && now - lastPlayed.current < 80) return;
    lastPlayed.current = now;
    const audio = new Audio(soundSources[cue]);
    audio.volume = soundVolume[cue];
    void audio.play().catch(() => undefined);
  }, []);
  const play = useCallback((cue: CxsmoSoundCue) => { if (enabledRef.current) playRaw(cue); }, [playRaw]);
  const toggle = useCallback(() => { const next = !enabledRef.current; setEnabled(next); if (next) window.setTimeout(() => playRaw("open"), 0); }, [playRaw]);
  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("button, a") : null;
      if (!element || element.closest("[data-cxsmo-sound-silent]")) return;
      if (!element.closest(".cxsmo-site, .cxsmo-entry")) return;
      const explicit = element.dataset.cxsmoSound as CxsmoSoundCue | undefined;
      if (explicit && explicit in soundSources) { play(explicit); return; }
      if (element.classList.contains("cxsmo-header__menu-trigger") || element.tagName === "A") { play("nav"); return; }
      if (element.classList.contains("cxsmo-button") || element.classList.contains("poster-button")) { play("primary"); return; }
      if (element.getAttribute("aria-label")?.toLowerCase().startsWith("save")) { play("treasure"); return; }
      play("click");
    };
    const handleChange = (event: Event) => {
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest(".cxsmo-site, .cxsmo-entry") && (element.matches("select") || element.matches("input[type=checkbox],input[type=radio]"))) play("select");
    };
    const handleHover = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("button, a, [data-cxsmo-hover-sound]") : null;
      if (!element || element.closest("[data-cxsmo-hover-silent]") || !element.closest(".cxsmo-site, .cxsmo-entry")) return;
      const now = Date.now();
      if (now - (hoverTargets.current.get(element) ?? 0) < 340) return;
      hoverTargets.current.set(element, now);
      const explicit = element.dataset.cxsmoHoverSound as CxsmoSoundCue | undefined;
      play(explicit && explicit in soundSources ? explicit : "hover");
    };
    document.addEventListener("pointerdown", handlePointer, { passive: true });
    document.addEventListener("change", handleChange, { passive: true });
    document.addEventListener("pointerover", handleHover, { passive: true });
    return () => { document.removeEventListener("pointerdown", handlePointer); document.removeEventListener("change", handleChange); document.removeEventListener("pointerover", handleHover); };
  }, [play]);
  return <CxsmoSoundContext.Provider value={{ enabled, toggle, play }}>{children}</CxsmoSoundContext.Provider>;
}

export function useCxsmoSound() {
  const value = useContext(CxsmoSoundContext);
  if (!value) throw new Error("useCxsmoSound must be used within CxsmoSoundProvider");
  return value;
}
