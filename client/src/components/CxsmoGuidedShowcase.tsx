import { Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocation } from "wouter";
import { useCxsmoSound, type CxsmoSoundCue } from "@/contexts/CxsmoSoundContext";
import "@/pages/cxsmo-route-tour.css";
import "@/pages/cxsmo-route-tour-intro.css";
import "@/pages/cxsmo-route-tour-targeted.css";

type TourAction = "hover" | "press" | "scroll";
type TourScene = { code:string; route:string; eyebrow:string; title:string[]; copy:string; target:string; selector:string; action:TourAction; cue:CxsmoSoundCue; outro?:boolean };
type Spotlight = { x:number; y:number; width:number; height:number };
type Callout = { x:number; y:number; side:"left"|"right"|"top"|"bottom" };

const scenes: TourScene[] = [
  { code:"00", route:"/cxsmo", eyebrow:"Hero / campaign composition", title:["A DROP","YOU CAN","ENTER."], copy:"The opening frame makes a clear case for hierarchy: one campaign, one route in, and enough air for the wordmark to carry the scene.", target:"Hero / campaign composition", selector:".poster-hero__object-layer--campaign", action:"scroll", cue:"theme" },
  { code:"01", route:"/cxsmo/shop", eyebrow:"Discovery / catalogue", title:["FIND THE","RIGHT","SIGNAL."], copy:"Search, filters, and cards turn the object list into an editorial shelf. This framing previews its responsive state without sending any visitor action.", target:"Catalogue / search + filter", selector:".cxsmo-shop-toolbar", action:"hover", cue:"shutter" },
  { code:"02", route:"/cxsmo/products/gravity-01", eyebrow:"Object dossier / choice", title:["THE OBJECT","GETS ITS","OWN FRAME."], copy:"The product page puts media, fit context, and a browser-local bag handoff in one readable frame. Nothing is added during the tour.", target:"Product / size + local bag action", selector:".cxsmo-pdp__actions", action:"press", cue:"chapter" },
  { code:"03", route:"/cxsmo/edits", eyebrow:"Lookbook / object rhythm", title:["THE FIT","KEEPS","MOVING."], copy:"A timed object change keeps the page alive without replacing its whole editorial environment. The walkthrough centres this precise part of the composition.", target:"Lookbook / timed object morph", selector:".cxsmo-fit-carousel", action:"hover", cue:"select" },
  { code:"04", route:"/cxsmo/account", eyebrow:"Local profile / choice", title:["MAKE IT","YOUR","FREQUENCY."], copy:"Preferences and recommendations are browser-local demonstration states. The route is framed without typing, storing, or submitting personal information.", target:"Account / local preference controls", selector:".cxsmo-account-next", action:"hover", cue:"success" },
  { code:"05", route:"/cxsmo/checkout", eyebrow:"Checkout / boundary", title:["SHOW THE","FLOW.","NOT A SALE."], copy:"The checkout route explains a commerce flow while keeping its limits visible. It does not create an order, payment, or delivery record.", target:"Checkout / consent boundary", selector:".cxsmo-checkout", action:"scroll", cue:"lock" },
  { code:"06", route:"/cxsmo/support", eyebrow:"Information desk / clarity", title:["MAKE THE","DETAILS","USEFUL."], copy:"Expandable support content uses the same graphic material system as the shop. The tour gives it a close, legible frame without opening anything for the visitor.", target:"Information / disclosure interaction", selector:".cxsmo-info-list", action:"press", cue:"open" },
  { code:"07", route:"/cxsmo/admin", eyebrow:"Studio / system view", title:["THE LOOK","HAS A","BACKSTAGE."], copy:"The studio gate keeps an operator-facing portfolio surface clearly separate from shopping. This scene never bypasses its declared demonstration boundary.", target:"Studio / protected demonstration", selector:".cxsmo-admin-gate", action:"scroll", cue:"click" },
  { code:"08", route:"/cxsmo/disclosure", eyebrow:"Portfolio disclosure / trust", title:["THE LINE","IS PART","OF THE LOOK."], copy:"The closing trust layer is direct but not intrusive: a strong fictional brand world still makes its portfolio boundary clear.", target:"Disclosure / portfolio trust layer", selector:".cxsmo-legal", action:"hover", cue:"finish" },
  { code:"09", route:"/cxsmo", eyebrow:"C✦SMO / designed by zxke", title:["THIS IS","C✦SMO."], copy:"A route-aware fashion-commerce demonstration built as a sequence of intentional surfaces, not a collection of disconnected screens.", target:"Portfolio / end frame", selector:".poster-hero", action:"scroll", cue:"finish", outro:true },
];

type TourContextValue = { start:()=>void; active:boolean; sceneCode:string|null };
const TourContext = createContext<TourContextValue | undefined>(undefined);

function KineticLine({ line, lineIndex }: { line:string; lineIndex:number }) {
  return <span className="cxsmo-route-tour__kinetic-line" aria-hidden="true">{Array.from(line).map((character, characterIndex) => <span className={character === "✦" ? "is-star" : undefined} key={`${character}-${characterIndex}`} style={{ "--letter-index":characterIndex, "--line-index":lineIndex } as CSSProperties}>{character === " " ? " " : character}</span>)}</span>;
}

