# GlowGemz — glowgemz.in

A production-ready D2C jewellery storefront built on Next.js 14 (App Router) + Supabase + Razorpay + Meta Pixel/CAPI.

> *Quietly precious. Worn every day.*

---

## What's in here

| Layer | Tech |
| --- | --- |
| Framework | Next.js 14 (App Router, RSC) |
| Styling | Tailwind CSS + custom design tokens (`lib/tokens.ts`, `tailwind.config.ts`) |
| UI primitives | Radix Dialog (cart drawer), lucide-react icons, framer-motion |
| State | zustand (cart) with `localStorage` persistence |
| Database | Supabase (Postgres) with RLS, triggers, `decrement_inventory()` RPC |
| Payments | Razorpay (Checkout + signature verification + webhook) |
| Analytics | Meta Pixel (browser) + Conversions API (server) with `event_id` dedup |
| Hosting | Vercel (recommended) |

## Pages

- `/` — Home (hero, social proof, featured shelf, categories, brand story, how it works, testimonials, newsletter)
- `/products` — Listing with category + sort filters
- `/products/[slug]` — Detail page with gallery, variant picker, related products
- `/checkout` — Customer details + Razorpay checkout
- `/order-confirmation/[orderId]` — Thank-you page
- `/admin` — Password-protected admin (orders, inventory, fulfilment)
- `/about`, `/not-found` — Brand & 404

## API routes

| Route | What it does |
| --- | --- |
| `GET /api/products` | All active products (Supabase, falls back to local seed) |
| `GET /api/products/[slug]` | One product |
| `POST /api/orders` | Validate cart, create Razorpay order, persist `pending` order in Supabase |
| `POST /api/orders/verify` | Verify signature → mark order `paid` → decrement inventory → fire CAPI Purchase |
| `POST /api/webhook/razorpay` | Backup path: handles `payment.captured` if browser callback fails. Idempotent. |
| `POST /api/admin/login` / `logout` | Cookie-based admin session |
| `GET /api/admin/orders` | All orders (auth-gated) |
| `POST /api/admin/orders/[id]/fulfill` | Mark fulfilled |

---

## Run locally

```bash
# 1. Install deps
npm install

# 2. Create .env.local — see "Environment variables" below
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

The site works **without any credentials configured** — products, cart and pages render from the local seed (`data/products.ts`). Supabase + Razorpay only come online when their env vars are set.

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay (test or live)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Meta Pixel + Conversions API
NEXT_PUBLIC_META_PIXEL_ID=
META_ACCESS_TOKEN=
META_TEST_EVENT_CODE=        # optional, only during CAPI testing

# Admin
ADMIN_PASSWORD=

# Site
NEXT_PUBLIC_SITE_URL=https://glowgemz.in
```

---

## Supabase setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query** and run [`data/supabase-schema.sql`](data/supabase-schema.sql) — creates `products`, `orders`, `inventory`, RLS policies, the `decrement_inventory()` RPC.
3. Then run [`data/supabase-seed.sql`](data/supabase-seed.sql) — upserts the 12 products from the PDF and seeds inventory rows per SKU.
4. Copy your project URL + anon key + service role key into `.env.local`.

> RLS policies: Public can `select` only `is_active = true` products. Orders + inventory are service-role only. Don't expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

---

## Razorpay setup

1. Create a Razorpay account → grab **Key ID** + **Key Secret** (Test mode first).
2. Set both in `.env.local` (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, plus `NEXT_PUBLIC_RAZORPAY_KEY_ID` = the same Key ID).
3. **Webhook**: in Razorpay dashboard → *Settings → Webhooks → Add new*. Point it at:
   `https://glowgemz.in/api/webhook/razorpay` (or your Vercel preview URL during testing).
   Subscribe to: `payment.captured`. Set a **secret** and put it in `RAZORPAY_WEBHOOK_SECRET`.
4. Test card: `4111 1111 1111 1111`, any future expiry, any CVV.

End-to-end flow:

```
Checkout form → POST /api/orders
   → Razorpay order created + 'pending' row written
Razorpay Checkout opens
   → User pays
   → Browser handler: POST /api/orders/verify (signature check, mark paid, decrement stock, CAPI Purchase)
   → Razorpay also POSTs /api/webhook/razorpay (backup path, same logic, idempotent)
```

The webhook is the safety net. Both paths use `event_id = order.id` so Meta dedupes.

---

## Meta Pixel + CAPI setup

