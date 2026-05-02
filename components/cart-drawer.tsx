"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/site";

export function CartDrawer() {
  const {
    isOpen, close, items, setQty, remove,
    subtotal, discountCode, discount, total: getTotal,
    applyCode, removeCode,
  } = useCart();
  const sub = subtotal();
  const shipping = sub > 0 && sub < site.shippingFreeOver ? site.flatShipping : 0;
  const disc = discount(shipping);
  const total = getTotal(shipping);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent side="right" className="flex h-dvh flex-col p-0">
        <SheetHeader>
          <SheetTitle>Your bag</SheetTitle>
          <p className="text-sm text-ink-500">
            {items.length === 0
              ? "It's empty — for now."
              : `${items.reduce((a, i) => a + i.qty, 0)} item${items.reduce((a, i) => a + i.qty, 0) === 1 ? "" : "s"} · subtotal ${formatINR(sub)}`}
          </p>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 divide-y divide-border">
              {items.map((item) => (
                <div key={item.variantSku} className="flex gap-4 py-5 first:pt-0">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-cream-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={close}
                        className="font-display text-base text-ink hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm text-ink shrink-0">{formatINR(item.unitPrice * item.qty)}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-500">{item.variantLabel}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border bg-white">
                        <button
                          onClick={() => setQty(item.variantSku, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-9 w-9 items-center justify-center hover:bg-cream-200 rounded-l-full"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.variantSku, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-9 w-9 items-center justify-center hover:bg-cream-200 rounded-r-full"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.variantSku)}
                        aria-label="Remove"
                        className="text-ink-500 hover:text-ink p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-cream-100 px-6 py-5 space-y-3">
              <div className="flex justify-between text-sm text-ink-700">
                <span>Subtotal</span>
                <span>{formatINR(sub)}</span>
              </div>
              {discountCode && disc > 0 ? (
                <div className="flex justify-between text-sm text-ink-700">
                  <span>
                    Discount{" "}
                    <span className="font-mono text-xs">({discountCode})</span>
                  </span>
                  <span>−{formatINR(disc)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-sm text-ink-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-border pt-3">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <CouponInput
                discountCode={discountCode}
                applyCode={applyCode}
                removeCode={removeCode}
              />
              <Button asChild size="lg" className="w-full mt-2">
                <Link href="/checkout" onClick={close}>
                  Checkout
                </Link>
              </Button>
              <p className="text-center text-xs text-ink-500">Taxes calculated at checkout · Free shipping above ₹5,000</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CouponInput({
  discountCode,
  applyCode,
  removeCode,
}: {
  discountCode: string | null;
  applyCode: (code: string) => { ok: true } | { ok: false; error: string };
  removeCode: () => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (discountCode) {
    return (
      <div className="flex items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-xs">
        <span className="text-ink">
          Code applied:{" "}
          <span className="font-mono font-semibold tracking-wider">{discountCode}</span>
        </span>
        <button
          type="button"
          onClick={removeCode}
          aria-label="Remove discount code"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-cream-200"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const result = applyCode(value);
        if (result.ok) setValue("");
        else setError(result.error);
      }}
      className="space-y-1"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.toUpperCase());
            if (error) setError(null);
          }}
          placeholder="Discount code"
          autoComplete="off"
          spellCheck={false}
          className="h-10 flex-1 rounded-full border border-border bg-white px-4 text-sm uppercase tracking-wider focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-full border border-border bg-white px-4 text-xs font-medium uppercase tracking-wider hover:bg-cream-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div className="h-20 w-20 rounded-full bg-cream-200 grid place-items-center mb-5">
        <span className="font-display text-3xl text-ink-300">○</span>
      </div>
      <h3 className="font-display text-2xl text-ink">Your bag is empty</h3>
      <p className="mt-2 max-w-xs text-sm text-ink-500">
        Find a piece that already feels like yours.
      </p>
      <Button asChild className="mt-6">
        <Link href="/products">Browse the collection</Link>
      </Button>
    </div>
  );
}
