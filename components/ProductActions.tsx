"use client";

import { useStore } from "@/lib/store";

export function WishlistButton({ id, name }: { id: string; name: string }) {
  const { bucket, toggleWish } = useStore();
  const on = bucket.wishlist.includes(id);
  return (
    <button
      onClick={() => toggleWish(id)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      className="flex h-12 w-12 shrink-0 items-center justify-center border border-line text-xl transition hover:border-gold"
    >
      <span aria-hidden="true" className={on ? "text-gold" : "text-muted"}>{on ? "♥" : "♡"}</span>
    </button>
  );
}

export function AddToCartButton({ id, name }: { id: string; name: string }) {
  const { add } = useStore();
  return (
    <button className="btn flex-1" onClick={() => add(id)} aria-label={`Add ${name} to cart`}>
      Add to cart
    </button>
  );
}
