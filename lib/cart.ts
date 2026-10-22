// Pure data helpers (no React, no browser APIs) so they can be unit-tested with `node --test`.
export type Items = Record<string, number>; // productId -> quantity

export type OrderLine = { id: string; name: string; qty: number; price: number };
export type Order = {
  id: string;
  date: string;
  lines: OrderLine[];
  total: number;
  address: string;
};

export type Bucket = { cart: Items; wishlist: string[]; orders: Order[] };

export const emptyBucket = (): Bucket => ({ cart: {}, wishlist: [], orders: [] });

export const addToCart = (b: Bucket, id: string): Bucket => ({
  ...b,
  cart: { ...b.cart, [id]: (b.cart[id] ?? 0) + 1 },
});

// qty <= 0 removes the line
export const setQty = (b: Bucket, id: string, qty: number): Bucket => {
  const cart = { ...b.cart };
  if (qty > 0) cart[id] = qty;
  else delete cart[id];
  return { ...b, cart };
};

export const toggleWishlist = (b: Bucket, id: string): Bucket => ({
  ...b,
  wishlist: b.wishlist.includes(id) ? b.wishlist.filter((x) => x !== id) : [...b.wishlist, id],
});

// Used on login/signup: guest items join the account's, quantities add up.
export const mergeGuest = (account: Bucket, guest: Bucket): Bucket => {
  const cart = { ...account.cart };
  for (const [id, qty] of Object.entries(guest.cart)) cart[id] = (cart[id] ?? 0) + qty;
  return {
    ...account,
    cart,
    wishlist: [...new Set([...account.wishlist, ...guest.wishlist])],
  };
};

export const cartCount = (b: Bucket) => Object.values(b.cart).reduce((a, q) => a + q, 0);
