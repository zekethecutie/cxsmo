import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { cxsmoProducts } from "@/lib/cxsmo";
import "@/pages/cxsmo-fit-carousel-motion.css";

const fitNotes = [
  ["Long break", "Low-slung denim / close tee / chrome hit", "gravity-01"],
  ["Blue star", "Mesh jersey / soft orbit / night-rail balance", "bluestar-09"],
  ["Soft authority", "Check overshirt / wide relation / clean stage", "signal-04"],
  ["Black universe", "Wide leather-look pant / white orbit layer / chrome interruption", "blxck-pants-10"],
] as const;

export function CxsmoFitCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % fitNotes.length), 3000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);
  const note = fitNotes[active];
  const product = cxsmoProducts.find((item) => item.id === note[2]) ?? cxsmoProducts[0];
  const move = (direction: number) => { setPaused(true); setActive((current) => (current + direction + fitNotes.length) % fitNotes.length); };
  return <section className="cxsmo-fit-carousel cxsmo-fit-carousel--timed" aria-label="C✦SMO transparent product lookbook">
    <div className="cxsmo-fit-carousel__top"><div><p className="section-label">Object rotation / timed 03s</p><h2>Lookbook<br /><em>in motion.</em></h2></div><div className="cxsmo-fit-carousel__controls"><button data-cxsmo-sound="select" aria-label="Previous lookbook object" type="button" onClick={() => move(-1)}><ArrowLeft size={17} /></button><span aria-live="polite">{String(active + 1).padStart(2, "0")} / 04</span><button data-cxsmo-sound="select" aria-label="Next lookbook object" type="button" onClick={() => move(1)}><ArrowRight size={17} /></button><button data-cxsmo-sound="click" className="cxsmo-fit-carousel__pause" type="button" onClick={() => setPaused((current) => !current)}>{paused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}</button></div></div>
    <div className="cxsmo-fit-carousel__stage"><article><div data-cxsmo-hover-sound="shutter" className="cxsmo-fit-carousel__art"><span>Layer / {String(active + 1).padStart(2, "0")}</span><div className="cxsmo-fit-carousel__rings" /><AnimatePresence mode="sync" initial={false}>{product && <motion.div key={product.id} className="cxsmo-fit-carousel__object-motion" initial={reducedMotion ? false : { opacity: 0, scale: .84, rotate: -2, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: 1.12, rotate: 2, filter: "blur(8px)" }} transition={{ duration: .62, ease: [0.16, 1, 0.3, 1] }}><img src={product.image} alt={`Transparent ${product.name} object layer for the ${note[0]} lookbook study`} /></motion.div>}</AnimatePresence><div className="cxsmo-fit-carousel__signal"><i>✦</i></div><p>{note[0]}</p></div><div className="cxsmo-fit-carousel__copy"><p className="section-label">{product.category} / object relation</p><AnimatePresence mode="wait" initial={false}><motion.div key={`${product.id}-copy`} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? {} : { opacity: 0, y: -7 }} transition={{ duration: .26, ease: [0.16, 1, 0.3, 1] }}><h3>{note[0]}</h3><p>{note[1]}. Built from the fictional {product.name} as a portfolio styling study.</p><Link href={`/cxsmo/products/${product.id}`}>Shop this object <ArrowDownRight size={16} /></Link></motion.div></AnimatePresence></div></article><aside><Sparkles size={18} /><b>Object-led lookbook / campaign set two.</b><span>Each object morphs in every three seconds. The poster environment remains fixed while only the transparent product layer changes.</span></aside></div>
  </section>;
}

export function CxsmoCommunityEmptyState() {
  return <section className="cxsmo-community"><div><p className="section-label">Verified feedback / locked</p><h2>Good taste needs<br /><em>real voices.</em></h2></div><article><span>0 verified reflections</span><p>C✦SMO does not fabricate product reviews, ratings, comments, or customer stories. A production store can show verified feedback here only after real submissions exist.</p><b>Community surface / ready when true</b></article></section>;
}
