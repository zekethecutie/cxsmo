import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

export type CxsmoSoundCue = "open" | "click" | "success" | "theme" | "shutter" | "launch" | "chapter" | "finish";
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
};
const soundVolume: Record<CxsmoSoundCue, number> = { open: .18, click: .09, success: .15, theme: .18, shutter: .12, launch: .24, chapter: .14, finish: .18 };
const soundStorageKey = "cxsmo-sound-enabled";
const CxsmoSoundContext = createContext<SoundContextValue | undefined>(undefined);

export function CxsmoSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => window.localStorage.getItem(soundStorageKey) === "true");
  const enabledRef = useRef(enabled);
  const lastPlayed = useRef(0);
  useEffect(() => { enabledRef.current = enabled; window.localStorage.setItem(soundStorageKey, String(enabled)); }, [enabled]);
  const playRaw = useCallback((cue: CxsmoSoundCue) => {
    const now = Date.now();
    if (cue === "click" && now - lastPlayed.current < 80) return;
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
      if (element.closest(".cxsmo-site")) play("click");
    };
    document.addEventListener("pointerdown", handlePointer, { passive: true });
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [play]);
  return <CxsmoSoundContext.Provider value={{ enabled, toggle, play }}>{children}</CxsmoSoundContext.Provider>;
}

export function useCxsmoSound() {
  const value = useContext(CxsmoSoundContext);
  if (!value) throw new Error("useCxsmoSound must be used within CxsmoSoundProvider");
  return value;
}
