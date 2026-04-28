import { NextResponse } from "next/server";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { products } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    // Local fallback so the site works pre-Supabase
    return NextResponse.json({ products });
  }
  const supa = createServerClient();
  const { data, error } = await supa
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data });
}
