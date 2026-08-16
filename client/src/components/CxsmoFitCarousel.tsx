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

const cxsmoFitLibrarySource: FitEntry[] = [
  { index: "M / 01", group: "Mens", title: "Splitline rugby", category: "Graphics", listedIds: [], plannedPieces: ["Sheet 02 / #05 — Splitline Rugby Longsleeve", "Mens fit sheet / Black star cargo pant"], image: "/images/cxsmo-fit-men-01-splitline-rugby_7964b7e9.png", alt: "Individual C✦SMO mens look in a black and optic-bone long sleeve" },
  { index: "M / 02", group: "Mens", title: "Orbit ash", category: "Graphics", listedIds: [], plannedPieces: ["Sheet 02 / #06 — Orbit Ash Hoodie", "Mens fit sheet / Grey distressed cargo denim"], image: "/images/cxsmo-fit-men-02-orbit-ash_056116d2.png", alt: "Individual C✦SMO mens look in an ash hoodie and wide grey cargo denim" },
  { index: "M / 03", group: "Mens", title: "Micro orbit", category: "Graphics", listedIds: ["spear-rib-tank-70"], plannedPieces: ["Sheet 02 / #07 — Micro Orbit Tee", "Mens fit sheet / Black layered cargo pant"], image: "/images/cxsmo-fit-men-03-micro-orbit_f2af6040.png", alt: "Individual C✦SMO mens look in a black micro-orbit T-shirt and wide trousers" },
  { index: "M / 04", group: "Mens", title: "Nightstar hood", category: "Outerwear", listedIds: ["washed-star-hood-71", "wash-cargo-43"], plannedPieces: ["Mens fit sheet / Nightstar printed tee"], image: "/images/cxsmo-fit-men-04-nightstar-hood_8b83a0e8.png", alt: "Individual C✦SMO mens look in a black star hoodie and wide black pants" },
  { index: "M / 05", group: "Mens", title: "Chainline self", category: "Accessories", listedIds: ["contrast-halfzip-72", "star-chain-cargo-82"], plannedPieces: ["Sheet 01 / #04 — Starpoint Necklace", "Mens fit sheet / Cross-body harness"], image: "/images/cxsmo-fit-men-05-chainline-self_9c5b9f2f.png", alt: "Individual C✦SMO mens look with chain bag and black star trousers" },
  { index: "M / 06", group: "Mens", title: "Signal overshirt", category: "Outerwear", listedIds: ["black-star-overshirt-68", "star-chain-cargo-82"], plannedPieces: ["Mens fit sheet / Layered black base shirt"], image: "/images/cxsmo-fit-men-06-overshirt.png", alt: "Individual C✦SMO mens look in a black star overshirt and baggy black cargo pants" },
  { index: "M / 07", group: "Mens", title: "White hood", category: "Outerwear", listedIds: ["white-star-hood-69"], plannedPieces: ["Mens fit sheet / Grey distressed cargo denim"], image: "/images/cxsmo-fit-men-07-white-hood.png", alt: "Individual C✦SMO mens look in a white star hood jacket and distressed cargo jeans" },
  { index: "M / 08", group: "Mens", title: "Sleeveless hardware", category: "Graphics", listedIds: ["spear-rib-tank-70", "vector-cargo-42"], plannedPieces: ["Mens fit sheet / Layered black jacket"], image: "/images/cxsmo-fit-men-08-star-tank.png", alt: "Individual C✦SMO mens look in a black star tank and wide cargo pants" },
  { index: "M / 09", group: "Mens", title: "Washed hood", category: "Outerwear", listedIds: ["washed-star-hood-71", "wash-cargo-43"], plannedPieces: [], image: "/images/cxsmo-fit-men-09-washed-hood.png", alt: "Individual C✦SMO mens look in a washed hooded jacket and grey cargo denim" },
  { index: "M / 10", group: "Mens", title: "Contrast track", category: "Graphics", listedIds: ["contrast-halfzip-72"], plannedPieces: ["Mens fit sheet / Contrast track pant"], image: "/images/cxsmo-fit-men-10-contrast-track.png", alt: "Individual C✦SMO mens look in a white contrast long sleeve and black track pants" },
  { index: "M / 11", group: "Mens", title: "Flame sleeve", category: "Graphics", listedIds: ["flame-star-crew-73", "utility-puddle-44"], plannedPieces: [], image: "/images/cxsmo-fit-men-11-flame-sleeve.png", alt: "Individual C✦SMO mens look in black flame-sleeve starwear and layered pants" },
  { index: "M / 12", group: "Mens", title: "Washed orbit", category: "Graphics", listedIds: ["washed-orbit-knit-74", "wash-cargo-43"], plannedPieces: [], image: "/images/cxsmo-fit-men-12-washed-knit.png", alt: "Individual C✦SMO mens look in a washed grey star knit and distressed cargo denim" },
  { index: "M / 13", group: "Mens", title: "Layer break", category: "Outerwear", listedIds: ["flame-track-hoodie-75", "star-chain-cargo-82"], plannedPieces: [], image: "/images/cxsmo-fit-men-13-layered-hood.png", alt: "Individual C✦SMO mens look in a layered black hood jacket and cargo trousers" },
  { index: "M / 14", group: "Mens", title: "Charcoal vector", category: "Bottoms", listedIds: ["vector-cargo-42"], plannedPieces: ["Mens fit sheet / Charcoal star hood layer"], image: "/images/cxsmo-fit-men-14-charcoal-cargo.png", alt: "Individual C✦SMO mens look in a charcoal hooded layer and black vector cargo pants" },
  { index: "M / 15", group: "Mens", title: "Moto signal", category: "Outerwear", listedIds: ["chain-star-moto-77", "star-chain-cargo-82"], plannedPieces: ["Mens fit sheet / Layered black base shirt"], image: "/images/cxsmo-fit-men-15-moto-layer.png", alt: "Individual C✦SMO mens look in a black moto outer layer and baggy cargo pants" },
  { index: "W / 01", group: "Womens", title: "Asym star", category: "Graphics", listedIds: [], plannedPieces: ["Unnumbered fit piece — Asym Star Top", "Unnumbered fit piece — Black star wide pant", "Unnumbered fit piece — Black shoulder bag"], image: "/images/cxsmo-fit-women-01-asym-star_58adba9d.png", alt: "Individual C✦SMO womens look with asymmetric black star top" },
  { index: "W / 02", group: "Womens", title: "Cloud cargo", category: "Bottoms", listedIds: ["white-star-hood-69"], plannedPieces: ["Unnumbered fit piece — Grey distressed cargo denim"], image: "/images/cxsmo-fit-women-02-cloud-cargo_b6edb618.png", alt: "Individual C✦SMO womens look with white hoodie and grey cargo denim" },
  { index: "W / 03", group: "Womens", title: "Lunar corset", category: "Graphics", listedIds: ["lace-corset-50", "pleated-belt-skirt-54", "buckle-stack-boot-63"], plannedPieces: ["Unnumbered fit piece — Black shoulder bag"], image: "/images/cxsmo-fit-women-03-lunar-corset_82f00ca6.png", alt: "Individual C✦SMO womens look with black cropped corset top" },
  { index: "W / 04", group: "Womens", title: "Static raglan", category: "Graphics", listedIds: [], plannedPieces: ["Sheet 02 / #05 — Splitline Rugby Longsleeve", "Unnumbered fit piece — Black wide cargo pant"], image: "/images/cxsmo-fit-women-04-static-raglan_a90e2593.png", alt: "Individual C✦SMO womens look with black and bone raglan top" },
  { index: "W / 05", group: "Womens", title: "Soft chrome", category: "Lifestyle", listedIds: ["lace-tiered-skirt-55", "cloud-legwarmer-64"], plannedPieces: ["Unnumbered fit piece — White hooded layer", "Unnumbered fit piece — White star top", "Unnumbered fit piece — Silver shoulder bag"], image: "/images/cxsmo-fit-women-05-soft-chrome_3f954341.png", alt: "Individual C✦SMO womens look with a soft white statement layer" },
  { index: "W / 06", group: "Womens", title: "Night shrug", category: "Graphics", listedIds: ["pleated-belt-skirt-54"], plannedPieces: ["Unnumbered fit piece — Night shrug", "Unnumbered fit piece — Black mini bag"], image: "/images/cxsmo-fit-women-06-night-shrug_ad50346c.png", alt: "Individual C✦SMO womens look with black shrug and mini skirt" },
  { index: "W / 07", group: "Womens", title: "Blue orbit", category: "Denim", listedIds: [], plannedPieces: ["Unnumbered fit piece — Blue Orbit Star Tank", "Unnumbered fit piece — Blue baggy denim"], image: "/images/cxsmo-fit-women-07-blue-orbit_e6718627.png", alt: "Individual C✦SMO womens look with white star tank and blue baggy denim" },
  { index: "W / 08", group: "Womens", title: "Starline mini", category: "Graphics", listedIds: ["star-ruched-top-52", "pleated-belt-skirt-54"], plannedPieces: [], image: "/images/cxsmo-fit-women-08-starline-mini_b1d28505.png", alt: "Individual C✦SMO womens look with black star long sleeve and mini skirt" },
  { index: "W / 09", group: "Womens", title: "Cloud sweater", category: "Lifestyle", listedIds: ["frost-logo-hoodie-62", "lace-tiered-skirt-55"], plannedPieces: [], image: "/images/cxsmo-fit-women-09-cloud-sweater_a66e5d09.png", alt: "Individual C✦SMO womens look with oversized grey sweater and layered skirt" },
  { index: "W / 10", group: "Womens", title: "After dark", category: "Outerwear", listedIds: ["utility-puddle-44"], plannedPieces: ["Unnumbered fit piece — After Dark Halter Top"], image: "/images/cxsmo-fit-women-10-after-dark_494dde77.png", alt: "Individual C✦SMO womens look with black halter top and baggy moto pants" },
];

