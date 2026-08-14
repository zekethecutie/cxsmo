import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MoveDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";
import { CxsmoShell } from "./CxsmoStorefront";
import { CxsmoCommunityEmptyState, CxsmoFitCarousel } from "@/components/CxsmoFitCarousel";
import { cxsmoProducts, formatCxsmoPrice } from "@/lib/cxsmo";
import { resolveCxsmoProduct, useCxsmoPublishedContent } from "@/lib/cxsmoContent";
import "./cxsmo-poster-home.css";
import "./cxsmo-transparent-editorial.css";
import "./cxsmo-poster-polish.css";

const getProduct = (id: string) => cxsmoProducts.find((product) => product.id === id) ?? cxsmoProducts[0];

const storyObject = getProduct("signal-04");

export function CxsmoPosterHome() {
  const { hero, lookbook, productOverrides } = useCxsmoPublishedContent();
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const heroObjectY = useTransform(heroScroll, [0, 1], ["0%", "-14%"]);
  const heroObjectRotate = useTransform(heroScroll, [0, 1], [-4, -1]);
  const heroTypeY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroWordX = useTransform(heroScroll, [0, 1], ["0%", "2%"]);
  const heroWordY = useTransform(heroScroll, [0, 1], ["0%", "48%"]);
  const heroBarcodeY = useTransform(heroScroll, [0, 1], ["0%", "44%"]);
  const posterX = useTransform(scrollYProgress, [0, 1], ["-25%", "28%"]);
  const redX = useTransform(scrollYProgress, [0, 1], ["38%", "-30%"]);
  const heroJean = resolveCxsmoProduct(getProduct("gravity-01"), productOverrides["gravity-01"]);
  const resolvedStoryObject = resolveCxsmoProduct(storyObject, productOverrides[storyObject.id]);
  const looks = lookbook.map((look) => ({ ...look, product: resolveCxsmoProduct(getProduct(look.productId), productOverrides[look.productId]) }));
  const marqueeObjects = cxsmoProducts.slice(0, 8).map((product) => resolveCxsmoProduct(product, productOverrides[product.id]));

  return <CxsmoShell><div className="cxsmo-poster-home">
    <section ref={heroRef} className="poster-hero">
      <div className="poster-hero__pixel-lattice" aria-hidden="true" />
      <motion.div className="poster-hero__backword" style={{ x: heroWordX, y: heroWordY }}>C✦SMO</motion.div>
      <div className="poster-hero__red-frame" aria-hidden="true" />
      <motion.div className="poster-hero__object-layer poster-hero__object-layer--campaign" style={{ y: heroObjectY, rotate: heroObjectRotate }}>
        <img src={hero.assetUrl} alt={hero.assetAlt} />
      </motion.div>
      <div className="poster-hero__gradient-star" aria-hidden="true">✦</div>
      <motion.div className="poster-hero__type" style={{ y: heroTypeY }}><p>{hero.eyebrow}</p><h1>{hero.lineOne}<br /><span>{hero.emphasis}</span><br />{hero.lineThree}</h1><div><Link href="/cxsmo/shop" className="poster-button">Shop the drop <ArrowDownRight size={17} /></Link><Link href="/cxsmo/edits" className="poster-text-link">Open fit edits <ArrowUpRight size={15} /></Link></div></motion.div>
      <aside className="poster-hero__object"><span>{hero.objectLabel}</span><b>{hero.objectName}</b><small>{hero.objectPriceNote}</small><i>✦</i></aside>
      <motion.div className="poster-hero__barcode" style={{ y: heroBarcodeY }}><span>CSX-2002</span><b>01—12</b></motion.div><div className="poster-hero__scroll"><MoveDown size={15} /><span>Scroll for the fit signal</span></div>
    </section>

    <section className="poster-entry-flow"><div><p className="section-label">C✦SMO / 01</p><h2>A drop is not a grid.<br /><em>It is a way in.</em></h2><p>Start with the campaign, follow a shape that catches your eye, then let the object page, fit edit, local bag, and studio layer explain how the system would work.</p></div><Link href="/cxsmo/shop" className="poster-button">Browse every object <ArrowDownRight size={17} /></Link></section>
    <section className="poster-product-conveyor" aria-label="Current C✦SMO product objects"><div className="poster-product-conveyor__track">{[...marqueeObjects, ...marqueeObjects].map((product, index) => <Link href={`/cxsmo/products/${product.id}`} className="poster-product-conveyor__item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><span>{product.drop} / {product.name}</span><b>{product.category}</b></Link>)}</div></section>

    <section className="poster-marquee" aria-label="C✦SMO style statement"><div><span>BIG FIT / SMALL DETAIL / RED ALERT / BIG FIT / SMALL DETAIL / RED ALERT / </span><span>BIG FIT / SMALL DETAIL / RED ALERT / BIG FIT / SMALL DETAIL / RED ALERT / </span></div></section>

    <section className="poster-story" ref={storyRef}><motion.div className="poster-story__ghost" style={{ x: posterX }}>STYLE<br />IS A<br />SIGNAL</motion.div><motion.div className="poster-story__redword" style={{ x: redX }}>LOUD<br />ENOUGH</motion.div><div className="poster-story__copy"><p className="poster-kicker"><Sparkles size={14} /> THE C✦SMO FORMULA</p><h2>Loose where<br />the world pulls.<br /><em>Close where it counts.</em></h2><p>Oversized denim, fitted graphic layers, a chrome interruption. The first C✦SMO drop is built as a style world—and as a clear fashion-commerce story.</p><Link href="/cxsmo/products/gravity-01">Study object 01 <ArrowUpRight size={15} /></Link></div><div className="poster-story__image poster-story__image--cutout"><div><img src={resolvedStoryObject.image} alt={`Transparent ${resolvedStoryObject.name} portfolio product layer`} /></div><span>STYLE FRAME / 01</span></div></section>

    <section className="poster-lookbook"><div className="poster-section-head"><p>SCROLL THE LOOKBOOK</p><h2>WORN IN<br /><em>MOTION.</em></h2><span>03 object-led styling chapters / 12 portfolio objects</span></div><div className="poster-lookbook__grid">{looks.map((look, index) => <motion.article className={`poster-lookbook__card poster-lookbook__card--${look.tone}`} key={look.tag} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: index * .08 }}><div data-cxsmo-hover-sound="zoom" className="poster-lookbook__image"><span className="poster-lookbook__stage-label">{look.product.drop}</span><img src={look.product.image} alt={`Transparent ${look.product.name} product layer for ${look.title}`} /><i>✦</i></div><p>{look.tag}</p><h3>{look.title}</h3><span>{look.note}</span><Link href={`/cxsmo/products/${look.product.id}`}>Shop the formula <ArrowUpRight size={14} /></Link></motion.article>)}</div></section>

    <CxsmoFitCarousel /><section className="poster-catalogue-pull"><div><p>THE DROP HAS A PULSE</p><h2>Twelve objects.<br /><em>One visual temperature.</em></h2></div><div className="poster-catalogue-pull__actions"><Link href="/cxsmo/shop" className="poster-button poster-button--bone">Enter catalogue <ArrowUpRight size={17} /></Link><span>Denim / graphics / outerwear / accessories / footwear / beauty / lifestyle</span></div></section><CxsmoCommunityEmptyState />
  </div></CxsmoShell>;
}
