"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLogin() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      setError("Wrong password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] grid place-items-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg border border-border bg-cream-100 p-7">
        <h1 className="font-display text-2xl text-ink">Admin</h1>
        <p className="mt-1 text-sm text-ink-500">GlowGemz operations console</p>
        <Input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="mt-5"
        />
        {error && <p role="alert" className="mt-3 text-xs text-destructive">{error}</p>}
        <Button type="submit" size="lg" className="mt-4 w-full" disabled={loading}>
          {loading ? "…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
