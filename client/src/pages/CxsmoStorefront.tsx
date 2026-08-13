import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Heart, Minus, PackageCheck, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { CxsmoMark } from "@/components/CxsmoMark";
import { CxsmoAppearanceToggle } from "@/components/CxsmoAppearanceToggle";
import { CxsmoCommunityEmptyState, CxsmoFitCarousel } from "@/components/CxsmoFitCarousel";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoCategories, cxsmoProducts, formatCxsmoPrice, getCxsmoProduct, type CxsmoProduct } from "@/lib/cxsmo";
import "./cxsmo.css";
import "./cxsmo-media-overrides.css";
import "./cxsmo-reduced-motion.css";
import "./cxsmo-poster-theme.css";
import "./cxsmo-footer-credit.css";
import "./cxsmo-appearance.css";
import "./cxsmo-route-effects.css";
import "./cxsmo-product-story.css";
import "./cxsmo-fit-carousel.css";

const heroImage = "/manus-storage/cxsmo-hero-campaign_c252324b.jpg";
const ease = [0.16, 1, 0.3, 1] as const;

export function CxsmoShell({ children }: { children: ReactNode }) {
  const { bag } = useCxsmoDemo();
  const reducedMotion = useReducedMotion();
  return <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}><main className="cxsmo-site"><div className="cxsmo-disclaimer">C✦SMO is a fictional fashion-commerce demonstration. No payments or personal information are transmitted.</div><header className="cxsmo-header"><Link href="/cxsmo" aria-label="C✦SMO home"><CxsmoMark /></Link><CxsmoMenu /><div className="cxsmo-header__tools"><CxsmoAppearanceToggle /><Link className="cxsmo-bag-link" href="/cxsmo/bag"><ShoppingBag size={16} /> Bag <b>{bag.length}</b></Link></div></header>{children}<footer className="cxsmo-footer"><CxsmoMark inverse /><p>Future-pop wardrobe objects, fashioned as a portfolio demonstration.</p><p className="cxsmo-footer__credit">Developed by zxke</p><div><Link href="/cxsmo/shop">Shop</Link><Link href="/cxsmo/account">Account</Link><Link href="/cxsmo/support">Info</Link></div></footer></main></MotionConfig>;
}

function CxsmoMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const links = [["Shop", "/cxsmo/shop", "01"], ["Fit edits", "/cxsmo/edits", "02"], ["Information", "/cxsmo/support", "03"], ["Studio", "/cxsmo/admin", "04"]] as const;
  useEffect(() => {
    if (!open) return;
    const dismissOnPointer = (event: PointerEvent) => { if (!panelRef.current?.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) setOpen(false); };
    const dismissOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    window.addEventListener("pointerdown", dismissOnPointer);
    window.addEventListener("keydown", dismissOnEscape);
    return () => { window.removeEventListener("pointerdown", dismissOnPointer); window.removeEventListener("keydown", dismissOnEscape); };
  }, [open]);
  const openFromKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()); } };
  return <nav className="cxsmo-header__menu" aria-label="Main navigation"><button ref={triggerRef} className="cxsmo-header__menu-trigger" type="button" aria-expanded={open} aria-controls="cxsmo-main-menu" onClick={() => setOpen(!open)} onKeyDown={openFromKeyboard}>Navigate <span aria-hidden="true">{open ? "−" : "+"}</span></button><AnimatePresence>{open && <motion.div ref={panelRef} id="cxsmo-main-menu" className="cxsmo-header__menu-panel" initial={{ opacity: 0, y: -10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }} transition={{ duration: .23, ease }}>{links.map(([label, href, number], index) => <motion.div key={href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .045, duration: .2, ease }}><Link href={href} onClick={() => { setOpen(false); triggerRef.current?.focus(); }}><span>{number}</span>{label}<ArrowUpRight size={14} /></Link></motion.div>)}</motion.div>}</AnimatePresence></nav>;
}

