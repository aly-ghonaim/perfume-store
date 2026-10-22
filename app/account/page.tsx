"use client";

import { formatPrice } from "@/lib/products";
import { useRequireUser, useStore } from "@/lib/store";

export default function Account() {
  const user = useRequireUser();
  const { bucket } = useStore();
  if (!user) return null;

  return (
    <>
      <h1 className="font-serif text-5xl">{user.name}</h1>
      <p className="mt-2 text-muted">{user.email}</p>
      <h2 className="mb-4 mt-12 font-serif text-3xl">Orders</h2>
      {bucket.orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {bucket.orders.map((o) => (
            <li key={o.id} className="border border-line bg-surface p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-gold">{o.id}</span>
                <time dateTime={o.date} className="text-sm text-muted">{new Date(o.date).toLocaleDateString("en-GB")}</time>
              </div>
              <ul className="mt-3 text-sm">
                {o.lines.map((l) => <li key={l.id}>{l.name} × {l.qty}</li>)}
              </ul>
              <p className="mt-3 text-sm text-muted">Ship to: {o.address}</p>
              <p className="mt-2">{formatPrice(o.total)}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
