export type Product = {
  id: string;
  slug: string;
  name: string;
  family: string;
  notes: string[];
  description: string;
  sizeMl: number;
  price: number; // EGP
  color: string; // bottle liquid color
};

export const products: Product[] = [
  { id: "p1", slug: "noir-oud", name: "Noir Oud", family: "Woody", notes: ["Oud", "Black pepper", "Amber"], description: "Smoked oud wrapped in warm amber. A deep evening fragrance with a long, dark trail.", sizeMl: 100, price: 5200, color: "#4a2c1a" },
  { id: "p2", slug: "rose-absolue", name: "Rose Absolue", family: "Floral", notes: ["Damask rose", "Peony", "Musk"], description: "Dewy Damask rose softened by peony and clean white musk.", sizeMl: 50, price: 3400, color: "#a8324f" },
  { id: "p3", slug: "amber-nights", name: "Amber Nights", family: "Oriental", notes: ["Amber", "Vanilla", "Cinnamon"], description: "Resinous amber and vanilla with a spark of cinnamon. Rich and enveloping.", sizeMl: 100, price: 4300, color: "#b8741a" },
  { id: "p4", slug: "citrus-vert", name: "Citrus Vert", family: "Fresh", notes: ["Bergamot", "Lime", "Vetiver"], description: "Sparkling citrus over green vetiver. Made for hot days.", sizeMl: 100, price: 2300, color: "#9bb83a" },
  { id: "p5", slug: "velvet-iris", name: "Velvet Iris", family: "Floral", notes: ["Iris", "Violet", "Sandalwood"], description: "Powdery iris and violet resting on creamy sandalwood.", sizeMl: 50, price: 3900, color: "#6b5b95" },
  { id: "p6", slug: "desert-musk", name: "Desert Musk", family: "Musky", notes: ["White musk", "Cedar", "Saffron"], description: "Soft skin musk with a thread of saffron and dry cedar.", sizeMl: 75, price: 2900, color: "#d8b98a" },
  { id: "p7", slug: "midnight-jasmine", name: "Midnight Jasmine", family: "Floral", notes: ["Jasmine", "Tuberose", "Tonka"], description: "Heady night-blooming jasmine finished with sweet tonka bean.", sizeMl: 50, price: 3600, color: "#e9e1c8" },
  { id: "p8", slug: "leather-smoke", name: "Leather & Smoke", family: "Woody", notes: ["Leather", "Birch tar", "Tobacco"], description: "Supple leather and birch smoke with a dry tobacco heart.", sizeMl: 100, price: 4700, color: "#2f2a26" },
  { id: "p9", slug: "sea-salt", name: "Sea Salt", family: "Fresh", notes: ["Sea salt", "Driftwood", "Sage"], description: "A cool, mineral breeze of salt, sage and bleached driftwood.", sizeMl: 100, price: 2100, color: "#4f9bb0" },
  { id: "p10", slug: "golden-saffron", name: "Golden Saffron", family: "Oriental", notes: ["Saffron", "Rose", "Patchouli"], description: "Luminous saffron and rose over earthy patchouli.", sizeMl: 75, price: 5900, color: "#d19a1f" },
  { id: "p11", slug: "white-tea", name: "White Tea", family: "Fresh", notes: ["White tea", "Pear", "Cedar"], description: "Quiet and clean: white tea, juicy pear and a whisper of cedar.", sizeMl: 50, price: 1500, color: "#cfd8c4" },
  { id: "p12", slug: "black-vanilla", name: "Black Vanilla", family: "Gourmand", notes: ["Vanilla", "Coffee", "Praline"], description: "Dark roasted vanilla with coffee and a touch of praline.", sizeMl: 100, price: 3800, color: "#3b2418" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);
// Non-breaking space keeps "E£" and the amount on one line.
export const formatPrice = (n: number) => `E£ ${n.toLocaleString("en-US")}`;
