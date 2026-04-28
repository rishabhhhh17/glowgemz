import { NextResponse } from "next/server";
import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { productsBySlug } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  if (!isSupabaseConfigured()) {
    const p = productsBySlug[params.slug];
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product: p });
  }
  const supa = createServerClient();
  const { data, error } = await supa
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: data });
}
