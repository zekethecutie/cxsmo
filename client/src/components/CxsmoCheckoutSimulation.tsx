import { ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";
import { Link } from "wouter";
import { MapView } from "@/components/Map";
import { useCxsmoDemo } from "@/contexts/CxsmoDemoContext";
import { cxsmoProducts, formatCxsmoPrice } from "@/lib/cxsmo";
import "@/pages/cxsmo-checkout.css";

export function CxsmoCheckoutSimulation() {
  const { bag, profile } = useCxsmoDemo();
  const [destination, setDestination] = useState(profile.destination);
  const [showMap, setShowMap] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [staged, setStaged] = useState(false);
  const lines = bag.map((line) => ({ ...line, product: cxsmoProducts.find((item) => item.id === line.productId) })).filter((line): line is typeof line & { product: NonNullable<typeof line.product> } => Boolean(line.product));
  const total = lines.reduce((sum, line) => sum + line.product.price, 0);
  const onMapReady = useCallback((map: google.maps.Map) => {
    if (!destination.trim() || !window.google?.maps?.Geocoder) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(13);
      new window.google.maps.Marker({ map, position: location, title: "Browser-only delivery preview" });
    });
  }, [destination]);
  const stage = (event: FormEvent) => { event.preventDefault(); if (acknowledged) setStaged(true); };
  if (!lines.length) return <section className="cxsmo-checkout"><p className="section-label">Checkout / simulation</p><h1>Nothing to stage<br /><em>yet.</em></h1><p>Add a fictional C✦SMO object to preview a portfolio checkout.</p><Link className="cxsmo-button" href="/cxsmo/shop">Browse the drop</Link></section>;
  return <section className="cxsmo-checkout"><div className="cxsmo-checkout__head"><div><p className="section-label">Checkout / browser simulation</p><h1>One last<br /><em>signal.</em></h1></div><Link href="/cxsmo/bag"><ArrowLeft size={15} /> Back to bag</Link></div><div className="cxsmo-checkout__notice"><ShieldCheck size={20} /><p><b>Display-only checkout.</b> No payment, order, address, or contact information is transmitted or retained by C✦SMO. The map is a browser-session delivery preview only.</p></div><div className="cxsmo-checkout__grid"><form onSubmit={stage}><label>Destination for map preview<input value={destination} onChange={(event) => { setDestination(event.target.value); setShowMap(false); }} placeholder="City and country" /></label><button type="button" className="cxsmo-checkout__map-button" onClick={() => setShowMap(Boolean(destination.trim()))}><MapPin size={16} /> Preview location on map</button>{showMap && <div className="cxsmo-checkout__map"><MapView key={destination} initialZoom={3} className="h-[280px]" onMapReady={onMapReady} /></div>}<label className="cxsmo-checkout__consent"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} /><span>I understand this is a fictional checkout demonstration and that no purchase or delivery will be created.</span></label><button className="cxsmo-button" disabled={!acknowledged} type="submit">{staged ? <><CheckCircle2 size={16} /> Checkout preview staged</> : "Stage checkout preview"}</button>{staged && <p className="cxsmo-checkout__success">Preview staged in this browser only. No order reference, receipt, or personal-data record has been created.</p>}</form><aside><p>Order simulation</p>{lines.map((line, index) => <div key={`${line.productId}-${index}`}><img src={line.product.image} alt="" /><span><b>{line.product.name}</b><small>Size {line.size}</small></span><em>{formatCxsmoPrice(line.product.price, profile.locale, profile.currency)}</em></div>)}<div className="cxsmo-checkout__total"><span>Portfolio total</span><b>{formatCxsmoPrice(total, profile.locale, profile.currency)}</b></div><small>Currency display follows your local C✦SMO preference. Product prices and exchange conversion are fictional presentation values.</small></aside></div></section>;
}
