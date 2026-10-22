"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function Cart() {
  const { ready, bucket, setQuantity, user } = useStore();
  if (!ready) return null;

  const lines = Object.entries(bucket.cart).flatMap(([id, qty]) => {
    const p = getProduct(id);
    return p ? [{ p, qty }] : [];
  });
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  if (!lines.length) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-5xl">Your cart is empty</h1>
        <Link href="/shop" className="btn mt-8">Browse the collection</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 font-serif text-5xl">Your cart</h1>
      <ul className="divide-y divide-line border-y border-line">
        {lines.map(({ p, qty }) => (
          <li key={p.id} className="flex flex-wrap items-center gap-4 py-5">
            <ProductImage product={p} className="h-16 w-16 shrink-0" sizes="64px" />
            <div className="min-w-40 flex-1">
              <Link href={`/product/${p.slug}`} className="font-serif text-2xl hover:text-gold">{p.name}</Link>
              <p className="text-sm text-muted">{p.sizeMl} ml · {formatPrice(p.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost !px-3 !py-1" aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQuantity(p.id, qty - 1)}>−</button>
              <span aria-live="polite" className="w-8 text-center">{qty}</span>
              <button className="btn-ghost !px-3 !py-1" aria-label={`Increase quantity of ${p.name}`} onClick={() => setQuantity(p.id, qty + 1)}>+</button>
            </div>
            <p className="w-28 text-right text-gold">{formatPrice(p.price * qty)}</p>
            <button className="text-sm text-muted underline hover:text-gold" onClick={() => setQuantity(p.id, 0)}>
              Remove<span className="sr-only"> {p.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-2xl">Total <span className="ml-2 text-gold">{formatPrice(total)}</span></p>
        <Link href={user ? "/checkout" : "/login?next=%2Fcheckout"} className="btn">
          {user ? "Checkout" : "Log in to checkout"}
        </Link>
      </div>
    </>
  );
}
