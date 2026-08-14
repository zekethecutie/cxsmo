import { Check, Heart, LogIn, LogOut, MapPin, SlidersHorizontal, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoProducts } from "@/lib/cxsmo";
import { ProductCard } from "@/pages/CxsmoStorefront";
import { CxsmoAccountNextPanel } from "@/components/CxsmoAccountNextPanel";
import "@/pages/cxsmo-account-journey.css";
import "@/pages/cxsmo-simulation-flow.css";

function CxsmoAccountTrustStates() {
  return <section className="cxsmo-account-trust"><article><span>Parcel tracking / data-ready</span><h3>0 active deliveries</h3><p>Tracking, dispatch, received, cancelled, and return states appear only after a verified purchase source is connected.</p></article><article><span>Ratings / purchase-gated</span><h3>0 eligible ratings</h3><p>C✦SMO does not unlock ratings without an actual fulfilled purchase, so no star score is simulated here.</p></article><article><span>Comments / moderation-ready</span><h3>Nothing to publish</h3><p>A future comment surface can accept real verified feedback with moderation controls. It intentionally has no invented posts.</p></article></section>;
}

export function CxsmoAccountPanel() {
  const { bag, savedIds, profile, updateProfile, startLocalAccount, signOutLocalAccount } = useCxsmoDemo();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [accessMode, setAccessMode] = useState<"create" | "sign-in">("create");
  const [accessName, setAccessName] = useState(profile.displayName);
  const savedProducts = cxsmoProducts.filter((product) => savedIds.includes(product.id));
  const shopperFlow = [
    { step: "01", label: "Discover", detail: "Search the fictional drop and stage a favourite object.", state: savedIds.length ? `${savedIds.length} saved` : "Ready" },
    { step: "02", label: "Tune", detail: "Set local fit, taste, and delivery preferences in this browser.", state: profile.isConfigured ? "Set" : "Optional" },
    { step: "03", label: "Bag", detail: "Build a browser-local basket with no payment attached.", state: `${bag.length} staged` },
    { step: "04", label: "Preview", detail: "Review delivery hierarchy and consent without creating an order.", state: "No order" },
  ];
  const commit = () => { updateProfile(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  return <>
    <section className="cxsmo-account cxsmo-account--expanded"><div><p className="section-label">Your frequency / local demo</p><h1>{profile.isSignedIn ? <>Hi, {profile.displayName || "signal"}.<br /><em>Keep it tuned.</em></> : <>Make this<br /><em>your frequency.</em></>}</h1><p>Set a browser-only account profile, local delivery preference, and style mode. No password, contact data, or order is sent anywhere.</p></div><aside><span>Portfolio account</span><b>{profile.isSignedIn ? "Local session active" : "No local session"}</b><p>{profile.isSignedIn ? "Your preferences are stored only in this browser for the C✦SMO demonstration." : "Create or restore a browser-local demo session to unlock settings and onboarding continuity."}</p></aside></section>
    {!profile.isSignedIn && <section className="cxsmo-account-access" aria-label="Local account simulation"><div><p className="section-label">Local account / no credentials</p><h2>{accessMode === "create" ? "Set your handle." : "Return to your signal."}</h2><p>This is a local interaction study, not a real identity system. It stores a display name on this device only.</p></div><form onSubmit={(event) => { event.preventDefault(); startLocalAccount(accessName); setDraft((current) => ({ ...current, displayName: accessName.trim() || current.displayName })); }}><label>Display handle<input value={accessName} onChange={(event) => setAccessName(event.target.value)} placeholder="e.g. chromeafterdark" /></label><button className="cxsmo-button" type="submit">{accessMode === "create" ? <><UserPlus size={16} /> Create local profile</> : <><LogIn size={16} /> Restore local session</>}</button><div><button type="button" onClick={() => setAccessMode("create")} className={accessMode === "create" ? "is-active" : ""}>Create</button><button type="button" onClick={() => setAccessMode("sign-in")} className={accessMode === "sign-in" ? "is-active" : ""}>Sign in</button></div></form></section>}
    <section className="cxsmo-simulation-flow" aria-label="Browser-local shopper flow"><div><p className="section-label">SHOPPER FLOW / LOCAL ONLY</p><h2>See the route<br /><em>before the real build.</em></h2><span>Each state responds to this browser only. Nothing becomes a customer profile, payment, or fulfilment record.</span></div><ol>{shopperFlow.map((item) => <li key={item.step}><b>{item.step}</b><div><strong>{item.label}</strong><p>{item.detail}</p></div><em>{item.state}</em></li>)}</ol></section>
    <section className="cxsmo-account-settings" aria-label="Portfolio account preferences"><div className="cxsmo-account-settings__head"><div><p className="section-label">ACCOUNT CUSTOMIZE / LOCAL ONLY</p><h2>Set your<br /><em>frequency.</em></h2></div><Sparkles size={26} /></div><div className="cxsmo-account-settings__grid"><label><span><SlidersHorizontal size={15} /> Display name</span><input value={draft.displayName} onChange={(event) => setDraft({ ...draft, displayName: event.target.value })} placeholder="How should C✦SMO address you?" /></label><label><span><MapPin size={15} /> Delivery preference</span><input value={draft.destination} onChange={(event) => setDraft({ ...draft, destination: event.target.value })} placeholder="City / country — stays in this browser" /></label><div className="cxsmo-account-settings__mode"><span>Style frequency</span><div>{(["Signal", "Quiet", "Chrome"] as const).map((mode) => <button type="button" key={mode} className={draft.styleMode === mode ? "is-active" : ""} onClick={() => setDraft({ ...draft, styleMode: mode })}>{mode}</button>)}</div></div><label className="cxsmo-account-settings__switch"><input type="checkbox" checked={draft.updatesEnabled} onChange={(event) => setDraft({ ...draft, updatesEnabled: event.target.checked })} /><span>Allow fictional drop-alert preview in this browser</span></label></div><div className="cxsmo-account-settings__actions"><button className="cxsmo-button" type="button" onClick={commit}>{saved ? <><Check size={16} /> Preferences saved</> : "Save local preferences"}</button>{profile.isSignedIn && <button className="cxsmo-account-signout" type="button" onClick={signOutLocalAccount}><LogOut size={15} /> Sign out on this device</button>}<small>Portfolio-only state. This does not create a real account, notification, or delivery record.</small></div></section>
    <section className="cxsmo-account-history"><div><p className="section-label">Order surface / data-ready</p><h2>Nothing shipped.<br /><em>Nothing invented.</em></h2></div><article><span>0 verified orders</span><p>A live store would display fulfilled orders, parcel tracking, and return requests here only after real purchases. C✦SMO keeps this empty until connected to a verified commerce source.</p><Link href="/cxsmo/bag">Open bag preview</Link></article></section>
    <CxsmoAccountTrustStates />
    <CxsmoAccountNextPanel />
    <section className="cxsmo-saved-grid">{savedProducts.length ? savedProducts.map((product, index) => <ProductCard product={product} order={`0${index + 1}`} key={product.id} />) : <div className="cxsmo-empty-state"><Heart size={24} /><h2>Your save list is clear.</h2><p>Tap the heart on a C✦SMO object to keep it here.</p><Link className="cxsmo-button" href="/cxsmo/shop">Browse the drop</Link></div>}</section>
  </>;
}
