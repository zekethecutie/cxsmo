import { trpc } from "@/lib/trpc";
import type { CxsmoProduct } from "@/lib/cxsmo";
import { preferCxsmoPublicMedia } from "@/lib/cxsmoMedia";

export type CxsmoHeroContent = {
  eyebrow: string;
  lineOne: string;
  emphasis: string;
  lineThree: string;
  assetUrl: string;
  assetAlt: string;
  objectLabel: string;
  objectName: string;
  objectPriceNote: string;
};

export type CxsmoPromotionContent = { enabled: boolean; message: string };
export type CxsmoGlobalContent = { notice: string; footerIntro: string; footerCredit: string };
export type CxsmoLookbookCard = { tag: string; title: string; note: string; productId: string; tone: "red" | "bone" | "ink" };
export type CxsmoProductOverride = Partial<Pick<CxsmoProduct, "name" | "description" | "image">>;

export const defaultCxsmoHero: CxsmoHeroContent = {
  eyebrow: "DROP 01 / DRESS THE AFTER-IMAGE",
  lineOne: "NO",
  emphasis: "SOFT",
  lineThree: "LANDING.",
  assetUrl: "/manus-storage/cxsmo-hero-one-man-two-women_f25e55a6.webp",
  assetAlt: "Three adult fictional C✦SMO campaign models—one man and two women—in coordinated Y2K streetwear on a transparent layer",
  objectLabel: "CAMPAIGN / 01",
  objectName: "STATIC BLOOM / GROUP STUDY",
  objectPriceNote: "fictional portfolio campaign",
};

export const defaultCxsmoPromotion: CxsmoPromotionContent = {
  enabled: false,
  message: "THE SIGNAL EVENT",
};
export const defaultCxsmoGlobal: CxsmoGlobalContent = {
  notice: "C✦SMO is a fictional fashion-commerce presentation, designed and developed by zxke. No payments or personal information are transmitted.",
  footerIntro: "Future-pop wardrobe objects, fashioned as a portfolio demonstration.",
  footerCredit: "Developed by zxke",
};

export const defaultCxsmoLookbook: CxsmoLookbookCard[] = [
  { tag: "LOOP 01", title: "FALLEN / FITTED", note: "Gravity jean · Orbit tee", productId: "gravity-01", tone: "red" },
  { tag: "LOOP 02", title: "CHROME WEATHER", note: "Orbit tee · chrome interruption", productId: "orbit-02", tone: "bone" },
  { tag: "LOOP 03", title: "SIGNAL CHECK", note: "Signal overshirt · Transit bag", productId: "signal-04", tone: "ink" },
];

function objectPayload<T>(payload: string, fallback: T): T {
  try {
    const parsed = JSON.parse(payload) as unknown;
    return parsed && typeof parsed === "object" ? { ...fallback, ...(parsed as Partial<T>) } : fallback;
  } catch {
    return fallback;
  }
}

export function useCxsmoPublishedContent() {
  const contentQuery = trpc.cxsmoStudio.content.publicList.useQuery(undefined, { staleTime: 30_000, retry: false });
  const find = (contentKey: string) => contentQuery.data?.find((entry) => entry.contentKey === contentKey)?.payload;
  const lookbookPayload = objectPayload<{ cards: CxsmoLookbookCard[] }>(find("lookbook") ?? "", { cards: defaultCxsmoLookbook });
  const productOverrides = Object.fromEntries((contentQuery.data ?? []).filter((entry) => entry.contentKey.startsWith("product.")).map((entry) => [entry.contentKey.replace("product.", ""), objectPayload<CxsmoProductOverride>(entry.payload, {})]));
  const hero = objectPayload(find("hero") ?? "", defaultCxsmoHero);
  return {
    hero: { ...hero, assetUrl: preferCxsmoPublicMedia(hero.assetUrl) },
    promotion: objectPayload(find("promotion") ?? "", defaultCxsmoPromotion),
    global: objectPayload(find("global") ?? "", defaultCxsmoGlobal),
    lookbook: lookbookPayload.cards,
    productOverrides,
    isLoading: contentQuery.isLoading,
  };
}

export function resolveCxsmoProduct(product: CxsmoProduct, override?: CxsmoProductOverride): CxsmoProduct {
  const resolved = override ? { ...product, ...override } : product;
  return { ...resolved, image: preferCxsmoPublicMedia(resolved.image) };
}