export const cxsmoFitLibrary = cxsmoFitLibrarySource;

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
  const [bundleAdded, setBundleAdded] = useState(false);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { addToBag, savedFitIds, toggleSavedFit } = useCxsmoDemo();
  const filteredFits = cxsmoFitLibrary.filter((fit) => filter === "All" || fit.group === filter);
  const listedProducts = activeFit ? activeFit.listedIds.map((id) => cxsmoProducts.find((product) => product.id === id)).filter((product): product is (typeof cxsmoProducts)[number] => Boolean(product)) : [];
  const fromSavedFits = new URLSearchParams(window.location.search).get("from") === "saved-fits";
  const closeQuickView = () => { setActiveFit(null); setQuickAddedId(null); if (window.location.search.includes("fit=")) window.history.replaceState(window.history.state, "", "/cxsmo/edits"); window.setTimeout(() => returnFocusRef.current?.focus(), 0); };
  const openQuickView = (fit: FitEntry, trigger?: HTMLButtonElement) => { if (trigger) returnFocusRef.current = trigger; setBundleAdded(false); setQuickAddedId(null); setActiveFit(fit); if (!window.location.search.includes(`fit=${encodeURIComponent(fit.index)}`)) window.history.replaceState(window.history.state, "", `/cxsmo/edits?fit=${encodeURIComponent(fit.index)}`); };
  const quickAdd = (product: (typeof cxsmoProducts)[number]) => { addToBag(product, product.fit.includes("One size") ? "One size" : "M"); setQuickAddedId(product.id); };
  const quickAddListedPairing = () => { listedProducts.forEach((product) => addToBag(product, product.fit.includes("One size") ? "One size" : "M")); setBundleAdded(true); };
  useEffect(() => { const fitIndex = new URLSearchParams(window.location.search).get("fit"); if (!fitIndex) return; const requestedFit = cxsmoFitLibrary.find((fit) => fit.index === fitIndex); if (requestedFit) { setFilter(requestedFit.group); setActiveFit(requestedFit); } }, []);
  useEffect(() => { if (!activeFit) return; window.setTimeout(() => closeButtonRef.current?.focus(), 0); const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); closeQuickView(); return; } if (event.key !== "Tab") return; const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') ?? []); if (!focusable.length) return; const first = focusable[0]; const last = focusable.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [activeFit]);

  return <section className="cxsmo-fit-library" aria-labelledby="cxsmo-fit-library-title">
    <div className="cxsmo-fit-library__head"><div><p>Fit library / issue 01</p><h2 id="cxsmo-fit-library-title">Worn<br /><em>on purpose.</em></h2></div><span>Every card is an individual fit reference. Shop links only lead to categories that are presently listed in the C✦SMO catalogue.</span></div>
    <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__primary"><img src="/images/cxsmo-fit-black-red-full_f171f1a3.png" alt="Individual C✦SMO black and red full-fit campaign styling study" /><div><p>Fit frame / 00</p><h3>Blackout hardware</h3><span>A full-fit campaign reference built around red paneling, chrome details, and a lower-volume silhouette.</span><Link href="/cxsmo/shop?category=Outerwear">Shop outerwear <ArrowDownRight size={15} /></Link></div></article>
    <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__album"><div className="cxsmo-fit-library__album-media"><img src="/images/cxsmo-fit-edits-album-top.png" alt="Four adult C✦SMO models in black, white, and chrome streetwear looks" /><img src="/images/cxsmo-fit-edits-album-bottom.png" alt="Four additional adult C✦SMO models in black, white, and chrome streetwear looks" /></div><div><p>Album / full cast</p><h3>More than one angle.</h3><span>A full-cast plate, kept wide so the neighboring pieces and styling relationships remain visible before the individual fit files below.</span></div></article>
    <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__album cxsmo-fit-library__album--mens"><img src="/images/cxsmo-fit-edits-mens-album-02.png" alt="Ten adult C✦SMO mens models wearing black, white, and washed-charcoal streetwear looks" /><div><p>Album / mens issue</p><h3>Ten ways to layer black.</h3><span>The complete mens plate stays intact first; the individual cards below are supporting references, not isolated replacements.</span></div></article>
    <div className="cxsmo-fit-library__filter-row" role="group" aria-label="Filter individual fit references">{(["All", "Mens", "Womens"] as const).map((item) => <button data-cxsmo-sound="select" className={filter === item ? "is-active" : ""} aria-pressed={filter === item} type="button" onClick={() => setFilter(item)} key={item}>{item} <span>{item === "All" ? cxsmoFitLibrary.length : cxsmoFitLibrary.filter((fit) => fit.group === item).length}</span></button>)}</div>
    <p className="cxsmo-fit-library__status" aria-live="polite">{filteredFits.length} individual {filter === "All" ? "fits" : `${filter.toLowerCase()} fits`} / numbered current-piece mapping included where listed</p>
    <div className="cxsmo-fit-library__individual-grid">{filteredFits.map((fit) => {
      const firstListed = cxsmoProducts.find((product) => product.id === fit.listedIds[0]);
      const isFavorite = savedFitIds.includes(fit.index);
      return <article data-cxsmo-hover-sound="zoom" className="cxsmo-fit-library__look" key={fit.index}><img src={fit.image} alt={fit.alt} /><div><p>Fit file / {fit.index}</p><h3>{fit.title}</h3><div className="cxsmo-fit-library__look-actions">{firstListed ? <Link href={`/cxsmo/products/${firstListed.id}`}>Shop the look <ArrowDownRight size={13} /></Link> : <button data-cxsmo-sound="click" type="button" onClick={(event) => openQuickView(fit, event.currentTarget)}>View planned pieces</button>}<button data-cxsmo-sound="click" aria-pressed={isFavorite} className={isFavorite ? "is-favorite" : ""} type="button" onClick={() => toggleSavedFit(fit.index)}>{isFavorite ? <><Check size={12} /> Saved</> : <><Heart size={12} /> Save to Favorites</>}</button><button data-cxsmo-sound="click" type="button" onClick={(event) => openQuickView(fit, event.currentTarget)}>View breakdown</button></div></div></article>;
    })}</div>
    <p className="cxsmo-fit-library__note">Numbered sheets map exact repeated listed pieces once. Other garments remain planned editorial references until a dedicated transparent render is supplied and added to the catalogue.</p>
    {activeFit && typeof document !== "undefined" && createPortal(<AnimatePresence><motion.div className="cxsmo-fit-quick-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeQuickView}><motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cxsmo-fit-quick-title" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .25, ease: [0.16, 1, 0.3, 1] }} onClick={(event) => event.stopPropagation()}><button ref={closeButtonRef} className="cxsmo-fit-quick-view__close" aria-label="Close fit breakdown" type="button" onClick={closeQuickView}><X size={18} /></button><img src={activeFit.image} alt="" /><div><p>Fit breakdown / {activeFit.index}</p><h2 id="cxsmo-fit-quick-title">{activeFit.title}</h2><span>Listed pieces in this fit</span>{listedProducts.length > 0 ? <><ul>{listedProducts.map((product) => <li key={product.id}><img src={product.image} alt="" /><div><b>{product.name}</b><span>{product.category} / {product.color}</span><div className="cxsmo-fit-quick-view__actions"><Link href={`/cxsmo/products/${product.id}`} onClick={closeQuickView}>Shop piece <ArrowDownRight size={13} /></Link><button data-cxsmo-sound="click" type="button" onClick={() => quickAdd(product)}>{quickAddedId === product.id ? <><Check size={12} /> Added to bag</> : <><ShoppingBag size={12} /> Quick Add to Cart</>}</button></div></div></li>)}</ul>{listedProducts.length > 1 && <section className="cxsmo-fit-quick-view__bundle"><span>Available listed pairing</span><p>These are the currently listed pieces from this fit. Planned garments remain excluded from this bundle.</p><button data-cxsmo-sound="click" type="button" onClick={quickAddListedPairing}>{bundleAdded ? <><Check size={12} /> Listed pairing added</> : <><ShoppingBag size={12} /> Add listed pairing to bag</>}</button></section>}</> : <p className="cxsmo-fit-quick-view__empty">No pictured piece is listed yet. The fit is retained as an editorial reference until transparent product renders arrive.</p>}{fromSavedFits && <Link className="cxsmo-fit-quick-view__return" href="/cxsmo/account/fits">Back to Saved Fits <ArrowLeft size={14} /></Link>}<span className="cxsmo-fit-quick-view__planned-title">Planned from this fit</span><ul className="cxsmo-fit-quick-view__planned">{activeFit.plannedPieces.map((piece) => <li key={piece}><div><b>{piece}</b><span>Render not yet supplied / not shoppable</span></div></li>)}</ul><Link className="cxsmo-fit-quick-view__all" href="/cxsmo/shop" onClick={closeQuickView}>Browse all listed objects <ArrowDownRight size={15} /></Link></div></motion.div></motion.div></AnimatePresence>, document.body)}
  </section>;
}

export function CxsmoStyleContext() {
  return <section className="cxsmo-style-context"><div><p>Community context / editorial only</p><h2>Built from<br /><em>real direction.</em></h2></div><article><span>Style notes, not testimonials</span><p>C✦SMO uses editorial fit studies to show how layers, hardware, and proportion work together. Verified customer reviews, ratings, and endorsements remain unavailable until real approved submissions exist.</p><b>Verified feedback / ready when true</b></article></section>;
}
