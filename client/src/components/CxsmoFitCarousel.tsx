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
  const fits = [
    { index: "M / 01", title: "Splitline rugby", category: "Graphics", image: "/manus-storage/cxsmo-fit-men-01-splitline-rugby_a7a4ca96.png", alt: "Individual C✦SMO mens look in a black and optic-bone long sleeve" },
    { index: "M / 02", title: "Orbit ash", category: "Graphics", image: "/manus-storage/cxsmo-fit-men-02-orbit-ash_5ee3408b.png", alt: "Individual C✦SMO mens look in an ash hoodie and wide grey cargo pants" },
    { index: "M / 03", title: "Micro orbit", category: "Graphics", image: "/manus-storage/cxsmo-fit-men-03-micro-orbit_2bde9f0f.png", alt: "Individual C✦SMO mens look in a black micro-orbit T-shirt and wide trousers" },
    { index: "M / 04", title: "Nightstar hood", category: "Outerwear", image: "/manus-storage/cxsmo-fit-men-04-nightstar-hood_aa9f1492.png", alt: "Individual C✦SMO mens look in a black star hoodie and wide black pants" },
    { index: "M / 05", title: "Chainline self", category: "Accessories", image: "/manus-storage/cxsmo-fit-men-05-chainline-self_318985d3.png", alt: "Individual C✦SMO mens look with chain bag and black star trousers" },
    { index: "W / 01", title: "Asym star", category: "Graphics", image: "/manus-storage/cxsmo-fit-women-01-asym-star_5aa95f9c.png", alt: "Individual C✦SMO womens look with asymmetric black star top" },
    { index: "W / 02", title: "Cloud cargo", category: "Bottoms", image: "/manus-storage/cxsmo-fit-women-02-cloud-cargo_dffe9917.png", alt: "Individual C✦SMO womens look with white hoodie and grey cargo denim" },
    { index: "W / 03", title: "Lunar corset", category: "Graphics", image: "/manus-storage/cxsmo-fit-women-03-lunar-corset_f3bbcc5c.png", alt: "Individual C✦SMO womens look with black cropped corset top" },
    { index: "W / 04", title: "Static raglan", category: "Graphics", image: "/manus-storage/cxsmo-fit-women-04-static-raglan_34e5ff07.png", alt: "Individual C✦SMO womens look with black and bone raglan top" },
    { index: "W / 05", title: "Soft chrome", category: "Lifestyle", image: "/manus-storage/cxsmo-fit-women-05-soft-chrome_f5e1fb85.png", alt: "Individual C✦SMO womens look with a soft white statement layer" },
    { index: "W / 06", title: "Night shrug", category: "Graphics", image: "/manus-storage/cxsmo-fit-women-06-night-shrug_6c576638.png", alt: "Individual C✦SMO womens look with black shrug and mini skirt" },
    { index: "W / 07", title: "Blue orbit", category: "Denim", image: "/manus-storage/cxsmo-fit-women-07-blue-orbit_779f5c22.png", alt: "Individual C✦SMO womens look with white star tank and blue baggy denim" },
    { index: "W / 08", title: "Starline mini", category: "Graphics", image: "/manus-storage/cxsmo-fit-women-08-starline-mini_b7c3e241.png", alt: "Individual C✦SMO womens look with black star long sleeve and mini skirt" },
    { index: "W / 09", title: "Cloud sweater", category: "Lifestyle", image: "/manus-storage/cxsmo-fit-women-09-cloud-sweater_099e9e71.png", alt: "Individual C✦SMO womens look with oversized grey sweater and layered skirt" },
    { index: "W / 10", title: "After dark", category: "Outerwear", image: "/manus-storage/cxsmo-fit-women-10-after-dark_a269f518.png", alt: "Individual C✦SMO womens look with black halter top and baggy moto pants" },
  ];
  return <section className="cxsmo-fit-library" aria-labelledby="cxsmo-fit-library-title"><div className="cxsmo-fit-library__head"><div><p>Fit library / issue 01</p><h2 id="cxsmo-fit-library-title">Worn<br /><em>on purpose.</em></h2></div><span>Every card is an individual fit reference. Shop links only lead to categories that are presently listed in the C✦SMO catalogue.</span></div><article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__primary"><img src="/manus-storage/cxsmo-fit-black-red-full_f171f1a3.png" alt="Individual C✦SMO black and red full-fit campaign styling study" /><div><p>Fit frame / 00</p><h3>Blackout hardware</h3><span>A full-fit campaign reference built around red paneling, chrome details, and a lower-volume silhouette.</span><Link href="/cxsmo/shop?category=Outerwear">Shop outerwear <ArrowDownRight size={15} /></Link></div></article><div className="cxsmo-fit-library__individual-grid">{fits.map((fit) => <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__look" key={fit.index}><img src={fit.image} alt={fit.alt} /><div><p>Fit file / {fit.index}</p><h3>{fit.title}</h3><Link href={`/cxsmo/shop?category=${fit.category}`}>Shop {fit.category.toLowerCase()} <ArrowDownRight size={13} /></Link></div></article>)}</div><p className="cxsmo-fit-library__note">Fit images guide colour, silhouette, and styling direction. They do not represent reviews, creator endorsements, customer photography, or unlisted inventory.</p></section>;
}

export function CxsmoStyleContext() {
  return <section className="cxsmo-style-context"><div><p>Community context / editorial only</p><h2>Built from<br /><em>real direction.</em></h2></div><article><span>Style notes, not testimonials</span><p>C✦SMO uses editorial fit studies to show how layers, hardware, and proportion work together. Verified customer reviews, ratings, and endorsements remain unavailable until real approved submissions exist.</p><b>Verified feedback / ready when true</b></article></section>;
}
