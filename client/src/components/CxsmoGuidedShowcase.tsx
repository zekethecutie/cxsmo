import { Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useCxsmoSound, type CxsmoSoundCue } from "@/contexts/CxsmoSoundContext";
import "@/pages/cxsmo-route-tour.css";
import "@/pages/cxsmo-route-tour-intro.css";

type TourScene = { code: string; route: string; eyebrow: string; title: string[]; copy: string; target: string; cursor: [number, number]; scrollY: number; cue: CxsmoSoundCue; outro?: boolean };
const customCursorAsset = "/manus-storage/cxsmo-custom-cursor_922d53fe.png";
const scenes: TourScene[] = [
  { code: "00", route: "/cxsmo", eyebrow: "C✦SMO / start here", title: ["A DROP", "YOU CAN", "ENTER."], copy: "The landing page sets the world first: campaign, product motion, and a clear route into the catalogue instead of a generic storefront welcome.", target: "LANDING / ENTRY FLOW", cursor: [65, 56], scrollY: 0, cue: "theme" },
  { code: "01", route: "/cxsmo/shop", eyebrow: "Object scan / search", title: ["FIND THE", "RIGHT", "SIGNAL."], copy: "Search by product, colour, category, or drop number. The twelve-object collection stays quick to read without pretending to be a live inventory feed.", target: "CATALOGUE / SEARCH + FILTER", cursor: [55, 61], scrollY: 260, cue: "shutter" },
  { code: "02", route: "/cxsmo/products/gravity-01", eyebrow: "Product dossier / focus", title: ["THE OBJECT", "GETS ITS", "OWN FRAME."], copy: "Every product moves through an object stage, a worn reference, fit context, and a browser-local bag action—enough information to show the intended buying rhythm.", target: "PRODUCT / OBJECT STAGE", cursor: [71, 58], scrollY: 0, cue: "chapter" },
  { code: "03", route: "/cxsmo/edits", eyebrow: "Editorial motion / styling", title: ["THE FIT", "KEEPS", "MOVING."], copy: "The lookbook shifts through isolated objects on a timed beat, showing how the product world can become a repeatable campaign rhythm.", target: "LOOKBOOK / OBJECT MOTION", cursor: [59, 46], scrollY: 160, cue: "chapter" },
  { code: "04", route: "/cxsmo/account", eyebrow: "Local profile / choice", title: ["MAKE IT", "YOUR", "FREQUENCY."], copy: "Create a display-only local profile, tune style preferences, choose a locale, and see recommendations without creating credentials or sending personal data anywhere.", target: "ACCOUNT / LOCAL SESSION", cursor: [47, 55], scrollY: 240, cue: "success" },
  { code: "05", route: "/cxsmo/checkout", eyebrow: "Checkout / boundary", title: ["SHOW THE", "FLOW.", "NOT A SALE."], copy: "Address preview, delivery hierarchy, and consent show the UX of a checkout while the interface is explicit that no order, payment, or private information is transmitted.", target: "CHECKOUT / CLEAR CONSENT", cursor: [63, 48], scrollY: 0, cue: "click" },
  { code: "06", route: "/cxsmo/admin", eyebrow: "Operator mode / studio", title: ["A CAMPAIGN", "IS A", "SYSTEM."], copy: "The studio surfaces hero media, product presentation, lookbook cards, promotions, and sitewide copy so a fashion client can see how the design holds up after launch.", target: "STUDIO / CONTENT CONTROL", cursor: [73, 43], scrollY: 0, cue: "open" },
  { code: "07", route: "/cxsmo/support", eyebrow: "Information desk / clarity", title: ["MAKE THE", "DETAILS", "USEFUL."], copy: "Fit, shipping, and support questions use the same editorial language as the campaign—because help should not feel bolted on after the visual work.", target: "INFORMATION / HELP LAYER", cursor: [61, 49], scrollY: 0, cue: "select" },
  { code: "08", route: "/cxsmo/disclosure", eyebrow: "Portfolio disclosure / trust", title: ["THE LINE", "IS PART", "OF THE LOOK."], copy: "C✦SMO says exactly what it is: a fictional commerce presentation with browser-local controls, no fake orders, and no hidden transaction claim.", target: "DISCLOSURE / TRUST LAYER", cursor: [58, 43], scrollY: 0, cue: "lock" },
  { code: "09", route: "/cxsmo", eyebrow: "C✦SMO / designed by zxke", title: ["THIS IS", "C✦SMO."], copy: "A fashion-commerce portfolio film for showing how a product world can look, move, explain itself, and make a client want to build the real version next.", target: "PORTFOLIO / END FRAME", cursor: [67, 39], scrollY: 0, cue: "finish", outro: true },
];