function ProductMediaStage({ product }: { product: CxsmoProduct }) {
  const [view, setView] = useState<"object" | "wear">("object");
  return <div className={`cxsmo-product-stage cxsmo-product-stage--${view}`}><div className="cxsmo-product-stage__meta"><span>Object lens / {product.drop}</span><strong>C✦SMO</strong></div><div className="cxsmo-product-stage__asset"><img src={product.image} alt={`${product.name} isolated product view`} /></div><div className="cxsmo-product-stage__campaign"><img src={heroImage} alt="C✦SMO styling campaign context" /></div><div className="cxsmo-product-stage__orbit"><button type="button" className={view === "object" ? "is-active" : ""} aria-pressed={view === "object"} onClick={() => setView("object")}>Object</button><button type="button" className={view === "wear" ? "is-active" : ""} aria-pressed={view === "wear"} onClick={() => setView("wear")}>Worn context</button></div><span className="cxsmo-product-stage__index">01 / 02</span></div>;
}

function TextReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return <span className="cxsmo-reveal" aria-label={text}>{words.map((word, index) => <motion.span key={`${word}-${index}`} initial={{ y: "115%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .34, delay: index * .055, ease }}>{word}{index < words.length - 1 ? " " : ""}</motion.span>)}</span>;
}

function ProductCard({ product, order = "01" }: { product: CxsmoProduct; order?: string }) {
  const { addToBag, savedIds, toggleSaved } = useCxsmoDemo();
  const [added, setAdded] = useState(false);
  const save = savedIds.includes(product.id);
  function quickAdd() { addToBag(product, "M"); setAdded(true); window.setTimeout(() => setAdded(false), 1500); }
  return <article className="cxsmo-product-card"><Link className="cxsmo-product-card__visual" href={`/cxsmo/products/${product.id}`}><span>{order}</span><img src={product.image} alt={product.name} /><em>{product.category}</em></Link><div className="cxsmo-product-card__body"><div><p>{product.color}</p><h2>{product.name}</h2></div><strong>{formatCxsmoPrice(product.price)}</strong></div><div className="cxsmo-product-card__actions"><button onClick={quickAdd}>{added ? <><Check size={15} /> Added</> : <><Plus size={15} /> Quick add</>}</button><button aria-label={`Save ${product.name}`} className={save ? "is-saved" : ""} onClick={() => toggleSaved(product.id)}><Heart size={17} fill={save ? "currentColor" : "none"} /></button></div></article>;
}

export function CxsmoHomePage() {
  return <CxsmoShell><section className="cxsmo-hero"><div className="cxsmo-hero__media"><img src={heroImage} alt="CXSmo campaign showing adult models in original denim and layered streetwear looks" /><div className="cxsmo-hero__glow" /></div><div className="cxsmo-hero__copy"><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease }}>Drop 01 / Built for the after-image</motion.p><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08, ease }}><TextReveal text="Street" /><br />in <em>orbit.</em></motion.h1><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2, ease }}><Link className="cxsmo-button" href="/cxsmo/shop">Enter the drop <ArrowDownRight size={17} /></Link><Link className="cxsmo-underlink" href="/cxsmo/edits">See fit edits <ArrowUpRight size={15} /></Link></motion.div></div><div className="cxsmo-hero__orbit"><span>Manila / Tokyo / Shanghai / Everywhere</span><b>01—26</b></div></section>
  <section className="cxsmo-category-rail"><div className="section-kicker"><span>01</span><p>Shop your frequency</p></div><div className="cxsmo-category-rail__grid"><Link href="/cxsmo/shop?category=Denim" className="category-card category-card--denim"><b>Denim</b><span>Long breaks, low slung</span><i>✦</i></Link><Link href="/cxsmo/shop?category=Graphics" className="category-card category-card--graphics"><b>Graphics</b><span>New signal tees</span><i>✦</i></Link><Link href="/cxsmo/shop?category=Outerwear" className="category-card category-card--outer"><b>Outerwear</b><span>Chrome weather</span><i>✦</i></Link><Link href="/cxsmo/shop" className="category-card category-card--beauty"><b>Accessories<br />+ beauty</b><span>Small orbit objects</span><i>✦</i></Link></div></section><CxsmoFitCarousel />
  <section className="cxsmo-drop"><div className="cxsmo-drop__heading"><div><p className="section-label">Drop 01 / Static bloom</p><h2>Loose silhouettes.<br /><em>Close energy.</em></h2></div><Link className="cxsmo-underlink" href="/cxsmo/shop">Shop all objects <ArrowUpRight size={15} /></Link></div><div className="cxsmo-product-grid">{cxsmoProducts.map((product, index) => <ProductCard product={product} order={`0${index + 1}`} key={product.id} />)}</div></section>
  <section className="cxsmo-edit-banner"><div><p className="section-label">The styling edit</p><h2>Big denim, tiny tee,<br />one sharp object.</h2><p>The C✦SMO fit language starts with proportion. Let the jeans pool, make the layers count, and leave room for the detail that turns a look into a signal.</p><Link className="cxsmo-button cxsmo-button--light" href="/cxsmo/edits">Open the edit <ArrowUpRight size={17} /></Link></div><div className="cxsmo-edit-banner__poster"><div><i>✦</i><span>FUTURE<br />WEAR</span></div><p>Styled world<br />/ issue 01</p></div></section>
  <section className="cxsmo-service-strip"><div><Sparkles size={21} /><p><b>Everything has an information layer.</b> Fit notes, saved objects, bag states, and shipping-request previews are available in this portfolio experience.</p></div><Link href="/cxsmo/support">Explore the info desk <ArrowUpRight size={16} /></Link></section><CxsmoCommunityEmptyState /></CxsmoShell>;
}

