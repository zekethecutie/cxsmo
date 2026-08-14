import { ArrowRight, MousePointer2, Pause, Play, RotateCcw, Sparkles, Volume2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useCxsmoSound, type CxsmoSoundCue } from "@/contexts/CxsmoSoundContext";
import "@/pages/cxsmo-route-tour.css";
import "@/pages/cxsmo-route-tour-intro.css";

type TourScene = { code: string; route: string; eyebrow: string; title: string[]; copy: string; target: string; cursor: [number, number]; scrollY: number; cue: CxsmoSoundCue };
const scenes: TourScene[] = [
  { code: "00", route: "/cxsmo", eyebrow: "C✦SMO / signal in", title: ["C✦SMO", "IS NOT", "QUIET."], copy: "A black, bone, and signal-red identity builds from the first frame.", target: "POSTER HERO / BRAND BUILD", cursor: [64, 57], scrollY: 0, cue: "theme" },
  { code: "01", route: "/cxsmo/shop", eyebrow: "Objects / catalogue scan", title: ["EIGHT", "OBJECTS.", "ONE", "PULSE."], copy: "The tour moves through real catalogue surfaces, focusing the product grid without claiming a live transaction.", target: "OBJECT GRID / CAMERA SCAN", cursor: [53, 62], scrollY: 260, cue: "shutter" },
  { code: "02", route: "/cxsmo/products/gravity-01", eyebrow: "Product dossier / depth", title: ["A FIT", "WITH", "VOLUME."], copy: "A close crop frames product media, size controls, and the tactile information hierarchy.", target: "PRODUCT STAGE / DETAIL FRAME", cursor: [71, 58], scrollY: 0, cue: "chapter" },
  { code: "03", route: "/cxsmo/edits", eyebrow: "Editorial motion / lookbook", title: ["WORN", "IN", "MOTION."], copy: "Editorial cards, carousels, and styling chapters turn objects into a visual language.", target: "LOOKBOOK / POSTER PAN", cursor: [58, 47], scrollY: 160, cue: "chapter" },
  { code: "04", route: "/cxsmo/account", eyebrow: "Local profile / no fiction", title: ["YOUR", "SIGNAL,", "NOT A", "PROFILE."], copy: "Taste, fit, locale, and recommendations remain browser-local. Empty commerce states stay honest.", target: "ACCOUNT / LOCAL SIGNAL", cursor: [47, 55], scrollY: 240, cue: "success" },
  { code: "05", route: "/cxsmo/checkout", eyebrow: "Checkout / clear boundary", title: ["STAGE", "THE", "FLOW."], copy: "Map preview, delivery hierarchy, and consent show a commerce flow without inventing a payment or order.", target: "CHECKOUT / CONSENT FRAME", cursor: [63, 48], scrollY: 0, cue: "click" },
  { code: "06", route: "/cxsmo/admin", eyebrow: "Operator mode / studio", title: ["SHAPE", "EVERY", "SIGNAL."], copy: "Owner-controlled media, lookbook, promotion, and product-presentation systems prove the design is editable.", target: "STUDIO / CONTENT CANVAS", cursor: [73, 43], scrollY: 0, cue: "open" },
  { code: "07", route: "/cxsmo", eyebrow: "C✦SMO / built to be felt", title: ["DIRECTED", "BY", "ZXKE."], copy: "Motion, optional sound, clear controls, and a visible exit turn the platform into a portfolio-grade demonstration.", target: "CLOSING SIGNAL / EXIT READY", cursor: [70, 29], scrollY: 0, cue: "finish" },
];

type TourContextValue = { start: () => void };
const TourContext = createContext<TourContextValue | undefined>(undefined);

function KineticLine({ line, lineIndex }: { line: string; lineIndex: number }) {
  return <span className="cxsmo-route-tour__kinetic-line" aria-hidden="true">{Array.from(line).map((character, characterIndex) => <span key={`${character}-${characterIndex}`} style={{ "--letter-index": characterIndex, "--line-index": lineIndex } as React.CSSProperties}>{character === " " ? " " : character}</span>)}</span>;
}

