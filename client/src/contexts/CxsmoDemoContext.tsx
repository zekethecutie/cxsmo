import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CxsmoProduct } from "@/lib/cxsmo";

export type CxsmoBagLine = { productId: string; size: string };
export type CxsmoProfile = { displayName: string; styleMode: "Signal" | "Quiet" | "Chrome"; destination: string; country: string; locale: string; currency: "USD" | "PHP" | "JPY" | "CNY" | "EUR"; tastes: string[]; height: string; waist: string; shoeSize: string; updatesEnabled: boolean; isConfigured: boolean; isSignedIn: boolean };

type CxsmoDemoState = {
  bag: CxsmoBagLine[];
  savedIds: string[];
  savedFitIds: string[];
  savedRecommendationIds: string[];
  addToBag: (product: CxsmoProduct, size: string) => void;
  removeFromBag: (index: number) => void;
  clearBag: () => void;
  toggleSaved: (id: string) => void;
  toggleSavedFit: (id: string) => void;
  toggleSavedRecommendation: (id: string) => void;
  profile: CxsmoProfile;
  updateProfile: (update: Partial<CxsmoProfile>) => void;
  startLocalAccount: (displayName: string) => void;
  signOutLocalAccount: () => void;
};

const CxsmoDemoContext = createContext<CxsmoDemoState | undefined>(undefined);
const storageKey = "cxsmo-demo-state";
const initialProfile: CxsmoProfile = { displayName: "", styleMode: "Signal", destination: "", country: "United States", locale: "en-US", currency: "USD", tastes: [], height: "", waist: "", shoeSize: "", updatesEnabled: false, isConfigured: false, isSignedIn: false };

export function CxsmoDemoProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<CxsmoBagLine[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedFitIds, setSavedFitIds] = useState<string[]>([]);
  const [savedRecommendationIds, setSavedRecommendationIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<CxsmoProfile>(initialProfile);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) {
        const locale = navigator.language || "en-US";
        const region = locale.split("-")[1]?.toUpperCase();
        const defaults: Record<string, { country: string; currency: CxsmoProfile["currency"] }> = { PH: { country: "Philippines", currency: "PHP" }, JP: { country: "Japan", currency: "JPY" }, CN: { country: "China", currency: "CNY" }, DE: { country: "Germany", currency: "EUR" }, FR: { country: "France", currency: "EUR" }, ES: { country: "Spain", currency: "EUR" } };
        const detected = defaults[region ?? ""];
        if (detected) setProfile({ ...initialProfile, locale, ...detected });
        return;
      }
      const parsed = JSON.parse(saved) as { bag?: CxsmoBagLine[]; savedIds?: string[]; savedFitIds?: string[]; savedRecommendationIds?: string[]; profile?: Partial<CxsmoProfile> };
      setBag(parsed.bag ?? []);
      setSavedIds(parsed.savedIds ?? []);
      setSavedFitIds(parsed.savedFitIds ?? []);
      setSavedRecommendationIds(parsed.savedRecommendationIds ?? []);
      setProfile({ ...initialProfile, ...parsed.profile });
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ bag, savedIds, savedFitIds, savedRecommendationIds, profile }));
  }, [bag, savedIds, savedFitIds, savedRecommendationIds, profile]);

  const value = useMemo<CxsmoDemoState>(() => ({
    bag,
    savedIds,
    savedFitIds,
    savedRecommendationIds,
    addToBag: (product, size) => setBag((lines) => [...lines, { productId: product.id, size }]),
    removeFromBag: (index) => setBag((lines) => lines.filter((_, lineIndex) => lineIndex !== index)),
    clearBag: () => setBag([]),
    toggleSaved: (id) => setSavedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]),
    toggleSavedFit: (id) => setSavedFitIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]),
    toggleSavedRecommendation: (id) => setSavedRecommendationIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]),
    profile,
    updateProfile: (update) => setProfile((current) => ({ ...current, ...update, isConfigured: true })),
    startLocalAccount: (displayName) => setProfile((current) => ({ ...current, displayName: displayName.trim() || current.displayName || "signal", isConfigured: true, isSignedIn: true })),
    signOutLocalAccount: () => setProfile((current) => ({ ...current, isSignedIn: false })),
  }), [bag, savedIds, savedFitIds, savedRecommendationIds, profile]);

  return <CxsmoDemoContext.Provider value={value}>{children}</CxsmoDemoContext.Provider>;
}

export function useCxsmoDemo() {
  const context = useContext(CxsmoDemoContext);
  if (!context) throw new Error("useCxsmoDemo must be used within CxsmoDemoProvider");
  return context;
}
