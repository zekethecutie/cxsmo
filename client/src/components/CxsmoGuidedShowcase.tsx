import { ArrowRight, Pause, Play, RotateCcw, Sparkles, Volume2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import "@/pages/cxsmo-showcase.css";

const chapters = [
  { code: "01", eyebrow: "Signal in / brand system", title: ["C✦SMO", "IS NOT", "QUIET."], copy: "A future-pop identity built from compressed type, a four-point-star X, and a deliberate black, bone, and signal-red frequency.", route: "/cxsmo", action: "See the poster" },
  { code: "02", eyebrow: "Objects, not templates", title: ["THE", "FIT", "HAS", "VOLUME."], copy: "Campaign layers, isolated fashion objects, and graphic product stages make editorial discovery feel tangible instead of generic.", route: "/cxsmo/shop", action: "Open objects" },
  { code: "03", eyebrow: "Commerce / simulated honestly", title: ["LOCAL", "STATE.", "NO", "PRETEND."], copy: "Bag, profile, locale, map-preview, and checkout interactions demonstrate a considered flow while never claiming payment, orders, or personal-data collection.", route: "/cxsmo/checkout", action: "View checkout" },
  { code: "04", eyebrow: "Operator mode / content system", title: ["SHAPE", "THE", "SIGNAL."], copy: "A studio workspace brings campaign media, hero copy, product presentation, and lookbook sequencing into a controlled operator surface.", route: "/cxsmo/admin?studio=Content", action: "Open studio" },
  { code: "05", eyebrow: "Motion with an exit", title: ["BUILT", "TO BE", "FELT."], copy: "The system pairs deliberate animation, optional sound, theme shifts, keyboard controls, and reduced-motion fallbacks so the spectacle stays visitor-controlled.", route: "/cxsmo/support", action: "Read the system" },
] as const;

export function CxsmoShowcaseButton() {
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { enabled, play } = useCxsmoSound();
  const close = () => { setOpen(false); setPlaying(false); };
  const start = () => { setChapter(0); setOpen(true); setPlaying(reducedMotion !== true); play("launch"); };
  const selectChapter = (next: number) => { setChapter(next); if (!reducedMotion) setPlaying(true); play("chapter"); };
  useEffect(() => { if (!open) return; window.setTimeout(() => closeRef.current?.focus(), 0); const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); }; window.addEventListener("keydown", escape); return () => window.removeEventListener("keydown", escape); }, [open]);
  useEffect(() => { if (!open || !playing || reducedMotion) return; const timeout = window.setTimeout(() => { if (chapter === chapters.length - 1) { setPlaying(false); play("finish"); } else { setChapter((current) => current + 1); play("chapter"); } }, 4400); return () => window.clearTimeout(timeout); }, [chapter, open, play, playing, reducedMotion]);
  const current = chapters[chapter];
  return <><button data-cxsmo-sound-silent className="cxsmo-showcase-launch" type="button" onClick={start}><Play size={14} fill="currentColor" /> Play C✦SMO</button><AnimatePresence>{open && <motion.section className="cxsmo-showcase" role="dialog" aria-modal="true" aria-label="C✦SMO guided portfolio showcase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="cxsmo-showcase__noise" aria-hidden="true" /><header><span>C✦SMO / PLAY MODE</span><div><span>{enabled ? <><Volume2 size={13} /> Optional sound</> : "Sound muted"}</span><button ref={closeRef} type="button" onClick={close} aria-label="Exit C✦SMO guided showcase"><X size={19} /> Exit</button></div></header><nav aria-label="Showcase chapter progress">{chapters.map((item, index) => <button key={item.code} type="button" className={index === chapter ? "is-active" : ""} onClick={() => selectChapter(index)} aria-current={index === chapter ? "step" : undefined}><span>{item.code}</span></button>)}</nav><AnimatePresence mode="wait"><motion.div className="cxsmo-showcase__chapter" key={current.code} initial={reducedMotion ? false : { opacity: 0, y: 34, rotate: .7 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={reducedMotion ? {} : { opacity: 0, y: -24, rotate: -.5 }} transition={{ duration: .54, ease: [0.16, 1, .3, 1] }}><div className="cxsmo-showcase__index"><span>CHAPTER</span><b>{current.code}</b><i>✦</i></div><div className="cxsmo-showcase__copy"><p>{current.eyebrow}</p><h2>{current.title.map((line) => <span key={line}>{line}</span>)}</h2><article>{current.copy}</article><Link href={current.route} onClick={close}>{current.action} <ArrowRight size={15} /></Link></div><div className="cxsmo-showcase__annotation"><Sparkles size={16} /><p>Interactive portfolio edit</p><span>Watch the message. Control the pace. Exit any time.</span></div></motion.div></AnimatePresence><footer><div><button type="button" onClick={() => setPlaying(!playing)} disabled={reducedMotion === true}>{playing ? <><Pause size={14} /> Pause edit</> : <><Play size={14} /> {reducedMotion ? "Step through" : "Play edit"}</>}</button><button type="button" onClick={() => selectChapter(0)}><RotateCcw size={14} /> Restart</button></div><p>{reducedMotion ? "Reduced motion is active. Chapters remain manually controlled." : playing ? "Playing the C✦SMO showcase. Press Escape to exit." : "Paused. Select a chapter or press Play edit."}</p></footer></motion.section>}</AnimatePresence></>;
}
