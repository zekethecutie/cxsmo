import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, Heart, Pause, Play, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import "@/pages/cxsmo-fit-carousel-motion.css";
import "@/pages/cxsmo-fit-library.css";

const fitNotes = [
  ["Long break", "Low-slung denim, a close tee, and one chrome detail", "gravity-01"],
  ["Blue star", "A mesh jersey with soft hardware for late-platform light", "bluestar-09"],
  ["Soft authority", "A checked overshirt cut loose over a wide, easy base", "signal-04"],
  ["Black universe", "Wide black pants, a pale orbit layer, and a chrome finish", "blxck-pants-10"],
] as const;

type FitEntry = {
  index: string;
  group: "Mens" | "Womens";
  title: string;
  category: string;
  listedIds: string[];
  plannedPieces: string[];
  image: string;
  alt: string;
};

export const cxsmoFitLibrary: FitEntry[] = [
  { index: "M / 01", group: "Mens", title: "Splitline rugby", category: "Graphics", listedIds: ["chrome-puddle-14"], plannedPieces: ["Sheet 02 / #05 — Splitline Rugby Longsleeve"], image: "/manus-storage/cxsmo-fit-men-01-splitline-rugby_7964b7e9.png", alt: "Individual C✦SMO mens look in a black and optic-bone long sleeve" },
  { index: "M / 02", group: "Mens", title: "Orbit ash", category: "Graphics", listedIds: ["gravity-01"], plannedPieces: ["Sheet 02 / #06 — Orbit Ash Hoodie"], image: "/manus-storage/cxsmo-fit-men-02-orbit-ash_056116d2.png", alt: "Individual C✦SMO mens look in an ash hoodie and wide grey cargo denim" },
  { index: "M / 03", group: "Mens", title: "Micro orbit", category: "Graphics", listedIds: ["blxck-pants-10"], plannedPieces: ["Sheet 02 / #07 — Micro Orbit Tee"], image: "/manus-storage/cxsmo-fit-men-03-micro-orbit_f2af6040.png", alt: "Individual C✦SMO mens look in a black micro-orbit T-shirt and wide trousers" },
  { index: "M / 04", group: "Mens", title: "Nightstar hood", category: "Outerwear", listedIds: ["chrome-puddle-14"], plannedPieces: ["Sheet 02 / #08 — Nightstar Zip Hoodie"], image: "/manus-storage/cxsmo-fit-men-04-nightstar-hood_8b83a0e8.png", alt: "Individual C✦SMO mens look in a black star hoodie and wide black pants" },
  { index: "M / 05", group: "Mens", title: "Chainline self", category: "Accessories", listedIds: ["silver-crown-case-17", "blxck-pants-10"], plannedPieces: ["Sheet 01 / #04 — Starpoint Necklace"], image: "/manus-storage/cxsmo-fit-men-05-chainline-self_9c5b9f2f.png", alt: "Individual C✦SMO mens look with chain bag and black star trousers" },
  { index: "W / 01", group: "Womens", title: "Asym star", category: "Graphics", listedIds: ["chrome-puddle-14"], plannedPieces: ["Unnumbered fit piece — Asym Star Top"], image: "/manus-storage/cxsmo-fit-women-01-asym-star_58adba9d.png", alt: "Individual C✦SMO womens look with asymmetric black star top" },
  { index: "W / 02", group: "Womens", title: "Cloud cargo", category: "Bottoms", listedIds: [], plannedPieces: ["Unnumbered fit piece — Cloud Cargo Denim", "Sheet 02 / #06 — Orbit Ash Hoodie"], image: "/manus-storage/cxsmo-fit-women-02-cloud-cargo_b6edb618.png", alt: "Individual C✦SMO womens look with white hoodie and grey cargo denim" },
  { index: "W / 03", group: "Womens", title: "Lunar corset", category: "Graphics", listedIds: [], plannedPieces: ["Unnumbered fit piece — Lunar Corset Top", "Unnumbered fit piece — Black Mini Bag"], image: "/manus-storage/cxsmo-fit-women-03-lunar-corset_82f00ca6.png", alt: "Individual C✦SMO womens look with black cropped corset top" },
  { index: "W / 04", group: "Womens", title: "Static raglan", category: "Graphics", listedIds: ["chrome-puddle-14"], plannedPieces: ["Sheet 02 / #05 — Splitline Rugby Longsleeve"], image: "/manus-storage/cxsmo-fit-women-04-static-raglan_a90e2593.png", alt: "Individual C✦SMO womens look with black and bone raglan top" },
  { index: "W / 05", group: "Womens", title: "Soft chrome", category: "Lifestyle", listedIds: ["silver-crown-case-17"], plannedPieces: ["Unnumbered fit piece — Soft Chrome White Set"], image: "/manus-storage/cxsmo-fit-women-05-soft-chrome_3f954341.png", alt: "Individual C✦SMO womens look with a soft white statement layer" },
  { index: "W / 06", group: "Womens", title: "Night shrug", category: "Graphics", listedIds: [], plannedPieces: ["Unnumbered fit piece — Night Shrug and Mini Skirt", "Unnumbered fit piece — Black Mini Bag"], image: "/manus-storage/cxsmo-fit-women-06-night-shrug_ad50346c.png", alt: "Individual C✦SMO womens look with black shrug and mini skirt" },
  { index: "W / 07", group: "Womens", title: "Blue orbit", category: "Denim", listedIds: ["gravity-01"], plannedPieces: ["Unnumbered fit piece — Blue Orbit Star Tank"], image: "/manus-storage/cxsmo-fit-women-07-blue-orbit_e6718627.png", alt: "Individual C✦SMO womens look with white star tank and blue baggy denim" },
  { index: "W / 08", group: "Womens", title: "Starline mini", category: "Graphics", listedIds: ["mercury-belt-13"], plannedPieces: ["Unnumbered fit piece — Starline Longsleeve", "Unnumbered fit piece — Black Mini Skirt"], image: "/manus-storage/cxsmo-fit-women-08-starline-mini_b1d28505.png", alt: "Individual C✦SMO womens look with black star long sleeve and mini skirt" },
  { index: "W / 09", group: "Womens", title: "Cloud sweater", category: "Lifestyle", listedIds: [], plannedPieces: ["Unnumbered fit piece — Cloud Sweater", "Unnumbered fit piece — Layered Mini Skirt"], image: "/manus-storage/cxsmo-fit-women-09-cloud-sweater_a66e5d09.png", alt: "Individual C✦SMO womens look with oversized grey sweater and layered skirt" },
  { index: "W / 10", group: "Womens", title: "After dark", category: "Outerwear", listedIds: [], plannedPieces: ["Unnumbered fit piece — After Dark Halter Top", "Unnumbered fit piece — Moto Cargo Pant"], image: "/manus-storage/cxsmo-fit-women-10-after-dark_494dde77.png", alt: "Individual C✦SMO womens look with black halter top and baggy moto pants" },
];

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
  const [filter, setFilter] = useState<"All" | "Mens" | "Womens">("All");
  const [activeFit, setActiveFit] = useState<FitEntry | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const { addToBag, savedFitIds, toggleSavedFit } = useCxsmoDemo();
  const filteredFits = cxsmoFitLibrary.filter((fit) => filter === "All" || fit.group === filter);
  const listedProducts = activeFit ? activeFit.listedIds.map((id) => cxsmoProducts.find((product) => product.id === id)).filter((product): product is (typeof cxsmoProducts)[number] => Boolean(product)) : [];
  const closeQuickView = () => { setActiveFit(null); setQuickAddedId(null); window.setTimeout(() => returnFocusRef.current?.focus(), 0); };
  const openQuickView = (fit: FitEntry, trigger: HTMLButtonElement) => { returnFocusRef.current = trigger; setQuickAddedId(null); setActiveFit(fit); };
  const quickAdd = (product: (typeof cxsmoProducts)[number]) => { addToBag(product, product.fit.includes("One size") ? "One size" : "M"); setQuickAddedId(product.id); };
  useEffect(() => { if (!activeFit) return; const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); closeQuickView(); } }; window.addEventListener("keydown", onEscape); return () => window.removeEventListener("keydown", onEscape); }, [activeFit]);

  return <section className="cxsmo-fit-library" aria-labelledby="cxsmo-fit-library-title">
    <div className="cxsmo-fit-library__head"><div><p>Fit library / issue 01</p><h2 id="cxsmo-fit-library-title">Worn<br /><em>on purpose.</em></h2></div><span>Every card is an individual fit reference. Shop links only lead to categories that are presently listed in the C✦SMO catalogue.</span></div>
    <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__primary"><img src="/manus-storage/cxsmo-fit-black-red-full_f171f1a3.png" alt="Individual C✦SMO black and red full-fit campaign styling study" /><div><p>Fit frame / 00</p><h3>Blackout hardware</h3><span>A full-fit campaign reference built around red paneling, chrome details, and a lower-volume silhouette.</span><Link href="/cxsmo/shop?category=Outerwear">Shop outerwear <ArrowDownRight size={15} /></Link></div></article>
    <div className="cxsmo-fit-library__filter-row" role="group" aria-label="Filter individual fit references">{(["All", "Mens", "Womens"] as const).map((item) => <button data-cxsmo-sound="select" className={filter === item ? "is-active" : ""} aria-pressed={filter === item} type="button" onClick={() => setFilter(item)} key={item}>{item} <span>{item === "All" ? cxsmoFitLibrary.length : cxsmoFitLibrary.filter((fit) => fit.group === item).length}</span></button>)}</div>
    <p className="cxsmo-fit-library__status" aria-live="polite">{filteredFits.length} individual {filter === "All" ? "fits" : `${filter.toLowerCase()} fits`} / numbered current-piece mapping included where listed</p>
    <div className="cxsmo-fit-library__individual-grid">{filteredFits.map((fit) => {
      const firstListed = cxsmoProducts.find((product) => product.id === fit.listedIds[0]);
      const isFavorite = savedFitIds.includes(fit.index);
      return <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__look" key={fit.index}><img src={fit.image} alt={fit.alt} /><div><p>Fit file / {fit.index}</p><h3>{fit.title}</h3><div className="cxsmo-fit-library__look-actions">{firstListed ? <Link href={`/cxsmo/products/${firstListed.id}`}>Shop the look <ArrowDownRight size={13} /></Link> : <button data-cxsmo-sound="click" type="button" onClick={(event) => openQuickView(fit, event.currentTarget)}>View planned pieces</button>}<button data-cxsmo-sound="click" aria-pressed={isFavorite} className={isFavorite ? "is-favorite" : ""} type="button" onClick={() => toggleSavedFit(fit.index)}>{isFavorite ? <><Check size={12} /> Saved</> : <><Heart size={12} /> Save to Favorites</>}</button><button data-cxsmo-sound="click" type="button" onClick={(event) => openQuickView(fit, event.currentTarget)}>View breakdown</button></div></div></article>;
    })}</div>
    <p className="cxsmo-fit-library__note">Numbered sheets map exact repeated listed pieces once. Other garments remain planned editorial references until a dedicated transparent render is supplied and added to the catalogue.</p>
    {activeFit && typeof document !== "undefined" && createPortal(<AnimatePresence><motion.div className="cxsmo-fit-quick-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeQuickView}><motion.div role="dialog" aria-modal="true" aria-labelledby="cxsmo-fit-quick-title" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .25, ease: [0.16, 1, 0.3, 1] }} onClick={(event) => event.stopPropagation()}><button className="cxsmo-fit-quick-view__close" aria-label="Close fit breakdown" type="button" onClick={closeQuickView}><X size={18} /></button><img src={activeFit.image} alt="" /><div><p>Fit breakdown / {activeFit.index}</p><h2 id="cxsmo-fit-quick-title">{activeFit.title}</h2><span>Listed pieces in this fit</span>{listedProducts.length > 0 ? <ul>{listedProducts.map((product) => <li key={product.id}><img src={product.image} alt="" /><div><b>{product.name}</b><span>{product.category} / {product.color}</span><div className="cxsmo-fit-quick-view__actions"><Link href={`/cxsmo/products/${product.id}`} onClick={closeQuickView}>Shop piece <ArrowDownRight size={13} /></Link><button data-cxsmo-sound="click" type="button" onClick={() => quickAdd(product)}>{quickAddedId === product.id ? <><Check size={12} /> Added to bag</> : <><ShoppingBag size={12} /> Quick Add to Cart</>}</button></div></div></li>)}</ul> : <p className="cxsmo-fit-quick-view__empty">No pictured piece is listed yet. The fit is retained as an editorial reference until transparent product renders arrive.</p>}<span className="cxsmo-fit-quick-view__planned-title">Planned from this fit</span><ul className="cxsmo-fit-quick-view__planned">{activeFit.plannedPieces.map((piece) => <li key={piece}><div><b>{piece}</b><span>Render not yet supplied / not shoppable</span></div></li>)}</ul><Link className="cxsmo-fit-quick-view__all" href="/cxsmo/shop" onClick={closeQuickView}>Browse all listed objects <ArrowDownRight size={15} /></Link></div></motion.div></motion.div></AnimatePresence>, document.body)}
  </section>;
}

export function CxsmoStyleContext() {
  return <section className="cxsmo-style-context"><div><p>Community context / editorial only</p><h2>Built from<br /><em>real direction.</em></h2></div><article><span>Style notes, not testimonials</span><p>C✦SMO uses editorial fit studies to show how layers, hardware, and proportion work together. Verified customer reviews, ratings, and endorsements remain unavailable until real approved submissions exist.</p><b>Verified feedback / ready when true</b><details className="cxsmo-style-context__prompt"><summary>Copy the mockup prompt</summary><textarea readOnly aria-label="C✦SMO master mockup prompt" value="Create a single original C✦SMO fashion product render for a fictional Y2K streetwear catalogue. Show the garment or accessory on an invisible wearer in a clean 3/4 front view, centred and fully visible, with a true transparent PNG alpha background. No person, no face, no hands, no text, no watermark, no floor, and no cast shadow. Use crisp black, bone, graphite, pearl chrome, and restrained signal-red details." /><Link href="/cxsmo/admin">Open the studio asset map <ArrowDownRight size={13} /></Link></details></article></section>;
}
