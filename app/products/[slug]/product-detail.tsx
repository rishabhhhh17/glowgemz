"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ShieldCheck, Truck, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { trackPixel } from "@/components/meta-pixel";
import { formatINR, cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const add = useCart((s) => s.add);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const price = product.price + (variant.priceDelta ?? 0);

  useEffect(() => {
    trackPixel("ViewContent", {
      content_ids: [product.id],
      content_type: "product",
      content_name: product.name,
      currency: "INR",
      value: price / 100,
    });
    // we deliberately fire only on mount per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const onAdd = async () => {
    setAdding(true);
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantSku: variant.sku,
      variantLabel: variant.label,
      unitPrice: price,
      image: product.images[0],
    });
    trackPixel("AddToCart", {
      content_ids: [product.id],
      content_type: "product",
      currency: "INR",
      value: price / 100,
    });
    await new Promise((r) => setTimeout(r, 350));
    setAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="container-wide grid gap-10 py-8 md:grid-cols-12 md:gap-14 md:py-14">
      {/* Gallery */}
      <div className="md:col-span-7">
        <div className="grid gap-3 md:grid-cols-[80px_1fr]">
          <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                aria-label={`Image ${i + 1}`}
                className={cn(
                  "relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border transition-colors",
                  i === activeImg ? "border-ink" : "border-border hover:border-ink-300",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 md:order-2 relative aspect-square overflow-hidden rounded-lg bg-cream-200">
            <Image
              key={product.images[activeImg]}
              src={product.images[activeImg]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover animate-fade-up"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="md:col-span-5 md:sticky md:top-28 self-start">
        <span className="eyebrow capitalize">{product.category}</span>
        <h1 className="mt-3 display-serif text-display-md text-ink">{product.name}</h1>
        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-xl text-ink tabular-nums">{formatINR(price)}</p>
          {product.compareAtPrice && (
            <p className="text-base line-through text-ink-300 tabular-nums">
              {formatINR(product.compareAtPrice)}
            </p>
          )}
          <span className="text-xs text-ink-500">incl. all taxes</span>
        </div>

        <p className="mt-5 text-base leading-relaxed text-ink-700">{product.description}</p>

        <div className="mt-7">
          <p className="text-sm font-medium text-ink">{variantLabelHeading(product.category)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-ink bg-ink text-cream-100"
                      : "border-border bg-white text-ink hover:border-ink",
                  )}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          size="xl"
          onClick={onAdd}
          disabled={adding}
          className="mt-7 w-full"
        >
          {justAdded ? (
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Added</span>
          ) : adding ? (
            "Adding…"
          ) : (
            <>Add to bag — {formatINR(price)}</>
          )}
        </Button>

        <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-ink-700">
          <li className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border bg-cream-100 p-3">
            <Sparkles className="h-4 w-4 text-gold-600" /> Solid 14k
          </li>
          <li className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border bg-cream-100 p-3">
            <ShieldCheck className="h-4 w-4 text-gold-600" /> BIS hallmarked
          </li>
          <li className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border bg-cream-100 p-3">
            <Truck className="h-4 w-4 text-gold-600" /> Ships in 24h
          </li>
        </ul>

        <Accordion title="Details" defaultOpen>
          <ul className="space-y-2 text-sm text-ink-700">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2"><span className="text-gold-500 mt-1.5 inline-block h-1 w-1 rounded-full bg-gold-500 shrink-0" /> {d}</li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Shipping & returns">
          <p className="text-sm text-ink-700 leading-relaxed">
            Ships free above ₹5,000 in India. Most orders dispatched same-day from Mumbai.
            14-day returns on unworn pieces. Lifetime free polish at our studio.
          </p>
        </Accordion>
        <Accordion title="Care">
          <p className="text-sm text-ink-700 leading-relaxed">
            14k gold is the most everyday-friendly fine metal — but a soft cloth wipe after wear
            keeps it brightest. Avoid chlorine and undiluted perfume directly on stones.
          </p>
        </Accordion>
      </div>
    </section>
  );
}

function variantLabelHeading(category: Product["category"]) {
  switch (category) {
    case "necklaces": return "Length";
    case "earrings": return "Style";
    case "rings": return "Ring size";
    case "bracelets": return "Length";
  }
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink">{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-300 ease-out-expo", open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
