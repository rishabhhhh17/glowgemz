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
          Fine gold jewellery,
          <br />
          made the way it used to be.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500">
          GlowGemz is a small jewellery studio in Mumbai. We make solid 14k gold pieces —
          BIS-hallmarked, hand-finished, sold direct. No middlemen, no plated shortcuts,
          no "starting at" marketing prices. Just gold, set with traceable stones, at honest
          numbers.
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
            <h3 className="font-display text-xl text-ink">Solid 14k, never plated.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              Plated jewellery looks great for six months and forgettable forever after.
              Solid gold doesn't tarnish, doesn't fade, and gets handed down. We only make
              the second kind.
            </p>
          </li>
          <li>
            <h3 className="font-display text-xl text-ink">Traceable stones.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              Lab-grown diamonds, conflict-free coloured stones, and certified natural pearls.
              Each stone arrives with a paper trail.
            </p>
          </li>
          <li>
            <h3 className="font-display text-xl text-ink">Lifetime polish & repair.</h3>
            <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">
              Send anything back. We polish, re-tighten prongs, and re-string for free —
              forever. The piece is yours; the upkeep is ours.
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
