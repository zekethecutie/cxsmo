import { Archive, ArrowUpRight, Boxes, CheckCircle2, Image, MessageSquareText, PackageCheck, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { KinformWordmark } from "@/components/KinformShell";
import { kinformProducts } from "@/lib/kinform";
import "./kinform-admin.css";
import "./kinform-admin-mobile.css";
import "./kinform-admin-operations.css";
import "./kinform-admin-deep.css";

type AdminTab = "overview" | "orders" | "catalogue" | "operations" | "campaigns" | "customers" | "reports" | "settings" | "feedback";

const tabs: { id: AdminTab; label: string; icon: typeof Boxes }[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "orders", label: "Orders", icon: PackageCheck },
  { id: "catalogue", label: "Products", icon: Boxes },
  { id: "operations", label: "Inventory", icon: Archive },
  { id: "campaigns", label: "Campaigns", icon: Image },
  { id: "customers", label: "Customers", icon: MessageSquareText },
  { id: "reports", label: "Reports", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Boxes },
  { id: "feedback", label: "Feedback", icon: MessageSquareText },
];

const adminMerchandisingImage = "/manus-storage/kinform-admin-operations-flatlay_5709f29c.jpg";
const portfolioGateKey = "kinform-portfolio-admin-unlocked";
const portfolioGateCode = "kinform";

const heading: Record<AdminTab, string> = {
  overview: "Store overview",
  orders: "Order desk",
  catalogue: "Product management",
  operations: "Inventory posture",
  campaigns: "Campaign planning",
  customers: "Customer workspace",
  reports: "Store reporting",
  settings: "Store settings",
  feedback: "Verified feedback",
};

function AdminAccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === portfolioGateCode) { sessionStorage.setItem(portfolioGateKey, "true"); onUnlock(); return; }
    setError(true);
  };
  return <main className="kinform-admin-gate"><section><div className="kinform-admin-gate__brand"><KinformWordmark /><span>Portfolio admin demonstration</span></div><div className="kinform-admin-gate__panel"><p className="eyebrow">Access the owner console</p><h1>Store<br />management,<br /><em>in view.</em></h1><p>This gate protects the portfolio demonstration only. It is client-side and is not production authentication, customer access control, or real store security.</p><form onSubmit={submit}><label htmlFor="kinform-demo-access">Portfolio access code</label><div><input id="kinform-demo-access" autoComplete="off" autoFocus type="password" value={value} onChange={(event) => { setValue(event.target.value); setError(false); }} aria-describedby={error ? "kinform-demo-error" : undefined} /><button type="submit">Open console <ArrowUpRight size={16} /></button></div>{error && <small id="kinform-demo-error" role="alert">That portfolio code does not match. Try again.</small>}</form><Link href="/kinform">Return to storefront <ArrowUpRight size={15} /></Link></div></section></main>;
}

export function KinformAdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => { setUnlocked(sessionStorage.getItem(portfolioGateKey) === "true"); setChecked(true); }, []);
  if (!checked || !unlocked) return <AdminAccessGate onUnlock={() => setUnlocked(true)} />;
  return <AdminConsole onLock={() => { sessionStorage.removeItem(portfolioGateKey); setUnlocked(false); }} />;
}

function AdminConsole({ onLock }: { onLock: () => void }) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [selectedId, setSelectedId] = useState(kinformProducts[0].id);
  const selected = kinformProducts.find((product) => product.id === selectedId) ?? kinformProducts[0];
  return <main className="kinform-admin"><aside className="kinform-admin-sidebar"><Link href="/kinform"><KinformWordmark /></Link><div className="kinform-admin-sidebar__label">Portfolio store manager</div><nav aria-label="Store management sections">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={tab === id ? "is-active" : ""} aria-current={tab === id ? "page" : undefined} onClick={() => setTab(id)}><Icon size={16} />{label}</button>)}</nav><div className="kinform-admin-sidebar__bottom"><span>Fictional KINFORM data</span><Link href="/kinform">Open storefront <ArrowUpRight size={15} /></Link><button className="kinform-admin-lock" onClick={onLock}>Lock portfolio demo</button></div></aside><section className="kinform-admin-main"><header className="kinform-admin-topbar"><div><span>Owner console concept</span><h1>{heading[tab]}</h1></div><div className="kinform-admin-live-note"><i /><span>Portfolio data only</span></div></header>{tab === "overview" && <AdminOverview onNavigate={setTab} />}{tab === "orders" && <AdminOrders />}{tab === "catalogue" && <AdminCatalogue selectedId={selectedId} setSelectedId={setSelectedId} selected={selected} />}{tab === "operations" && <AdminOperations />}{tab === "campaigns" && <AdminCampaigns />}{tab === "customers" && <AdminCustomers />}{tab === "reports" && <AdminReports />}{tab === "settings" && <AdminSettings />}{tab === "feedback" && <AdminFeedback />}</section></main>;
}