1. Create a Pixel at [business.facebook.com](https://business.facebook.com) → Events Manager.
2. Generate a Conversions API access token. Put both in `.env.local` (`NEXT_PUBLIC_META_PIXEL_ID`, `META_ACCESS_TOKEN`).
3. (Optional, while testing) Set `META_TEST_EVENT_CODE` so events show up in the *Test Events* tab without polluting real reporting.

Events fired:

| Event | Where | Notes |
| --- | --- | --- |
| `PageView` | Every page (root layout) | Browser pixel |
| `ViewContent` | `/products/[slug]` mount | Browser pixel |
| `AddToCart` | Quick-add card + product detail Add-to-Bag | Browser pixel |
| `InitiateCheckout` | `/checkout` mount | Browser pixel |
| `Purchase` | Razorpay success callback (browser) **and** server verify route + webhook (CAPI) | Both share `event_id = order.id` for dedup |

PII (email, phone, name) is **SHA-256 hashed before** being sent to Meta — see `lib/meta-capi.ts`.

---

## Admin

Visit `/admin` → enter `ADMIN_PASSWORD`. Cookie session lasts 8 hours.

The dashboard shows: total orders, revenue, pending orders, unfulfilled count, full orders table with one-click *Mark fulfilled*, and a low-stock-aware inventory table.

---

## Deploy to Vercel + connect glowgemz.in

```bash
# from the project root
npx vercel link        # link this folder to a Vercel project
npx vercel env pull    # (optional, after setting env in dashboard)
npx vercel --prod      # deploy production
```

1. **Push to GitHub.** `git init && git remote add origin … && git push`
2. **Import on Vercel** → New Project → pick the repo. Framework auto-detects as Next.js.
3. **Environment variables** — add the full set from `.env.local.example` in *Project Settings → Environment Variables*. Mark `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `META_ACCESS_TOKEN`, `ADMIN_PASSWORD` as **server-only** (do not prefix with `NEXT_PUBLIC_`).
4. **Connect glowgemz.in**:
   - *Project Settings → Domains → Add* `glowgemz.in` and `www.glowgemz.in`.
   - At your registrar, add the records Vercel shows (typically an `A` record `76.76.21.21` for the apex and a `CNAME` `cname.vercel-dns.com` for `www`).
   - Wait for SSL to provision (~1 minute).
5. **Update Razorpay webhook URL** to `https://glowgemz.in/api/webhook/razorpay` once the domain is live.
6. **Update Meta Pixel domain verification** in Business Manager.

---

## Design tokens (no hardcoded hex)

All colors, type scale, spacing, radius, shadows live in `lib/tokens.ts` and `tailwind.config.ts`. Use Tailwind classes (`bg-cream-100`, `text-ink`, `text-gold-500`) — never hex values inline.

| Token | Value | Use |
| --- | --- | --- |
| `cream-100` | `#FAF7F2` | Page background |
| `cream-200` | `#F2EDE3` | Cards, hover states |
| `ink` | `#1A1A1A` | Primary text + CTA bg |
| `ink-500` | `#6B6358` | Body text muted |
| `gold-400` / `-500` / `-600` | `#C9A961` / `#B89244` / `#8B6F3C` | Accent, hover, eyebrow |
| `border` | `#E8E2D8` | Hairlines |
| Display font | Playfair Display | Headings, brand mark |
| Sans font | Inter | Body, UI |

Touch targets: every button/icon is ≥ 44×44 px (enforced via `.btn-base { min-height: 44px }`).
Focus rings: gold (`#C9A961`) with offset, applied via `focus-visible`.

---

## Folder layout

```
.
├── app/
│   ├── api/                    # All server routes
│   ├── products/               # Listing + detail
│   ├── checkout/               # Razorpay flow
│   ├── order-confirmation/     # Post-purchase
│   ├── admin/                  # Password-gated dashboard
│   ├── about/                  # Brand story
│   ├── layout.tsx              # Root: navbar, footer, cart, Meta Pixel
│   ├── page.tsx                # Home
│   ├── globals.css             # Tailwind + base styles
│   └── not-found.tsx
├── components/
│   ├── ui/                     # Button, Input, Sheet (Radix-backed)
│   ├── navbar.tsx              # Sticky nav with announcement bar + cart count
│   ├── footer.tsx
│   ├── cart-drawer.tsx         # Side drawer (Radix Dialog)
│   ├── product-card.tsx        # Listing tile w/ quick-add
│   └── meta-pixel.tsx
├── lib/
│   ├── cart-store.ts           # zustand + localStorage
│   ├── supabase/{client,server}.ts
│   ├── razorpay.ts             # SDK + signature verify
│   ├── meta-capi.ts            # Conversions API
│   ├── site.ts                 # Brand constants
│   ├── tokens.ts               # Design tokens (mirror of tailwind config)
│   └── utils.ts
├── data/
│   ├── products.ts             # 12 products, extracted from the PDF
│   ├── supabase-schema.sql
│   └── supabase-seed.sql
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## Pre-launch checklist

- [ ] `npm install && npm run build` passes without errors
- [ ] Supabase project created, schema + seed run
- [ ] Test order placed end-to-end with Razorpay test card
- [ ] Order appears in `/admin` as `paid`, inventory decremented
- [ ] Razorpay webhook configured and Test Webhook returns 200
- [ ] Meta Pixel `Purchase` event visible in Test Events with the same `event_id` as CAPI
- [ ] All product images load (check Network tab — none broken)
- [ ] Lighthouse mobile score ≥ 90 on home + product pages
- [ ] `glowgemz.in` and `www.glowgemz.in` resolve with SSL
- [ ] Razorpay live mode keys swapped in (after KYC complete)
- [ ] Admin password changed from default

---

Made for the Mesa sprint. Crafted in Mumbai. ✺
