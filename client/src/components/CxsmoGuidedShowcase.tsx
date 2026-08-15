import { MousePointer2, Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useCxsmoSound, type CxsmoSoundCue } from "@/contexts/CxsmoSoundContext";
import "@/pages/cxsmo-route-tour.css";
import "@/pages/cxsmo-route-tour-intro.css";

type TourAction = "hover" | "press" | "scroll";
type TourScene = {
  code: string;
  route: string;
  eyebrow: string;
  title: string[];
  copy: string;
  target: string;
  selector: string;
  action: TourAction;
  cue: CxsmoSoundCue;
  outro?: boolean;
};

type Spotlight = { x: number; y: number; width: number; height: number };

const customCursorAsset = "/manus-storage/cxsmo-custom-cursor_922d53fe.png";
const scenes: TourScene[] = [
  { code: "00", route: "/cxsmo", eyebrow: "C✦SMO / opening frame", title: ["A DROP", "YOU CAN", "ENTER."], copy: "The first screen establishes the campaign hierarchy before the commerce language arrives: a clear focal object, a route in, and a deliberate amount of air.", target: "Hero / campaign composition", selector: ".poster-hero__object-layer--campaign", action: "scroll", cue: "theme" },
  { code: "01", route: "/cxsmo/shop", eyebrow: "Discovery / catalogue", title: ["FIND THE", "RIGHT", "SIGNAL."], copy: "Search, category filters, and product cards become an editorial shelf. The tour exposes their hover response as a visual study without submitting a visitor action.", target: "Catalogue / search + filter", selector: ".cxsmo-shop-toolbar", action: "hover", cue: "shutter" },
  { code: "02", route: "/cxsmo/products/gravity-01", eyebrow: "Object dossier / choice", title: ["THE OBJECT", "GETS ITS", "OWN FRAME."], copy: "A product page isolates the object, fit context, and local bag handoff. The press preview illustrates the response while leaving the visitor’s bag untouched.", target: "Product / size + local bag action", selector: ".cxsmo-pdp__actions", action: "press", cue: "chapter" },
  { code: "03", route: "/cxsmo/edits", eyebrow: "Lookbook / object rhythm", title: ["THE FIT", "KEEPS", "MOVING."], copy: "The object-led lookbook changes its transparent layer on a timed beat. The camera scroll frames the moving object instead of replacing the entire editorial environment.", target: "Lookbook / timed object morph", selector: ".cxsmo-fit-carousel", action: "hover", cue: "select" },
  { code: "04", route: "/cxsmo/account", eyebrow: "Local profile / choice", title: ["MAKE IT", "YOUR", "FREQUENCY."], copy: "Preferences, locale, and recommendation states are demonstrative and browser-local. This callout shows their interface rhythm without entering a name, a measurement, or any personal data.", target: "Account / local preference controls", selector: ".cxsmo-account-next", action: "hover", cue: "success" },
  { code: "05", route: "/cxsmo/checkout", eyebrow: "Checkout / boundary", title: ["SHOW THE", "FLOW.", "NOT A SALE."], copy: "The checkout presentation makes the UX legible while keeping its boundary honest. The player frames the information system and never creates an order, payment, or address record.", target: "Checkout / consent boundary", selector: ".cxsmo-checkout", action: "scroll", cue: "lock" },
  { code: "06", route: "/cxsmo/support", eyebrow: "Information desk / clarity", title: ["MAKE THE", "DETAILS", "USEFUL."], copy: "Support content uses the same material hierarchy as the drop. The visual press preview makes the expandable interface discoverable without opening a row on the visitor’s behalf.", target: "Information / disclosure interaction", selector: ".cxsmo-info-list", action: "press", cue: "open" },
  { code: "07", route: "/cxsmo/admin", eyebrow: "Studio / system view", title: ["THE LOOK", "HAS A", "BACKSTAGE."], copy: "The studio gate introduces the operator side of the portfolio. It is visibly separate from shopping and does not bypass the supplied demonstration access boundary.", target: "Studio / protected demonstration", selector: ".cxsmo-admin-gate", action: "scroll", cue: "click" },
  { code: "08", route: "/cxsmo/disclosure", eyebrow: "Portfolio disclosure / trust", title: ["THE LINE", "IS PART", "OF THE LOOK."], copy: "The final system is explicit about its fictional-commerce boundary. Strong visual work and clear disclosure belong together when the outcome is a client-facing presentation.", target: "Disclosure / portfolio trust layer", selector: ".cxsmo-legal", action: "hover", cue: "finish" },
  { code: "09", route: "/cxsmo", eyebrow: "C✦SMO / designed by zxke", title: ["THIS IS", "C✦SMO."], copy: "A route-aware fashion-commerce demonstration: a product world that looks intentional, moves with purpose, and explains the build behind the campaign.", target: "Portfolio / end frame", selector: ".poster-hero", action: "scroll", cue: "finish", outro: true },
];

