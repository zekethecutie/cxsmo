import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail, X, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { CxsmoCustomCursor } from "@/components/CxsmoCustomCursor";
import { CxsmoMark } from "@/components/CxsmoMark";
import { CxsmoPromotionPopup } from "@/components/CxsmoPromotionPopup";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import { useTheme } from "@/contexts/ThemeContext";
import { defaultCxsmoPromotion } from "@/lib/cxsmoContent";
import { cxsmoProducts } from "@/lib/cxsmo";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import "./cxsmo-entry.css";
import "./cxsmo-entry-tools.css";
import "./cxsmo-entry-appearance.css";
import "./cxsmo-entry-poster.css";
import "./cxsmo-mobile-bridge-polish.css";
import "./cxsmo-entry-centered-poster.css";
import "./cxsmo-entry-iconic-poster.css";
import "./cxsmo-entry-final-tuning.css";
import "./cxsmo-entry-landing-rebuild.css";
import "./cxsmo-utility-type.css";
import "./cxsmo-mobile-native.css";

function CxsmoEntryTools() {
  const { theme, toggleThemeAt } = useTheme();
  const { enabled, toggle, play } = useCxsmoSound();
  const isDark = theme === "dark";
  const switchTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    play("theme");
    toggleThemeAt?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };

  return (
    <div className="cxsmo-entry__tools">
      <button className="cxsmo-entry__tool" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={switchTheme}>
        <i aria-hidden="true">{isDark ? "◐" : "◑"}</i><b>{isDark ? "Dark" : "Light"}</b>
      </button>
      <button className="cxsmo-entry__tool" type="button" aria-label={`${enabled ? "Mute" : "Enable"} optional interface sound`} aria-pressed={enabled} onClick={toggle}>
        {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<b>{enabled ? "Sound on" : "Sound off"}</b>
      </button>
    </div>
  );
}

function CxsmoEntryItemCarousel() {
  const reducedMotion = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const objects = cxsmoProducts.slice(0, 8);
  useEffect(() => {
    if (!api) return;
    const sync = () => setActive(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    return () => { api.off("select", sync); };
  }, [api]);
  useEffect(() => {
    if (!api || reducedMotion) return;
    const timer = window.setInterval(() => api.scrollNext(), 3400);
    return () => window.clearInterval(timer);
  }, [api, reducedMotion]);
  return <section className="cxsmo-entry__item-carousel" aria-labelledby="cxsmo-entry-items-title">
    <div className="cxsmo-entry__item-carousel-head"><div><p>DROP 01 / SELECTED OBJECTS</p><h2 id="cxsmo-entry-items-title">THE PIECES<br /><em>IN FRAME.</em></h2></div><span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(objects.length).padStart(2, "0")}</span></div>
    <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="cxsmo-entry__item-carousel-track">
      <CarouselContent className="cxsmo-entry__item-carousel-content">{objects.map((product, index) => <CarouselItem key={product.id} className="cxsmo-entry__item-slide"><Link href={`/cxsmo/products/${product.id}`}><span>0{index + 1} / {product.category}</span><div><img src={product.image} alt="" /></div><b>{product.name}</b><small>{product.color}</small><i>View object <ArrowUpRight size={13} /></i></Link></CarouselItem>)}</CarouselContent>
      <CarouselPrevious aria-label="Previous featured object" className="cxsmo-entry__item-carousel-prev" />
      <CarouselNext aria-label="Next featured object" className="cxsmo-entry__item-carousel-next" />
    </Carousel>
  </section>;
}

