import { useEffect, useRef, useState } from "react";

import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

const cursorAsset = "/images/cxsmo-custom-cursor_922d53fe.png";

export function CxsmoCustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const latestPosition = useRef({ x: -160, y: -160 });
  const lastInteractive = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => { finePointer.removeEventListener("change", sync); reducedMotion.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (!enabled) { delete document.documentElement.dataset.cxsmoCursor; return; }
    document.documentElement.dataset.cxsmoCursor = "active";
    const move = (event: PointerEvent) => {
      latestPosition.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty("--cursor-x", `${latestPosition.current.x}px`);
        cursorRef.current?.style.setProperty("--cursor-y", `${latestPosition.current.y}px`);
        frameRef.current = null;
      });
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      const nextInteractive = Boolean(target?.closest("a, button, select, [role=button], [data-cxsmo-hover-sound]")) && !Boolean(target?.closest("input, textarea, [contenteditable=true]"));
      if (nextInteractive !== lastInteractive.current) { lastInteractive.current = nextInteractive; setInteractive(nextInteractive); }
    };
    const hide = () => setVisible(false);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => { delete document.documentElement.dataset.cxsmoCursor; if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current); document.removeEventListener("pointermove", move); document.removeEventListener("mouseleave", hide); window.removeEventListener("blur", hide); };
  }, [enabled]);

  if (!enabled || typeof document === "undefined") return null;
  return createPortal(<div ref={cursorRef} className={`cxsmo-global-cursor${visible ? " is-visible" : ""}${interactive ? " is-interactive" : ""}`} aria-hidden="true" style={{ "--cursor-x": "-160px", "--cursor-y": "-160px" } as CSSProperties}><img src={cursorAsset} alt="" /></div>, document.body);
}
