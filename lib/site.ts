export const site = {
  name: "GlowGemz",
  domain: "glowgemz.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowgemz.in",
  tagline: "Quietly precious. Worn every day.",
  description:
    "Modern gold-plated jewellery — necklaces, hoops, rings and bracelets. Hypoallergenic, anti-tarnish, made for everyday.",
  social: {
    instagram: "https://instagram.com/glowgemz",
    pinterest: "https://pinterest.com/glowgemz",
  },
  contact: {
    email: "hello@glowgemz.in",
    phone: "+91 80000 00000",
  },
  shippingFreeOver: 0, // Free shipping on every order — kept for call-site compat
  flatShipping: 0, // Free shipping on every order
} as const;
