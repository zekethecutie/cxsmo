import { Check, Ruler, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import "@/pages/cxsmo-account-next.css";

const tasteOptions = ["Baggy denim", "Graphic layers", "Chrome objects", "Soft tailoring", "Beauty detail", "Skate profile"];
const localeOptions = [{ country: "United States", locale: "en-US", currency: "USD" as const }, { country: "Philippines", locale: "en-PH", currency: "PHP" as const }, { country: "Japan", locale: "ja-JP", currency: "JPY" as const }, { country: "China", locale: "zh-CN", currency: "CNY" as const }, { country: "Euro area", locale: "de-DE", currency: "EUR" as const }];

export function CxsmoAccountNextPanel() {
  const { profile, updateProfile } = useCxsmoDemo();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const toggleTaste = (taste: string) => setDraft((current) => ({ ...current, tastes: current.tastes.includes(taste) ? current.tastes.filter((item) => item !== taste) : [...current.tastes, taste] }));
  const save = () => { updateProfile(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1700); };
  return <section className="cxsmo-account-next"><div><p className="section-label">Onboarding / simulation</p><h2>Teach the edit<br /><em>your signal.</em></h2><p>These preferences are browser-local, optional, and used only to demonstrate how a future recommendation and fit experience could be structured.</p></div><div className="cxsmo-account-next__controls"><label><span><Star size={15} /> Price display</span><select value={`${draft.country}|${draft.currency}`} onChange={(event) => { const option = localeOptions.find((item) => `${item.country}|${item.currency}` === event.target.value); if (option) setDraft({ ...draft, ...option }); }}>{localeOptions.map((option) => <option value={`${option.country}|${option.currency}`} key={option.currency}>{option.country} / {option.currency}</option>)}</select></label><div className="cxsmo-account-next__tastes"><span><Sparkles size={15} /> Taste signals</span><div>{tasteOptions.map((taste) => <button type="button" key={taste} className={draft.tastes.includes(taste) ? "is-active" : ""} onClick={() => toggleTaste(taste)}>{taste}</button>)}</div></div><div className="cxsmo-account-next__measure"><span><Ruler size={15} /> Fit reference / optional</span><div><label>Height<input value={draft.height} onChange={(event) => setDraft({ ...draft, height: event.target.value })} placeholder="e.g. 174 cm" /></label><label>Waist<input value={draft.waist} onChange={(event) => setDraft({ ...draft, waist: event.target.value })} placeholder="e.g. 76 cm" /></label><label>Shoe size<input value={draft.shoeSize} onChange={(event) => setDraft({ ...draft, shoeSize: event.target.value })} placeholder="e.g. EU 40" /></label></div></div><button type="button" className="cxsmo-button" onClick={save}>{saved ? <><Check size={16} /> Local signals saved</> : "Save local signals"}</button></div></section>;
}
