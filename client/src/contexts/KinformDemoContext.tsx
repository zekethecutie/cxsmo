import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { kinformProducts, type KinformProduct } from "@/lib/kinform";

type KinformDemoContextValue = {
  bag: KinformProduct[];
  savedIds: string[];
  addToBag: (product: KinformProduct) => void;
  removeFromBag: (index: number) => void;
  toggleSaved: (productId: string) => void;
  clearBag: () => void;
};

const KinformDemoContext = createContext<KinformDemoContextValue | null>(null);
const bagKey = "kinform-portfolio-bag";
const savedKey = "kinform-portfolio-saved";

export function KinformDemoProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<KinformProduct[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const storedBag = window.localStorage.getItem(bagKey);
    const storedSaved = window.localStorage.getItem(savedKey);
    if (storedBag) {
      const ids = JSON.parse(storedBag) as string[];
      setBag(ids.map((id) => kinformProducts.find((product) => product.id === id)).filter((product): product is KinformProduct => Boolean(product)));
    }
    if (storedSaved) setSavedIds(JSON.parse(storedSaved) as string[]);
  }, []);

  const value = useMemo<KinformDemoContextValue>(() => ({
    bag,
    savedIds,
    addToBag: (product) => setBag((items) => { const next = [...items, product]; window.localStorage.setItem(bagKey, JSON.stringify(next.map((item) => item.id))); return next; }),
    removeFromBag: (index) => setBag((items) => { const next = items.filter((_, itemIndex) => itemIndex !== index); window.localStorage.setItem(bagKey, JSON.stringify(next.map((item) => item.id))); return next; }),
    toggleSaved: (productId) => setSavedIds((ids) => { const next = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]; window.localStorage.setItem(savedKey, JSON.stringify(next)); return next; }),
    clearBag: () => { window.localStorage.removeItem(bagKey); setBag([]); },
  }), [bag, savedIds]);

  return <KinformDemoContext.Provider value={value}>{children}</KinformDemoContext.Provider>;
}

export function useKinformDemo() {
  const context = useContext(KinformDemoContext);
  if (!context) throw new Error("useKinformDemo must be used within KinformDemoProvider");
  return context;
}

