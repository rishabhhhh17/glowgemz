export type Variant = {
  id: string;
  label: string;
  sku: string;
  priceDelta?: number; // in paise, added to base price
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "necklaces" | "earrings" | "rings" | "bracelets";
  metal: "14k Gold" | "Gold Vermeil" | "Sterling Silver";
  price: number; // base price in paise (INR)
  compareAtPrice?: number;
  description: string;
  details: string[];
  images: string[];
  variants: Variant[];
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  inspiration: string;
};

const NECKLACES_BASE: Pick<Product, "category" | "metal"> = {
  category: "necklaces",
  metal: "14k Gold",
};

const EARRINGS_BASE: Pick<Product, "category" | "metal"> = {
  category: "earrings",
  metal: "14k Gold",
};

export const products: Product[] = [
  {
    ...NECKLACES_BASE,
    id: "p_blossom_pendant",
    slug: "blossom-diamond-pendant",
    name: "Blossom Diamond Pendant",
    price: 1480000,
    compareAtPrice: 1680000,
    description:
      "A five-petal flower set with a single brilliant-cut diamond, suspended on a whisper-thin chain. Designed to be worn — and forgotten. The pendant catches light like a held breath.",
    details: [
      "Five-petal blossom, hand-set lab-grown diamond center",
      "0.04ct VS clarity, F colour",
      "Solid 14k yellow gold, 0.6mm cable chain",
      "Adjustable 16\" / 17\" / 18\" lengths",
      "Hallmarked & assayed in Mumbai",
    ],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "16\" — Choker", sku: "GG-BLS-16" },
      { id: "v2", label: "17\" — Standard", sku: "GG-BLS-17" },
      { id: "v3", label: "18\" — Layered", sku: "GG-BLS-18", priceDelta: 50000 },
    ],
    stockCount: 24,
    isFeatured: true,
    inspiration: "PDF: page 1 — five-petal diamond pendant on fine chain",
  },
  {
    ...NECKLACES_BASE,
    id: "p_snowflake_charm",
    slug: "snowflake-asymmetric-necklace",
    name: "Snowflake Asymmetric Necklace",
    price: 980000,
    description:
      "A miniature snowflake charm sits gently off-center, a small surprise on a barely-there chain. Quiet on its own, magnetic when layered.",
    details: [
      "Hand-cut snowflake motif, 5mm diameter",
      "Asymmetric placement at 14\" from clasp",
      "Solid 14k yellow gold, 0.5mm trace chain",
      "16\" total length with 2\" extender",
      "Lobster clasp closure",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=80",
      "https://images.unsplash.com/photo-1635767582909-345d61d24c4f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Yellow Gold", sku: "GG-SNW-Y" },
      { id: "v2", label: "Rose Gold", sku: "GG-SNW-R", priceDelta: 30000 },
    ],
    stockCount: 18,
    isFeatured: true,
    isNew: true,
    inspiration: "PDF: page 2 — asymmetric snowflake charm necklace",
  },
  {
    ...EARRINGS_BASE,
    id: "p_signature_hoops",
    slug: "signature-bold-hoops",
    name: "Signature Bold Hoops",
    price: 1280000,
    description:
      "Our take on the everyday hoop — slightly oversized, weighted just right, with a hand-finished curve that flatters every face. The pair you'll never take off.",
    details: [
      "20mm outer diameter, 4mm thickness",
      "Hollow-formed for all-day comfort (1.8g per pair)",
      "Hinged snap closure",
      "Solid 14k yellow gold throughout",
    ],
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=1600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1600&q=80",
      "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Small — 16mm", sku: "GG-HOO-S", priceDelta: -200000 },
      { id: "v2", label: "Medium — 20mm", sku: "GG-HOO-M" },
      { id: "v3", label: "Large — 26mm", sku: "GG-HOO-L", priceDelta: 280000 },
    ],
    stockCount: 42,
    isFeatured: true,
    inspiration: "PDF: page 3 — bold polished gold hoop earrings",
  },
  {
    ...EARRINGS_BASE,
    id: "p_droplet_hoops",
    slug: "droplet-curve-hoops",
    name: "Droplet Curve Hoops",
    price: 1080000,
    description:
      "A sculptural curve that tapers like a falling drop. Seen from the front, an elegant arc; from the side, a confident crescent that catches light.",
    details: [
      "18mm height, sculpted teardrop profile",
      "Hand-polished mirror finish",
      "Post & butterfly back closure",
      "Solid 14k yellow gold",
    ],
    images: [
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=1600&q=80",
      "https://images.unsplash.com/photo-1593795899768-947c4929449d?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Yellow Gold", sku: "GG-DRP-Y" },
      { id: "v2", label: "White Gold", sku: "GG-DRP-W", priceDelta: 80000 },
    ],
    stockCount: 30,
    isFeatured: true,
    isNew: true,
    inspiration: "PDF: page 4 — sculpted teardrop curve hoops",
  },
  {
    ...EARRINGS_BASE,
    id: "p_pave_huggie_set",
    slug: "pave-huggie-stack-set",
    name: "Pavé Huggie Stack Set",
    price: 1880000,
    compareAtPrice: 2240000,
    description:
      "Three pieces designed to be worn together — one polished huggie, one pavé crystal-set huggie, one slim ear cuff. Build a stack in seconds.",
    details: [
      "Set of three: polished huggie + pavé huggie + 8mm cuff",
      "12 hand-set lab-grown diamonds across pavé piece",
      "Mix-and-match across both ears",
      "Solid 14k yellow gold",
      "Arrives in our re-usable jewellery box",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
      "https://images.unsplash.com/photo-1561591101-cbcb2cce7c6c?w=1600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Set of 3", sku: "GG-STK-3" }],
    stockCount: 14,
    isFeatured: true,
    inspiration: "PDF: page 5 — layered ear stack with pavé + cuff",
  },
  {
    ...NECKLACES_BASE,
    id: "p_solitaire_drop",
    slug: "solitaire-drop-pendant",
    name: "Solitaire Drop Pendant",
    price: 1640000,
    description:
      "One stone, set high, cradled in four delicate prongs. The kind of necklace you'll be photographed in for years.",
    details: [
      "0.10ct lab-grown diamond, VS clarity",
      "Four-prong basket setting",
      "Solid 14k gold, 0.7mm box chain",
      "Adjustable 16\" / 17\" / 18\"",
    ],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "0.05ct", sku: "GG-SOL-05", priceDelta: -440000 },
      { id: "v2", label: "0.10ct", sku: "GG-SOL-10" },
      { id: "v3", label: "0.20ct", sku: "GG-SOL-20", priceDelta: 980000 },
    ],
    stockCount: 12,
    inspiration: "Companion to PDF page 1 pendant",
  },
  {
    category: "rings",
    metal: "14k Gold",
    id: "p_thread_band",
    slug: "thread-stacking-band",
    name: "Thread Stacking Band",
    price: 880000,
    description:
      "A band so thin it almost disappears. Stack two, three, or four — it's the kind of jewellery that adds up.",
    details: [
      "1.2mm slim band",
      "Hand-finished, comfort-fit interior",
      "Solid 14k gold",
      "Sizes 4 — 9",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
      "https://images.unsplash.com/photo-1606293459728-9b8f0db1e0b8?w=1600&q=80",
    ],
    variants: [
      { id: "s4", label: "Size 4", sku: "GG-THR-4" },
      { id: "s5", label: "Size 5", sku: "GG-THR-5" },
      { id: "s6", label: "Size 6", sku: "GG-THR-6" },
      { id: "s7", label: "Size 7", sku: "GG-THR-7" },
      { id: "s8", label: "Size 8", sku: "GG-THR-8" },
    ],
    stockCount: 60,
    isFeatured: true,
    inspiration: "Cohesion piece — minimalist stacker",
  },
  {
    category: "rings",
    metal: "14k Gold",
    id: "p_pave_eternity",
    slug: "pave-eternity-band",
    name: "Pavé Eternity Band",
    price: 2480000,
    description:
      "A continuous line of light. 18 hand-set diamonds curve around a slim band, designed to wear alone or stack with our Thread.",
    details: [
      "18 lab-grown round-cut diamonds, 0.18ctw",
      "Channel-set, secured by hand",
      "1.8mm slim profile",
      "Solid 14k gold",
    ],
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80",
    ],
    variants: [
      { id: "s5", label: "Size 5", sku: "GG-PAV-5" },
      { id: "s6", label: "Size 6", sku: "GG-PAV-6" },
      { id: "s7", label: "Size 7", sku: "GG-PAV-7" },
      { id: "s8", label: "Size 8", sku: "GG-PAV-8" },
    ],
    stockCount: 9,
    isNew: true,
    inspiration: "Companion to pavé huggie set",
  },
  {
    category: "bracelets",
    metal: "14k Gold",
    id: "p_chain_bracelet",
    slug: "fine-chain-bracelet",
    name: "Fine Chain Bracelet",
    price: 740000,
    description:
      "A barely-there chain bracelet. 0.4mm of solid gold that pools when you set your wrist down.",
    details: [
      "0.4mm solid gold cable chain",
      "6.5\" + 1\" extender",
      "Lobster clasp",
      "Hallmarked 14k",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "One Size — Adjustable", sku: "GG-FCB-OS" }],
    stockCount: 38,
    inspiration: "Layering essential",
  },
  {
    category: "bracelets",
    metal: "14k Gold",
    id: "p_pearl_bracelet",
    slug: "pearl-and-gold-bracelet",
    name: "Pearl & Gold Bracelet",
    price: 1180000,
    description:
      "Freshwater pearls strung between fine gold links. The kind of contrast that makes everything else you wear look intentional.",
    details: [
      "5–6mm AAA freshwater pearls (8 per bracelet)",
      "14k gold-filled connecting chain",
      "7\" + 1\" extender",
      "Spring-ring clasp",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Adjustable", sku: "GG-PRL-OS" }],
    stockCount: 22,
    isNew: true,
    inspiration: "Cohesion piece — pearl detail nodding to PDF page 3",
  },
  {
    ...EARRINGS_BASE,
    id: "p_micro_studs",
    slug: "micro-diamond-studs",
    name: "Micro Diamond Studs",
    price: 980000,
    description:
      "A pair of points of light. So small they read as a glint — exactly the second piercing you've been looking for.",
    details: [
      "0.05ctw lab-grown diamonds",
      "2.5mm prong setting",
      "Threaded post (won't loosen)",
      "Solid 14k gold",
    ],
    images: [
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=1600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Pair", sku: "GG-MIC-P" }],
    stockCount: 50,
    inspiration: "Companion to pavé set",
  },
  {
    ...NECKLACES_BASE,
    id: "p_baguette_bar",
    slug: "baguette-bar-necklace",
    name: "Baguette Bar Necklace",
    price: 1380000,
    description:
      "A slim horizontal bar set with three baguette diamonds. Architectural, unfussy, completely modern.",
    details: [
      "Three baguette-cut lab-grown diamonds, 0.09ctw",
      "16mm bar, 1.5mm height",
      "Solid 14k gold, 0.6mm chain",
      "Adjustable 16\" / 17\" / 18\"",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Yellow Gold", sku: "GG-BAR-Y" },
      { id: "v2", label: "White Gold", sku: "GG-BAR-W", priceDelta: 80000 },
    ],
    stockCount: 16,
    inspiration: "Modern counterpart to floral pendants",
  },
];

export const productsBySlug: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

export const featuredProducts = products.filter((p) => p.isFeatured);

export const categories = [
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "rings", label: "Rings" },
  { slug: "bracelets", label: "Bracelets" },
] as const;
