import Link from "next/link";
import Bottle from "./Bottle";
import { AddToCartButton, WishlistButton } from "./ProductActions";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="flex flex-col border border-line bg-surface">
      <Link href={`/product/${p.slug}`} className="flex flex-col items-center px-6 pt-8">
        <Bottle color={p.color} className="h-48" />
        <h3 className="mt-6 font-serif text-2xl">{p.name}</h3>
        <p className="text-sm text-muted">{p.family} · {p.sizeMl} ml</p>
        <p className="mt-2 text-gold">{formatPrice(p.price)}</p>
      </Link>
      <div className="mt-auto flex gap-2 p-4">
        <AddToCartButton id={p.id} name={p.name} />
        <WishlistButton id={p.id} name={p.name} />
      </div>
    </article>
  );
}
