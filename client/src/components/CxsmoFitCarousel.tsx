import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { cxsmoProducts } from "@/lib/cxsmo";

const fitNotes = [
  ["Long break", "Low-slung denim / close tee / chrome hit"],
  ["Silver rain", "Moto layer / washed base / object bag"],
  ["Soft authority", "Check overshirt / wide trouser / clean shoe"],
  ["Static bloom", "Graphic tee / puddle jean / red signal"],
] as const;

export function CxsmoFitCarousel() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const product = cxsmoProducts[active % cxsmoProducts.length];
  const note = fitNotes[active % fitNotes.length];
  const move = (direction: number) => setActive((current) => (current + direction + fitNotes.length) % fitNotes.length);
  return <section className="cxsmo-fit-carousel" aria-label="C✦SMO fit carousel"><div className="cxsmo-fit-carousel__top"><div><p className="section-label">Fit rotation / 01—04</p><h2>Lookbook<br /><em>in motion.</em></h2></div><div className="cxsmo-fit-carousel__controls"><button aria-label="Previous fit" type="button" onClick={() => move(-1)}><ArrowLeft size={17} /></button><span>{String(active + 1).padStart(2, "0")} / 04</span><button aria-label="Next fit" type="button" onClick={() => move(1)}><ArrowRight size={17} /></button></div></div><div className="cxsmo-fit-carousel__stage"><AnimatePresence mode="wait">{product && <motion.article key={`${product.id}-${active}`} initial={reducedMotion ? false : { opacity: 0, x: 46, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={reducedMotion ? {} : { opacity: 0, x: -40, rotate: -1 }} transition={{ duration: .42, ease: [0.16, 1, 0.3, 1] }}><div className="cxsmo-fit-carousel__art"><span>Fit / {String(active + 1).padStart(2, "0")}</span><div className="cxsmo-fit-carousel__rings" /><img src={product.image} alt={`${product.name} styled C✦SMO fit object`} /><i>✦</i><p>{note[0]}</p></div><div className="cxsmo-fit-carousel__copy"><p className="section-label">{product.category} / object relation</p><h3>{note[0]}</h3><p>{note[1]}. Built from the fictional {product.name} as a portfolio styling study.</p><Link href={`/cxsmo/products/${product.id}`}>Shop this object <ArrowDownRight size={16} /></Link></div></motion.article>}</AnimatePresence><aside><Sparkles size={18} /><b>Editorial fit shots are being prepared as original campaign assets.</b><span>Until then, this carousel uses the current product-object system rather than presenting unverified third-party imagery.</span></aside></div></section>;
}

export function CxsmoCommunityEmptyState() {
  return <section className="cxsmo-community"><div><p className="section-label">Verified feedback / locked</p><h2>Good taste needs<br /><em>real voices.</em></h2></div><article><span>0 verified reflections</span><p>C✦SMO does not fabricate product reviews, ratings, comments, or customer stories. A production store can show verified feedback here only after real submissions exist.</p><b>Community surface / ready when true</b></article></section>;
}
