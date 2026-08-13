import { Heart, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useKinformDemo } from "@/contexts/KinformDemoContext";

export function KinformWordmark() {
  return <span className="kinform-wordmark" aria-label="KINFORM"><i /><b>KINFORM</b></span>;
}

export function KinformShell({ children }: { children: React.ReactNode }) {
  const { bag, savedIds } = useKinformDemo();
  const [location] = useLocation();
  const linkClass = (path: string) => location === path ? "kinform-route-link is-active" : "kinform-route-link";
  return <main className="kinform-route-page"><div className="portfolio-note">Fictional fashion commerce concept for portfolio presentation</div><header className="kinform-route-header"><Link href="/kinform"><KinformWordmark /></Link><nav aria-label="Primary"><Link href="/kinform/collection" className={linkClass("/kinform/collection")}>Collection</Link><Link href="/kinform/inventory" className={linkClass("/kinform/inventory")}>Inventory</Link><Link href="/kinform/journal" className={linkClass("/kinform/journal")}>Journal</Link><Link href="/kinform/support" className={linkClass("/kinform/support")}>Support</Link><Link href="/kinform/admin" className={linkClass("/kinform/admin")}>Admin demo</Link></nav><div className="kinform-route-tools"><Link href="/kinform/account" aria-label={`Saved objects: ${savedIds.length}`} className="kinform-icon-link"><Heart size={15} /><b>{savedIds.length}</b></Link><Link href="/kinform/bag" aria-label={`Bag: ${bag.length} objects`} className="kinform-bag-link"><ShoppingBag size={15} />Bag <b>{bag.length}</b></Link></div></header>{children}<footer className="kinform-route-footer"><KinformWordmark /><p>Fictional digital commerce concept.<br />Designed as a portfolio demonstration.</p><nav><Link href="/kinform/collection">Collection</Link><Link href="/kinform/inventory">Inventory</Link><Link href="/kinform/journal">Journal</Link><Link href="/kinform/support">Support</Link></nav></footer></main>;
}
