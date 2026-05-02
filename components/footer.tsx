import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-section bg-cream-200 border-t border-border">
      <div className="container-wide py-section-sm">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-display text-3xl md:text-4xl tracking-[0.02em] text-ink">
              GlowGemz
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              Modern 18k gold-plated jewellery, made in Mumbai. Hypoallergenic, anti-tarnish,
              honestly priced.
            </p>
            <form
              className="mt-6 flex max-w-sm items-stretch gap-2"
              action="#"
              method="post"
            >
              <input
                type="email"
                required
                placeholder="Email for first-look drops"
                className="h-11 flex-1 rounded-full border border-border bg-white px-5 text-sm placeholder:text-ink-300 focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                className="btn-base rounded-full bg-ink px-5 text-cream-100 hover:bg-ink-700"
              >
                Join
              </button>
            </form>
          </div>

          {/* Link cols */}
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li><Link href="/products?category=necklaces" className="hover:text-ink">Necklaces</Link></li>
              <li><Link href="/products?category=earrings" className="hover:text-ink">Earrings</Link></li>
              <li><Link href="/products?category=rings" className="hover:text-ink">Rings</Link></li>
              <li><Link href="/products?category=bracelets" className="hover:text-ink">Bracelets</Link></li>
              <li><Link href="/products" className="hover:text-ink">All</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-4">House</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li><Link href="/about" className="hover:text-ink">Our story</Link></li>
              <li><Link href="/craft" className="hover:text-ink">The craft</Link></li>
              <li><Link href="/care" className="hover:text-ink">Care guide</Link></li>
              <li><Link href="/sizing" className="hover:text-ink">Sizing</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li><Link href="/shipping" className="hover:text-ink">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-ink">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="eyebrow mb-4">Connect</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-ink" href={site.social.instagram} target="_blank" rel="noopener">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-ink" href={`mailto:${site.contact.email}`}>
                  <Mail className="h-4 w-4" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6 text-center text-sm text-ink-700">
          Use code{" "}
          <span className="font-mono font-semibold text-ink">WELCOME15</span>{" "}
          for <span className="font-semibold text-ink">15% off</span> your order.
        </div>

        <div className="mt-6 flex flex-col-reverse gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} GlowGemz Jewellery Pvt. Ltd. · Crafted in Mumbai.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-500">
            <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <Link href="/legal/refund" className="hover:text-ink">Refund Policy</Link>
            <Link href="/legal/shipping" className="hover:text-ink">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
