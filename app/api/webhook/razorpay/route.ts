import { NextResponse } from "next/server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { sendCapiEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Razorpay POSTs payment events here. We use this as a backup to the
// frontend success callback in case the user closes the browser.
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, sig)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try { event = JSON.parse(raw); } catch { return NextResponse.json({ error: "Bad JSON" }, { status: 400 }); }

  if (event.event !== "payment.captured") {
    // Ack other events (we don't process them yet)
    return NextResponse.json({ ok: true, ignored: event.event });
  }

  const payment = event.payload?.payment?.entity;
  if (!payment) return NextResponse.json({ error: "No payment payload" }, { status: 400 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, note: "DB not configured — event accepted but not persisted" });
  }

  const supa = createServiceClient();
  const { data: order } = await supa
    .from("orders")
    .select("*")
    .eq("razorpay_order_id", payment.order_id)
    .maybeSingle();

  if (!order) {
    // Order may not have been written yet (rare race). Accept and rely on retry.
    return NextResponse.json({ ok: true, note: "Order not found yet" });
  }
  if (order.payment_status === "paid") {
    return NextResponse.json({ ok: true, alreadyPaid: true });
  }

  await supa
    .from("orders")
    .update({
      payment_status: "paid",
      razorpay_payment_id: payment.id,
      meta_event_id: order.id,
    })
    .eq("id", order.id);

  for (const item of order.items as Array<{ product_id: string; variant_sku: string; qty: number }>) {
    await supa.rpc("decrement_inventory", {
      p_product_id: item.product_id,
      p_variant_sku: item.variant_sku,
      p_qty: item.qty,
    });
  }

  // Fire CAPI Purchase (dedupe via event_id = order.id)
  await sendCapiEvent({
    event_name: "Purchase",
    event_id: order.id,
    event_source_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation/${order.id}`,
    user_data: {
      em: order.customer_email,
      ph: `91${order.customer_phone}`,
      fn: order.customer_name?.split(" ")[0],
      ln: order.customer_name?.split(" ").slice(1).join(" "),
    },
    custom_data: {
      currency: "INR",
      value: order.total_amount / 100,
      content_ids: (order.items as any[]).map((i) => i.product_id),
      content_type: "product",
      contents: (order.items as any[]).map((i) => ({
        id: i.product_id,
        quantity: i.qty,
        item_price: i.price_paise / 100,
      })),
      order_id: order.id,
    },
  });

  return NextResponse.json({ ok: true });
}
