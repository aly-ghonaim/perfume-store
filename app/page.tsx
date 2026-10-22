import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Fine fragrance</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          Scent, composed like <span className="text-gold">music</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          Twelve signature perfumes, from smoked oud to white tea. Find the one that stays with you.
        </p>
        <Link href="/shop" className="btn mt-8">Shop the collection</Link>
      </section>
      <section aria-labelledby="featured" className="mt-8">
        <h2 id="featured" className="mb-6 font-serif text-3xl">Bestsellers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
