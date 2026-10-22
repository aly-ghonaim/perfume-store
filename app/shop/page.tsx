import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = { title: "Shop | Maison Aura" };

export default function Shop() {
  return (
    <>
      <h1 className="mb-8 font-serif text-5xl">The collection</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
