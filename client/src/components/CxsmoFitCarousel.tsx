import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { cxsmoProducts } from "@/lib/cxsmo";

const fitNotes = [
  ["Long break", "Low-slung denim / close tee / chrome hit", "gravity-01"],
  ["Silver rain", "Fitted ringer / washed base / object bag", "orbit-02"],
  ["Soft authority", "Check overshirt / wide relation / clean stage", "signal-04"],
  ["Static bloom", "Transit object / puddle jean / red signal", "transit-08"],
] as const;

export function CxsmoFitCarousel() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const note = fitNotes[active];
  const product = cxsmoProducts.find((item) => item.id === note[2]) ?? cxsmoProducts[0];
  const move = (direction: number) => setActive((current) => (current + direction + fitNotes.length) % fitNotes.length);
  return <section className="cxsmo-fit-carousel" aria-label="C✦SMO transparent product lookbook"><div className="cxsmo-fit-carousel__top"><div><p className="section-label">Object rotation / 01—04</p><h2>Lookbook<br /><em>in motion.</em></h2></div><div className="cxsmo-fit-carousel__controls"><button aria-label="Previous lookbook object" type="button" onClick={() => move(-1)}><ArrowLeft size={17} /></button><span>{String(active + 1).padStart(2, "0")} / 04</span><button aria-label="Next lookbook object" type="button" onClick={() => move(1)}><ArrowRight size={17} /></button></div></div><div className="cxsmo-fit-carousel__stage"><AnimatePresence mode="wait">{product && <motion.article key={`${product.id}-${active}`} initial={reducedMotion ? false : { opacity: 0, x: 46, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={reducedMotion ? {} : { opacity: 0, x: -40, rotate: -1 }} transition={{ duration: .42, ease: [0.16, 1, 0.3, 1] }}><div className="cxsmo-fit-carousel__art"><span>Layer / {String(active + 1).padStart(2, "0")}</span><div className="cxsmo-fit-carousel__rings" /><img src={product.image} alt={`Transparent ${product.name} object layer for the ${note[0]} lookbook study`} /><i>✦</i><p>{note[0]}</p></div><div className="cxsmo-fit-carousel__copy"><p className="section-label">{product.category} / object relation</p><h3>{note[0]}</h3><p>{note[1]}. Built from the fictional {product.name} as a portfolio styling study.</p><Link href={`/cxsmo/products/${product.id}`}>Shop this object <ArrowDownRight size={16} /></Link></div></motion.article>}</AnimatePresence><aside><Sparkles size={18} /><b>Object-led lookbook / campaign set two.</b><span>Each rotation is its own transparent product layer, with the poster environment composed in the interface.</span></aside></div></section>;
}

export function CxsmoCommunityEmptyState() {
  return <section className="cxsmo-community"><div><p className="section-label">Verified feedback / locked</p><h2>Good taste needs<br /><em>real voices.</em></h2></div><article><span>0 verified reflections</span><p>C✦SMO does not fabricate product reviews, ratings, comments, or customer stories. A production store can show verified feedback here only after real submissions exist.</p><b>Community surface / ready when true</b></article></section>;
}
