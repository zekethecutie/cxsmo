import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail, MonitorSmartphone, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { CxsmoCustomCursor } from "@/components/CxsmoCustomCursor";
import { CxsmoMark } from "@/components/CxsmoMark";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import "./cxsmo-entry.css";
import "./cxsmo-entry-tools.css";
import "./cxsmo-entry-appearance.css";
import "./cxsmo-entry-poster.css";
import "./cxsmo-mobile-bridge-polish.css";

const entryObjects = ["blxck-heavy-12", "blxck-pants-10", "blxck-simple-11"].map((id) => cxsmoProducts.find((product) => product.id === id)).filter((product): product is (typeof cxsmoProducts)[number] => Boolean(product));

function CxsmoEntryTools() {
  const { theme, toggleThemeAt } = useTheme();
  const { enabled, toggle, play } = useCxsmoSound();
  const isDark = theme === "dark";
  const switchTheme = (event: React.MouseEvent<HTMLButtonElement>) => { const box = event.currentTarget.getBoundingClientRect(); play("theme"); toggleThemeAt?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 }); };
  return <div className="cxsmo-entry__tools"><button className="cxsmo-entry__tool" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={switchTheme}><i aria-hidden="true">{isDark ? "◐" : "◑"}</i><b>{isDark ? "Dark" : "Light"}</b></button><button className="cxsmo-entry__tool" type="button" aria-label={`${enabled ? "Mute" : "Enable"} optional interface sound`} aria-pressed={enabled} onClick={toggle}>{enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<b>{enabled ? "Sound on" : "Sound off"}</b></button></div>;
}

export function CxsmoEntryPage() {
  const reducedMotion = useReducedMotion();
  return <main className="cxsmo-entry"><CxsmoCustomCursor /><header className="cxsmo-entry__header"><CxsmoMark inverse /><p>ZXKE / FASHION COMMERCE STUDY / 2026</p><CxsmoEntryTools /></header><section className="cxsmo-entry__hero cxsmo-entry__hero--poster"><div className="cxsmo-entry__numbers" aria-hidden="true"><span>01</span><span>12</span><span>∞</span></div><div className="cxsmo-entry__copy"><motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>C✦SMO STUDIOS / DIGITAL FASHION SYSTEM</motion.p><motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 42, scaleY: .84 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} transition={{ duration: .74, delay: .08, ease: [0.16, 1, .3, 1] }}>C<span>✦</span>SMO</motion.h1><p className="cxsmo-entry__statement">A <b>fashion-commerce concept</b> that turns a campaign into a product system, a profile, and an operator view—designed and developed by zxke.</p><motion.div className="cxsmo-entry__intro" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .24 }}><div><Link className="cxsmo-entry__enter" href="/cxsmo">Enter the drop <ArrowDownRight size={17} /></Link><Link className="cxsmo-entry__underlink" href="/cxsmo/admin">Studio access <ArrowUpRight size={15} /></Link></div></motion.div><p className="cxsmo-entry__creator-line">Designed + developed by zxke / independent web direction</p></div><div className="cxsmo-entry__poster-stage" aria-label="BLXCK UNIV3RSE product study"><p className="cxsmo-entry__stage-title">BLXCK<br /><span>UNIV3RSE</span></p><p className="cxsmo-entry__stage-axis">DROP 10—12 / SIGNAL LINE</p>{entryObjects.map((product, index) => <motion.div className={`cxsmo-entry__object ${index === 0 ? "cxsmo-entry__object--primary" : index === 1 ? "cxsmo-entry__object--pants" : "cxsmo-entry__object--simple"}`} data-depth={index === 0 ? "near" : "mid"} key={product.id} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [18, 0, -8, 0], rotate: [0, index === 1 ? -1.4 : 1.2, 0] }} transition={reducedMotion ? { duration: .55, delay: .18 + index * .1, ease: [0.16, 1, .3, 1] } : { duration: 6.4 + index * .5, delay: .18 + index * .1, repeat: Infinity, ease: [0.16, 1, .3, 1] }}><img src={product.image} alt="" /></motion.div>)}<p className="cxsmo-entry__stage-note">Three isolated objects.<br />One directional study.</p></div><aside className="cxsmo-entry__desktop-note"><MonitorSmartphone size={17} /><div><b>Wide screen recommended</b><span>The full editorial sequence is most expansive on desktop. This entry and the storefront remain responsive on mobile.</span></div></aside></section><footer className="cxsmo-entry__footer"><div><span>Designed + developed by zxke</span></div><nav aria-label="C✦SMO studio contact"><a href="mailto:zheviant2@gmail.com"><Mail size={14} /> zheviant2@gmail.com</a><a href="https://github.com/zekethecutie" target="_blank" rel="noreferrer">GitHub / zekethecutie</a><a href="/cxsmo/disclosure">Portfolio disclosure</a></nav></footer></main>;
}
