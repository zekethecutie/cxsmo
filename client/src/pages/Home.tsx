import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowDownRight, ArrowUpRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PortfolioCheckout } from "@/components/PortfolioCheckout";

type Product = {
  id: string;
  number: string;
  name: string;
  type: string;
  shade: string;
  price: number;
  image: string;
  description: string;
  details: string[];
};

const products: Product[] = [
  { id: "line-01", number: "01", name: "Line Tee", type: "Bonded jersey", shade: "Porcelain", price: 68, image: "/manus-storage/kinform-structured-tee_fd877bd2.png", description: "A structured daily tee with a quiet technical hand and an easy, architectural fall.", details: ["Bonded micro jersey", "Relaxed structure", "Clean bound neckline"] },
  { id: "aero-02", number: "02", name: "Aero Shell", type: "Micro ripstop", shade: "Graphite", price: 198, image: "/manus-storage/kinform-aero-shell-transparent_890111a4.png", description: "A light outer layer designed to hold a clean silhouette while moving through changing conditions.", details: ["Micro ripstop shell", "Concealed snap closure", "Curved hem construction"] },
  { id: "form-03", number: "03", name: "Form Overshirt", type: "Cotton nylon twill", shade: "Faded leaf", price: 156, image: "/manus-storage/kinform-form-overshirt-transparent_c4924b0d.png", description: "A soft utility layer built with measured volume, crisp texture, and a calm, boxy proportion.", details: ["Crisp twill finish", "Concealed placket", "Low profile chest pocket"] },
  { id: "arc-04", number: "04", name: "Arc Trouser", type: "Stretch woven", shade: "Charcoal", price: 174, image: "/manus-storage/kinform-arc-trouser-transparent_19735ece.png", description: "A relaxed technical trouser with a soft front pleat and a subtle taper for the space between work and movement.", details: ["Stretch woven fabric", "Relaxed tapered leg", "Minimal rear welt pocket"] },
];

const smoothEase: [number, number, number, number] = [0.23, 1, 0.32, 1];
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.35 }, transition: { duration: 0.8, ease: smoothEase } };

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function Wordmark() {
  return <span className="kinform-wordmark" aria-label="KINFORM"><i /><b>KINFORM</b></span>;
}

function MaterialHalo({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) { setReady(false); return; }
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const vertexSource = "attribute vec2 p; varying vec2 uv; void main(){ uv=p*.5+.5; gl_Position=vec4(p,0.,1.); }";
    const fragmentSource = "precision mediump float; varying vec2 uv; uniform vec2 r; uniform vec2 m; uniform float t; float ring(vec2 p,float a){return smoothstep(.09,.01,abs(length(p)-a));} void main(){vec2 p=uv-.5; p.x*=r.x/r.y; vec2 q=m-.5; q.x*=r.x/r.y; float glow=1.-smoothstep(0.,1.25,length(p-q)); float wave=ring(p+vec2(sin(t*.0005)*.07,cos(t*.0004)*.04),.34)+ring(p*1.4,.34)*.34; float grid=sin((p.x+p.y)*17.+t*.0005)*.5+.5; vec3 base=vec3(.09,.10,.09); vec3 moss=vec3(.47,.54,.40); vec3 fog=vec3(.82,.84,.79); vec3 col=base+moss*glow*.75+fog*wave*.24+moss*grid*.05; gl_FragColor=vec4(col,1.);}";
    const compile = (type: number, source: string) => { const shader = gl.createShader(type); if (!shader) return null; gl.shaderSource(shader, source); gl.compileShader(shader); return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null; };
    const vs = compile(gl.VERTEX_SHADER, vertexSource); const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return;
    const program = gl.createProgram(); if (!program) return;
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    const buffer = gl.createBuffer(); if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p"); const resolution = gl.getUniformLocation(program, "r"); const mouse = gl.getUniformLocation(program, "m"); const time = gl.getUniformLocation(program, "t");
    const resize = () => { const box = canvas.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio || 1, 1.5); canvas.width = Math.max(1, box.width * ratio); canvas.height = Math.max(1, box.height * ratio); gl.viewport(0, 0, canvas.width, canvas.height); };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    let frame = 0; let active = true;
    const paint = (now: number) => { if (!active) return; gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0); gl.uniform2f(resolution, canvas.width, canvas.height); gl.uniform2f(mouse, pointerRef.current.x, pointerRef.current.y); gl.uniform1f(time, now); gl.drawArrays(gl.TRIANGLES, 0, 6); frame = requestAnimationFrame(paint); };
    setReady(true); frame = requestAnimationFrame(paint);
    return () => { active = false; cancelAnimationFrame(frame); observer.disconnect(); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); };
  }, [reducedMotion]);

  return <div className="kinform-halo" data-ready={ready ? "true" : "false"} onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); pointerRef.current = { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height }; }}><canvas ref={canvasRef} /><span className="kinform-halo__fallback" /></div>;
}

