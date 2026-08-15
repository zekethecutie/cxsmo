import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail, MonitorSmartphone, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { CxsmoCustomCursor } from "@/components/CxsmoCustomCursor";
import { CxsmoMark } from "@/components/CxsmoMark";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import { useTheme } from "@/contexts/ThemeContext";
import "./cxsmo-entry.css";
import "./cxsmo-entry-tools.css";
import "./cxsmo-entry-appearance.css";
import "./cxsmo-entry-poster.css";
import "./cxsmo-mobile-bridge-polish.css";
import "./cxsmo-entry-centered-poster.css";
import "./cxsmo-entry-iconic-poster.css";
import "./cxsmo-entry-final-tuning.css";
import "./cxsmo-utility-type.css";

function CxsmoEntryTools() {
  const { theme, toggleThemeAt } = useTheme();
  const { enabled, toggle, play } = useCxsmoSound();
  const isDark = theme === "dark";
  const switchTheme = (event: React.MouseEvent<HTMLButtonElement>) => { const box = event.currentTarget.getBoundingClientRect(); play("theme"); toggleThemeAt?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 }); };
  return <div className="cxsmo-entry__tools"><button className="cxsmo-entry__tool" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={switchTheme}><i aria-hidden="true">{isDark ? "◐" : "◑"}</i><b>{isDark ? "Dark" : "Light"}</b></button><button className="cxsmo-entry__tool" type="button" aria-label={`${enabled ? "Mute" : "Enable"} optional interface sound`} aria-pressed={enabled} onClick={toggle}>{enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<b>{enabled ? "Sound on" : "Sound off"}</b></button></div>;
}

export function CxsmoEntryPage() {
  const reducedMotion = useReducedMotion();
  const { isTransitioning, transitionTarget } = useTheme();
  return <main className="cxsmo-entry"><CxsmoCustomCursor /><div className={`cxsmo-theme-wash${isTransitioning ? " is-active" : ""}`} data-target={transitionTarget} aria-hidden="true">{isTransitioning && Array.from({ length: 144 }, (_, index) => <i key={index} style={{ "--pixel": index } as React.CSSProperties} />)}</div><header className="cxsmo-entry__header"><CxsmoMark inverse /><p>ZXKE / FASHION COMMERCE STUDY / 2026</p><CxsmoEntryTools /></header><section className="cxsmo-entry__hero cxsmo-entry__hero--poster"><p className="cxsmo-entry__poster-kicker">C✦SMO / DIGITAL FASHION SYSTEM</p><motion.p className="cxsmo-entry__signal" aria-hidden="true" animate={reducedMotion ? {} : { x: [0, 18, 0] }} transition={reducedMotion ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>DROP / OBJECT / SYSTEM / DROP / OBJECT / SYSTEM</motion.p><p className="cxsmo-entry__poster-word" aria-hidden="true">C✦SMO</p><motion.div className="cxsmo-entry__portrait" initial={reducedMotion ? false : { opacity: 0, x: 28, rotate: 2 }} animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: [0, -7, 0], y: [0, -10, 0], rotate: [0, -1, 0] }} transition={reducedMotion ? { duration: 0 } : { opacity: { duration: .55, delay: .16 }, x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}}><img src="/manus-storage/cxsmo-y2k-editorial-portrait_8aa44fe0.png" alt="C✦SMO Y2K editorial fashion portrait" /></motion.div><div className="cxsmo-entry__copy"><motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 42, scaleY: .84 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} transition={{ duration: .74, delay: .08, ease: [0.16, 1, .3, 1] }}>C<span>✦</span>SMO</motion.h1><p className="cxsmo-entry__statement">A fashion-commerce system built to make the drop feel inevitable.</p><motion.div className="cxsmo-entry__intro" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .24 }}><div><Link className="cxsmo-entry__enter" href="/cxsmo">Enter the drop <ArrowDownRight size={17} /></Link><Link className="cxsmo-entry__underlink" href="/cxsmo/admin">Studio access <ArrowUpRight size={15} /></Link></div></motion.div><p className="cxsmo-entry__creator-line">Designed + developed by zxke</p></div><aside className="cxsmo-entry__desktop-note"><MonitorSmartphone size={17} /><div><b>Wide screen recommended</b><span>The editorial sequence is most expansive on desktop and remains responsive on mobile.</span></div></aside></section><footer className="cxsmo-entry__footer"><div><span>Designed + developed by zxke</span></div><nav aria-label="C✦SMO studio contact"><a href="mailto:zheviant2@gmail.com"><Mail size={14} /> zheviant2@gmail.com</a><a href="https://github.com/zekethecutie" target="_blank" rel="noreferrer">GitHub / zekethecutie</a><a href="/cxsmo/disclosure">Portfolio disclosure</a></nav></footer></main>;
}
