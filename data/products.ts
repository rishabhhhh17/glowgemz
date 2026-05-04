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
  metal: "Gold Plated" | "Rose Gold Plated" | "Silver Plated";
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

const NECKLACE: Pick<Product, "category" | "metal"> = { category: "necklaces", metal: "Gold Plated" };
const EARRING: Pick<Product, "category" | "metal"> = { category: "earrings", metal: "Gold Plated" };

export const products: Product[] = [
  {
    ...NECKLACE,
    id: "p_blossom_pendant",
    slug: "blossom-diamond-pendant",
    name: "Blossom CZ Pendant",
    price: 59900,
    compareAtPrice: 79900,
    description:
      "A five-petal flower set with a single sparkling CZ stone, suspended on a whisper-thin chain. Designed to be worn — and forgotten. Catches light like the real thing.",
    details: [
      "Five-petal blossom with hand-set AAA cubic zirconia",
      "Gold plating over hypoallergenic brass",
      "Skin-safe · lead & nickel free",
      "Adjustable 16\" / 17\" / 18\" lengths",
      "Anti-tarnish coating · 6-month replacement guarantee",
    ],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "16\" — Choker", sku: "GG-BLS-16" },
      { id: "v2", label: "17\" — Standard", sku: "GG-BLS-17" },
      { id: "v3", label: "18\" — Layered", sku: "GG-BLS-18", priceDelta: 5000 },
    ],
    stockCount: 60,
    isFeatured: true,
    inspiration: "PDF: page 1 — five-petal pendant on fine chain",
  },
  {
    ...NECKLACE,
    id: "p_snowflake_charm",
    slug: "snowflake-asymmetric-necklace",
    name: "Snowflake Asymmetric Necklace",
    price: 44900,
    description:
      "A miniature snowflake charm sits gently off-center, a small surprise on a barely-there chain. Quiet on its own, magnetic when layered.",
    details: [
      "Hand-cut snowflake motif, 5mm",
      "Asymmetric placement at 14\" from clasp",
      "Gold plating · stainless steel chain",
      "16\" total + 2\" extender",
      "Hypoallergenic · anti-tarnish",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=80",
      "https://images.unsplash.com/photo-1635767582909-345d61d24c4f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Gold tone", sku: "GG-SNW-Y" },
      { id: "v2", label: "Rose gold tone", sku: "GG-SNW-R", priceDelta: 3000 },
    ],
    stockCount: 50,
    isFeatured: true,
    isNew: true,
    inspiration: "PDF: page 2 — asymmetric snowflake charm necklace",
  },
  {
    ...EARRING,
    id: "p_signature_hoops",
    slug: "signature-bold-hoops",
    name: "Signature Bold Hoops",
    price: 54900,
    description:
      "Our take on the everyday hoop — slightly oversized, weighted just right, with a polished mirror finish that flatters every face. The pair you'll never take off.",
    details: [
      "20mm outer diameter, 4mm thickness",
      "Lightweight brass core, gold plating",
      "Hinged snap closure, hypoallergenic post",
      "Anti-tarnish · skin-safe",
    ],
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=1600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1600&q=80",
      "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Small — 16mm", sku: "GG-HOO-S", priceDelta: -10000 },
      { id: "v2", label: "Medium — 20mm", sku: "GG-HOO-M" },
      { id: "v3", label: "Large — 26mm", sku: "GG-HOO-L", priceDelta: 15000 },
    ],
    stockCount: 80,
    isFeatured: true,
    inspiration: "PDF: page 3 — bold polished gold hoop earrings",
  },
  {
    ...EARRING,
    id: "p_droplet_hoops",
    slug: "droplet-curve-hoops",
    name: "Droplet Curve Hoops",
    price: 49900,
    description:
      "A sculptural curve that tapers like a falling drop. Seen from the front, an elegant arc; from the side, a confident crescent that catches light.",
    details: [
      "18mm sculpted teardrop profile",
      "Mirror-finish gold plating",
      "Post & butterfly back, hypoallergenic",
      "Anti-tarnish coating",
    ],
    images: [
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=1600&q=80",
      "https://images.unsplash.com/photo-1593795899768-947c4929449d?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Gold tone", sku: "GG-DRP-Y" },
      { id: "v2", label: "Silver tone", sku: "GG-DRP-W", priceDelta: 5000 },
    ],
    stockCount: 65,
    isFeatured: true,
    isNew: true,
    inspiration: "PDF: page 4 — sculpted teardrop curve hoops",
  },
  {
    ...EARRING,
    id: "p_pave_huggie_set",
    slug: "pave-huggie-stack-set",
    name: "Pavé Huggie Stack Set",
    price: 99900,
    compareAtPrice: 129900,
    description:
      "Three pieces designed to be worn together — one polished huggie, one CZ pavé huggie, one slim ear cuff. Build a stack in seconds.",
    details: [
      "Set of three: polished huggie + CZ pavé huggie + 8mm cuff",
      "12 hand-set AAA CZ stones across pavé piece",
      "Mix-and-match across both ears",
      "Gold plating · hypoallergenic",
      "Arrives in our reusable jewellery box",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
      "https://images.unsplash.com/photo-1561591101-cbcb2cce7c6c?w=1600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Set of 3", sku: "GG-STK-3" }],
    stockCount: 35,
    isFeatured: true,
    inspiration: "PDF: page 5 — layered ear stack with pavé + cuff",
  },
  {
    ...NECKLACE,
    id: "p_solitaire_drop",
    slug: "solitaire-drop-pendant",
    name: "Solitaire Drop Pendant",
    price: 69900,
    description:
      "One stone, set high, cradled in four delicate prongs. The kind of necklace you'll be photographed in for years.",
    details: [
      "Brilliant-cut AAA cubic zirconia",
      "Four-prong basket setting",
      "Gold plating, 0.7mm box chain",
      "Adjustable 16\" / 17\" / 18\"",
    ],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Petite — 4mm", sku: "GG-SOL-05", priceDelta: -10000 },
      { id: "v2", label: "Standard — 6mm", sku: "GG-SOL-10" },
      { id: "v3", label: "Statement — 8mm", sku: "GG-SOL-20", priceDelta: 20000 },
    ],
    stockCount: 40,
    inspiration: "Companion to PDF page 1 pendant",
  },
  {
    category: "rings",
    metal: "Gold Plated",
    id: "p_thread_band",
    slug: "thread-stacking-band",
    name: "Thread Stacking Band",
    price: 29900,
    description:
      "A band so thin it almost disappears. Stack two, three, or four — the kind of jewellery that adds up.",
    details: [
      "1.2mm slim band",
      "Comfort-fit interior",
      "Gold plating · hypoallergenic",
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
    stockCount: 100,
    isFeatured: true,
    inspiration: "Cohesion piece — minimalist stacker",
  },
  {
    category: "rings",
    metal: "Gold Plated",
    id: "p_pave_eternity",
    slug: "pave-eternity-band",
    name: "Pavé Eternity Band",
    price: 79900,
    description:
      "A continuous line of light. 18 hand-set CZ stones curve around a slim band, designed to wear alone or stack with our Thread.",
    details: [
      "18 round-cut AAA cubic zirconia stones",
      "Channel-set, secured by hand",
      "1.8mm slim profile",
      "Gold plating · anti-tarnish",
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
    stockCount: 30,
    isNew: true,
    inspiration: "Companion to pavé huggie set",
  },
  {
    category: "bracelets",
    metal: "Gold Plated",
    id: "p_chain_bracelet",
    slug: "fine-chain-bracelet",
    name: "Fine Chain Bracelet",
    price: 34900,
    description:
      "A barely-there chain bracelet. Whisper-thin links of gold plating that pool when you set your wrist down.",
    details: [
      "0.4mm cable chain, gold-plated",
      "6.5\" + 1\" extender",
      "Lobster clasp",
      "Hypoallergenic · anti-tarnish",
    ],
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Adjustable", sku: "GG-FCB-OS" }],
    stockCount: 75,
    inspiration: "Layering essential",
  },
  {
    category: "bracelets",
    metal: "Gold Plated",
    id: "p_pearl_bracelet",
    slug: "pearl-and-gold-bracelet",
    name: "Pearl & Gold Bracelet",
    price: 64900,
    description:
      "Glass pearls strung between fine gold-plated links. The kind of contrast that makes everything else you wear look intentional.",
    details: [
      "5–6mm shell-pearl beads (8 per bracelet)",
      "gold-plated chain",
      "7\" + 1\" extender",
      "Spring-ring clasp · hypoallergenic",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Adjustable", sku: "GG-PRL-OS" }],
    stockCount: 50,
    isNew: true,
    inspiration: "Pearl detail nodding to PDF page 3",
  },
  {
    ...EARRING,
    id: "p_micro_studs",
    slug: "micro-diamond-studs",
    name: "Micro CZ Studs",
    price: 39900,
    description:
      "A pair of tiny points of light. So small they read as a glint — exactly the second piercing you've been looking for.",
    details: [
      "2.5mm AAA cubic zirconia",
      "Four-prong setting",
      "Threaded post, won't loosen",
      "Gold plating · hypoallergenic",
    ],
    images: [
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?w=1600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
    ],
    variants: [{ id: "v1", label: "Pair", sku: "GG-MIC-P" }],
    stockCount: 90,
    inspiration: "Companion to pavé set",
  },
  {
    ...NECKLACE,
    id: "p_baguette_bar",
    slug: "baguette-bar-necklace",
    name: "Baguette Bar Necklace",
    price: 54900,
    description:
      "A slim horizontal bar set with three baguette CZ stones. Architectural, unfussy, completely modern.",
    details: [
      "Three baguette-cut AAA CZ stones",
      "16mm bar, 1.5mm height",
      "Gold plating, 0.6mm chain",
      "Adjustable 16\" / 17\" / 18\"",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
    ],
    variants: [
      { id: "v1", label: "Gold tone", sku: "GG-BAR-Y" },
      { id: "v2", label: "Silver tone", sku: "GG-BAR-W", priceDelta: 5000 },
    ],
    stockCount: 45,
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
