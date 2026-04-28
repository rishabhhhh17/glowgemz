"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/products?category=necklaces", label: "Necklaces" },
  { href: "/products?category=earrings", label: "Earrings" },
  { href: "/products?category=rings", label: "Rings" },
  { href: "/products?category=bracelets", label: "Bracelets" },
  { href: "/about", label: "Our Story" },
];

export function Navbar() {
  const open = useCart((s) => s.open);
  const itemCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-cream-100 text-xs">
        <div className="container-wide flex h-9 items-center justify-center gap-6 overflow-hidden">
          <span className="tracking-[0.16em] uppercase">Free shipping above ₹5,000</span>
          <span className="hidden md:inline tracking-[0.16em] uppercase opacity-60">·</span>
          <span className="hidden md:inline tracking-[0.16em] uppercase">Lifetime polish & repolish</span>
          <span className="hidden md:inline tracking-[0.16em] uppercase opacity-60">·</span>
          <span className="hidden md:inline tracking-[0.16em] uppercase">Hallmarked 14k gold</span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 ease-out-expo",
          scrolled
            ? "bg-cream-100/95 backdrop-blur-md border-b border-border"
            : "bg-cream-100 border-b border-transparent",
        )}
      >
        <div className="container-wide flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-[0.04em] text-ink-700">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="link-underline hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl tracking-[0.04em] text-ink"
            aria-label="GlowGemz home"
          >
            GlowGemz
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              aria-label="Search"
              className="hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200 transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200 transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={open}
              aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200 transition-colors"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-[18px] min-w-[18px] rounded-full bg-ink px-1 text-[10px] font-medium leading-[18px] text-cream-100 text-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
