"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatPrice, getProduct } from "@/lib/products";
import { useRequireUser, useStore } from "@/lib/store";

export default function Checkout() {
  const user = useRequireUser();
  const { bucket, placeOrder } = useStore();
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!user) return null;

  if (orderId) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-5xl">Thank you, {user.name.split(" ")[0]}</h1>
        <p className="mt-4 text-muted">Order <span className="text-gold">{orderId}</span> is confirmed. This is a demo, so nothing was charged or shipped.</p>
        <Link href="/account" className="btn mt-8">View my orders</Link>
      </div>
    );
  }

  const lines = Object.entries(bucket.cart).flatMap(([id, qty]) => {
    const p = getProduct(id);
    return p ? [{ p, qty }] : [];
  });
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  if (!lines.length) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-5xl">Nothing to check out</h1>
        <Link href="/shop" className="btn mt-8">Browse the collection</Link>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const address = [f.get("address"), f.get("city"), f.get("phone")].map(String).join(", ");
    setOrderId(placeOrder(address));
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="font-serif text-5xl">Checkout</h1>
        <div>
          <label htmlFor="address" className="mb-1 block text-sm text-muted">Street address</label>
          <input id="address" name="address" required autoComplete="street-address" className="input" />
        </div>
        <div>
          <label htmlFor="city" className="mb-1 block text-sm text-muted">City</label>
          <input id="city" name="city" required autoComplete="address-level2" className="input" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm text-muted">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className="input" />
        </div>
        <p className="text-sm text-muted">Demo store: payment is skipped.</p>
        <button className="btn w-full">Place order · {formatPrice(total)}</button>
      </form>
      <aside className="h-fit border border-line bg-surface p-6">
        <h2 className="font-serif text-3xl">Summary</h2>
        <ul className="mt-4 space-y-2">
          {lines.map(({ p, qty }) => (
            <li key={p.id} className="flex justify-between text-sm">
              <span>{p.name} × {qty}</span>
              <span className="text-gold">{formatPrice(p.price * qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-line pt-4 text-lg">
          <span>Total</span><span className="text-gold">{formatPrice(total)}</span>
        </p>
      </aside>
    </div>
  );
}
