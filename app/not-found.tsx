import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-tight py-section text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-3 display-serif text-display-lg text-ink">This piece slipped a clasp.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
        The page you're looking for has moved or never existed. Try the collection.
      </p>
      <Button asChild className="mt-6"><Link href="/products">Shop the collection</Link></Button>
    </div>
  );
}