function ProductDetail({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  const [size, setSize] = useState("M");
  return <motion.div className="detail-overlay" role="dialog" aria-modal="true" aria-label={`${product.name} product detail`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.aside className="detail-sheet" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 36 }} transition={{ duration: 0.45, ease: smoothEase }} onClick={(event) => event.stopPropagation()}><button autoFocus className="sheet-close" onClick={onClose} aria-label="Close product detail"><X size={18} /></button><div className="detail-sheet__visual"><img src={product.image} alt={product.name} /></div><div className="detail-sheet__content"><p className="eyebrow">Object {product.number}</p><div className="detail-sheet__title"><h2>{product.name}</h2><strong>${product.price}</strong></div><p className="detail-sheet__description">{product.description}</p><div className="size-row"><span>Size <b>{size}</b></span><div>{["XS", "S", "M", "L", "XL"].map((item) => <button className={size === item ? "active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></div><div className="detail-points">{product.details.map((detail, index) => <p key={detail}><i>0{index + 1}</i>{detail}</p>)}</div><button className="kinform-button kinform-button--dark" onClick={onAdd}>Add to bag <ArrowUpRight size={16} /></button><small>Fictional portfolio product. No payment is collected.</small></div></motion.aside></motion.div>;
}

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [bag, setBag] = useState<Product[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [morph, setMorph] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => { if (reducedMotion) return; const lenis = new Lenis({ duration: 1.12, lerp: 0.09, smoothWheel: true }); let frame = 0; const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf); return () => { cancelAnimationFrame(frame); lenis.destroy(); }; }, [reducedMotion]);
  const addToBag = (product: Product) => { setBag((items) => [...items, product]); setDetailProduct(null); setBagOpen(true); };

  return <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}><main className="kinform-page" id="top"><div className="portfolio-note">Fictional fashion commerce concept for portfolio presentation</div><header className="kinform-header"><a href="/kinform"><Wordmark /></a><nav><a href="/kinform/collection">Collection</a><a href="/kinform/inventory">Inventory</a><a href="/kinform/journal">Journal</a><a href="/kinform/support">Support</a><a href="/kinform/admin">Admin demo</a></nav><a className="bag-trigger" href="/kinform/bag"><ShoppingBag size={15} />Bag <b>{bag.length}</b></a></header>

    <section className="kinform-hero"><div className="hero-grain" /><motion.div className="kinform-hero__copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: smoothEase }}><p className="eyebrow">Collection one. Spring transit.</p><h1>Clothes for<br /><em>the way through.</em></h1><p className="hero-summary">Considered layers for long days, short connections, and every unplanned turn in between.</p><div className="hero-actions"><a href="/kinform/collection" className="kinform-button kinform-button--dark">Explore objects <ArrowDownRight size={16} /></a><a className="text-link" href="/kinform/inventory">View availability <ArrowUpRight size={15} /></a></div></motion.div><div className="kinform-hero__object" onPointerEnter={() => setMorph(true)} onPointerLeave={() => setMorph(false)}><MaterialHalo reducedMotion={reducedMotion} /><motion.div className={`garment-stage ${morph ? "garment-stage--morph" : ""}`} animate={{ rotate: morph ? -3 : 2, y: morph ? -8 : 0 }} transition={{ duration: 0.8, ease: smoothEase }}><AnimatePresence mode="wait"><motion.img key={activeProduct.id} src={activeProduct.image} alt={activeProduct.name} initial={{ opacity: 0, scale: .93, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.05, y: -18 }} transition={{ duration: .55, ease: smoothEase }} /></AnimatePresence></motion.div><motion.div layout className="object-annotation" transition={{ type: "spring", stiffness: 310, damping: 28 }}><span>Selected object</span><AnimatePresence mode="wait"><motion.b key={activeProduct.id} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .2 }}>{activeProduct.number} {activeProduct.name}</motion.b></AnimatePresence></motion.div></div><div className="hero-index"><span>Manila to anywhere</span><span>01</span></div></section>

    <section className="kinform-route-launchpad" aria-label="Explore the KINFORM portfolio"><div><p className="eyebrow">Explore the system</p><h2>Every route,<br />in reach.</h2><p>Move through the storefront, availability board, editorial layer, support pattern, personal edit, bag, and the portfolio-only owner console.</p></div><nav><a href="/kinform/collection"><span>01</span><b>Collection</b><ArrowUpRight size={16} /></a><a href="/kinform/inventory"><span>02</span><b>Availability</b><ArrowUpRight size={16} /></a><a href="/kinform/journal"><span>03</span><b>Journal</b><ArrowUpRight size={16} /></a><a href="/kinform/support"><span>04</span><b>Support</b><ArrowUpRight size={16} /></a><a href="/kinform/account"><span>05</span><b>Saved objects</b><ArrowUpRight size={16} /></a><a href="/kinform/bag"><span>06</span><b>Bag</b><ArrowUpRight size={16} /></a><a href="/kinform/admin"><span>07</span><b>Admin demo</b><ArrowUpRight size={16} /></a></nav></section>

    <div className="kinform-ticker"><div><span>Soft structure</span><i /> <span>Constant movement</span><i /> <span>Made for transit</span><i /> <span>Soft structure</span><i /> <span>Constant movement</span><i /> <span>Made for transit</span><i /></div></div>

    <section className="object-selector" id="collection"><motion.div {...rise}><p className="eyebrow">The first four</p><h2>Objects with a<br />reason to exist.</h2></motion.div><motion.p className="object-selector__intro" {...rise} transition={{ ...rise.transition, delay: .08 }}>Each piece is fictional by design, built here to demonstrate a complete fashion language from product render to purchase interaction.</motion.p><div className="object-grid">{products.map((product, index) => <motion.button className={`object-card ${activeProduct.id === product.id ? "object-card--active" : ""}`} onClick={() => setActiveProduct(product)} onDoubleClick={() => setDetailProduct(product)} key={product.id} {...rise} transition={{ ...rise.transition, delay: index * .07 }}><span className="object-card__number">{product.number}</span><img src={product.image} alt={product.name} /><span className="object-card__meta"><b>{product.name}</b><small>{product.shade}</small></span><span className="object-card__action">Open <ArrowUpRight size={14} /></span></motion.button>)}</div></section>

    <section className="kinform-system" id="system"><motion.div className="system-copy" {...rise}><p className="eyebrow">A quieter utility</p><h2>Less to<br />think about.</h2><p>Functional clothing does not need to announce itself. KINFORM uses volume, texture, and careful joining to make the day feel less complicated.</p><a className="text-link" href="#journal">Read the field note <ArrowDownRight size={15} /></a></motion.div><motion.div className="system-board" {...rise} transition={{ ...rise.transition, delay: .1 }}><div className="system-board__tile system-board__tile--a"><span>01</span><b>Line<br />control</b></div><div className="system-board__tile system-board__tile--b"><img src={products[2].image} alt="Form Overshirt product study" /></div><div className="system-board__tile system-board__tile--c"><span>02</span><b>Soft<br />utility</b></div><div className="system-board__tile system-board__tile--d"><p>Built as a composed visual system, not a collection of generic ecommerce sections.</p></div></motion.div></section>

    <section className="feature-object"><div className="feature-object__canvas"><MaterialHalo reducedMotion={reducedMotion} /><motion.img src={products[1].image} alt="Aero Shell floating garment" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease: smoothEase }} /></div><motion.div className="feature-object__copy" {...rise}><p className="eyebrow">Object 02. Aero Shell</p><h2>Air, held<br />in shape.</h2><p>One responsive object study gives the storefront a place to breathe. The effect is original WebGL and has a static fallback for motion sensitive or unsupported devices.</p><button className="kinform-button kinform-button--light" onClick={() => setDetailProduct(products[1])}>Study the shell <ArrowUpRight size={16} /></button></motion.div></section>

    <section className="campaign-panel"><motion.figure {...rise}><img src="/manus-storage/kinform-campaign-anchor_7fc7d378.jpg" alt="KINFORM campaign model wearing a porcelain tee in a transit terminal" /><figcaption>Campaign study 001. Passage.</figcaption></motion.figure><motion.div className="campaign-panel__copy" {...rise} transition={{ ...rise.transition, delay: .1 }}><p className="eyebrow">A field study</p><h2>Made for the<br />in between.</h2><p>The visual language is intentionally quiet. Product texture, soft light, and a single moving figure do more than a crowded campaign can.</p><button className="text-link" onClick={() => setDetailProduct(products[0])}>Explore the Line Tee <ArrowUpRight size={15} /></button></motion.div></section>

    <section className="journal" id="journal"><motion.div {...rise}><p className="eyebrow">Journal 001</p><h2>Between a place<br />and the next.</h2></motion.div><motion.div className="journal__body" {...rise} transition={{ ...rise.transition, delay: .1 }}><p>Good clothing adapts before it asks for attention. The first KINFORM collection is an experiment in gentle structure, fewer decisions, and objects that make a quiet case for being kept.</p><div><span>Fictional brand study</span><span>Designed for portfolio use</span></div></motion.div></section>

    <footer className="kinform-footer"><Wordmark /><p>Fictional digital commerce concept.<br />Designed as a portfolio demonstration.</p><nav><a href="#top">Top</a><a href="#collection">Collection</a><a href="#journal">Journal</a></nav></footer>

    <AnimatePresence>{detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} onAdd={() => addToBag(detailProduct)} />}</AnimatePresence>
    <AnimatePresence>{bagOpen && <motion.div className="bag-overlay" role="dialog" aria-modal="true" aria-label="Selected KINFORM bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBagOpen(false)}><motion.aside initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 36 }} transition={{ duration: .42, ease: smoothEase }} onClick={(event) => event.stopPropagation()}><button autoFocus className="sheet-close" onClick={() => setBagOpen(false)} aria-label="Close bag"><X size={18} /></button><p className="eyebrow">Your edit</p><h2>Bag <small>{bag.length}</small></h2>{bag.length ? <div className="bag-lines">{bag.map((product, index) => <div key={`${product.id}-${index}`}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.shade}</small></span><strong>${product.price}</strong></div>)}</div> : <div className="bag-empty"><i /><p>Nothing selected yet.</p><button onClick={() => setBagOpen(false)}>Explore the collection <ArrowDownRight size={15} /></button></div>}<div className="bag-bottom"><p>Portfolio concept only. No live payment or shipping applies.</p>{bag.length > 0 && <><button className="kinform-button kinform-button--dark" onClick={() => { setBagOpen(false); setCheckoutOpen(true); }}>Review demo checkout <ArrowUpRight size={16} /></button><button className="bag-clear" onClick={() => setBag([])}>Clear selection</button></>}</div></motion.aside></motion.div>}</AnimatePresence>
    <AnimatePresence>{checkoutOpen && <PortfolioCheckout items={bag} onClose={() => { setCheckoutOpen(false); setBagOpen(true); }} />}</AnimatePresence>
  </main></MotionConfig>;
}
