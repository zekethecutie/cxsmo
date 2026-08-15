import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import type { CxsmoPromotionContent } from "@/lib/cxsmoContent";
import "@/pages/cxsmo-promotion-popup.css";

export function CxsmoPromotionPopup({ promotion, triggerLabel }: { promotion: CxsmoPromotionContent; triggerLabel?: string }) {
  const key = `cxsmo-promo-dismissed-${promotion.message}`;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => { setOpen(!triggerLabel && promotion.enabled && window.sessionStorage.getItem(key) !== "true"); }, [key, promotion.enabled, triggerLabel]);
  const dismiss = useCallback(() => { window.sessionStorage.setItem(key, "true"); setOpen(false); }, [key]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFirst = () => dialogRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.requestAnimationFrame(focusFirst);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = bodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
      const previous = previousFocusRef.current;
      if (previous?.isConnected) window.requestAnimationFrame(() => previous.focus());
    };
  }, [dismiss, open]);

  return <>{triggerLabel && <button data-cxsmo-sound="select" className="cxsmo-promo-popup__trigger" type="button" onClick={() => setOpen(true)}>{triggerLabel}<ArrowUpRight size={15} /></button>}<AnimatePresence>{open && <motion.section className="cxsmo-promo-popup" role="dialog" aria-modal="true" aria-labelledby="cxsmo-promo-title" ref={dialogRef} onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="cxsmo-promo-popup__card" initial={{ opacity: 0, y: 24, rotate: .8 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 14, rotate: -.4 }} transition={{ duration: .36, ease: [0.16, 1, .3, 1] }}><button data-cxsmo-sound="click" className="cxsmo-promo-popup__close" type="button" onClick={dismiss} aria-label="Dismiss campaign announcement"><X size={18} /></button><span>FICTIONAL EVENT / C✦SMO</span><h2 id="cxsmo-promo-title">{promotion.message}</h2><p>A visual sale-event concept for this portfolio presentation. No price changes, payment, delivery, inventory, or customer data service is offered here.</p><div><Link data-cxsmo-sound="primary" className="cxsmo-button" href="/cxsmo/shop" onClick={dismiss}>See the objects</Link><button data-cxsmo-sound="select" type="button" onClick={dismiss}>Dismiss for this visit</button></div><i aria-hidden="true">✦</i></motion.div></motion.section>}</AnimatePresence></>;
}
