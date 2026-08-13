export type KinformProduct = {
  id: string;
  number: string;
  name: string;
  type: string;
  shade: string;
  price: number;
  image: string;
  detailImage: string;
  description: string;
  details: string[];
  composition: string;
  fit: string;
};

export const kinformProducts: KinformProduct[] = [
  { id: "line-01", number: "01", name: "Line Tee", type: "Bonded jersey", shade: "Porcelain", price: 68, image: "/manus-storage/kinform-structured-tee_fd877bd2.png", detailImage: "/manus-storage/kinform-line-tee-detail-replacement_f052c194.jpg", description: "A structured daily tee with a quiet technical hand and an easy, architectural fall.", details: ["Bonded micro jersey", "Relaxed structure", "Clean bound neckline"], composition: "94% cotton, 6% nylon", fit: "Relaxed, straight hem" },
  { id: "aero-02", number: "02", name: "Aero Shell", type: "Micro ripstop", shade: "Graphite", price: 198, image: "/manus-storage/kinform-aero-shell-transparent_890111a4.png", detailImage: "/manus-storage/kinform-aero-shell-transparent_890111a4.png", description: "A light outer layer designed to hold a clean silhouette while moving through changing conditions.", details: ["Micro ripstop shell", "Concealed snap closure", "Curved hem construction"], composition: "100% nylon ripstop", fit: "Easy layer, curved hem" },
  { id: "form-03", number: "03", name: "Form Overshirt", type: "Cotton nylon twill", shade: "Faded leaf", price: 156, image: "/manus-storage/kinform-form-overshirt-transparent_c4924b0d.png", detailImage: "/manus-storage/kinform-form-overshirt-transparent_c4924b0d.png", description: "A soft utility layer built with measured volume, crisp texture, and a calm, boxy proportion.", details: ["Crisp twill finish", "Concealed placket", "Low profile chest pocket"], composition: "72% cotton, 28% nylon", fit: "Boxy, easy shoulder" },
  { id: "arc-04", number: "04", name: "Arc Trouser", type: "Stretch woven", shade: "Charcoal", price: 174, image: "/manus-storage/kinform-arc-trouser-transparent_19735ece.png", detailImage: "/manus-storage/kinform-arc-trouser-transparent_19735ece.png", description: "A relaxed technical trouser with a soft front pleat and a subtle taper for the space between work and movement.", details: ["Stretch woven fabric", "Relaxed tapered leg", "Minimal rear welt pocket"], composition: "89% nylon, 11% elastane", fit: "Relaxed taper" },
];

export const getKinformProduct = (id?: string) => kinformProducts.find((product) => product.id === id) ?? kinformProducts[0];