export function CxsmoEntryPage() {
  const reducedMotion = useReducedMotion();
  const [noticeVisible, setNoticeVisible] = useState(true);

  return (
    <main className="cxsmo-entry">
      <CxsmoCustomCursor />
      <header className="cxsmo-entry__header"><CxsmoMark className="cxsmo-entry__header-mark" inverse /><p>DROP 01 / 2026</p><CxsmoEntryTools /></header>
      <section className="cxsmo-entry__hero cxsmo-entry__hero--poster">
        <p className="cxsmo-entry__poster-kicker">C✦SMO / DIGITAL FASHION SYSTEM</p>
        <motion.p className="cxsmo-entry__signal" aria-hidden="true" animate={reducedMotion ? {} : { x: [0, 18, 0] }} transition={reducedMotion ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>DROP / OBJECT / SYSTEM / DROP / OBJECT / SYSTEM</motion.p>
        <div className="cxsmo-entry__poster-word" aria-hidden="true">C<span className="cxsmo-entry__poster-word-star" />SMO</div>
        <motion.div className="cxsmo-entry__portrait" initial={reducedMotion ? false : { opacity: 0, x: 28, rotate: 2 }} animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: [0, -7, 0], y: [0, -10, 0], rotate: [0, -1, 0] }} transition={reducedMotion ? { duration: 0 } : { opacity: { duration: .55, delay: .16 }, x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}}>
          <img src="/images/cxsmo-y2k-editorial-portrait_8aa44fe0.png" alt="C✦SMO Y2K editorial fashion portrait" />
        </motion.div>
        <div className="cxsmo-entry__copy">
          <motion.h1 aria-label="C✦SMO" initial={reducedMotion ? false : { opacity: 0, y: 42, scaleY: .84 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} transition={{ duration: .74, delay: .08, ease: [0.16, 1, .3, 1] }}>C<span className="cxsmo-entry__mark-star" aria-hidden="true" />SMO</motion.h1>
          <p className="cxsmo-entry__statement">Independent streetwear, accessories, and beauty pieces built for the after-image.</p>
          <motion.div className="cxsmo-entry__intro" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .24 }}><div><Link className="cxsmo-entry__enter" href="/cxsmo">Enter the drop <ArrowDownRight size={17} /></Link><Link className="cxsmo-entry__underlink" href="/cxsmo/admin">Studio access <ArrowUpRight size={15} /></Link></div></motion.div>
        </div>
        {noticeVisible && <motion.aside className="cxsmo-entry__side-notice" initial={reducedMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }}><div><b>Wider view, more layers.</b><span>The editorial sequence expands on desktop and stays composed on mobile.</span></div><button type="button" aria-label="Dismiss viewing note" onClick={() => setNoticeVisible(false)}><X size={15} /></button></motion.aside>}
      </section>
      <CxsmoEntryItemCarousel />
      <section className="cxsmo-entry__fit-poster" aria-labelledby="cxsmo-fit-poster-title">
        <div className="cxsmo-entry__fit-poster-copy"><span>FIT SIGNAL / 02</span><h2 id="cxsmo-fit-poster-title">THE FUTURE<br /><em>REACHES</em> BACK.</h2><p>Blue-silver utility layers, chrome hardware, and a fit built to be seen from every angle.</p><div className="cxsmo-entry__fit-poster-actions"><Link href="/cxsmo/edits">Open the fit edits <ArrowUpRight size={16} /></Link><CxsmoPromotionPopup promotion={defaultCxsmoPromotion} triggerLabel="Open signal event" /></div></div>
        <div className="cxsmo-entry__fit-poster-art"><i aria-hidden="true">✦</i><img src="/images/cxsmo-blue-silver-fit_9c35c3f3.png" alt="C✦SMO blue and silver futuristic streetwear fit" /><span>OBJECT / HUMAN / SIGNAL</span></div>
      </section>
      <footer className="cxsmo-entry__footer"><div><span>Designed + developed by zxke</span></div><nav aria-label="C✦SMO studio contact"><a href="mailto:zheviant2@gmail.com"><Mail size={14} /> zheviant2@gmail.com</a><a href="https://github.com/zekethecutie" target="_blank" rel="noreferrer">GitHub / zekethecutie</a><a href="/cxsmo/disclosure">Portfolio disclosure</a></nav></footer>
    </main>
  );
}
