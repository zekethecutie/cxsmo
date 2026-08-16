import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { createPortal } from "react-dom";
import type { CxsmoPromotionContent } from "@/lib/cxsmoContent";
import "@/pages/cxsmo-promotion-popup.css";

export function CxsmoPromotionPopup({ promotion, triggerLabel }: { promotion: CxsmoPromotionContent; triggerLabel?: string }) {
  const key = `cxsmo-promo-dismissed-${promotion.message}`;
  const [open, setOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(() => (promotion.durationMinutes ?? 15) * 60);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => { setOpen(!triggerLabel && promotion.enabled && window.sessionStorage.getItem(key) !== "true"); }, [key, promotion.enabled, triggerLabel]);
  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => setSecondsRemaining((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [open]);
  const dismiss = useCallback(() => { window.sessionStorage.setItem(key, "true"); setOpen(false); }, [key]);
  const countdown = `${String(Math.floor(secondsRemaining / 60)).padStart(2, "0")}:${String(secondsRemaining % 60).padStart(2, "0")}`;

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

  const modal = <AnimatePresence>{open && <motion.section className="cxsmo-promo-popup" role="dialog" aria-modal="true" aria-labelledby="cxsmo-promo-title" ref={dialogRef} onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="cxsmo-promo-popup__card" initial={{ opacity: 0, y: 24, rotate: .8 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 14, rotate: -.4 }} transition={{ duration: .36, ease: [0.16, 1, .3, 1] }}><button data-cxsmo-sound="click" className="cxsmo-promo-popup__close" type="button" onClick={dismiss} aria-label="Dismiss campaign announcement"><X size={18} /></button><span>C✦SMO EVENT / PORTFOLIO DEMO</span><h2 id="cxsmo-promo-title">{promotion.message}</h2><div className="cxsmo-promo-popup__event-state"><b>{promotion.discountLabel ?? "Event marker"}</b><strong aria-label={`${countdown} remaining in this browser demonstration`}>{countdown}</strong><small>{promotion.voucherLabel ?? "Preview voucher"}</small></div><p>This is an interaction-design preview. The timer, voucher, delivery cue, and discount marker stay in this browser and do not change prices, create an order, or promise fulfilment.</p><div><Link data-cxsmo-sound="primary" className="cxsmo-button" href="/cxsmo/shop" onClick={dismiss}>Browse the event</Link><button data-cxsmo-sound="select" type="button" onClick={dismiss}>Close preview</button></div><i aria-hidden="true">✦</i></motion.div></motion.section>}</AnimatePresence>;
  return <>{triggerLabel && <button data-cxsmo-sound="select" className="cxsmo-promo-popup__trigger" type="button" onClick={() => setOpen(true)}>{triggerLabel}<ArrowUpRight size={15} /></button>}{typeof document !== "undefined" ? createPortal(modal, document.body) : null}</>;
}
