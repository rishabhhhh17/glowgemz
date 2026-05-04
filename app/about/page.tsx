import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Our story" };

export default function AboutPage() {
  return (
    <div className="pb-section">
      <section className="container-tight pt-12 md:pt-20">
        <span className="eyebrow">Our story</span>
        <h1 className="mt-3 display-serif text-display-xl text-ink max-w-3xl">
          Polished gold jewellery,
          <br />
          made for everyday.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500">
          GlowGemz is a fashion-jewellery studio in Mumbai. We make gold-plated pieces —
          hypoallergenic, anti-tarnish, sold direct. No middlemen, no inflated boutique
          markups, no "starting at" trick pricing. Just well-made imitation jewellery
          at honest numbers — most pieces under ₹999.
        </p>
      </section>

      <section className="container-wide mt-14 grid gap-3 md:grid-cols-3 md:gap-4">
        {[
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1400&q=85",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=85",
          "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=1400&q=85",
        ].map((src, i) => (
          <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section className="container-tight mt-section grid gap-12 md:grid-cols-2">
        <div>
          <span className="eyebrow">The promise</span>
          <h2 className="mt-3 display-serif text-display-md text-ink">Three things, every piece.</h2>
        </div>
        <ul className="space-y-7">
          <li>
            <h3 className="font-display text-xl text-ink">plating, double-coated.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              Most plated jewellery dulls in weeks. We use a thicker gold gold layer over a
              hypoallergenic brass core, sealed with an anti-tarnish coating — so the colour
              actually stays.
            </p>
          </li>
          <li>
            <h3 className="font-display text-xl text-ink">Skin-safe stones.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              AAA-grade cubic zirconia and shell pearls, set by hand. Lead-free, nickel-free,
              kind to sensitive ears.
            </p>
          </li>
          <li>
            <h3 className="font-display text-xl text-ink">6-month tarnish guarantee.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              If a piece fades, breaks or loses a stone in the first six months, send it back
              and we'll replace it — no questions, no shipping fees.
            </p>
          </li>
        </ul>
      </section>

      <section className="container-wide mt-section">
        <div className="rounded-xl bg-ink text-cream-100 p-10 md:p-16 text-center">
          <h2 className="display-serif text-display-md">Find the piece that already feels yours.</h2>
          <Button asChild variant="gold" size="lg" className="mt-6">
            <Link href="/products">Shop the collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
