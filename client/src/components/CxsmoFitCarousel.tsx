import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { cxsmoProducts } from "@/lib/cxsmo";
import "@/pages/cxsmo-fit-carousel-motion.css";
import "@/pages/cxsmo-fit-library.css";

const fitNotes = [
  ["Long break", "Low-slung denim, a close tee, and one chrome detail", "gravity-01"],
  ["Blue star", "A mesh jersey with soft hardware for late-platform light", "bluestar-09"],
  ["Soft authority", "A checked overshirt cut loose over a wide, easy base", "signal-04"],
  ["Black universe", "Wide black pants, a pale orbit layer, and a chrome finish", "blxck-pants-10"],
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
    <div className="cxsmo-fit-carousel__stage"><article><div data-cxsmo-hover-sound="zoom" className="cxsmo-fit-carousel__art"><span>Layer / {String(active + 1).padStart(2, "0")}</span><div className="cxsmo-fit-carousel__rings" /><AnimatePresence mode="sync" initial={false}>{product && <motion.div key={product.id} className="cxsmo-fit-carousel__object-motion" initial={reducedMotion ? false : { opacity: 0, scale: .84, rotate: -2, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }} exit={reducedMotion ? {} : { opacity: 0, scale: 1.12, rotate: 2, filter: "blur(8px)" }} transition={{ duration: .62, ease: [0.16, 1, 0.3, 1] }}><img src={product.image} alt={`Transparent ${product.name} object layer for the ${note[0]} lookbook study`} /></motion.div>}</AnimatePresence><div className="cxsmo-fit-carousel__signal"><i>✦</i></div><p>{note[0]}</p></div><div className="cxsmo-fit-carousel__copy"><p className="section-label">{product.category} / styling note</p><AnimatePresence mode="wait" initial={false}><motion.div key={`${product.id}-copy`} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? {} : { opacity: 0, y: -7 }} transition={{ duration: .26, ease: [0.16, 1, 0.3, 1] }}><h3>{note[0]}</h3><p>{note[1]}. Styled around the {product.name} for this C✦SMO editorial.</p><Link href={`/cxsmo/products/${product.id}`}>Shop this object <ArrowDownRight size={16} /></Link></motion.div></AnimatePresence></div></article><aside><span className="cxsmo-fit-carousel__index">02</span><b>Lookbook / rotating fit study.</b><span>A new object arrives every three seconds while the set stays in place.</span></aside></div>
  </section>;
}

export function CxsmoCommunityEmptyState() {
  return <section className="cxsmo-community"><div><p className="section-label">Verified feedback / locked</p><h2>Good taste needs<br /><em>real voices.</em></h2></div><article><span>0 verified reflections</span><p>C✦SMO does not fabricate product reviews, ratings, comments, or customer stories. A production store can show verified feedback here only after real submissions exist.</p><b>Community surface / ready when true</b></article></section>;
}

export function CxsmoFitLibrary() {
  const assets = [
    { index: "01", title: "Blackout hardware", copy: "A full-fit campaign study built around red paneling, chrome details, and a lower-volume silhouette.", href: "/cxsmo/shop?category=Outerwear", link: "Shop outerwear", image: "/manus-storage/cxsmo-fit-black-red-full_f171f1a3.png", alt: "C✦SMO black and red full fit campaign styling study" },
    { index: "02", title: "Night uniform", copy: "Five proportions in black, silver, and washed grey—used here as styling reference, not a product claim.", href: "/cxsmo/shop?category=Graphics", link: "Shop graphics", image: "/manus-storage/cxsmo-fit-mens-lineup_1b4e867e.png", alt: "C✦SMO five-look mens styling lineup" },
    { index: "03", title: "Soft chrome", copy: "A wardrobe research sheet for contrast, layer length, and hardware. Some pieces are still in development.", href: "/cxsmo/shop", link: "Browse the drop", image: "/manus-storage/cxsmo-fit-womens-sheet_dcdd78ef.png", alt: "C✦SMO womens styling research sheet featuring multiple full looks" },
  ];
  return <section className="cxsmo-fit-library" aria-labelledby="cxsmo-fit-library-title"><div className="cxsmo-fit-library__head"><div><p>Fit library / issue 01</p><h2 id="cxsmo-fit-library-title">Worn<br /><em>on purpose.</em></h2></div><span>Campaign frames are styling references for the C✦SMO world. Product pages only claim what is currently listed in the catalogue.</span></div><div className="cxsmo-fit-library__grid">{assets.map((asset) => <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__card" key={asset.index}><img src={asset.image} alt={asset.alt} /><div><p>Fit frame / {asset.index}</p><h3>{asset.title}</h3><span>{asset.copy}</span><Link href={asset.href}>{asset.link} <ArrowDownRight size={15} /></Link></div></article>)}<p className="cxsmo-fit-library__note">Fit images guide colour, silhouette, and styling direction. They do not represent reviews, creator endorsements, customer photography, or unlisted inventory.</p></div></section>;
}

export function CxsmoStyleContext() {
  return <section className="cxsmo-style-context"><div><p>Community context / editorial only</p><h2>Built from<br /><em>real direction.</em></h2></div><article><span>Style notes, not testimonials</span><p>C✦SMO uses editorial fit studies to show how layers, hardware, and proportion work together. Verified customer reviews, ratings, and endorsements remain unavailable until real approved submissions exist.</p><b>Verified feedback / ready when true</b></article></section>;
}