function AdminOverview({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  return <div className="kinform-admin-content"><section className="kinform-admin-hero"><div><p>One considered workspace for products, availability, order requests, campaigns, service, and store setup. This is a portfolio illustration of the operations a real apparel brand could manage.</p><button onClick={() => onNavigate("orders")}>Review order desk <ArrowUpRight size={15} /></button></div><img src={adminMerchandisingImage} alt="KINFORM product merchandising arrangement on a studio table" /></section><section className="kinform-admin-metrics"><article><span>Products</span><strong>04</strong><p>fictional objects with media and options mapped</p><button onClick={() => onNavigate("catalogue")}>Manage products <ArrowUpRight size={14} /></button></article><article><span>Order requests</span><strong>01</strong><p>portfolio request staged for stock review</p><button onClick={() => onNavigate("orders")}>Open order desk <ArrowUpRight size={14} /></button></article><article><span>Launch checks</span><strong>07</strong><p>store management patterns ready to connect</p><button onClick={() => onNavigate("settings")}>Review settings <ArrowUpRight size={14} /></button></article></section><section className="kinform-admin-overview-grid"><article className="kinform-admin-checklist"><div><p className="eyebrow">Store readiness</p><h2>What the owner<br />can act on.</h2></div><ul><li><CheckCircle2 size={15} /> Product names, pricing, sizes, and media are organised</li><li><CheckCircle2 size={15} /> Availability posture is visible before an order request</li><li><CheckCircle2 size={15} /> Campaign assets have an owner planning view</li><li><Archive size={15} /> Live payment, shipping, customers, and reviews remain unconnected</li></ul></article><article className="kinform-admin-operation"><p className="eyebrow">Operator perspective</p><h2>Fewer handoffs.<br />More clarity.</h2><p>Each dashboard module is deliberately shaped as a future live integration point rather than a fabricated business result.</p><button onClick={() => onNavigate("reports")}>Open reporting <ArrowUpRight size={15} /></button></article></section></div>;
}

function AdminOrders() {
  const [status, setStatus] = useState<"staged" | "reviewed" | "prepared">("staged");
  const copy = status === "staged" ? "Awaiting stock review" : status === "reviewed" ? "Stock posture confirmed" : "Prepared for future fulfilment";
  const action = status === "staged" ? () => setStatus("reviewed") : status === "reviewed" ? () => setStatus("prepared") : () => setStatus("staged");
  const actionLabel = status === "staged" ? "Confirm stock posture" : status === "reviewed" ? "Prepare fulfilment handoff" : "Reset demonstration request";
  return <div className="kinform-admin-content"><section className="kinform-admin-module-intro"><div><p className="eyebrow">Order management</p><h2>Review before<br />you promise.</h2><p>Requests are a safer first bridge between availability and fulfilment. The content here is fictional and stores no customer identity, address, payment, or real order.</p></div><Link href="/kinform/inventory">Open availability board <ArrowUpRight size={15} /></Link></section><section className="kinform-admin-order-table"><header><span>Request</span><span>Items</span><span>Source</span><span>State</span></header><article><b>Request 001</b><span>Line Tee · M</span><span>Availability board</span><em className={`is-${status}`}>{copy}</em></article></section><section className="kinform-admin-order-detail"><div><p className="eyebrow">Request 001</p><h2>One request,<br />clear next step.</h2><p>Portfolio state transitions demonstrate the operator’s stock-review path. In a live store this would connect to Shopify draft orders, inventory, fulfilment, and an approved notification channel.</p></div><aside><dl><div><dt>Availability</dt><dd>12 fictional units</dd></div><div><dt>Customer data</dt><dd>Not collected</dd></div><div><dt>Payment</dt><dd>Not connected</dd></div></dl><button onClick={action}>{actionLabel} <ArrowUpRight size={15} /></button></aside></section></div>;
}

function AdminCatalogue({ selectedId, setSelectedId, selected }: { selectedId: string; setSelectedId: (id: string) => void; selected: typeof kinformProducts[number] }) {
  return <div className="kinform-admin-content"><section className="kinform-admin-catalogue-intro"><div><p>Fictional product data is used only to demonstrate catalogue structure and media-ready product management.</p><span><PackageCheck size={15} /> All object records are complete for the portfolio flow</span></div><button onClick={() => setSelectedId(kinformProducts[0].id)}>Reset selection</button></section><section className="kinform-admin-catalogue"><div className="kinform-admin-table" role="list" aria-label="Fictional product catalogue">{kinformProducts.map((product) => <button role="listitem" key={product.id} className={selectedId === product.id ? "is-selected" : ""} onClick={() => setSelectedId(product.id)}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.type}</small></span><em>{product.shade}</em><strong>${product.price}</strong><i><CheckCircle2 size={14} /> Ready</i></button>)}</div><aside className="kinform-admin-product-inspector"><img src={selected.image} alt={selected.name} /><p className="eyebrow">Selected object {selected.number}</p><h2>{selected.name}</h2><dl><div><dt>Product media</dt><dd>Mapped</dd></div><div><dt>Material note</dt><dd>{selected.composition}</dd></div><div><dt>Storefront status</dt><dd>Portfolio ready</dd></div></dl><Link href={`/kinform/products/${selected.id}`}>Open storefront view <ArrowUpRight size={15} /></Link></aside></section></div>;
}

