import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";
import { AdminLogin } from "./admin-login";
import { FulfillButton } from "./fulfill-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: "noindex" };

export default async function AdminPage() {
  const ck = cookies();
  const session = ck.get("gg_admin")?.value;
  if (session !== process.env.ADMIN_PASSWORD) {
    return <AdminLogin />;
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="container-tight py-section">
        <h1 className="display-serif text-display-md text-ink">Admin</h1>
        <p className="mt-3 text-sm text-ink-500">
          Supabase isn't configured yet. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> in <code>.env.local</code>.
        </p>
      </div>
    );
  }

  const supa = createServiceClient();
  const [{ data: orders }, { data: inv }] = await Promise.all([
    supa.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
    supa.from("inventory").select("*").order("variant_sku"),
  ]);

  const paid = (orders ?? []).filter((o) => o.payment_status === "paid");
  const revenue = paid.reduce((a, o) => a + o.total_amount, 0);

  return (
    <div className="container-wide py-12">
      <header className="flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">GlowGemz · operations</span>
          <h1 className="mt-2 display-serif text-display-md text-ink">Admin</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <Button variant="outline" size="sm">Sign out</Button>
        </form>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Orders (paid)" value={String(paid.length)} />
        <Stat label="Revenue" value={formatINR(revenue)} />
        <Stat label="Pending" value={String((orders ?? []).filter((o) => o.payment_status === "pending").length)} />
        <Stat label="Unfulfilled" value={String(paid.filter((o) => o.fulfillment_status === "unfulfilled").length)} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink mb-5">Orders</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-cream-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.14em] text-ink-500 bg-cream-200/60">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Fulfillment</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(orders ?? []).length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-ink-500">No orders yet.</td></tr>
              )}
              {(orders ?? []).map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-4 py-3"><div className="font-medium">{o.customer_name}</div><div className="text-xs text-ink-500">{o.customer_email}</div></td>
                  <td className="px-4 py-3">{(o.items as any[]).reduce((a, i) => a + i.qty, 0)} item(s)</td>
                  <td className="px-4 py-3 tabular-nums">{formatINR(o.total_amount)}</td>
                  <td className="px-4 py-3"><Badge status={o.payment_status} /></td>
                  <td className="px-4 py-3"><Badge status={o.fulfillment_status} /></td>
                  <td className="px-4 py-3 text-xs text-ink-500">{new Date(o.created_at).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-right">
                    {o.payment_status === "paid" && o.fulfillment_status === "unfulfilled" && (
                      <FulfillButton orderId={o.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink mb-5">Inventory</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-cream-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.14em] text-ink-500 bg-cream-200/60">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">In stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(inv ?? []).map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3">{row.product_id}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.variant_sku}</td>
                  <td className="px-4 py-3 tabular-nums">
                    <span className={row.stock_count <= 5 ? "text-destructive font-medium" : ""}>
                      {row.stock_count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-cream-100 p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{label}</p>
      <p className="mt-2 font-display text-2xl text-ink">{value}</p>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-green-50 text-green-800 border-green-200",
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    failed: "bg-red-50 text-red-800 border-red-200",
    fulfilled: "bg-green-50 text-green-800 border-green-200",
    unfulfilled: "bg-cream-200 text-ink-700 border-border",
    cancelled: "bg-red-50 text-red-800 border-red-200",
    refunded: "bg-cream-200 text-ink-500 border-border",
  };
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs capitalize ${map[status] ?? "bg-cream-200 text-ink-700 border-border"}`}>
      {status}
    </span>
  );
}
