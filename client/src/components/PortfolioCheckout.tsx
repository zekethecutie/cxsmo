import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

type CheckoutItem = { id: string; name: string; shade: string; price: number; image: string };

export function PortfolioCheckout({ items, onClose }: { items: CheckoutItem[]; onClose: () => void }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const panelRef = useRef<HTMLElement | null>(null);
  const priorFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    priorFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () => Array.from(panel.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((element) => !element.hasAttribute("disabled"));
    const first = getFocusable()[0];
    first?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      const start = focusable[0];
      const end = focusable[focusable.length - 1];
      if (!start || !end) return;
      if (event.shiftKey && document.activeElement === start) { event.preventDefault(); end.focus(); }
      else if (!event.shiftKey && document.activeElement === end) { event.preventDefault(); start.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); priorFocusRef.current?.focus(); };
  }, [onClose]);

  return <motion.div className="checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="checkout-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.section ref={panelRef} className="checkout-sheet" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 26 }} transition={{ duration: .38, ease: [0.23, 1, 0.32, 1] }} onClick={(event) => event.stopPropagation()}>
      <button autoFocus className="sheet-close" onClick={onClose} aria-label="Close checkout preview"><X size={18} /></button>
      <p className="eyebrow">Order review</p><h2 id="checkout-title">Your<br />selection.</h2>
      <div className="checkout-lines">{items.map((item, index) => <div key={`${item.id}-${index}`}><img src={item.image} alt="" /><span><b>{item.name}</b><small>{item.shade}</small></span><strong>${item.price}</strong></div>)}</div>
      <div className="checkout-total"><span>Sample total</span><b>${total}</b></div>
      <div className="checkout-notice"><i>Portfolio demonstration</i><p>This is a fictional checkout summary. It does not collect payment, shipping information, or personal data.</p></div>
      <button className="kinform-button kinform-button--dark" onClick={onClose}>Return to edit <ArrowUpRight size={16} /></button>
    </motion.section>
  </motion.div>;
}
