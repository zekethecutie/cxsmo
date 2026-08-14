import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail, MonitorSmartphone, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { CxsmoCustomCursor } from "@/components/CxsmoCustomCursor";
import { CxsmoMark } from "@/components/CxsmoMark";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import "./cxsmo-entry.css";
import "./cxsmo-entry-tools.css";
import "./cxsmo-entry-appearance.css";

const orbitObjects = [cxsmoProducts[0], cxsmoProducts[4], cxsmoProducts[8], cxsmoProducts[10]].filter(Boolean);

function CxsmoEntryTools() {
  const { theme, toggleThemeAt } = useTheme();
  const { enabled, toggle, play } = useCxsmoSound();
  const isDark = theme === "dark";
  const switchTheme = (event: React.MouseEvent<HTMLButtonElement>) => { const box = event.currentTarget.getBoundingClientRect(); play("theme"); toggleThemeAt?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 }); };
  return <div className="cxsmo-entry__tools"><button className="cxsmo-entry__tool" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={switchTheme}><i aria-hidden="true">{isDark ? "◐" : "◑"}</i><b>{isDark ? "Dark" : "Light"}</b></button><button className="cxsmo-entry__tool" type="button" aria-label={`${enabled ? "Mute" : "Enable"} optional interface sound`} aria-pressed={enabled} onClick={toggle}>{enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<b>{enabled ? "Sound on" : "Sound off"}</b></button></div>;
}

export function CxsmoEntryPage() {
  const reducedMotion = useReducedMotion();
  return <main className="cxsmo-entry"><CxsmoCustomCursor /><header className="cxsmo-entry__header"><CxsmoMark inverse /><p>ZXKE / FASHION COMMERCE STUDY / 2026</p><CxsmoEntryTools /></header><section className="cxsmo-entry__hero"><div className="cxsmo-entry__numbers" aria-hidden="true"><span>01</span><span>12</span><span>∞</span></div><div className="cxsmo-entry__copy"><motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>C✦SMO STUDIOS / DIGITAL FASHION SYSTEM</motion.p><motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 42, scaleY: .84 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} transition={{ duration: .74, delay: .08, ease: [0.16, 1, .3, 1] }}>C<span>✦</span>SMO</motion.h1><motion.div className="cxsmo-entry__intro" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .24 }}><p>An original fashion-and-lifestyle portfolio world by <b>zxke</b>, built to show how a streetwear brand can move from campaign signal to product, profile, and studio.</p><div><Link className="cxsmo-entry__enter" href="/cxsmo">Enter the drop <ArrowDownRight size={17} /></Link><Link className="cxsmo-entry__underlink" href="/cxsmo/admin">Studio access <ArrowUpRight size={15} /></Link></div></motion.div></div><div className="cxsmo-entry__orbit" aria-hidden="true"><div className="cxsmo-entry__orbit-line" />{orbitObjects.map((product, index) => <motion.div className={`cxsmo-entry__object cxsmo-entry__object--${index + 1}`} key={product.id} animate={reducedMotion ? {} : { y: [0, -10 - index * 3, 0], rotate: [-4 + index * 3, 3 - index, -4 + index * 3] }} transition={{ duration: 4.5 + index * .6, repeat: Infinity, ease: "easeInOut", delay: index * .18 }}><img src={product.image} alt="" /></motion.div>)}</div><aside className="cxsmo-entry__desktop-note"><MonitorSmartphone size={17} /><div><b>Wide screen recommended</b><span>The full editorial sequence is most expansive on desktop. This entry and the storefront remain responsive on mobile.</span></div></aside></section><footer className="cxsmo-entry__footer"><div><Sparkles size={14} /><span>Fictional brand / real product thinking</span></div><nav aria-label="C✦SMO studio contact"><a href="mailto:cxsmostudios@cxsmo.io"><Mail size={14} /> cxsmostudios@cxsmo.io</a><a href="/cxsmo/disclosure">Portfolio disclosure</a><a href="/cxsmo/support">Reach out</a></nav></footer></main>;
}