type TourContextValue = { start: () => void };
const TourContext = createContext<TourContextValue | undefined>(undefined);

function KineticLine({ line, lineIndex }: { line: string; lineIndex: number }) {
  return <span className="cxsmo-route-tour__kinetic-line" aria-hidden="true">{Array.from(line).map((character, characterIndex) => <span className={character === "✦" ? "is-star" : undefined} key={`${character}-${characterIndex}`} style={{ "--letter-index": characterIndex, "--line-index": lineIndex } as React.CSSProperties}>{character === " " ? " " : character}</span>)}</span>;
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
  const { play } = useCxsmoSound();
  const scene = scenes[sceneIndex];
  const goToScene = useCallback((next: number, shouldPlayCue = true) => {
    const resolved = Math.max(0, Math.min(next, scenes.length - 1));
    const nextScene = scenes[resolved];
    setSceneIndex(resolved);
    setLocation(nextScene.route);
    window.setTimeout(() => window.scrollTo({ top: nextScene.scrollY, behavior: reducedMotion ? "auto" : "smooth" }), 120);
    if (shouldPlayCue) window.setTimeout(() => play(nextScene.cue), 220);
  }, [play, reducedMotion, setLocation]);
  const start = useCallback(() => { originFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setOrigin(location); setActive(true); setIntro(true); setPlaying(false); setSceneIndex(0); setLocation("/cxsmo"); window.scrollTo({ top: 0, behavior: "auto" }); play("launch"); }, [location, play, setLocation]);
  const exit = useCallback(() => { setActive(false); setIntro(false); setPlaying(false); setLocation(origin); window.setTimeout(() => { window.scrollTo({ top: 0, behavior: "auto" }); originFocusRef.current?.focus(); }, 80); }, [origin, setLocation]);
  useEffect(() => { if (!active) return; document.documentElement.dataset.cxsmoTour = "active"; const previousBodyOverflow = document.body.style.overflow; const previousRootOverflow = document.documentElement.style.overflow; document.body.style.overflow = "hidden"; document.documentElement.style.overflow = "hidden"; window.setTimeout(() => closeRef.current?.focus(), 0); const stopScroll = (event: Event) => event.preventDefault(); const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { exit(); return; } if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) { event.preventDefault(); return; } if (event.key !== "Tab") return; const focusable = Array.from(tourRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []).filter((element) => !element.hasAttribute("hidden")); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener("keydown", onKeyDown); window.addEventListener("wheel", stopScroll, { passive: false }); window.addEventListener("touchmove", stopScroll, { passive: false }); return () => { delete document.documentElement.dataset.cxsmoTour; document.body.style.overflow = previousBodyOverflow; document.documentElement.style.overflow = previousRootOverflow; window.removeEventListener("keydown", onKeyDown); window.removeEventListener("wheel", stopScroll); window.removeEventListener("touchmove", stopScroll); }; }, [active, exit]);
  useEffect(() => { if (!active || !playing || reducedMotion) return; const timeout = window.setTimeout(() => { if (sceneIndex === scenes.length - 1) { setPlaying(false); play("finish"); } else goToScene(sceneIndex + 1); }, 6800); return () => window.clearTimeout(timeout); }, [active, goToScene, play, playing, reducedMotion, sceneIndex]);
  useEffect(() => { if (!active || !intro) return; const blink = window.setTimeout(() => play("select"), reducedMotion ? 0 : 1920); const timeout = window.setTimeout(() => { setIntro(false); setPlaying(reducedMotion !== true); goToScene(0, false); play("replay"); }, reducedMotion ? 0 : 6700); return () => { window.clearTimeout(blink); window.clearTimeout(timeout); }; }, [active, goToScene, intro, play, reducedMotion]);
  return <TourContext.Provider value={{ start }}>{children}<AnimatePresence>{active && <motion.aside ref={tourRef} className="cxsmo-route-tour" role="dialog" aria-modal="true" aria-label="C✦SMO route-aware portfolio tour" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="cxsmo-route-tour__wash" aria-hidden="true" /><div className="cxsmo-route-tour__corner cxsmo-route-tour__corner--a" aria-hidden="true" /><div className="cxsmo-route-tour__corner cxsmo-route-tour__corner--b" aria-hidden="true" /><header><span>{intro ? "C✦SMO / BRAND BUILD" : "C✦SMO / PRODUCT + PLATFORM FILM"}</span><button ref={closeRef} type="button" onClick={exit}><X size={17} /> Exit</button></header><AnimatePresence mode="wait">{intro ? <motion.section className="cxsmo-route-tour__intro" key="intro" initial={reducedMotion ? false : { opacity: 0, scale: .93, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: 1.05, filter: "blur(12px)" }} transition={{ duration: .58, ease: [0.16, 1, .3, 1] }}><span className="cxsmo-route-tour__intro-label">A FASHION-COMMERCE PORTFOLIO FILM</span><h2 aria-label="C✦SMO"><i>C</i><b>✦</b><i>S</i><i>M</i><i>O</i></h2><p className="cxsmo-route-tour__intro-subtitle">Designed and developed by <strong>zxke</strong> / A product world with a clear way in.</p><small>Hold the first frame / then follow the system</small></motion.section> : <motion.section className={`cxsmo-route-tour__scene${scene.outro ? " is-outro" : ""}`} key={scene.code} initial={reducedMotion ? false : { opacity: 0, scale: 1.1, rotate: -.7, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: .94, rotate: .55, filter: "blur(13px)" }} transition={{ duration: .78, ease: [0.16, 1, .3, 1] }}><div className="cxsmo-route-tour__type-veil" aria-hidden="true" /><div className="cxsmo-route-tour__copy"><p>{scene.eyebrow}</p><h2 aria-label={scene.title.join(" ")}>{scene.title.map((line, lineIndex) => <KineticLine key={`${scene.code}-${line}`} line={line} lineIndex={lineIndex} />)}</h2><article>{scene.copy}</article><small>{scene.target}</small></div>{scene.outro && <span className="cxsmo-route-tour__outro-star" aria-hidden="true">✦</span>}<motion.div className="cxsmo-route-tour__cursor" style={{ "--cursor-x": `${scene.cursor[0]}%`, "--cursor-y": `${scene.cursor[1]}%` } as React.CSSProperties} aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, x: -130, y: 105, scale: .52, rotate: -24 }} animate={{ opacity: 1, x: [-130, 12, 0], y: [105, -10, 0], scale: [.52, 1.12, 1], rotate: [-24, 7, -4] }} transition={{ duration: 1.05, ease: [0.16, 1, .3, 1], times: [0, .78, 1] }}><img src={customCursorAsset} alt="" /></motion.div></motion.section>}</AnimatePresence></motion.aside>}</AnimatePresence></TourContext.Provider>;
}

export function CxsmoShowcaseButton() {
  const tour = useContext(TourContext);
  if (!tour) throw new Error("CxsmoShowcaseButton must be used within CxsmoTourProvider");
  return <button data-cxsmo-sound-silent className="cxsmo-showcase-launch" type="button" onClick={tour.start}><Play size={14} fill="currentColor" /> Play C✦SMO</button>;
}
