import { Check, Heart, MapPin, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import { ProductCard } from "@/pages/CxsmoStorefront";
import { CxsmoAccountNextPanel } from "@/components/CxsmoAccountNextPanel";
import "@/pages/cxsmo-account-journey.css";

function CxsmoAccountTrustStates() {
  return <section className="cxsmo-account-trust"><article><span>Parcel tracking / data-ready</span><h3>0 active deliveries</h3><p>Tracking, dispatch, received, cancelled, and return states appear only after a verified purchase source is connected.</p></article><article><span>Ratings / purchase-gated</span><h3>0 eligible ratings</h3><p>C✦SMO does not unlock ratings without an actual fulfilled purchase, so no star score is simulated here.</p></article><article><span>Comments / moderation-ready</span><h3>Nothing to publish</h3><p>A future comment surface can accept real verified feedback with moderation controls. It intentionally has no invented posts.</p></article></section>;
}

export function CxsmoAccountPanel() {
  const { savedIds, profile, updateProfile } = useCxsmoDemo();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const savedProducts = cxsmoProducts.filter((product) => savedIds.includes(product.id));
  const commit = () => { updateProfile(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  return <>
    <section className="cxsmo-account cxsmo-account--expanded"><div><p className="section-label">Your frequency / local demo</p><h1>{profile.isConfigured ? <>Hi, {profile.displayName || "signal"}.<br /><em>Keep it tuned.</em></> : <>Saved<br /><em>for later.</em></>}</h1><p>Set a browser-only account profile, local delivery preference, and style mode. No sign-in, contact data, or order is sent anywhere.</p></div><aside><span>Portfolio account</span><b>{profile.isConfigured ? "Local profile active" : "0 connected orders"}</b><p>{profile.isConfigured ? "Your preferences are stored only in this browser for the C✦SMO demonstration." : "Sign-in, purchase history, and real customer details are intentionally not represented."}</p></aside></section>
    <section className="cxsmo-account-settings" aria-label="Portfolio account preferences"><div className="cxsmo-account-settings__head"><div><p className="section-label">ACCOUNT CUSTOMIZE / LOCAL ONLY</p><h2>Set your<br /><em>frequency.</em></h2></div><Sparkles size={26} /></div><div className="cxsmo-account-settings__grid"><label><span><SlidersHorizontal size={15} /> Display name</span><input value={draft.displayName} onChange={(event) => setDraft({ ...draft, displayName: event.target.value })} placeholder="How should C✦SMO address you?" /></label><label><span><MapPin size={15} /> Delivery preference</span><input value={draft.destination} onChange={(event) => setDraft({ ...draft, destination: event.target.value })} placeholder="City / country — stays in this browser" /></label><div className="cxsmo-account-settings__mode"><span>Style frequency</span><div>{(["Signal", "Quiet", "Chrome"] as const).map((mode) => <button type="button" key={mode} className={draft.styleMode === mode ? "is-active" : ""} onClick={() => setDraft({ ...draft, styleMode: mode })}>{mode}</button>)}</div></div><label className="cxsmo-account-settings__switch"><input type="checkbox" checked={draft.updatesEnabled} onChange={(event) => setDraft({ ...draft, updatesEnabled: event.target.checked })} /><span>Allow fictional drop-alert preview in this browser</span></label></div><div className="cxsmo-account-settings__actions"><button className="cxsmo-button" type="button" onClick={commit}>{saved ? <><Check size={16} /> Preferences saved</> : "Save local preferences"}</button><small>Portfolio-only state. This does not create a real account, notification, or delivery record.</small></div></section>
    <section className="cxsmo-account-history"><div><p className="section-label">Order surface / data-ready</p><h2>Nothing shipped.<br /><em>Nothing invented.</em></h2></div><article><span>0 verified orders</span><p>A live store would display fulfilled orders, parcel tracking, and return requests here only after real purchases. C✦SMO keeps this empty until connected to a verified commerce source.</p><Link href="/cxsmo/bag">Open bag preview</Link></article></section>
    <CxsmoAccountTrustStates />
    <CxsmoAccountNextPanel />
    <section className="cxsmo-saved-grid">{savedProducts.length ? savedProducts.map((product, index) => <ProductCard product={product} order={`0${index + 1}`} key={product.id} />) : <div className="cxsmo-empty-state"><Heart size={24} /><h2>Your save list is clear.</h2><p>Tap the heart on a C✦SMO object to keep it here.</p><Link className="cxsmo-button" href="/cxsmo/shop">Browse the drop</Link></div>}</section>
  </>;
}
