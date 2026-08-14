import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CxsmoProduct } from "@/lib/cxsmo";

export type CxsmoBagLine = { productId: string; size: string };
export type CxsmoProfile = { displayName: string; styleMode: "Signal" | "Quiet" | "Chrome"; destination: string; updatesEnabled: boolean; isConfigured: boolean };

type CxsmoDemoState = {
  bag: CxsmoBagLine[];
  savedIds: string[];
  addToBag: (product: CxsmoProduct, size: string) => void;
  removeFromBag: (index: number) => void;
  clearBag: () => void;
  toggleSaved: (id: string) => void;
  profile: CxsmoProfile;
  updateProfile: (update: Partial<CxsmoProfile>) => void;
};

const CxsmoDemoContext = createContext<CxsmoDemoState | undefined>(undefined);
const storageKey = "cxsmo-demo-state";
const initialProfile: CxsmoProfile = { displayName: "", styleMode: "Signal", destination: "", updatesEnabled: false, isConfigured: false };

export function CxsmoDemoProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<CxsmoBagLine[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<CxsmoProfile>(initialProfile);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { bag?: CxsmoBagLine[]; savedIds?: string[]; profile?: Partial<CxsmoProfile> };
      setBag(parsed.bag ?? []);
      setSavedIds(parsed.savedIds ?? []);
      setProfile({ ...initialProfile, ...parsed.profile });
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ bag, savedIds, profile }));
  }, [bag, savedIds, profile]);

  const value = useMemo<CxsmoDemoState>(() => ({
    bag,
    savedIds,
    addToBag: (product, size) => setBag((lines) => [...lines, { productId: product.id, size }]),
    removeFromBag: (index) => setBag((lines) => lines.filter((_, lineIndex) => lineIndex !== index)),
    clearBag: () => setBag([]),
    toggleSaved: (id) => setSavedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]),
    profile,
    updateProfile: (update) => setProfile((current) => ({ ...current, ...update, isConfigured: true })),
  }), [bag, savedIds, profile]);

  return <CxsmoDemoContext.Provider value={value}>{children}</CxsmoDemoContext.Provider>;
}

export function useCxsmoDemo() {
  const context = useContext(CxsmoDemoContext);
  if (!context) throw new Error("useCxsmoDemo must be used within CxsmoDemoProvider");
  return context;
}
