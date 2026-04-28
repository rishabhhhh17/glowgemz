"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { trackPixel } from "@/components/meta-pixel";
import { formatINR } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);

  const onQuickAdd = () => {
    const v = product.variants[0];
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantSku: v.sku,
      variantLabel: v.label,
      unitPrice: product.price + (v.priceDelta ?? 0),
      image: product.images[0],
    });
    trackPixel("AddToCart", {
      content_ids: [product.id],
      content_type: "product",
      currency: "INR",
      value: (product.price + (v.priceDelta ?? 0)) / 100,
    });
  };

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream-200">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            priority={priority}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100"
            />
          )}
          {product.isNew && (
            <span className="absolute left-3 top-3 rounded-full bg-cream-100/90 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="absolute right-3 top-3 rounded-full bg-rose-100 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}

          {/* Quick add */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickAdd();
            }}
            aria-label={`Quick add ${product.name}`}
            className="absolute bottom-3 right-3 inline-flex h-10 items-center gap-1.5 rounded-full bg-ink/95 px-4 text-xs font-medium text-cream-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <Plus className="h-3.5 w-3.5" /> Quick add
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/products/${product.slug}`} className="link-underline">
            <h3 className="font-display text-base md:text-lg text-ink leading-snug truncate">{product.name}</h3>
          </Link>
          <p className="mt-1 text-xs text-ink-500">{product.metal}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink tabular-nums">{formatINR(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs line-through text-ink-300 tabular-nums">
              {formatINR(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