export function CxsmoTourProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [active, setActive] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [intro, setIntro] = useState(false);
  const [origin, setOrigin] = useState("/cxsmo");
  const closeRef = useRef<HTMLButtonElement>(null);
  const tourRef = useRef<HTMLElement>(null);
  const originFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { enabled, play } = useCxsmoSound();
  const scene = scenes[sceneIndex];
  const goToScene = useCallback((next: number, shouldPlayCue = true) => {
    const resolved = Math.max(0, Math.min(next, scenes.length - 1));
    const nextScene = scenes[resolved];
    setSceneIndex(resolved);
    setLocation(nextScene.route);
    window.setTimeout(() => window.scrollTo({ top: nextScene.scrollY, behavior: reducedMotion ? "auto" : "smooth" }), 100);
    if (shouldPlayCue) window.setTimeout(() => play(nextScene.cue), 160);
  }, [play, reducedMotion, setLocation]);
  const start = useCallback(() => { originFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setOrigin(location); setActive(true); setIntro(true); setPlaying(false); setLocation("/cxsmo"); window.scrollTo({ top: 0, behavior: "auto" }); play("launch"); }, [location, play, setLocation]);
  const exit = useCallback(() => { setActive(false); setIntro(false); setPlaying(false); setLocation(origin); window.setTimeout(() => { window.scrollTo({ top: 0, behavior: "auto" }); originFocusRef.current?.focus(); }, 80); }, [origin, setLocation]);
  useEffect(() => { if (!active) return; document.documentElement.dataset.cxsmoTour = "active"; const previousBodyOverflow = document.body.style.overflow; const previousRootOverflow = document.documentElement.style.overflow; document.body.style.overflow = "hidden"; document.documentElement.style.overflow = "hidden"; window.setTimeout(() => closeRef.current?.focus(), 0); const stopScroll = (event: Event) => event.preventDefault(); const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { exit(); return; } if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) { event.preventDefault(); return; } if (event.key !== "Tab") return; const focusable = Array.from(tourRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []).filter((element) => !element.hasAttribute("hidden")); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener("keydown", onKeyDown); window.addEventListener("wheel", stopScroll, { passive: false }); window.addEventListener("touchmove", stopScroll, { passive: false }); return () => { delete document.documentElement.dataset.cxsmoTour; document.body.style.overflow = previousBodyOverflow; document.documentElement.style.overflow = previousRootOverflow; window.removeEventListener("keydown", onKeyDown); window.removeEventListener("wheel", stopScroll); window.removeEventListener("touchmove", stopScroll); }; }, [active, exit]);
  useEffect(() => { if (!active || !playing || reducedMotion) return; const timeout = window.setTimeout(() => { if (sceneIndex === scenes.length - 1) setPlaying(false); else goToScene(sceneIndex + 1); }, 5600); return () => window.clearTimeout(timeout); }, [active, goToScene, playing, reducedMotion, sceneIndex]);
  useEffect(() => { if (!active || !intro) return; const timeout = window.setTimeout(() => { setIntro(false); setPlaying(reducedMotion !== true); goToScene(0, false); play("replay"); }, reducedMotion ? 0 : 2400); return () => window.clearTimeout(timeout); }, [active, goToScene, intro, play, reducedMotion]);
  return <TourContext.Provider value={{ start }}>{children}<AnimatePresence>{active && <motion.aside ref={tourRef} className="cxsmo-route-tour" role="dialog" aria-modal="true" aria-label="C✦SMO route-aware portfolio tour" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="cxsmo-route-tour__wash" aria-hidden="true" /><div className="cxsmo-route-tour__corner cxsmo-route-tour__corner--a" aria-hidden="true" /><div className="cxsmo-route-tour__corner cxsmo-route-tour__corner--b" aria-hidden="true" /><header><span>{intro ? "C✦SMO / BRAND BUILD" : "C✦SMO / DIRECTED TOUR"}</span><div><span>{enabled ? <><Volume2 size={13} /> Sound on</> : "Sound muted"}</span><button ref={closeRef} type="button" onClick={exit}><X size={17} /> Exit</button></div></header><AnimatePresence mode="wait">{intro ? <motion.section className="cxsmo-route-tour__intro" key="intro" initial={reducedMotion ? false : { opacity: 0, scale: .93 }} animate={{ opacity: 1, scale: 1 }} exit={reducedMotion ? {} : { opacity: 0, scale: 1.08 }} transition={{ duration: .42, ease: [0.16, 1, .3, 1] }}><span>DESIGNED + DEVELOPED BY ZXKE</span><h2 aria-label="C✦SMO"><i>C</i><b>✦</b><i>S</i><i>M</i><i>O</i></h2><p>Signal building / 01—08</p></motion.section> : <motion.section className="cxsmo-route-tour__scene" key={scene.code} initial={reducedMotion ? false : { opacity: 0, scale: 1.07, rotate: -.45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={reducedMotion ? {} : { opacity: 0, scale: .97, rotate: .35 }} transition={{ duration: .56, ease: [0.16, 1, .3, 1] }}><div className="cxsmo-route-tour__type-veil" aria-hidden="true" /><div className="cxsmo-route-tour__number" aria-hidden="true">{scene.code}</div><div className="cxsmo-route-tour__copy"><p>{scene.eyebrow}</p><h2 aria-label={scene.title.join(" ")}>{scene.title.map((line, lineIndex) => <KineticLine key={`${scene.code}-${line}`} line={line} lineIndex={lineIndex} />)}</h2><article>{scene.copy}</article><small><Sparkles size={13} /> {scene.target}</small></div><div className="cxsmo-route-tour__focus" style={{ "--tour-x": `${scene.cursor[0]}%`, "--tour-y": `${scene.cursor[1]}%` } as React.CSSProperties} aria-hidden="true"><i /><MousePointer2 /><b>+</b><span>DIRECTED CURSOR</span><em>FRAME / {scene.code}</em></div></motion.section>}</AnimatePresence>{!intro && <><nav aria-label="Tour scenes">{scenes.map((item, index) => <button key={item.code} type="button" onClick={() => goToScene(index)} className={index === sceneIndex ? "is-active" : ""} aria-current={index === sceneIndex ? "step" : undefined}><span>{item.code}</span></button>)}</nav><footer><div><button type="button" onClick={() => setPlaying((value) => !value)} disabled={reducedMotion === true}>{playing ? <><Pause size={14} /> Pause directed play</> : <><Play size={14} /> {reducedMotion ? "Step scenes" : "Resume directed play"}</>}</button><button type="button" onClick={() => { play("replay"); goToScene(0, false); }}><RotateCcw size={14} /> Restart</button></div><p>{reducedMotion ? "Reduced motion is active. Move through scenes manually." : playing ? "Real portfolio routes are being presented. Escape exits immediately." : "Directed play paused. Choose any chapter to continue."}</p></footer></>}</motion.aside>}</AnimatePresence></TourContext.Provider>;
}

export function CxsmoShowcaseButton() {
  const tour = useContext(TourContext);
  if (!tour) throw new Error("CxsmoShowcaseButton must be used within CxsmoTourProvider");
  return <button data-cxsmo-sound-silent className="cxsmo-showcase-launch" type="button" onClick={tour.start}><Play size={14} fill="currentColor" /> Play C✦SMO</button>;
}
