export const site = {
  name: "GlowGemz",
  domain: "glowgemz.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowgemz.in",
  tagline: "Quietly precious. Worn every day.",
  description:
    "Modern, minimalist 14k gold jewellery — necklaces, hoops, rings and bracelets, designed to be worn (and forgotten).",
  social: {
    instagram: "https://instagram.com/glowgemz",
    pinterest: "https://pinterest.com/glowgemz",
  },
  contact: {
    email: "hello@glowgemz.in",
    phone: "+91 80000 00000",
  },
  shippingFreeOver: 500000, // free shipping above ₹5000 (in paise)
  flatShipping: 9900, // ₹99
} as const;
