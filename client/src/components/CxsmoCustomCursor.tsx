import { useEffect, useState } from "react";

const cursorAsset = "/manus-storage/cxsmo-custom-cursor_922d53fe.png";

export function CxsmoCustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [position, setPosition] = useState({ x: -160, y: -160 });

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
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      setInteractive(Boolean(target?.closest("a, button, select, [role=button], [data-cxsmo-hover-sound]")) && !Boolean(target?.closest("input, textarea, [contenteditable=true]")));
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => { delete document.documentElement.dataset.cxsmoCursor; window.removeEventListener("pointermove", move); document.removeEventListener("mouseleave", hide); window.removeEventListener("blur", hide); };
  }, [enabled]);

  if (!enabled) return null;
  return <div className={`cxsmo-global-cursor${visible ? " is-visible" : ""}${interactive ? " is-interactive" : ""}`} aria-hidden="true" style={{ "--cursor-x": `${position.x}px`, "--cursor-y": `${position.y}px` } as React.CSSProperties}><img src={cursorAsset} alt="" /><span /></div>;
}
