"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProduct } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function Wishlist() {
  const { ready, bucket } = useStore();
  if (!ready) return null;

  const items = bucket.wishlist.flatMap((id) => getProduct(id) ?? []);

  if (!items.length) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-5xl">Your wishlist is empty</h1>
        <p className="mt-4 text-muted">Tap the heart on any perfume to save it here.</p>
        <Link href="/shop" className="btn mt-8">Browse the collection</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 font-serif text-5xl">Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
