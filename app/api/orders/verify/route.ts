import { NextResponse } from "next/server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { verifyCheckoutSignature } from "@/lib/razorpay";
import { sendCapiEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: Request) {
  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  // 1. Verify signature
  const ok = verifyCheckoutSignature({
    razorpayOrderId: body.razorpay_order_id,
    razorpayPaymentId: body.razorpay_payment_id,
    razorpaySignature: body.razorpay_signature,
  });
  if (!ok) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, note: "Verified (no DB persistence configured)" });
  }

  const supa = createServiceClient();

  // 2. Mark paid (idempotent — check current status first)
  const { data: order } = await supa
    .from("orders")
    .select("*")
    .eq("id", body.orderId)
    .maybeSingle();
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.payment_status === "paid") {
    return NextResponse.json({ ok: true, alreadyPaid: true });
  }

  const { error: updErr } = await supa
    .from("orders")
    .update({
      payment_status: "paid",
      razorpay_payment_id: body.razorpay_payment_id,
      meta_event_id: order.id, // dedupe key with browser pixel
    })
    .eq("id", body.orderId);
  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

  // 3. Decrement inventory atomically per line
  for (const item of order.items as Array<{ product_id: string; variant_sku: string; qty: number }>) {
    const { error: invErr } = await supa.rpc("decrement_inventory", {
      p_product_id: item.product_id,
      p_variant_sku: item.variant_sku,
      p_qty: item.qty,
    });
    if (invErr) console.error("Inventory decrement failed", invErr);
  }

  // 4. Fire Meta CAPI Purchase (deduped via event_id = order.id)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ua = req.headers.get("user-agent") ?? undefined;
  await sendCapiEvent({
    event_name: "Purchase",
    event_id: order.id,
    event_source_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation/${order.id}`,
    user_data: {
      em: order.customer_email,
      ph: `91${order.customer_phone}`,
      fn: order.customer_name?.split(" ")[0],
      ln: order.customer_name?.split(" ").slice(1).join(" "),
      client_ip_address: ip,
      client_user_agent: ua,
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
