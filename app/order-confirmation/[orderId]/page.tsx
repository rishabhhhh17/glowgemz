import Link from "next/link";
import { Check } from "lucide-react";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrderConfirmation({ params }: { params: { orderId: string } }) {
  let order: any = null;

  if (isSupabaseConfigured()) {
    const supa = createServiceClient();
    const { data } = await supa.from("orders").select("*").eq("id", params.orderId).maybeSingle();
    order = data;
  }

  return (
    <div className="container-tight pt-12 pb-section text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 animate-fade-up">
        <Check className="h-9 w-9 text-gold-600" strokeWidth={2.5} />
      </div>
      <span className="eyebrow">Order confirmed</span>
      <h1 className="mt-3 display-serif text-display-lg text-ink">Thank you.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
        Your order is being hand-finished in our Mumbai studio. We've sent the receipt to{" "}
        {order?.customer_email ? <span className="text-ink">{order.customer_email}</span> : "your inbox"}.
      </p>

      {order && (
        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-border bg-cream-100 p-7 text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Order</p>
            <p className="font-mono text-xs text-ink">{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {(order.items as Array<any>).map((i, idx) => (
              <li key={idx} className="flex justify-between py-3 text-sm">
                <span className="text-ink">{i.name} <span className="text-ink-500">× {i.qty}</span></span>
                <span className="tabular-nums">{formatINR(i.price_paise * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1.5 border-t border-border pt-5 text-sm">
            <div className="flex justify-between text-ink-700"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
            <div className="flex justify-between text-ink-700"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatINR(order.shipping)}</span></div>
            <div className="flex justify-between font-medium text-base mt-2 border-t border-border pt-3">
              <span>Total</span><span>{formatINR(order.total_amount)}</span>
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto mt-12 max-w-xl">
        <h2 className="font-display text-2xl text-ink">What happens next</h2>
        <ol className="mt-5 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <Step n="1" t="Hand-finishing" b="We polish, set and quality-check your piece — usually within 24h." />
          <Step n="2" t="Dispatch" b="Couriered insured from Mumbai. Tracking arrives over email + SMS." />
          <Step n="3" t="Wear" b="If anything's off, reply to the receipt and we'll make it right." />
        </ol>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg"><Link href="/products">Keep shopping</Link></Button>
        <Button asChild variant="outline" size="lg"><Link href={`mailto:hello@glowgemz.in?subject=Order ${params.orderId}`}>Contact support</Link></Button>
      </div>
    </div>
  );
}

function Step({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <li className="rounded-lg border border-border bg-cream-100 p-5">
      <span className="font-display text-2xl text-gold-500">0{n}</span>
      <p className="mt-2 text-sm font-medium text-ink">{t}</p>
      <p className="mt-1 text-xs text-ink-500 leading-relaxed">{b}</p>
    </li>
  );
}
