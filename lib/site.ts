export const site = {
  name: "GlowGemz",
  domain: "glowgemz.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowgemz.in",
  tagline: "Quietly precious. Worn every day.",
  description:
    "Modern 18k gold-plated jewellery — necklaces, hoops, rings and bracelets. Hypoallergenic, anti-tarnish, made for everyday.",
  social: {
    instagram: "https://instagram.com/glowgemz",
    pinterest: "https://pinterest.com/glowgemz",
  },
  contact: {
    email: "hello@glowgemz.in",
    phone: "+91 80000 00000",
  },
  shippingFreeOver: 99900, // free shipping above ₹999 (in paise)
  flatShipping: 4900, // ₹49
} as const;
