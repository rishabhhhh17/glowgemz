import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { products, categories, type Product } from "@/data/products";

export const metadata = { title: "Shop all" };

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; max?: string };
}) {
  const cat = searchParams.category;
  const sort = searchParams.sort ?? "featured";
  const maxPrice = searchParams.max ? Number(searchParams.max) * 100 : Infinity;

  let list: Product[] = products.filter((p) => (cat ? p.category === cat : true));
  list = list.filter((p) => p.price <= maxPrice);

  switch (sort) {
    case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
    case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
    case "newest": list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    default: list = [...list].sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
  }

  const heading = cat ? categories.find((c) => c.slug === cat)?.label ?? "Shop" : "Shop all";

  return (
    <div className="container-wide pt-10 md:pt-16 pb-section">
      <header className="mb-10 md:mb-14">
        <span className="eyebrow">Collection</span>
        <h1 className="mt-3 display-serif text-display-lg text-ink">{heading}</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-500">
          {list.length} piece{list.length === 1 ? "" : "s"} · solid 14k gold ·
          hand-finished in Mumbai
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-12">
        <Suspense>
          <FilterSidebar activeCategory={cat} activeSort={sort} />
        </Suspense>

        {list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid-product">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSidebar({ activeCategory, activeSort }: { activeCategory?: string; activeSort: string }) {
  const Q = (qs: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(qs)) if (v) sp.set(k, v);
    const s = sp.toString();
    return s ? `/products?${s}` : "/products";
  };

  return (
    <aside className="md:sticky md:top-28 md:self-start">
      <div className="border-b border-border pb-5 mb-5">
        <p className="eyebrow mb-3">Category</p>
        <ul className="space-y-2 text-sm">
          <li>
            <a href={Q({ sort: activeSort !== "featured" ? activeSort : undefined })}
              className={!activeCategory ? "text-ink font-medium" : "text-ink-500 hover:text-ink"}>
              All pieces
            </a>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <a href={Q({ category: c.slug, sort: activeSort !== "featured" ? activeSort : undefined })}
                className={activeCategory === c.slug ? "text-ink font-medium" : "text-ink-500 hover:text-ink"}>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow mb-3">Sort</p>
        <ul className="space-y-2 text-sm">
          {[
            { v: "featured", label: "Featured" },
            { v: "newest", label: "Newest" },
            { v: "price-asc", label: "Price · low to high" },
            { v: "price-desc", label: "Price · high to low" },
          ].map((s) => (
            <li key={s.v}>
              <a href={Q({ category: activeCategory, sort: s.v !== "featured" ? s.v : undefined })}
                className={activeSort === s.v ? "text-ink font-medium" : "text-ink-500 hover:text-ink"}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border p-12 text-center">
      <p className="font-display text-2xl text-ink">Nothing here yet.</p>
      <p className="mt-2 text-sm text-ink-500">Try clearing filters or pick a different category.</p>
    </div>
  );
}
