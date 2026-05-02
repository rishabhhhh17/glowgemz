"use client";

import { useEffect, useRef } from "react";
import { trackPixel } from "@/components/meta-pixel";

type StashedPayload = {
  event_id: string;
  value: number;
  currency: string;
  num_items: number;
  content_ids: string[];
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  order_id: string;
};

export function PurchaseTracker({ orderId }: { orderId: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || !orderId) return;

    let payload: StashedPayload | null = null;
    try {
      const raw = sessionStorage.getItem(`gg_purchase_${orderId}`);
      if (raw) payload = JSON.parse(raw) as StashedPayload;
    } catch {}

    if (!payload) return;

    fired.current = true;
    trackPixel(
      "Purchase",
      {
        currency: payload.currency,
        value: payload.value,
        content_ids: payload.content_ids,
        contents: payload.contents,
        num_items: payload.num_items,
        order_id: payload.order_id,
      },
      payload.event_id,
    );

    try {
      sessionStorage.removeItem(`gg_purchase_${orderId}`);
    } catch {}
  }, [orderId]);

  return null;
}
