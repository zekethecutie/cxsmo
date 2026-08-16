import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CxsmoProduct } from "@/lib/cxsmo";

export type CxsmoBagLine = { productId: string; size: string; color?: string };
export type CxsmoProfile = { displayName: string; styleMode: "Signal" | "Quiet" | "Chrome"; destination: string; country: string; locale: string; currency: "USD" | "PHP" | "JPY" | "CNY" | "EUR"; currencyRate: number; currencyUpdatedAt: number | null; tastes: string[]; height: string; waist: string; shoeSize: string; updatesEnabled: boolean; isConfigured: boolean; isSignedIn: boolean };

type CxsmoDemoState = {
  bag: CxsmoBagLine[];
  savedIds: string[];
  savedFitIds: string[];
  savedRecommendationIds: string[];
  addToBag: (product: CxsmoProduct, size: string, color?: string) => void;
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
export const cxsmoCurrencyOptions = [{ country: "United States", locale: "en-US", currency: "USD" as const, fallbackRate: 1 }, { country: "Philippines", locale: "en-PH", currency: "PHP" as const, fallbackRate: 58 }, { country: "Japan", locale: "ja-JP", currency: "JPY" as const, fallbackRate: 155 }, { country: "China", locale: "zh-CN", currency: "CNY" as const, fallbackRate: 7.25 }, { country: "Euro area", locale: "de-DE", currency: "EUR" as const, fallbackRate: .92 }];
const initialProfile: CxsmoProfile = { displayName: "", styleMode: "Signal", destination: "", country: "United States", locale: "en-US", currency: "USD", currencyRate: 1, currencyUpdatedAt: null, tastes: [], height: "", waist: "", shoeSize: "", updatesEnabled: false, isConfigured: false, isSignedIn: false };

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
        const detected = cxsmoCurrencyOptions.find((option) => option.currency === (region === "PH" ? "PHP" : region === "JP" ? "JPY" : region === "CN" ? "CNY" : ["DE", "FR", "ES", "IT", "NL", "PT"].includes(region ?? "") ? "EUR" : "USD"));
        if (detected) setProfile({ ...initialProfile, ...detected, locale, currencyRate: detected.fallbackRate });
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
    let active = true;
    if (profile.currency === "USD") return;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.ok ? response.json() as Promise<{ rates?: Record<string, number> }> : Promise.reject())
      .then((payload) => {
        const rate = payload.rates?.[profile.currency];
        if (active && typeof rate === "number" && Number.isFinite(rate) && rate > 0) setProfile((current) => current.currency === profile.currency ? { ...current, currencyRate: rate, currencyUpdatedAt: Date.now() } : current);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [profile.currency]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ bag, savedIds, savedFitIds, savedRecommendationIds, profile }));
  }, [bag, savedIds, savedFitIds, savedRecommendationIds, profile]);

  const value = useMemo<CxsmoDemoState>(() => ({
    bag,
    savedIds,
    savedFitIds,
    savedRecommendationIds,
    addToBag: (product, size, color) => setBag((lines) => [...lines, { productId: product.id, size, color: color ?? product.color }]),
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