function AdminOperations() {
  const allocation = ["28 sample units", "12 sample units", "16 sample units", "9 sample units"];
  return <div className="kinform-admin-content"><section className="kinform-admin-operations-intro"><div><p className="eyebrow">Inventory posture</p><h2>Know what is<br />ready to move.</h2><p>The quantities below are fictional sample allocations included only to demonstrate an inventory view. A production console would read actual availability from the chosen commerce system.</p></div><span>Not connected to live inventory</span></section><section className="kinform-admin-inventory"><div className="kinform-admin-inventory__head"><span>Object</span><span>Media state</span><span>Sample allocation</span><span>Readiness</span></div>{kinformProducts.map((product, index) => <article key={product.id}><div><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.shade}</small></span></div><span className="is-ready"><CheckCircle2 size={14} /> Mapped</span><strong>{allocation[index]}</strong><span className={index === 3 ? "is-watch" : "is-ready"}>{index === 3 ? "Review next" : "Ready"}</span></article>)}</section><section className="kinform-admin-service"><div><p className="eyebrow">Customer service workflow</p><h2>Keep the next<br />conversation clear.</h2><p>This portfolio console does not connect to an inbox, customer identity, order history, or personal data. It illustrates where an owner would triage legitimate service requests after a real launch.</p></div><div className="kinform-admin-service__empty"><MessageSquareText size={27} /><h3>No connected service requests</h3><p>Connect an approved support channel to enable a real queue.</p><button disabled>Queue unavailable in portfolio mode</button></div></section></div>;
}

function AdminCampaigns() {
  const [selection, setSelection] = useState("Passage");
  return <div className="kinform-admin-content"><section className="kinform-admin-campaign-grid"><article className="kinform-admin-campaign-visual"><img src={adminMerchandisingImage} alt="KINFORM apparel merchandising layout" /><span>Campaign asset study</span></article><article className="kinform-admin-campaign-copy"><p className="eyebrow">Sequence planning</p><h2>Start with the<br />material, then<br />the message.</h2><p>Assets can be grouped into a launch sequence before they reach the storefront. The buttons below demonstrate selection only and do not publish content.</p><div>{["Passage", "Material", "Objects"].map((item) => <button key={item} className={selection === item ? "is-active" : ""} onClick={() => setSelection(item)}>{item}</button>)}</div><span>Selected sequence: <b>{selection}</b></span></article></section><section className="kinform-admin-schedule"><div><p className="eyebrow">Portfolio campaign schedule</p><h2>Ready to adapt<br />to a real release.</h2></div><ol><li><b>01</b><span>Collection visual direction</span><em>Original asset set</em></li><li><b>02</b><span>Product material studies</span><em>Mapped to objects</em></li><li><b>03</b><span>Journal passage</span><em>Editorial route ready</em></li></ol></section></div>;
}

