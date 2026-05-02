"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-store";
import { trackPixel } from "@/components/meta-pixel";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/site";

declare global {
  interface Window {
    Razorpay?: new (options: any) => { open: () => void };
  }
}

type Form = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const empty: Form = { name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear, discountCode, discount, total: getTotal } = useCart();
  const [form, setForm] = useState<Form>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sub = subtotal();
  const shipping = sub > 0 && sub < site.shippingFreeOver ? site.flatShipping : 0;
  const disc = discount(shipping);
  const total = getTotal(shipping);

  useEffect(() => {
    if (items.length === 0) return;
    trackPixel("InitiateCheckout", {
      currency: "INR",
      value: total / 100,
      content_ids: items.map((i) => i.productId),
      contents: items.map((i) => ({ id: i.productId, quantity: i.qty, item_price: i.unitPrice / 100 })),
      num_items: items.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) return "Please enter a valid 10-digit Indian mobile.";
    if (!form.line1.trim()) return "Please enter your address.";
    if (!form.city.trim() || !form.state.trim()) return "Please complete city & state.";
    if (!/^\d{6}$/.test(form.pincode)) return "Please enter a valid 6-digit pincode.";
    return null;
  };

  const onPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) return setError(err);
    if (items.length === 0) return setError("Your cart is empty.");
    setSubmitting(true);

    try {
      // 1. create order on server
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: form.name, email: form.email, phone: form.phone },
          shipping_address: {
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            country: "IN",
          },
          items: items.map((i) => ({
            product_id: i.productId,
            variant_sku: i.variantSku,
            name: `${i.name} — ${i.variantLabel}`,
            qty: i.qty,
            price_paise: i.unitPrice,
          })),
          subtotal: sub,
          shipping,
          total,
          discount_code: discountCode ?? undefined,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to create order");
      }
      const { orderId, razorpayOrderId, keyId } = await res.json();

      // 2. open Razorpay checkout
      if (!window.Razorpay) throw new Error("Razorpay SDK failed to load");
      const rp = new window.Razorpay({
        key: keyId,
        amount: total,
        currency: "INR",
        name: site.name,
        description: "GlowGemz order",
        order_id: razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#1A1A1A" },
        handler: async (response: any) => {
          // 3. verify on server, mark paid, decrement inventory
          const verify = await fetch("/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          if (!verify.ok) {
            setError("Payment verification failed. Please contact support.");
            setSubmitting(false);
            return;
          }
          // 4. fire client purchase pixel (CAPI also fires server-side via webhook)
          trackPixel(
            "Purchase",
            {
              currency: "INR",
              value: total / 100,
              content_ids: items.map((i) => i.productId),
              contents: items.map((i) => ({ id: i.productId, quantity: i.qty, item_price: i.unitPrice / 100 })),
              num_items: items.length,
              order_id: orderId,
            },
            orderId, // dedupe key with CAPI
          );
          clear();
          router.push(`/order-confirmation/${orderId}`);
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      rp.open();
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-tight py-section text-center">
        <h1 className="display-serif text-display-md text-ink">Your bag is empty</h1>
        <p className="mt-3 text-ink-500">Find a piece that already feels like yours.</p>
        <Button asChild className="mt-6"><a href="/products">Browse the collection</a></Button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="container-tight pt-10 pb-section">
        <h1 className="display-serif text-display-lg text-ink">Checkout</h1>
        <p className="mt-2 text-sm text-ink-500">Secure payment via Razorpay · UPI, cards, wallets, netbanking.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          <form onSubmit={onPay} className="space-y-8">
            <Section title="Contact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><Input value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></Field>
                <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></Field>
                <Field label="Mobile (10-digit)"><Input inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></Field>
              </div>
            </Section>

            <Section title="Shipping address">
              <div className="grid gap-4">
                <Field label="Address line 1"><Input value={form.line1} onChange={(e) => set("line1", e.target.value)} autoComplete="address-line1" /></Field>
                <Field label="Address line 2 (optional)"><Input value={form.line2} onChange={(e) => set("line2", e.target.value)} autoComplete="address-line2" /></Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City"><Input value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" /></Field>
                  <Field label="State"><Input value={form.state} onChange={(e) => set("state", e.target.value)} autoComplete="address-level1" /></Field>
                  <Field label="PIN code"><Input inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} autoComplete="postal-code" /></Field>
                </div>
              </div>
            </Section>

            {error && (
              <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="xl" disabled={submitting} className="w-full">
              {submitting ? "Opening secure checkout…" : `Pay ${formatINR(total)}`}
            </Button>
          </form>

          <aside className="lg:sticky lg:top-28 self-start rounded-lg border border-border bg-cream-100 p-6">
            <h2 className="font-display text-2xl text-ink mb-5">Order summary</h2>
            <ul className="space-y-4 max-h-[360px] overflow-y-auto">
              {items.map((i) => (
                <li key={i.variantSku} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-cream-200">
                    <Image src={i.image} alt={i.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate">{i.name}</p>
                    <p className="text-xs text-ink-500">{i.variantLabel} · qty {i.qty}</p>
                  </div>
                  <span className="text-sm tabular-nums">{formatINR(i.unitPrice * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm border-t border-border pt-5">
              <Row label="Subtotal" value={formatINR(sub)} />
              {discountCode && disc > 0 ? (
                <Row label={`Discount (${discountCode})`} value={`−${formatINR(disc)}`} />
              ) : null}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                <span>Total</span><span>{formatINR(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display text-2xl text-ink mb-5">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-500">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink-700">
      <span>{label}</span><span className="tabular-nums">{value}</span>
    </div>
  );
}
