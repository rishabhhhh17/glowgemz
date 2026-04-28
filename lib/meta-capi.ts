import crypto from "crypto";

// Meta Conversions API — server-side event sender.
// Browser-side Pixel events are emitted by components/meta-pixel.tsx.
// Use a shared event_id to deduplicate browser+server reports.

type CapiEvent = {
  event_name: "Purchase" | "InitiateCheckout" | "AddToCart" | "ViewContent" | "PageView";
  event_time?: number; // unix seconds
  event_id: string;
  event_source_url?: string;
  action_source?: "website" | "email" | "system_generated";
  user_data: {
    em?: string; // email
    ph?: string; // phone
    fn?: string;
    ln?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_ids?: string[];
    content_type?: "product" | "product_group";
    contents?: Array<{ id: string; quantity: number; item_price: number }>;
    order_id?: string;
  };
};

function sha256(input?: string): string | undefined {
  if (!input) return undefined;
  return crypto.createHash("sha256").update(input.trim().toLowerCase()).digest("hex");
}

export async function sendCapiEvent(event: CapiEvent): Promise<{ ok: boolean; status?: number; body?: unknown }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return { ok: false, status: 0, body: "Meta CAPI not configured" };
  }

  const hashed = {
    em: sha256(event.user_data.em),
    ph: sha256(event.user_data.ph?.replace(/\D/g, "")),
    fn: sha256(event.user_data.fn),
    ln: sha256(event.user_data.ln),
    client_ip_address: event.user_data.client_ip_address,
    client_user_agent: event.user_data.client_user_agent,
  };

  const payload = {
    data: [
      {
        event_name: event.event_name,
        event_time: event.event_time ?? Math.floor(Date.now() / 1000),
        event_id: event.event_id,
        event_source_url: event.event_source_url,
        action_source: event.action_source ?? "website",
        user_data: hashed,
        custom_data: event.custom_data,
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}
