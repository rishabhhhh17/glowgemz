import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { featuredProducts, products } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedShelf />
      <CategoryStrip />
      <BrandStory />
      <HowItWorks />
      <Testimonials />
      <NewBag />
      <NewsletterBanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide grid gap-10 pb-16 pt-12 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-20 lg:pt-24">
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
          <span className="eyebrow mb-5">Spring · Featherlight Collection</span>
          <h1 className="display-serif text-display-xl text-ink">
            Quietly precious.
            <br />
            <em className="not-italic text-gold-600">Worn every day.</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
            Modern 18k gold-plated jewellery — pendants, hoops, rings and bracelets that
            don't fade after a month. Hypoallergenic, anti-tarnish, honestly priced.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">Shop the collection</Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="/about" className="gap-1.5">
                Meet GlowGemz <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-7 grid grid-cols-6 gap-3 md:gap-4">
          <div className="col-span-4 row-span-2 relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=85"
              alt="GlowGemz layered ear stack"
              fill
              priority
              sizes="(max-width: 768px) 66vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85"
              alt="Blossom diamond pendant"
              fill
              sizes="(max-width: 768px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=900&q=85"
              alt="Signature gold hoops"
              fill
              sizes="(max-width: 768px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "47,000+", label: "Pieces shipped" },
    { value: "4.9 / 5", label: "12,000+ reviews" },
    { value: "Skin-safe", label: "Lead & nickel free" },
    { value: "6 months", label: "Tarnish guarantee" },
  ];
  return (
    <section className="border-y border-border bg-cream-200/60">
      <div className="container-wide grid grid-cols-2 gap-y-8 py-9 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-xl md:text-2xl text-ink">{s.value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedShelf() {
  return (
    <section className="container-wide py-section">
      <div className="flex items-end justify-between gap-4 mb-10 md:mb-14">
        <div>
          <span className="eyebrow">Best loved</span>
          <h2 className="mt-3 display-serif text-display-md text-ink">The pieces that keep going home with people</h2>
        </div>
        <Link href="/products" className="hidden md:inline-flex link-underline text-sm">
          Shop all →
        </Link>
      </div>
      <div className="grid-product">
        {featuredProducts.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
      </div>
      <div className="mt-10 text-center md:hidden">
        <Button asChild variant="outline" shape="rounded">
          <Link href="/products">Shop all</Link>
        </Button>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const cats = [
    { slug: "necklaces", label: "Necklaces", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85" },
    { slug: "earrings", label: "Earrings", img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=900&q=85" },
    { slug: "rings", label: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85" },
    { slug: "bracelets", label: "Bracelets", img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85" },
  ];
  return (
    <section className="container-wide pb-section">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-md"
          >
            <Image
              src={c.img}
              alt={c.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="font-display text-2xl text-cream-100">{c.label}</span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-cream-100/80 mt-1">
                Shop now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="bg-cream-200/70 py-section">
      <div className="container-tight grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=85"
            alt="Hand-set diamond pendant"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="eyebrow">Made in Mumbai</span>
          <h2 className="mt-3 display-serif text-display-md text-ink">
            Polished gold finish. Honest fashion-jewellery prices.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500">
            Every GlowGemz piece is plated, polished and quality-checked in our Mumbai studio —
            18k gold finish, hypoallergenic brass core, hand-set CZ stones. We make small runs,
            sell direct, and pass the saving on — so the prices feel as honest as the polish.
          </p>
          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: "18k plated", note: "Anti-tarnish coated." },
              { icon: ShieldCheck, label: "Hypoallergenic", note: "Lead & nickel free." },
              { icon: Truck, label: "Free shipping", note: "On orders ₹999+" },
            ].map((p) => (
              <li key={p.label} className="rounded-lg border border-border bg-cream-100 p-4">
                <p.icon className="h-5 w-5 text-gold-600" />
                <p className="mt-3 text-sm font-medium text-ink">{p.label}</p>
                <p className="mt-0.5 text-xs text-ink-500">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { no: "01", title: "Choose", body: "Pick the piece (or pieces) — every product has been styled, sized, and stress-tested in real life." },
    { no: "02", title: "We hand-finish", body: "We plate, polish and quality-check each piece in our Mumbai studio. Most ship same day." },
    { no: "03", title: "Wear daily", body: "6-month tarnish guarantee on every piece. Anything goes wrong in the first six months — we'll replace it, free." },
  ];
  return (
    <section className="container-wide py-section">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-3 display-serif text-display-md text-ink">Worn every day. Honestly priced.</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.no} className="rounded-lg border border-border bg-cream-100 p-7">
            <span className="font-display text-3xl text-gold-500">{s.no}</span>
            <h3 className="mt-4 font-display text-2xl text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "I've worn the Blossom pendant every day for five months — hasn't tarnished, hasn't faded. For the price, unreal.", a: "Aanya, Bengaluru" },
    { q: "The hoops feel like solid gold. No one's clocked them as plated yet. Comfortable on sensitive ears too.", a: "Riya, Mumbai" },
    { q: "Bought the pavé set for ₹999 and ended up keeping the gift for myself. Sorry, mum.", a: "Ishika, Delhi" },
  ];
  return (
    <section className="bg-ink text-cream-100 py-section">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-cream-100/60">Wearer notes</span>
          <h2 className="mt-3 display-serif text-display-md text-cream-100">
            "Never taking it off."
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <figure key={t.a} className="rounded-lg border border-cream-100/15 p-7">
              <div className="text-gold-300">★★★★★</div>
              <blockquote className="mt-4 font-display text-lg leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-cream-100/60">{t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewBag() {
  const newOnes = products.filter((p) => p.isNew).slice(0, 4);
  if (newOnes.length === 0) return null;
  return (
    <section className="container-wide py-section">
      <div className="flex items-end justify-between gap-4 mb-10 md:mb-14">
        <div>
          <span className="eyebrow">Just landed</span>
          <h2 className="mt-3 display-serif text-display-md text-ink">New, but in the family.</h2>
        </div>
      </div>
      <div className="grid-product">
        {newOnes.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function NewsletterBanner() {
  return (
    <section className="container-wide pb-section">
      <div className="rounded-xl bg-gold-100 px-6 py-12 md:px-16 md:py-16 text-center">
        <span className="eyebrow text-gold-700">First look · members only</span>
        <h2 className="mt-3 display-serif text-display-md text-ink">
          Drops, before they land.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-700">
          Quiet emails, no marketing speak — just the new pieces, with a 24-hour head start.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="h-12 flex-1 rounded-full border border-gold-200 bg-cream-100 px-5 text-sm placeholder:text-ink-300 focus:border-ink focus:outline-none"
          />
          <Button type="submit" size="lg">Join the list</Button>
        </form>
      </div>
    </section>
  );
}
