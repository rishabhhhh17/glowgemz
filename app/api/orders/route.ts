import { NextResponse } from "next/server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getRazorpay } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  customer: { name: string; email: string; phone: string };
  shipping_address: Record<string, string>;
  items: Array<{
    product_id: string;
    variant_sku: string;
    name: string;
    qty: number;
    price_paise: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
};

export async function POST(req: Request) {
  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  // Basic validation
  if (!body.customer?.email || !body.customer?.phone || !body.customer?.name)
    return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
  if (!body.items?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

  // Server-side total recompute (don't trust client subtotal blindly).
  const recomputed = body.items.reduce((a, i) => a + i.price_paise * i.qty, 0);
  if (recomputed !== body.subtotal) {
    return NextResponse.json({ error: "Cart totals out of sync" }, { status: 400 });
  }

  // Create Razorpay order
  const rp = getRazorpay();
  const rpOrder = await rp.orders.create({
    amount: body.total,
    currency: "INR",
    notes: { email: body.customer.email },
  });

  if (!isSupabaseConfigured()) {
    // Without Supabase we still return a usable payload — useful for local Razorpay test mode.
    return NextResponse.json({
      orderId: rpOrder.id,
      razorpayOrderId: rpOrder.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  }

  // Persist order in Supabase as 'pending'
  const supa = createServiceClient();
  const { data, error } = await supa
    .from("orders")
    .insert({
      customer_name: body.customer.name,
      customer_email: body.customer.email.trim().toLowerCase(),
      customer_phone: body.customer.phone.replace(/\D/g, ""),
      shipping_address: body.shipping_address,
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      total_amount: body.total,
      currency: "INR",
      payment_status: "pending",
      razorpay_order_id: rpOrder.id,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    orderId: data.id,
    razorpayOrderId: rpOrder.id,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