type TourContextValue = { start: () => void; active: boolean; sceneCode: string | null };
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
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tourRef = useRef<HTMLElement>(null);
  const originFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { play } = useCxsmoSound();
  const scene = scenes[sceneIndex];

  const placeSpotlight = useCallback((sceneToFrame: TourScene) => {
    const target = document.querySelector<HTMLElement>(sceneToFrame.selector);
    if (!target) { setSpotlight({ x: window.innerWidth * .58, y: window.innerHeight * .48, width: Math.min(360, window.innerWidth * .56), height: 180 }); return; }
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center", inline: "center" });
    window.setTimeout(() => {
      const box = target.getBoundingClientRect();
      const gutter = 18;
      setSpotlight({
        x: Math.max(gutter, Math.min(window.innerWidth - gutter, box.left + box.width / 2)),
        y: Math.max(gutter, Math.min(window.innerHeight - gutter, box.top + box.height / 2)),
        width: Math.max(128, Math.min(window.innerWidth - gutter * 2, box.width + 22)),
        height: Math.max(82, Math.min(window.innerHeight - gutter * 2, box.height + 22)),
      });
    }, reducedMotion ? 0 : 520);
  }, [reducedMotion]);

  const goToScene = useCallback((next: number, shouldPlayCue = true) => {
    const resolved = Math.max(0, Math.min(next, scenes.length - 1));
    const nextScene = scenes[resolved];
    setSceneIndex(resolved);
    setSpotlight(null);
    setLocation(nextScene.route);
    window.setTimeout(() => placeSpotlight(nextScene), 170);
    if (shouldPlayCue) window.setTimeout(() => play(nextScene.cue), 260);
  }, [placeSpotlight, play, setLocation]);

  const start = useCallback(() => {
    originFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOrigin(location);
    setActive(true);
    setIntro(true);
    setPlaying(false);
    setSceneIndex(0);
    setSpotlight(null);
    setLocation("/cxsmo");
    window.scrollTo({ top: 0, behavior: "auto" });
    play("launch");
  }, [location, play, setLocation]);

  const exit = useCallback(() => {
    setActive(false);
    setIntro(false);
    setPlaying(false);
    setSpotlight(null);
    setLocation(origin);
    window.setTimeout(() => { window.scrollTo({ top: 0, behavior: "auto" }); originFocusRef.current?.focus(); }, 80);
  }, [origin, setLocation]);

  useEffect(() => {
    if (!active) return;
    document.documentElement.dataset.cxsmoTour = "active";
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);
    const stopScroll = (event: Event) => event.preventDefault();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { exit(); return; }
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) { event.preventDefault(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(tourRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", stopScroll, { passive: false });
    window.addEventListener("touchmove", stopScroll, { passive: false });
    return () => {
      delete document.documentElement.dataset.cxsmoTour;
      delete document.documentElement.dataset.cxsmoTourScene;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchmove", stopScroll);
    };
  }, [active, exit]);

  useEffect(() => {
    if (!active || intro) return;
    document.documentElement.dataset.cxsmoTourScene = scene.code;
    placeSpotlight(scene);
    const reposition = () => placeSpotlight(scene);
    window.addEventListener("resize", reposition);
    return () => { delete document.documentElement.dataset.cxsmoTourScene; window.removeEventListener("resize", reposition); };
  }, [active, intro, placeSpotlight, scene]);

  useEffect(() => {
    if (!active || !playing || reducedMotion) return;
    const timeout = window.setTimeout(() => {
      if (sceneIndex === scenes.length - 1) { setPlaying(false); play("finish"); }
      else goToScene(sceneIndex + 1);
    }, 7600);
    return () => window.clearTimeout(timeout);
  }, [active, goToScene, play, playing, reducedMotion, sceneIndex]);

  useEffect(() => {
    if (!active || !intro) return;
    const blink = window.setTimeout(() => play("select"), reducedMotion ? 0 : 1920);
    const timeout = window.setTimeout(() => { setIntro(false); setPlaying(!reducedMotion); goToScene(0, false); play("replay"); }, reducedMotion ? 0 : 6700);
    return () => { window.clearTimeout(blink); window.clearTimeout(timeout); };
  }, [active, goToScene, intro, play, reducedMotion]);

  const tooltipX = spotlight ? Math.min(window.innerWidth - 38, Math.max(38, spotlight.x + spotlight.width / 2 + 44)) : window.innerWidth * .78;
  const tooltipY = spotlight ? Math.min(window.innerHeight - 112, Math.max(112, spotlight.y - spotlight.height / 2)) : window.innerHeight * .34;
  const cursorX = spotlight ? Math.min(window.innerWidth - 26, spotlight.x + spotlight.width / 2 - 22) : window.innerWidth * .62;
  const cursorY = spotlight ? Math.min(window.innerHeight - 26, spotlight.y + spotlight.height / 2 - 18) : window.innerHeight * .56;

  return <TourContext.Provider value={{ start, active, sceneCode: active && !intro ? scene.code : null }}>{children}<AnimatePresence>{active && <motion.aside ref={tourRef} className="cxsmo-route-tour" role="dialog" aria-modal="true" aria-label="C✦SMO route-aware portfolio showcase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="cxsmo-route-tour__wash" style={{ "--spot-x": `${spotlight?.x ?? window.innerWidth * .58}px`, "--spot-y": `${spotlight?.y ?? window.innerHeight * .48}px` } as React.CSSProperties} aria-hidden="true" /><header><span>{intro ? "C✦SMO / BRAND BUILD" : "C✦SMO / INTERFACE SHOWCASE"}</span><button ref={closeRef} type="button" onClick={exit}><X size={17} /> Exit</button></header><AnimatePresence mode="wait">{intro ? <motion.section className="cxsmo-route-tour__intro" key="intro" initial={reducedMotion ? false : { opacity: 0, scale: .93, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: 1.05, filter: "blur(12px)" }} transition={{ duration: .58, ease: [0.16, 1, .3, 1] }}><span className="cxsmo-route-tour__intro-label">A FASHION-COMMERCE PORTFOLIO FILM</span><h2 aria-label="C✦SMO"><i>C</i><b>✦</b><i>S</i><i>M</i><i>O</i></h2><p className="cxsmo-route-tour__intro-subtitle">Designed and developed by <strong>zxke</strong> / A product world with a clear way in.</p><small>Follow the real interfaces / no simulated visitor input</small></motion.section> : <motion.section className={`cxsmo-route-tour__scene${scene.outro ? " is-outro" : ""}`} key={scene.code} initial={reducedMotion ? false : { opacity: 0, scale: 1.05, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: .97, filter: "blur(10px)" }} transition={{ duration: .52, ease: [0.16, 1, .3, 1] }}><motion.div className="cxsmo-route-tour__spotlight" aria-hidden="true" style={{ "--spot-x": `${spotlight?.x ?? window.innerWidth * .58}px`, "--spot-y": `${spotlight?.y ?? window.innerHeight * .48}px`, "--spot-w": `${spotlight?.width ?? 280}px`, "--spot-h": `${spotlight?.height ?? 180}px` } as React.CSSProperties} animate={reducedMotion ? {} : { scale: scene.action === "press" ? [1, .975, 1] : [1, 1.012, 1] }} transition={{ duration: scene.action === "press" ? 1.25 : 2.4, repeat: Infinity, ease: "easeInOut" }}><span>{scene.target}</span></motion.div><motion.div className={`cxsmo-route-tour__cursor is-${scene.action}`} aria-hidden="true" style={{ "--cursor-x": `${cursorX}px`, "--cursor-y": `${cursorY}px` } as React.CSSProperties} animate={reducedMotion ? {} : { x: scene.action === "hover" ? [0, 11, 0] : [0, -4, 0], y: scene.action === "press" ? [0, 10, 0] : [0, -5, 0], rotate: scene.action === "press" ? [-6, -1, -6] : [-6, -2, -6] }} transition={{ duration: scene.action === "press" ? 1.2 : 1.8, repeat: Infinity, ease: "easeInOut" }}><img src={customCursorAsset} alt="" /><i /></motion.div><motion.aside className="cxsmo-route-tour__tooltip" style={{ "--callout-x": `${tooltipX}px`, "--callout-y": `${tooltipY}px` } as React.CSSProperties} initial={reducedMotion ? false : { opacity: 0, y: 24, rotate: 1.4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .46, delay: .12, ease: [0.16, 1, .3, 1] }}><p>{scene.eyebrow}</p><h2 aria-label={scene.title.join(" ")}>{scene.title.map((line, lineIndex) => <KineticLine key={`${scene.code}-${line}`} line={line} lineIndex={lineIndex} />)}</h2><article>{scene.copy}</article><footer><span><MousePointer2 size={13} /> {scene.action === "hover" ? "Hover state / visual preview" : scene.action === "press" ? "Press state / visual preview" : "Scroll-led framing"}</span><b>{scene.target}</b></footer></motion.aside>{scene.outro && <span className="cxsmo-route-tour__outro-star" aria-hidden="true">✦</span>}</motion.section>}</AnimatePresence></motion.aside>}</AnimatePresence></TourContext.Provider>;
}

export function CxsmoShowcaseButton() {
  const tour = useContext(TourContext);
  if (!tour) throw new Error("CxsmoShowcaseButton must be used within CxsmoTourProvider");
  return <button data-cxsmo-sound-silent className="cxsmo-showcase-launch" type="button" onClick={tour.start}><Play size={14} fill="currentColor" /> Play C✦SMO</button>;
}
