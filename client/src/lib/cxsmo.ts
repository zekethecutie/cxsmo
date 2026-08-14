export type CxsmoProduct = {
  id: string;
  drop: string;
  name: string;
  category: "Denim" | "Graphics" | "Outerwear" | "Tailoring" | "Accessories" | "Footwear" | "Beauty" | "Lifestyle";
  color: string;
  price: number;
  image: string;
  description: string;
  fit: string;
  details: string[];
};

export const cxsmoCategories = ["All", "New drop", "Denim", "Graphics", "Outerwear", "Tailoring", "Accessories", "Footwear", "Beauty", "Lifestyle"] as const;

export const cxsmoProducts: CxsmoProduct[] = [
  {
    id: "gravity-01",
    drop: "01",
    name: "Gravity Puddle Jean",
    category: "Denim",
    color: "Static Grey",
    price: 184,
    image: "/manus-storage/cxsmo-gravity-jean-v3_abb22ebf.png",
    description: "Low-slung volume, a long break, and a washed graphite surface that catches light in motion.",
    fit: "Ultra-relaxed, puddle-length leg",
    details: ["12.5 oz washed denim", "Curved outseam", "Chrome star-loop charm"],
  },
  {
    id: "orbit-02",
    drop: "02",
    name: "Orbit Ringer Tee",
    category: "Graphics",
    color: "Milk / Ink",
    price: 76,
    image: "/manus-storage/cxsmo-orbit-tee-v3_20bdb89a.png",
    description: "A close-but-not-tight ringer tee with a small orbital star print and soft, worn-in ribbing.",
    fit: "Fitted shoulder, easy body",
    details: ["Cotton rib jersey", "Contrast binding", "Original star-orbit graphic"],
  },
  {
    id: "starlight-03",
    drop: "03",
    name: "Starlight Moto Shell",
    category: "Outerwear",
    color: "Night Chrome",
    price: 268,
    image: "/manus-storage/cxsmo-starlight-shell-v3_35e7e76c.png",
    description: "A boxy outer layer made to sit over a tiny tee or a full jersey stack, with a reflective edge flash.",
    fit: "Cropped, relaxed shoulder",
    details: ["Water-resistant shell", "Polished zip pull", "Removable star patch"],
  },
  {
    id: "signal-04",
    drop: "04",
    name: "Signal Check Overshirt",
    category: "Tailoring",
    color: "Cloud Check",
    price: 162,
    image: "/manus-storage/cxsmo-signal-overshirt-v3_8699feec.png",
    description: "An easy checked layer with a sharper collar, designed to break up a denim-heavy silhouette.",
    fit: "Wide through the body",
    details: ["Brushed check twill", "Softly structured cuff", "Tonal embroidered sleeve"],
  },
  {
    id: "orbit-05",
    drop: "05",
    name: "Orbit Key Charm",
    category: "Accessories",
    color: "Polished Silver",
    price: 34,
    image: "/manus-storage/cxsmo-key-charm-v2_4aeaef58.png",
    description: "A compact metal charm designed to hang from a belt loop, bag zipper, or key ring without becoming costume.",
    fit: "One size",
    details: ["Polished metal finish", "Four-point-star silhouette", "Split-ring clasp"],
  },
  {
    id: "tread-06",
    drop: "06",
    name: "Tread Phase Sneaker",
    category: "Footwear",
    color: "Ink / Milk",
    price: 146,
    image: "/manus-storage/cxsmo-tread-sneaker-v3_f21f00cf.png",
    description: "A low-profile skate-inspired sneaker that grounds an oversized leg with a clean, slightly retro profile.",
    fit: "True to size",
    details: ["Suede-look upper", "Cushioned cupsole", "Reflective heel tab"],
  },
  {
    id: "gloss-07",
    drop: "07",
    name: "Static Bloom Lip Glaze",
    category: "Beauty",
    color: "Clear Chrome",
    price: 22,
    image: "/manus-storage/cxsmo-static-lip-glaze-v2_2fa824b0.png",
    description: "A fictional beauty-object concept for a clear shine finish and an easy pocket-sized styling moment.",
    fit: "One size",
    details: ["Fictional beauty object", "Pocket-size tube", "No product claims represented"],
  },
  {
    id: "transit-08",
    drop: "08",
    name: "Transit Camera Bag",
    category: "Lifestyle",
    color: "Soft Black",
    price: 92,
    image: "/manus-storage/cxsmo-transit-bag-v2_fffacd6e.png",
    description: "A slim shoulder bag imagined for film camera, headphones, keys, and the objects that make a fit feel lived-in.",
    fit: "One size",
    details: ["Padded body", "Adjustable webbing strap", "Interior zip pocket"],
  },
];

export const getCxsmoProduct = (id?: string) => cxsmoProducts.find((product) => product.id === id) ?? cxsmoProducts[0];

export const formatCxsmoPrice = (price: number, locale = "en-US", currency: "USD" | "PHP" | "JPY" | "CNY" | "EUR" = "USD") => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