function AdminCustomers() {
  return <div className="kinform-admin-content"><section className="kinform-admin-module-intro"><div><p className="eyebrow">Customer workspace</p><h2>Keep data<br />earned.</h2><p>This empty workspace is intentional. A real store would surface consented customer profiles, order history, service context, and saved products only after the right data connection and privacy policy are in place.</p></div><span className="kinform-admin-module-intro__status">0 connected records</span></section><section className="kinform-admin-empty-workspace"><MessageSquareText size={32} /><h3>No customer records in portfolio mode</h3><p>Connect a real commerce customer source when the store is ready. No names, emails, addresses, or fabricated profiles are shown here.</p><button disabled>Customer import unavailable</button></section></div>;
}

function AdminReports() {
  return <div className="kinform-admin-content"><section className="kinform-admin-module-intro"><div><p className="eyebrow">Reporting workspace</p><h2>Signals before<br />numbers.</h2><p>The dashboard structure is ready for performance reporting, but it does not invent sales, customers, conversion, or traffic results for a fictional store.</p></div><span className="kinform-admin-module-intro__status">Live data unconnected</span></section><section className="kinform-admin-report-grid"><article><span>Revenue</span><strong>Unavailable</strong><p>Connect approved order data to report realised revenue.</p></article><article><span>Conversion</span><strong>Unavailable</strong><p>Connect consented analytics to measure the storefront funnel.</p></article><article><span>Product readiness</span><strong>04 of 04</strong><p>Fictional objects have catalogue copy and media mapped.</p></article><article><span>Campaign assets</span><strong>07</strong><p>Original visuals available for portfolio sequencing.</p></article></section><section className="kinform-admin-report-note"><p>Portfolio rule</p><h2>No fabricated<br />business performance.</h2><p>Meaningful reporting begins only once the store receives real events from approved systems.</p></section></div>;
}

function AdminSettings() {
  const [density, setDensity] = useState("Calm");
  return <div className="kinform-admin-content"><section className="kinform-admin-module-intro"><div><p className="eyebrow">Store settings</p><h2>Configure the<br />right foundation.</h2><p>These local portfolio controls demonstrate where an operator would govern channels, policies, notifications, and the publishing posture of a future store.</p></div><span className="kinform-admin-module-intro__status">No live changes</span></section><section className="kinform-admin-settings"><article><span>Store channel</span><b>Portfolio storefront</b><small>Public KINFORM concept route</small></article><article><span>Commerce connection</span><b>Future Shopify handoff</b><small>Live KNIALL catalogue remains unconnected</small></article><article><span>Notifications</span><b>Portfolio disabled</b><small>No customer or owner messages are sent</small></article><article><span>Interface density</span><div>{["Calm", "Compact"].map((item) => <button key={item} className={density === item ? "is-active" : ""} onClick={() => setDensity(item)}>{item}</button>)}</div><small>Local display selection only</small></article></section></div>;
}

function AdminFeedback() {
  return <div className="kinform-admin-content"><section className="kinform-admin-feedback"><div><p className="eyebrow">Verified feedback workflow</p><h2>Trust has to be<br />earned first.</h2><p>This interface is deliberately empty. It demonstrates the place where consented, verified-purchase feedback could be moderated and shown after a real launch.</p><span>No reviews, ratings, testimonials, comments, or customer identities have been fabricated for this portfolio project.</span></div><div className="kinform-admin-feedback__empty"><MessageSquareText size={28} /><h3>No verified feedback yet</h3><p>Connect an approved, verified-order source when the real store is ready.</p><button disabled>Moderation queue unavailable</button></div></section><section className="kinform-admin-feedback-steps"><article><b>01</b><h3>Verify</h3><p>Confirm a purchase and consent before content becomes eligible for display.</p></article><article><b>02</b><h3>Moderate</h3><p>Review customer text and optional images using the retailer’s approved policies.</p></article><article><b>03</b><h3>Publish</h3><p>Present genuine feedback on the relevant product only after it is verified.</p></article></section></div>;
}
