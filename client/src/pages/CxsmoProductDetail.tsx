import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Heart, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { cxsmoFitLibrary } from "@/components/CxsmoFitCarousel";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { formatCxsmoPrice, getCxsmoProduct } from "@/lib/cxsmo";
import { resolveCxsmoProduct, useCxsmoPublishedContent } from "@/lib/cxsmoContent";
import { CxsmoShell, ProductMediaStage } from "./CxsmoStorefront";
import "./cxsmo-product-fit-links.css";

export function CxsmoProductPage() {
  const [, params] = useRoute("/cxsmo/products/:id");
  const rawProduct = getCxsmoProduct(params?.id);
  const { productOverrides } = useCxsmoPublishedContent();
  const product = resolveCxsmoProduct(rawProduct, productOverrides[rawProduct.id]);
  const { addToBag, savedIds, toggleSaved, profile } = useCxsmoDemo();
  const [size, setSize] = useState("M");
  const colorOptions = Array.from(new Set(product.color.split("/").map((item) => item.trim()).filter(Boolean)));
  const [color, setColor] = useState(colorOptions[0] ?? product.color);
  const [fitOpen, setFitOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [note, setNote] = useState("");
  const [noteStaged, setNoteStaged] = useState(false);
  const fitTriggerRef = useRef<HTMLButtonElement>(null);
  const fitDialogRef = useRef<HTMLDivElement>(null);
  const saved = savedIds.includes(product.id);
  const fitReferences = cxsmoFitLibrary.filter((fit) => fit.listedIds.includes(product.id));
  const add = () => { addToBag(product, size, color); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };
  const closeFitGuide = () => { setFitOpen(false); window.setTimeout(() => fitTriggerRef.current?.focus(), 0); };
  useEffect(() => {
    if (!fitOpen) return;
    window.setTimeout(() => fitDialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeFitGuide(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(fitDialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fitOpen]);
  return <CxsmoShell><section className="cxsmo-pdp cxsmo-pdp--story"><ProductMediaStage product={product} /><div className="cxsmo-pdp__buy"><p className="section-label">{product.category} / {product.color}</p><div className="cxsmo-pdp__title"><h1>{product.name}</h1><strong>{formatCxsmoPrice(product.price, profile.locale, profile.currency, profile.currencyRate)}</strong></div><p className="cxsmo-pdp__description">{product.description}</p><div className="cxsmo-product-dossier"><span>Object brief / {product.drop}</span><span>Fabric, hardware, and proportion notes</span><span>Portfolio object study</span></div><dl>{product.details.map((detail, index) => <div key={detail}><dt>0{index + 1}</dt><dd>{detail}</dd></div>)}<div><dt>FIT</dt><dd>{product.fit}</dd></div></dl><div className="cxsmo-color-picker"><div><b>Finish selection</b><small>Browser-local display state</small></div><div>{colorOptions.map((option) => <button key={option} type="button" className={color === option ? "is-active" : ""} aria-pressed={color === option} onClick={() => setColor(option)}>{option}</button>)}</div></div><div className="cxsmo-size-picker"><div><b>Choose size</b><button ref={fitTriggerRef} aria-haspopup="dialog" aria-expanded={fitOpen} onClick={() => setFitOpen(true)}>Fit guide <ArrowUpRight size={14} /></button></div><div>{["XS", "S", "M", "L", "XL"].map((item) => <button className={size === item ? "is-active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></div><div className="cxsmo-pdp__actions"><button className="cxsmo-button" onClick={add}>{added ? "Added to bag" : "Add to bag"} <ShoppingBag size={16} /></button><button className={saved ? "save-wide is-saved" : "save-wide"} onClick={() => toggleSaved(product.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save"}</button></div><p className="cxsmo-portfolio-copy">Fictional product for portfolio use. Price display follows your local demo setting; checkout does not collect payment.</p></div></section>{fitReferences.length > 0 && <section className="cxsmo-product-fit-links" aria-labelledby="cxsmo-fit-links-title"><div><p>Styled in Fit Edits</p><h2 id="cxsmo-fit-links-title">See the<br /><em>whole look.</em></h2><span>These links open editorial fit references that include this listed object. Unlisted garments remain clearly identified as planned, not for sale.</span></div><div>{fitReferences.map((fit) => <Link href={`/cxsmo/edits?fit=${encodeURIComponent(fit.index)}`} key={fit.index}><img src={fit.image} alt="" /><span>Fit file / {fit.index}</span><b>{fit.title}</b><small>Open breakdown <ArrowUpRight size={14} /></small></Link>)}</div></section>}<section className="cxsmo-product-quote"><span>“</span><p>Style lives in what you exaggerate and what you leave plain.</p><i>C✦SMO / Drop 01</i></section><section className="cxsmo-product-notes" aria-labelledby="cxsmo-product-notes-title"><div><p>Product notes</p><h2 id="cxsmo-product-notes-title">Leave a<br /><em>styling thought.</em></h2><span>This portfolio keeps customer reviews, ratings, and endorsements empty rather than inventing social proof.</span></div><form onSubmit={(event) => { event.preventDefault(); setNoteStaged(true); }}><label htmlFor="cxsmo-product-note">Your browser-local note</label><textarea id="cxsmo-product-note" value={note} onChange={(event) => { setNote(event.target.value); setNoteStaged(false); }} placeholder="For example: I would layer this with a washed denim overshirt." required /><button className="cxsmo-button" type="submit">{noteStaged ? "Note staged locally" : "Stage note"} <ArrowUpRight size={16} /></button>{noteStaged && <small>Saved only in this page session. Nothing is published or sent.</small>}</form></section><AnimatePresence>{fitOpen && <motion.div className="cxsmo-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeFitGuide}><motion.div ref={fitDialogRef} role="dialog" aria-modal="true" aria-labelledby="cxsmo-fit-guide-title" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button aria-label="Close fit guide" onClick={closeFitGuide}><X size={18} /></button><p className="section-label">Fit guide / demo</p><h2 id="cxsmo-fit-guide-title">Start with the silhouette.</h2><p>In a production shop, confirmed garment measurements and model specifications would be shown here. This portfolio demonstration does not invent size measurements.</p><b>{product.fit}</b></motion.div></motion.div>}</AnimatePresence></CxsmoShell>;
}
