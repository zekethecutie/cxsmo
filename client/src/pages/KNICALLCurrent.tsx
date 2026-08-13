import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import type { Product, ProductVariant } from "@shared/commerce/types";

const assets = {
  apparelStudy: "/manus-storage/2d17320ab5a2f8d30ac4f501b1e9856247ea78fa_5971fd32.png",
  campaignOne: "/manus-storage/basketball-campaign_25f68b92.jpg",
  athleteStudy: "/manus-storage/basketball-athlete_fd96ca68.jpg",
  atmosphere: "/manus-storage/kniall-light-material-atmosphere_b0819876.jpg",
};

const smoothEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.72, ease: smoothEase },
};

function formatMoney(amount: string, currency: string) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(amount));
}

function Mark() {
  return <span className="kniall-mark" role="img" aria-label="KNIALL two peak mark" />;
}

function MaterialField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    let frame = 0;
    let active = true;
    const vertexSource = `attribute vec2 aPosition; varying vec2 vUv; void main() { vUv = aPosition * .5 + .5; gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentSource = `precision mediump float;
      varying vec2 vUv; uniform vec2 uResolution; uniform vec2 uPointer; uniform float uTime;
      float segment(vec2 p, vec2 a, vec2 b) { vec2 pa = p-a; vec2 ba = b-a; float h = clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0); return length(pa-ba*h); }
      float mark(vec2 p) { float d = min(min(segment(p,vec2(-.78,-.24),vec2(-.3,.34)),segment(p,vec2(-.3,.34),vec2(.04,-.02))),min(segment(p,vec2(.04,-.02),vec2(.43,.52)),segment(p,vec2(.43,.52),vec2(.86,-.22)))); return smoothstep(.052,.006,d); }
      void main() { vec2 uv = vUv-.5; uv.x *= uResolution.x/uResolution.y; vec2 point = uPointer-.5; point.x *= uResolution.x/uResolution.y; float drift = sin(uTime*.00055)*.06; uv += vec2(drift,cos(uTime*.00043)*.03); float glow = 1.0-smoothstep(.0,1.05,length(uv-point)); float core = mark(uv*1.15+vec2(sin(uTime*.0007)*.035,cos(uTime*.0006)*.026)); float echo = mark(uv*1.02+vec2(.08,-.06))*0.25; vec3 base = vec3(.055,.055,.052); vec3 gold = vec3(.82,.63,.17); vec3 haze = vec3(.34,.28,.15); vec3 color = base + haze*glow*.68 + gold*(core*.92+echo*.35); gl_FragColor = vec4(color,1.0); }`;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const time = gl.getUniformLocation(program, "uTime");
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    const paint = (now: number) => {
      if (!active) return;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, pointerRef.current.x, pointerRef.current.y);
      gl.uniform1f(time, now);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(paint);
    };
    setWebglReady(true);
    frame = requestAnimationFrame(paint);
    return () => { active = false; cancelAnimationFrame(frame); observer.disconnect(); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); };
  }, []);

  return <div className="material-field" onPointerMove={(event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height };
  }} data-webgl={webglReady ? "ready" : "fallback"}><canvas ref={canvasRef} aria-label="Interactive KNIALL WebGL material study" /><div className="material-field__fallback"><Mark /></div></div>;
}

function findVariant(product: Product, selected: Record<string, string>) {
  return product.variants.find((variant) =>
    product.options.every((option) => {
      const desired = selected[option.name];
      return !desired || variant.selectedOptions.some((entry) => entry.name === option.name && entry.value === desired);
    })
  ) ?? product.variants[0];
}

function ProductTile({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  const from = product.priceRange.min;
  return (
    <button className="product-tile" onClick={() => onOpen(product)}>
      <span className="product-tile__visual">
        {product.images[0] ? <img src={product.images[0].url} alt={product.images[0].altText ?? product.title} /> : <span className="product-tile__missing"><Mark /></span>}
        <span className="product-tile__open">View piece <ArrowUpRight /></span>
      </span>
      <span className="product-tile__details">
        <span>
          <strong>{product.title}</strong>
          <small>{product.productType || "Performance apparel"}</small>
        </span>
        <b>{formatMoney(from.amount, from.currencyCode)}</b>
      </span>
    </button>
  );
}

function EmptyShop() {
  return (
    <div className="empty-shop">
      <div className="empty-shop__shape"><Mark /></div>
      <div>
        <p className="section-kicker">First collection</p>
        <h3>The first release.<br />In focus.</h3>
      </div>
      <p>Performance apparel with purpose in every layer. Join KNIALL as the first collection comes into view.</p>
    </div>
  );
}

function ProductPanel({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((option) => [option.name, option.values[0] ?? ""]))
  );
  const variant = findVariant(product, selected);

  const addToBag = async () => {
    if (!variant) return;
    await addItem(variant.id, quantity);
    onClose();
  };

  return (
    <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside className="product-panel" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 36 }} transition={{ duration: 0.38, ease: smoothEase }} onClick={(event) => event.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="Close product detail"><X size={20} /></button>
        <div className="product-panel__gallery">
          {product.images.length ? product.images.slice(0, 4).map((image) => <img key={image.url} src={image.url} alt={image.altText ?? product.title} />) : <div className="product-panel__placeholder"><Mark /></div>}
        </div>
        <div className="product-panel__content">
          <p className="section-kicker">{product.productType || "KNIALL apparel"}</p>
          <div className="product-panel__title"><h2>{product.title}</h2><span>{variant ? formatMoney(variant.price.amount, variant.price.currencyCode) : ""}</span></div>
          <p className="product-panel__description">{product.description || "Product details will be added with KNIALL’s approved fit, fabrication, care, and shipping information."}</p>
          {product.options.map((option) => <div className="option-group" key={option.name}>
            <span>{option.name}</span>
            <div>{option.values.map((value) => <button key={value} className={selected[option.name] === value ? "selected" : ""} onClick={() => setSelected((current) => ({ ...current, [option.name]: value }))}>{value}</button>)}</div>
          </div>)}
          <details className="product-detail" open><summary>Product and fit <ChevronDown size={15} /></summary><p>Fit notes, garment measurements, composition, and care instructions will live here from the approved KNIALL product record.</p></details>
          <details className="product-detail"><summary>Delivery and returns <ChevronDown size={15} /></summary><p>Clear shipping and return information will be published before launch.</p></details>
          <div className="product-panel__purchase">
            <div className="quantity-control"><button onClick={() => setQuantity((count) => Math.max(1, count - 1))} aria-label="Reduce quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity((count) => count + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div>
            <button className="button button--ink" disabled={!variant?.availableForSale || loading} onClick={addToBag}>{loading ? "Adding" : variant?.availableForSale ? "Add to bag" : "Unavailable"}<ArrowRight size={16} /></button>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function CartPanel() {
  const { cart, closeCart, isOpen, itemCount, loading, removeItem, updateQuantity, proceedToCheckout } = useCart();
  return <AnimatePresence>{isOpen && <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart}>
    <motion.aside className="cart-panel" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 36 }} transition={{ duration: 0.38, ease: smoothEase }} onClick={(event) => event.stopPropagation()}>
      <div className="cart-panel__head"><div><p className="section-kicker">Your bag</p><h2>{itemCount ? `${itemCount} ${itemCount === 1 ? "piece" : "pieces"}` : "Empty"}</h2></div><button className="panel-close" onClick={closeCart} aria-label="Close bag"><X size={20} /></button></div>
      {!cart?.items.length ? <div className="cart-empty"><Mark /><p>A thoughtful first piece is waiting.</p><button className="text-button" onClick={closeCart}>Continue shopping <ArrowRight size={15} /></button></div> : <><div className="cart-lines">{cart.items.map((item) => <div className="cart-line" key={item.lineId}>{item.image ? <img src={item.image.url} alt={item.image.altText ?? item.productTitle} /> : <div className="cart-line__placeholder"><Mark /></div>}<div><strong>{item.productTitle}</strong>{item.variantTitle !== "Default Title" && <span>{item.variantTitle}</span>}<small>{formatMoney(item.unitPrice.amount, item.unitPrice.currencyCode)}</small><div className="cart-line__quantity"><button onClick={() => updateQuantity(item.lineId, item.quantity - 1)} disabled={loading} aria-label="Reduce quantity"><Minus size={12} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.lineId, item.quantity + 1)} disabled={loading} aria-label="Increase quantity"><Plus size={12} /></button></div></div><button className="cart-line__remove" onClick={() => removeItem(item.lineId)} aria-label={`Remove ${item.productTitle}`}><X size={15} /></button></div>)}</div><div className="cart-panel__bottom"><div><span>Subtotal</span><strong>{formatMoney(cart.subtotal.amount, cart.subtotal.currencyCode)}</strong></div><button className="button button--ink" onClick={proceedToCheckout} disabled={loading}>Secure checkout <ArrowRight size={16} /></button><p>Shipping and payment are completed securely with Shopify.</p></div></>}
    </motion.aside>
  </motion.div>}</AnimatePresence>;
}

export default function Home() {
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery({ first: 12 }, { retry: false });
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [heroMorph, setHeroMorph] = useState(false);
  const [catalogFallback, setCatalogFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.15 });
    let frame = 0;
    const animate = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (!isLoading || products.length) {
      setCatalogFallback(false);
      return;
    }
    const timeout = window.setTimeout(() => setCatalogFallback(true), 1800);
    return () => window.clearTimeout(timeout);
  }, [isLoading, products.length]);

  const heroStyle = useMemo(() => ({ "--pointer-x": `${pointer.x}px`, "--pointer-y": `${pointer.y}px` } as CSSProperties), [pointer]);
  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 840) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 18, y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 12 });
  };

  return <main className="storefront" onPointerMove={moveHero} style={heroStyle}>
    <header className="site-header">
      <a className="brand" href="#top"><Mark /><span>KNIALL</span></a>
      <nav className="desktop-nav"><a href="#shop">Shop</a><a href="#story">The standard</a><a href="#journal">Journal</a></nav>
      <div className="header-actions"><button className="bag-button" onClick={openCart} aria-label="Open bag"><ShoppingBag size={17} /><span>Bag</span>{itemCount > 0 && <b>{itemCount}</b>}</button><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={18} /></button></div>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div><a className="brand" href="#top" onClick={() => setMenuOpen(false)}><Mark /><span>KNIALL</span></a><button className="panel-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button></div><nav><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#story" onClick={() => setMenuOpen(false)}>The standard</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a></nav><p>Grow beyond win.</p></motion.div>}</AnimatePresence>

    <section className="hero" id="top">
      <div className="hero__backdrop" style={{ backgroundImage: `url(${assets.atmosphere})` }} />
      <motion.div className="hero__copy" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.84, ease: smoothEase }}><p className="section-kicker">Performance apparel</p><h1>For the work<br /><em>between the wins.</em></h1><p>Technical pieces for movement, training, and the quiet repetition that gets you there.</p><div className="hero__actions"><a className="button button--ink" href="#shop">Shop the first drop <ArrowRight size={16} /></a><a className="text-button" href="#story">Meet the standard <ArrowDownRight size={16} /></a></div></motion.div>
      <motion.div className={`hero-product ${heroMorph ? "hero-product--morph" : ""}`} onPointerEnter={() => setHeroMorph(true)} onPointerLeave={() => setHeroMorph(false)} initial={{ opacity: 0, scale: 0.96, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: -1 }} transition={{ duration: 1.05, delay: 0.1, ease: smoothEase }}><div className="hero-product__glow" /><span className="hero-product__morph" aria-hidden="true" /><div className="hero-product__image"><img src={assets.apparelStudy} alt="KNIALL apparel study from the supplied brand material" /></div><div className="hero-product__caption"><span>First release</span><b>Movement begins in the details.</b></div></motion.div>
      <div className="hero__footer"><span>Manila, Philippines</span><a href="#shop">Scroll to explore <ChevronRight size={15} /></a><span>01</span></div>
    </section>

    <section className="intro-band"><motion.p {...reveal}>KNIALL is building a more considered sportswear wardrobe. Clear function, quiet confidence, and a better reason to return to the work.</motion.p><motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}><Mark /></motion.div></section>
    <div className="marquee" aria-label="KNIALL brand statement"><div className="marquee__track"><span>Grow beyond win</span><Mark /><span>Built for repetition</span><Mark /><span>Performance apparel</span><Mark /><span>Grow beyond win</span><Mark /><span>Built for repetition</span><Mark /><span>Performance apparel</span><Mark /></div></div>

    <section className="shop-section" id="shop"><motion.div className="section-heading" {...reveal}><div><p className="section-kicker">The first collection</p><h2>Made to move.<br />Designed to stay.</h2></div><p>Every piece leads with product clarity. Images, fit, size, and checkout are kept close to the decision.</p></motion.div>{isLoading && !catalogFallback ? <div className="product-loading"><span /><span /><span /></div> : products.length ? <div className="product-grid">{products.map((product) => <ProductTile key={product.id} product={product} onOpen={setActiveProduct} />)}</div> : <EmptyShop />}</section>

    <section className="standard" id="story"><div className="standard__image"><img src={assets.campaignOne} alt="KNIALL basketball apparel campaign" /></div><motion.div className="standard__content" {...reveal}><p className="section-kicker">The KNIALL standard</p><h2>Product proof<br />comes first.</h2><p>Good design removes doubt. Garments should be shown honestly, described clearly, and easy to purchase on any screen.</p><div className="standard__list"><div><span>01</span><b>Fit that makes sense</b><p>Clear size guidance and useful on body reference.</p></div><div><span>02</span><b>Details worth showing</b><p>Fabric, construction, and care without the noise.</p></div><div><span>03</span><b>Checkout without friction</b><p>Fast bag states and a direct handoff to secure payment.</p></div></div></motion.div></section>

    <section className="lookbook" id="journal"><motion.div className="lookbook__heading" {...reveal}><p className="section-kicker">The field notes</p><h2>Built around<br />real movement.</h2><p>Campaign imagery, athlete stories, and future drops can live here without taking attention away from the clothes.</p><a className="text-button" href="https://www.instagram.com/kniall_official/" target="_blank" rel="noreferrer">Follow KNIALL <ArrowRight size={15} /></a></motion.div><div className="lookbook__images"><motion.figure {...reveal}><img src={assets.athleteStudy} alt="KNIALL performance apparel on an athlete" /><figcaption>Training context</figcaption></motion.figure><motion.figure {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}><img src={assets.apparelStudy} alt="KNIALL clothing product study" /><figcaption>Material and cut</figcaption></motion.figure></div></section>

    <section className="material-teaser"><MaterialField /><motion.div {...reveal}><p className="section-kicker">Material study</p><h2>Feel the<br />future fabric.</h2><p>A responsive material study derived from the KNIALL two peak mark. It gives the store one quiet moment of depth without interrupting the way to purchase.</p></motion.div></section>

    <footer className="site-footer"><div><a className="brand" href="#top"><Mark /><span>KNIALL</span></a><p>Grow beyond win.</p></div><nav><a href="#shop">Shop</a><a href="#story">The standard</a><a href="https://www.instagram.com/kniall_official/" target="_blank" rel="noreferrer">Instagram</a></nav><span>© KNIALL</span></footer>
    <AnimatePresence>{activeProduct && <ProductPanel product={activeProduct} onClose={() => setActiveProduct(null)} />}</AnimatePresence>
    <CartPanel />
  </main>;
}

function ArrowUpRight() { return <ArrowRight size={15} />; }
