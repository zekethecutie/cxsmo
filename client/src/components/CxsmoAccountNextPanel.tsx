import { Bookmark, Check, Ruler, Sparkles, Star, WandSparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import { getCxsmoRecommendationIds } from "@/lib/cxsmoRecommendations";
import "@/pages/cxsmo-account-next.css";
import "@/pages/cxsmo-account-journey.css";
import "@/pages/cxsmo-account-recommendation-saves.css";

const tasteOptions = ["Baggy denim", "Graphic layers", "Chrome objects", "Soft tailoring", "Beauty detail", "Skate profile"];
const localeOptions = [{ country: "United States", locale: "en-US", currency: "USD" as const }, { country: "Philippines", locale: "en-PH", currency: "PHP" as const }, { country: "Japan", locale: "ja-JP", currency: "JPY" as const }, { country: "China", locale: "zh-CN", currency: "CNY" as const }, { country: "Euro area", locale: "de-DE", currency: "EUR" as const }];

export function CxsmoAccountNextPanel() {
  const { profile, updateProfile, savedRecommendationIds, toggleSavedRecommendation } = useCxsmoDemo();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const toggleTaste = (taste: string) => setDraft((current) => ({ ...current, tastes: current.tastes.includes(taste) ? current.tastes.filter((item) => item !== taste) : [...current.tastes, taste] }));
  const save = () => { updateProfile(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1700); };
  const selectedIds = getCxsmoRecommendationIds(draft.tastes);
  const recommendations = cxsmoProducts.filter((product) => selectedIds.includes(product.id)).slice(0, 3);
  return <>
    <section className="cxsmo-account-next">
      <div><p className="section-label">Onboarding / simulation</p><h2>Teach the edit<br /><em>your signal.</em></h2><p>These preferences are browser-local, optional, and used only to demonstrate how a future recommendation and fit experience could be structured.</p><ol className="cxsmo-account-steps"><li className={draft.displayName ? "is-done" : ""}><span>01</span>Name your signal</li><li className={draft.tastes.length ? "is-done" : ""}><span>02</span>Choose your references</li><li className={draft.height || draft.waist || draft.shoeSize ? "is-done" : ""}><span>03</span>Add fit context</li></ol></div>
      <div className="cxsmo-account-next__controls"><label><span><Star size={15} /> Price display</span><select value={`${draft.country}|${draft.currency}`} onChange={(event) => { const option = localeOptions.find((item) => `${item.country}|${item.currency}` === event.target.value); if (option) setDraft({ ...draft, ...option }); }}>{localeOptions.map((option) => <option value={`${option.country}|${option.currency}`} key={option.currency}>{option.country} / {option.currency}</option>)}</select></label><div className="cxsmo-account-next__tastes"><span><Sparkles size={15} /> Taste signals</span><div>{tasteOptions.map((taste) => <button type="button" key={taste} className={draft.tastes.includes(taste) ? "is-active" : ""} onClick={() => toggleTaste(taste)}>{taste}</button>)}</div></div><div className="cxsmo-account-next__measure"><span><Ruler size={15} /> Fit reference / optional</span><div><label>Height<input value={draft.height} onChange={(event) => setDraft({ ...draft, height: event.target.value })} placeholder="e.g. 174 cm" /></label><label>Waist<input value={draft.waist} onChange={(event) => setDraft({ ...draft, waist: event.target.value })} placeholder="e.g. 76 cm" /></label><label>Shoe size<input value={draft.shoeSize} onChange={(event) => setDraft({ ...draft, shoeSize: event.target.value })} placeholder="e.g. EU 40" /></label></div></div><button type="button" className="cxsmo-button" onClick={save}>{saved ? <><Check size={16} /> Local signals saved</> : "Save local signals"}</button></div>
    </section>
    <section className="cxsmo-account-recommendations">
      <div><p className="section-label"><WandSparkles size={14} /> Style suggestions / local demo</p><h2>{recommendations.length ? "A next signal," : "Choose a signal,"}<br /><em>{recommendations.length ? "not a claim." : "then see the edit."}</em></h2><p>{recommendations.length ? "These object suggestions only respond to the preferences you selected in this browser. They are not purchase history, profiling, or an algorithmic customer record." : "Select one or more taste signals above to preview the recommendation architecture. Nothing is sent to C✦SMO."}</p></div>
      <div className="cxsmo-account-recommendations__objects">{recommendations.length ? recommendations.map((product) => { const isSaved = savedRecommendationIds.includes(product.id); return <article key={product.id}><Link href={`/cxsmo/products/${product.id}`}><img src={product.image} alt="" /><span><b>{product.name}</b><small>Suggested from your local taste signals</small></span></Link><button data-cxsmo-sound="treasure" type="button" className={isSaved ? "is-saved" : ""} onClick={() => toggleSavedRecommendation(product.id)}><Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />{isSaved ? "Saved recommendation" : "Save recommendation"}</button></article>; }) : <div className="cxsmo-account-recommendations__empty">No recommendation yet. Your taste controls stay in the browser until you choose to save them.</div>}</div>
      {savedRecommendationIds.length > 0 && <p className="cxsmo-account-recommendations__saved"><Bookmark size={14} fill="currentColor" />{savedRecommendationIds.length} locally saved recommendation{savedRecommendationIds.length === 1 ? "" : "s"}. This list is separate from your general save list and stays in this browser.</p>}
    </section>
  </>;
}
