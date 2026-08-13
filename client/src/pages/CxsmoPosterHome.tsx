import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MoveDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";
import { CxsmoShell } from "./CxsmoStorefront";
import { cxsmoProducts, formatCxsmoPrice } from "@/lib/cxsmo";
import "./cxsmo-poster-home.css";

const heroImage = "/manus-storage/cxsmo-hero-campaign_c252324b.jpg";

export function CxsmoPosterHome() {
  const storyRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const posterX = useTransform(scrollYProgress, [0, 1], ["-11%", "14%"]);
  const redX = useTransform(scrollYProgress, [0, 1], ["18%", "-12%"]);
  const firstProduct = cxsmoProducts[0];
  const looks = [
    { tag: "LOOP 01", title: "FALLEN / FITTED", note: "Gravity jean · Orbit tee", position: "left 18%" },
    { tag: "LOOP 02", title: "CHROME WEATHER", note: "Starlight shell · Tread sneaker", position: "center" },
    { tag: "LOOP 03", title: "SIGNAL CHECK", note: "Signal overshirt · Transit bag", position: "right 18%" },
  ];

  return <CxsmoShell><div className="cxsmo-poster-home"><section className="poster-hero" onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - box.left) / box.width - .5); pointerY.set((event.clientY - box.top) / box.height - .5); }}><motion.div className="poster-hero__backword" style={{ x: useTransform(pointerX, [-.5,.5], [-18,18]), y: useTransform(pointerY, [-.5,.5], [-10,10]) }}>C✦SMO</motion.div><div className="poster-hero__red-frame" /><motion.div className="poster-hero__soft-image" style={{ x: useTransform(pointerX, [-.5,.5], [20,-20]), y: useTransform(pointerY, [-.5,.5], [12,-12]) }}><img src={heroImage} alt="Original C✦SMO campaign models in layered streetwear" /></motion.div><motion.div className="poster-hero__focus-image" style={{ x: useTransform(pointerX, [-.5,.5], [-12,12]), y: useTransform(pointerY, [-.5,.5], [-8,8]) }}><img src={heroImage} alt="" /></motion.div><div className="poster-hero__type"><p>DROP 01 / DRESS THE AFTER-IMAGE</p><h1>NO<br /><span>SOFT</span><br />LANDING.</h1><div><Link href="/cxsmo/shop" className="poster-button">Shop the drop <ArrowDownRight size={17} /></Link><Link href="/cxsmo/edits" className="poster-text-link">Open fit edits <ArrowUpRight size={15} /></Link></div></div><aside className="poster-hero__object"><span>OBJECT {firstProduct.drop}</span><b>{firstProduct.name}</b><small>{formatCxsmoPrice(firstProduct.price)} / fictional portfolio price</small><i>✦</i></aside><div className="poster-hero__barcode"><span>CSX-2002</span><i /><b>01—08</b></div><div className="poster-hero__scroll"><MoveDown size={15} /><span>Scroll for the fit signal</span></div></section>

  <section className="poster-marquee" aria-label="CXSmo style statement"><div><span>BIG FIT / SMALL DETAIL / RED ALERT / BIG FIT / SMALL DETAIL / RED ALERT / </span><span>BIG FIT / SMALL DETAIL / RED ALERT / BIG FIT / SMALL DETAIL / RED ALERT / </span></div></section>

  <section className="poster-story" ref={storyRef}><motion.div className="poster-story__ghost" style={{ x: posterX }}>STYLE<br />IS A<br />SIGNAL</motion.div><motion.div className="poster-story__redword" style={{ x: redX }}>LOUD<br />ENOUGH</motion.div><div className="poster-story__copy"><p className="poster-kicker"><Sparkles size={14} /> THE C✦SMO FORMULA</p><h2>Loose where<br />the world pulls.<br /><em>Close where it counts.</em></h2><p>Oversized denim, fitted graphic layers, a chrome interruption. The first C✦SMO drop is built as a style world—and as a clear fashion-commerce story.</p><Link href="/cxsmo/products/gravity-01">Study object 01 <ArrowUpRight size={15} /></Link></div><div className="poster-story__image"><div><img src={heroImage} alt="Streetwear fit in CXSmo editorial campaign" /></div><span>STYLE FRAME / 01</span></div></section>

  <section className="poster-lookbook"><div className="poster-section-head"><p>SCROLL THE LOOKBOOK</p><h2>WORN IN<br /><em>MOTION.</em></h2><span>03 fictional styling chapters / 08 portfolio objects</span></div><div className="poster-lookbook__grid">{looks.map((look, index) => <motion.article key={look.tag} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: index * .08 }}><div className="poster-lookbook__image"><img src={heroImage} alt="C✦SMO campaign fit composition" style={{ objectPosition: look.position }} /><i>✦</i></div><p>{look.tag}</p><h3>{look.title}</h3><span>{look.note}</span><Link href="/cxsmo/shop">Shop the formula <ArrowUpRight size={14} /></Link></motion.article>)}</div></section>

  <section className="poster-catalogue-pull"><div><p>THE DROP HAS A PULSE</p><h2>Eight objects.<br /><em>One visual temperature.</em></h2></div><div className="poster-catalogue-pull__actions"><Link href="/cxsmo/shop" className="poster-button poster-button--bone">Enter catalogue <ArrowUpRight size={17} /></Link><span>Denim / graphics / outerwear / accessories / footwear / beauty / lifestyle</span></div></section></div></CxsmoShell>;
}
