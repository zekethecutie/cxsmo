import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import type { CxsmoPromotionContent } from "@/lib/cxsmoContent";
import "@/pages/cxsmo-promotion-popup.css";

export function CxsmoPromotionPopup({ promotion }: { promotion: CxsmoPromotionContent }) {
  const key = `cxsmo-promo-dismissed-${promotion.message}`;
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(promotion.enabled && window.sessionStorage.getItem(key) !== "true"); }, [key, promotion.enabled]);
  const dismiss = () => { window.sessionStorage.setItem(key, "true"); setOpen(false); };
  return <AnimatePresence>{open && <motion.section className="cxsmo-promo-popup" role="dialog" aria-modal="true" aria-label="C✦SMO campaign announcement" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="cxsmo-promo-popup__card" initial={{ opacity: 0, y: 24, rotate: .8 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 14, rotate: -.4 }} transition={{ duration: .36, ease: [0.16, 1, .3, 1] }}><button data-cxsmo-sound="click" className="cxsmo-promo-popup__close" type="button" onClick={dismiss} aria-label="Dismiss campaign announcement"><X size={18} /></button><span>CAMPAIGN SIGNAL / C✦SMO</span><h2>{promotion.message}</h2><p>This is a fictional portfolio campaign announcement. It does not offer payment, delivery, inventory, or a customer data service.</p><div><Link data-cxsmo-sound="primary" className="cxsmo-button" href="/cxsmo/shop" onClick={dismiss}>See the objects</Link><button data-cxsmo-sound="select" type="button" onClick={dismiss}>Dismiss for this visit</button></div><i aria-hidden="true">✦</i></motion.div></motion.section>}</AnimatePresence>;
}
