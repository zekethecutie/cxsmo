import { CircleAlert, Image, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cxsmoProducts } from "@/lib/cxsmo";
import { trpc } from "@/lib/trpc";
import "@/pages/cxsmo-admin-editorial.css";
import "@/pages/cxsmo-admin-media-readiness.css";

export type LookbookCard = { tag: string; title: string; note: string; productId: string; tone: "red" | "bone" | "ink" };
export const defaultLookbookCards: LookbookCard[] = [
  { tag: "LOOP 01", title: "FALLEN / FITTED", note: "Gravity jean · Orbit tee", productId: "gravity-01", tone: "red" },
  { tag: "LOOP 02", title: "CHROME WEATHER", note: "Orbit tee · chrome interruption", productId: "orbit-02", tone: "bone" },
  { tag: "LOOP 03", title: "SIGNAL CHECK", note: "Signal overshirt · Transit bag", productId: "signal-04", tone: "ink" },
];

function parseCards(payload: string | undefined) {
  try { const data = JSON.parse(payload ?? "") as { cards?: LookbookCard[] }; return data.cards?.length ? data.cards : defaultLookbookCards; } catch { return defaultLookbookCards; }
}

export function CxsmoStudioEditorialControls() {
  const utils = trpc.useUtils();
  const entries = trpc.cxsmoStudio.content.list.useQuery();
  const entry = entries.data?.find((item) => item.contentKey === "lookbook");
  const [cards, setCards] = useState<LookbookCard[]>(defaultLookbookCards);
  useEffect(() => { if (entry) setCards(parseCards(entry.payload)); }, [entry?.payload]);
  const save = trpc.cxsmoStudio.content.save.useMutation({ onSuccess: async () => { await utils.cxsmoStudio.content.invalidate(); await utils.cxsmoStudio.content.publicList.invalidate(); } });
  const update = (index: number, patch: Partial<LookbookCard>) => setCards((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  return <section className="cx-studio-wide"><div className="cx-studio-wide__head"><div><Image size={18} /><p>Lookbook card builder</p></div><button type="button" onClick={() => save.mutate({ contentKey: "lookbook", payload: JSON.stringify({ cards }), status: "published" })} disabled={save.isPending}><Save size={15} /> {save.isPending ? "Saving" : "Publish lookbook"}</button></div><p>Build the public editorial sequence from real C✦SMO products. Add, remove, rename, and reorder-style the campaign cards without hardcoding the storefront.</p><div className="cx-studio-lookbook-list">{cards.map((card, index) => <article key={`${card.tag}-${index}`}><span>0{index + 1}</span><label>Card label<input value={card.tag} onChange={(event) => update(index, { tag: event.target.value })} /></label><label>Title<input value={card.title} onChange={(event) => update(index, { title: event.target.value })} /></label><label>Context<input value={card.note} onChange={(event) => update(index, { note: event.target.value })} /></label><label>Product<select value={card.productId} onChange={(event) => update(index, { productId: event.target.value })}>{cxsmoProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label><label>Tone<select value={card.tone} onChange={(event) => update(index, { tone: event.target.value as LookbookCard["tone"] })}><option value="red">Signal red</option><option value="bone">Chrome bone</option><option value="ink">Night ink</option></select></label><button type="button" className="cx-studio-remove" onClick={() => setCards((items) => items.filter((_, itemIndex) => itemIndex !== index))} disabled={cards.length <= 1} aria-label={`Remove ${card.title}`}><Trash2 size={15} /></button></article>)}</div><button type="button" className="cx-studio-add" onClick={() => setCards((items) => [...items, { tag: `LOOP 0${items.length + 1}`, title: "NEW SIGNAL", note: "Describe this styling chapter", productId: cxsmoProducts[0].id, tone: "red" }])}><Plus size={15} /> Add lookbook card</button></section>;
}

export function CxsmoStudioProductOverrides() {
  const utils = trpc.useUtils();
  const [selected, setSelected] = useState(cxsmoProducts[0].id);
  const product = cxsmoProducts.find((item) => item.id === selected) ?? cxsmoProducts[0];
  const entries = trpc.cxsmoStudio.content.list.useQuery();
  const media = trpc.cxsmoStudio.media.list.useQuery();
  const entry = entries.data?.find((item) => item.contentKey === `product.${selected}`);
  const imageChoices = [...(media.data ?? []).map((asset) => ({ label: asset.name, url: asset.url })), ...cxsmoProducts.map((item) => ({ label: `${item.name} image`, url: item.image }))];
  const [draft, setDraft] = useState({ name: product.name, description: product.description, image: product.image });
  useEffect(() => { try { const saved = entry ? JSON.parse(entry.payload) as Partial<typeof draft> : {}; setDraft({ name: saved.name ?? product.name, description: saved.description ?? product.description, image: saved.image ?? product.image }); } catch { setDraft({ name: product.name, description: product.description, image: product.image }); } }, [selected, entry?.payload, product.name, product.description, product.image]);
  const save = trpc.cxsmoStudio.content.save.useMutation({ onSuccess: async () => { await utils.cxsmoStudio.content.invalidate(); await utils.cxsmoStudio.content.publicList.invalidate(); } });
  const awaitingReplacement = new Set(["starlight-03", "gloss-07"]);
  return <><section className="cx-studio-wide cx-studio-wide--product"><div className="cx-studio-wide__head"><div><Image size={18} /><p>Product presentation override</p></div><button type="button" onClick={() => save.mutate({ contentKey: `product.${selected}`, payload: JSON.stringify(draft), status: "published" })} disabled={save.isPending}><Save size={15} /> {save.isPending ? "Saving" : "Publish product"}</button></div><p>Override display copy or select any shared-library image for the public portfolio. The core catalogue remains clearly fictional; this does not create inventory, pricing, or a live sales record.</p><div className="cx-studio-product-editor"><label>Object<select value={selected} onChange={(event) => setSelected(event.target.value)}>{cxsmoProducts.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Display name<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label><label className="cx-studio-editor-span">Description<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label><label className="cx-studio-editor-span">Shared-library image<select value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })}>{imageChoices.map((image) => <option value={image.url} key={`${image.label}-${image.url}`}>{image.label}</option>)}</select></label><div className="cx-studio-product-preview"><img src={draft.image} alt="Selected product override preview" /><span>{draft.name}</span></div></div></section><section className="cx-studio-wide cx-studio-media-readiness"><div className="cx-studio-wide__head"><div><Image size={18} /><p>Catalogue media readiness</p></div><span>{cxsmoProducts.length} active objects</span></div><p>Every object can be selected above for copy and shared-library media changes. The two highlighted objects remain visible only because their new raw cutout exports have not yet been supplied to the studio.</p><div className="cx-studio-media-readiness__grid">{cxsmoProducts.map((item) => { const waiting = awaitingReplacement.has(item.id); return <article key={item.id} className={waiting ? "is-waiting" : ""}><img src={item.image} alt="" /><div><b>{item.drop} / {item.name}</b><span>{waiting ? <><CircleAlert size={13} /> Replacement file awaiting source</> : "Presentation media ready"}</span></div></article>; })}</div></section></>;
}
