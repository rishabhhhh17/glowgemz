import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productsBySlug } from "@/data/products";
import { ProductDetail } from "./product-detail";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = productsBySlug[params.slug];
  if (!p) return { title: "Not found" };
  return { title: p.name, description: p.description };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productsBySlug[params.slug];
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <nav aria-label="breadcrumb" className="container-wide pt-6 text-xs text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li className="opacity-40">/</li>
          <li><Link href={`/products?category=${product.category}`} className="hover:text-ink capitalize">{product.category}</Link></li>
          <li className="opacity-40">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="container-wide py-section">
          <h2 className="mb-10 font-display text-2xl md:text-3xl text-ink">Looks like a match.</h2>
          <div className="grid-product">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
