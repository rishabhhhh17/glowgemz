"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FulfillButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const res = await fetch(`/api/admin/orders/${orderId}/fulfill`, { method: "POST" });
        setLoading(false);
        if (res.ok) router.refresh();
      }}
    >
      {loading ? "…" : "Mark fulfilled"}
    </Button>
  );
}