export function CxsmoTourProvider({ children }: { children:ReactNode }) {
  const [location, setLocation] = useLocation();
  const [active, setActive] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [intro, setIntro] = useState(false);
  const [origin, setOrigin] = useState("/cxsmo");
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [callout, setCallout] = useState<Callout | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tourRef = useRef<HTMLElement>(null);
  const originFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { play } = useCxsmoSound();
  const scene = scenes[sceneIndex];

  const clearTarget = useCallback(() => document.querySelectorAll<HTMLElement>('[data-cxsmo-tour-target="true"]').forEach((element) => delete element.dataset.cxsmoTourTarget), []);
  const placeSpotlight = useCallback((sceneToFrame:TourScene) => {
    clearTarget();
    const target = document.querySelector<HTMLElement>(sceneToFrame.selector);
    if (!target) {
      setSpotlight({ x:window.innerWidth*.58, y:window.innerHeight*.48, width:Math.min(360, window.innerWidth*.56), height:180 });
      setCallout({ x:Math.min(window.innerWidth-34, window.innerWidth*.75), y:window.innerHeight*.42, side:"right" });
      return;
    }
    target.dataset.cxsmoTourTarget = "true";
    target.scrollIntoView({ behavior:reducedMotion ? "auto" : "smooth", block:"center", inline:"center" });
    window.setTimeout(() => {
      const box = target.getBoundingClientRect();
      const gutter = 18;
      const frame = { x:Math.max(gutter, Math.min(window.innerWidth-gutter, box.left+box.width/2)), y:Math.max(gutter, Math.min(window.innerHeight-gutter, box.top+box.height/2)), width:Math.max(128, Math.min(window.innerWidth-gutter*2, box.width+22)), height:Math.max(82, Math.min(window.innerHeight-gutter*2, box.height+22)) };
      const calloutWidth = Math.min(370, window.innerWidth*.3);
      const calloutHeight = 276;
      const right = box.right+34;
      const left = box.left-calloutWidth-34;
      const vertical = Math.max(gutter+calloutHeight/2, Math.min(window.innerHeight-gutter-calloutHeight/2, box.top+box.height/2));
      if (right+calloutWidth <= window.innerWidth-gutter) setCallout({ x:right, y:vertical, side:"right" });
      else if (left >= gutter) setCallout({ x:left+calloutWidth, y:vertical, side:"left" });
      else if (box.top >= calloutHeight+gutter+24) setCallout({ x:frame.x, y:box.top-24, side:"top" });
      else setCallout({ x:frame.x, y:Math.min(window.innerHeight-gutter, box.bottom+24), side:"bottom" });
      setSpotlight(frame);
    }, reducedMotion ? 0 : 520);
  }, [clearTarget, reducedMotion]);

  const goToScene = useCallback((next:number, shouldPlayCue=true) => {
    const resolved = Math.max(0, Math.min(next, scenes.length-1));
    const nextScene = scenes[resolved];
    setSceneIndex(resolved); setSpotlight(null); setCallout(null); setLocation(nextScene.route);
    window.setTimeout(() => placeSpotlight(nextScene), 170);
    if (shouldPlayCue) window.setTimeout(() => play(nextScene.cue), 260);
  }, [placeSpotlight, play, setLocation]);

  const start = useCallback(() => {
    originFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOrigin(location); setActive(true); setIntro(true); setPlaying(false); setSceneIndex(0); setSpotlight(null); setCallout(null); setLocation("/cxsmo"); window.scrollTo({ top:0, behavior:"auto" }); play("launch");
  }, [location, play, setLocation]);
  const exit = useCallback(() => {
    setActive(false); setIntro(false); setPlaying(false); setSpotlight(null); setCallout(null); clearTarget(); setLocation(origin);
    window.setTimeout(() => { window.scrollTo({ top:0, behavior:"auto" }); originFocusRef.current?.focus(); }, 80);
  }, [clearTarget, origin, setLocation]);

  useEffect(() => {
    if (!active) return;
    document.documentElement.dataset.cxsmoTour = "active";
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden"; document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);
    const stopScroll = (event:Event) => event.preventDefault();
    const onKeyDown = (event:KeyboardEvent) => {
      if (event.key === "Escape") { exit(); return; }
      if (["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "].includes(event.key)) { event.preventDefault(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(tourRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown); window.addEventListener("wheel", stopScroll, { passive:false }); window.addEventListener("touchmove", stopScroll, { passive:false });
    return () => { delete document.documentElement.dataset.cxsmoTour; delete document.documentElement.dataset.cxsmoTourScene; document.body.style.overflow = bodyOverflow; document.documentElement.style.overflow = rootOverflow; clearTarget(); window.removeEventListener("keydown", onKeyDown); window.removeEventListener("wheel", stopScroll); window.removeEventListener("touchmove", stopScroll); };
  }, [active, clearTarget, exit]);

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
    const timeout = window.setTimeout(() => { if (sceneIndex === scenes.length-1) { setPlaying(false); play("finish"); } else goToScene(sceneIndex+1); }, 7600);
    return () => window.clearTimeout(timeout);
  }, [active, goToScene, play, playing, reducedMotion, sceneIndex]);
  useEffect(() => {
    if (!active || !intro) return;
    const blink = window.setTimeout(() => play("select"), reducedMotion ? 0 : 1920);
    const timeout = window.setTimeout(() => { setIntro(false); setPlaying(!reducedMotion); goToScene(0, false); play("replay"); }, reducedMotion ? 0 : 6100);
    return () => { window.clearTimeout(blink); window.clearTimeout(timeout); };
  }, [active, goToScene, intro, play, reducedMotion]);

  const spotlightStyle = { "--spot-x":`${spotlight?.x ?? window.innerWidth*.58}px`, "--spot-y":`${spotlight?.y ?? window.innerHeight*.48}px`, "--spot-w":`${spotlight?.width ?? 280}px`, "--spot-h":`${spotlight?.height ?? 180}px` } as CSSProperties;
  const calloutStyle = { "--callout-x":`${callout?.x ?? window.innerWidth*.75}px`, "--callout-y":`${callout?.y ?? window.innerHeight*.42}px` } as CSSProperties;
  return <TourContext.Provider value={{ start, active, sceneCode:active && !intro ? scene.code : null }}>{children}<AnimatePresence>{active && <motion.aside ref={tourRef} className="cxsmo-route-tour" role="dialog" aria-modal="true" aria-label="C✦SMO route-aware portfolio showcase" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}><div className="cxsmo-route-tour__wash" style={spotlightStyle} aria-hidden="true" /><header><span>{intro ? "C✦SMO / BRAND BUILD" : "C✦SMO / INTERFACE SHOWCASE"}</span><button ref={closeRef} type="button" onClick={exit}><X size={17} /> Exit</button></header><AnimatePresence mode="wait">{intro ? <motion.section className="cxsmo-route-tour__intro" key="intro" initial={reducedMotion ? false : { opacity:0, scale:.95, filter:"blur(10px)" }} animate={{ opacity:1, scale:1, filter:"blur(0px)" }} exit={reducedMotion ? {} : { opacity:0, scale:1.03, filter:"blur(10px)" }} transition={{ duration:.52, ease:[.16,1,.3,1] }}><span className="cxsmo-route-tour__intro-label">C✦SMO / INTERFACE FILM</span><h2 aria-label="C✦SMO"><i>C</i><b>✦</b><i>S</i><i>M</i><i>O</i></h2><p className="cxsmo-route-tour__intro-subtitle">A close look at real C✦SMO surfaces, designed and developed by <strong>zxke</strong>.</p><small>Routes, motion, and interaction context / no visitor actions are made</small></motion.section> : <motion.section className={`cxsmo-route-tour__scene${scene.outro ? " is-outro" : ""}`} key={scene.code} initial={reducedMotion ? false : { opacity:0, scale:1.03, filter:"blur(10px)" }} animate={{ opacity:1, scale:1, filter:"blur(0px)" }} exit={reducedMotion ? {} : { opacity:0, scale:.98, filter:"blur(8px)" }} transition={{ duration:.46, ease:[.16,1,.3,1] }}><motion.div className={`cxsmo-route-tour__spotlight is-${scene.action}`} aria-hidden="true" style={spotlightStyle} animate={reducedMotion ? {} : { scale:scene.action === "press" ? [1,.982,1] : [1,1.008,1] }} transition={{ duration:scene.action === "press" ? 1.25 : 2.4, repeat:Infinity, ease:"easeInOut" }}><span>{scene.target}</span></motion.div><motion.aside className={`cxsmo-route-tour__tooltip is-${callout?.side ?? "right"}`} style={calloutStyle} initial={reducedMotion ? false : { opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:.38, delay:.08, ease:[.16,1,.3,1] }}><p>{scene.eyebrow}</p><h2 aria-label={scene.title.join(" ")}>{scene.title.map((line, lineIndex) => <KineticLine key={`${scene.code}-${line}`} line={line} lineIndex={lineIndex} />)}</h2><article>{scene.copy}</article><footer><span>{scene.action === "hover" ? "Responsive hover preview" : scene.action === "press" ? "Responsive press preview" : "Scroll-led camera frame"}</span><b>{scene.target}</b></footer></motion.aside>{scene.outro && <span className="cxsmo-route-tour__outro-star" aria-hidden="true">✦</span>}</motion.section>}</AnimatePresence></motion.aside>}</AnimatePresence></TourContext.Provider>;
}

export function CxsmoShowcaseButton() {
  const tour = useContext(TourContext);
  if (!tour) throw new Error("CxsmoShowcaseButton must be used within CxsmoTourProvider");
  return <button data-cxsmo-sound-silent className="cxsmo-showcase-launch" type="button" onClick={tour.start}><Play size={14} fill="currentColor" /> Play C✦SMO</button>;
}