export function CxsmoShopPage() {
  const [filter, setFilter] = useState<string>("All");
  const [sort, setSort] = useState("Featured");
  const products = cxsmoProducts.filter((product) => filter === "All" || filter === "New drop" || product.category === filter).sort((a, b) => sort === "Price: low" ? a.price - b.price : sort === "Price: high" ? b.price - a.price : a.drop.localeCompare(b.drop));
  return <CxsmoShell><section className="cxsmo-page-intro"><p className="section-label">C✦SMO objects</p><h1><TextReveal text="Wear the" /><br /><em>whole signal.</em></h1><p>A fictional drop of volume-first streetwear, made to demonstrate an editorial product-discovery path.</p></section><section className="cxsmo-shop-toolbar"><div className="cxsmo-filter-scroll" aria-label="Product categories">{cxsmoCategories.map((category) => <button key={category} className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: low</option><option>Price: high</option></select><ChevronDown size={15} /></label></section><section className="cxsmo-product-grid cxsmo-product-grid--shop" aria-live="polite">{products.map((product, index) => <ProductCard product={product} order={`0${index + 1}`} key={product.id} />)}</section><section className="cxsmo-collection-note"><p>Not seeing a category?</p><h2>Accessories and beauty<br />are staged for the next release.</h2><span>This concept intentionally presents only the fictional product data above.</span></section></CxsmoShell>;
}

export function CxsmoProductPage() {
  const [, params] = useRoute("/cxsmo/products/:id");
  const product = getCxsmoProduct(params?.id);
  const { addToBag, savedIds, toggleSaved } = useCxsmoDemo();
  const [size, setSize] = useState("M");
  const [fitOpen, setFitOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const saved = savedIds.includes(product.id);
  const add = () => { addToBag(product, size); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };
  return <CxsmoShell><section className="cxsmo-pdp cxsmo-pdp--story"><ProductMediaStage product={product} /><div className="cxsmo-pdp__buy"><p className="section-label">{product.category} / {product.color}</p><div className="cxsmo-pdp__title"><h1>{product.name}</h1><strong>{formatCxsmoPrice(product.price)}</strong></div><p className="cxsmo-pdp__description">{product.description}</p><div className="cxsmo-product-dossier"><span>Object brief / {product.drop}</span><span>Every detail is staged for the after-image.</span><span>Scroll for material notes ↓</span></div><dl>{product.details.map((detail, index) => <div key={detail}><dt>0{index + 1}</dt><dd>{detail}</dd></div>)}<div><dt>FIT</dt><dd>{product.fit}</dd></div></dl><div className="cxsmo-size-picker"><div><b>Choose size</b><button onClick={() => setFitOpen(true)}>Fit guide <ArrowUpRight size={14} /></button></div><div>{["XS", "S", "M", "L", "XL"].map((item) => <button className={size === item ? "is-active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></div><div className="cxsmo-pdp__actions"><button className="cxsmo-button" onClick={add}>{added ? "Added to bag" : "Add to bag"} <ShoppingBag size={16} /></button><button className={saved ? "save-wide is-saved" : "save-wide"} onClick={() => toggleSaved(product.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save"}</button></div><p className="cxsmo-portfolio-copy">Fictional product for portfolio use. The bag is a demo state; checkout does not collect payment.</p></div></section><section className="cxsmo-product-quote"><span>“</span><p>Style lives in what you exaggerate and what you leave plain.</p><i>C✦SMO / Drop 01</i></section><AnimatePresence>{fitOpen && <motion.div className="cxsmo-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFitOpen(false)}><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button aria-label="Close fit guide" onClick={() => setFitOpen(false)}><X size={18} /></button><p className="section-label">Fit guide / demo</p><h2>Start with the silhouette.</h2><p>In a production shop, confirmed garment measurements and model specifications would be shown here. This portfolio demonstration does not invent size measurements.</p><b>{product.fit}</b></motion.div></motion.div>}</AnimatePresence></CxsmoShell>;
}

export function CxsmoEditsPage() {
  const looks = [
    ["01", "The after-school icon", "Gravity Puddle Jean + Orbit Ringer Tee", "Denim"],
    ["02", "Silver rain", "Starlight Moto Shell + loose denim", "Outerwear"],
    ["03", "Soft authority", "Signal Check Overshirt + the long break", "Tailoring"],
  ];
  return <CxsmoShell><section className="cxsmo-edits-hero"><div><p className="section-label">Fit edits / issue 01</p><h1>Wear it<br /><em>your loud.</em></h1><p>Three fictional styling stories designed around proportion, texture, and a small piece of chrome.</p></div><img src={heroImage} alt="CXSmo campaign group in layered streetwear" /></section><section className="cxsmo-look-grid">{looks.map(([number, title, pieces, category]) => <article key={number}><div><span>{number}</span><i>✦</i></div><p>{category}</p><h2>{title}</h2><span>{pieces}</span><Link href="/cxsmo/shop">Shop the edit <ArrowUpRight size={15} /></Link></article>)}</section><section className="cxsmo-style-rule"><p>THE RULE</p><h2>One oversized shape.<br />One close shape.<br /><em>One memory.</em></h2></section></CxsmoShell>;
}

export function CxsmoSupportPage() {
  const [open, setOpen] = useState("fit");
  const items = [
    ["fit", "Finding your fit", "Product pages demonstrate a fit-guide entry point. Confirmed garment measurements would be supplied by a live retailer."],
    ["shipping", "Shipping information", "This concept includes a shipping-request preview in the bag. It does not promise delivery windows or transmit an address."],
    ["returns", "Returns and exchanges", "A live policy requires retailer-approved conditions. This portfolio experience intentionally does not invent terms."],
    ["contact", "Contact the studio", "A production build can connect a protected support channel. No customer messages are collected here."],
  ];
  return <CxsmoShell><section className="cxsmo-page-intro cxsmo-page-intro--compact"><p className="section-label">Information desk</p><h1><TextReveal text="Need a" /><br /><em>little clarity?</em></h1><p>Product and service information should feel as considered as the clothes.</p></section><section className="cxsmo-info-list">{items.map(([id, title, body], index) => <article className={open === id ? "is-open" : ""} key={id}><button aria-expanded={open === id} onClick={() => setOpen(open === id ? "" : id)}><span>0{index + 1}</span><b>{title}</b><Plus size={20} /></button><AnimatePresence>{open === id && <motion.div className="cxsmo-info-answer" initial={{ height: 0, opacity: 0, y: -8 }} animate={{ height: "auto", opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: .25, ease }}><p>{body}</p></motion.div>}</AnimatePresence></article>)}</section></CxsmoShell>;
}

export function CxsmoAccountPage() {
  const { savedIds } = useCxsmoDemo();
  const saved = cxsmoProducts.filter((product) => savedIds.includes(product.id));
  return <CxsmoShell><section className="cxsmo-account"><div><p className="section-label">Your frequency</p><h1>Saved<br /><em>for later.</em></h1><p>Saved product states are stored in this browser for the purpose of this demonstration. No account or contact data is created.</p></div><aside><span>Portfolio account</span><b>0 connected orders</b><p>Sign-in, purchase history, and real customer details are intentionally not represented.</p></aside></section><section className="cxsmo-saved-grid">{saved.length ? saved.map((product, index) => <ProductCard product={product} order={`0${index + 1}`} key={product.id} />) : <div className="cxsmo-empty-state"><Heart size={24} /><h2>Your save list is clear.</h2><p>Tap the heart on a C✦SMO object to keep it here.</p><Link className="cxsmo-button" href="/cxsmo/shop">Browse the drop <ArrowDownRight size={16} /></Link></div>}</section></CxsmoShell>;
}

export function CxsmoBagPage() {
  const { bag, removeFromBag, clearBag } = useCxsmoDemo();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [staged, setStaged] = useState(false);
  const products = bag.map((line) => ({ ...line, product: getCxsmoProduct(line.productId) }));
  const total = products.reduce((sum, line) => sum + line.product.price, 0);
  return <CxsmoShell><section className="cxsmo-bag"><div className="cxsmo-bag__title"><p className="section-label">Your bag</p><h1>{bag.length ? <>Selected<br /><em>with intent.</em></> : <>Nothing<br /><em>in orbit.</em></>}</h1></div>{bag.length ? <div className="cxsmo-bag__lines">{products.map((line, index) => <article key={`${line.productId}-${index}`}><div><img src={line.product.image} alt="" /><span>{line.product.category}</span></div><div><h2>{line.product.name}</h2><p>{line.product.color} / Size {line.size}</p><b>{formatCxsmoPrice(line.product.price)}</b></div><button aria-label={`Remove ${line.product.name}`} onClick={() => removeFromBag(index)}><X size={18} /></button></article>)}</div> : <div className="cxsmo-empty-state cxsmo-empty-state--bag"><ShoppingBag size={24} /><h2>The bag is waiting.</h2><p>Find a future wardrobe object in the current C✦SMO drop.</p><Link className="cxsmo-button" href="/cxsmo/shop">Shop C✦SMO <ArrowDownRight size={16} /></Link></div>}</section>{bag.length > 0 && <section className="cxsmo-bag-summary"><div><span>Portfolio sample total</span><b>{formatCxsmoPrice(total)}</b></div><p>Pricing is fictional and shown to demonstrate product and order-summary hierarchy only.</p><div className="cxsmo-bag-summary__actions"><button className="cxsmo-button" onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? "Close request" : "Add order info"} <ArrowUpRight size={16} /></button><button className="cxsmo-text-button" onClick={clearBag}><Minus size={15} /> Clear bag</button></div>{detailsOpen && <form className="cxsmo-request-form" onSubmit={(event) => { event.preventDefault(); setStaged(true); }}><label>Name <input required placeholder="Your name" /></label><label>Email <input required type="email" placeholder="you@example.com" /></label><label>Destination <input required placeholder="City and country" /></label><label>Order note <input placeholder="Any sizing or delivery note" /></label><button type="submit">{staged ? "Request preview staged" : "Stage request preview"} <PackageCheck size={16} /></button><small>This form stays in the browser and sends no order, address, or payment information.</small></form>}</section>}</CxsmoShell>;
}
