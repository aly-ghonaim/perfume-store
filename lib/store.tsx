"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  addToCart, cartCount, emptyBucket, mergeGuest, setQty, toggleWishlist,
  type Bucket, type Order,
} from "./cart";
import { getProduct } from "./products";

const KEY = "perfume-store:v1";

type User = { id: string; name: string; email: string; passHash: string };
type Data = { users: User[]; session: string | null; guest: Bucket; buckets: Record<string, Bucket> };
const empty: Data = { users: [], session: null, guest: emptyBucket(), buckets: {} };

// shortcut: demo-only auth, data lives in the visitor's browser. Replace with a real backend for production.
async function hash(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

type Ctx = {
  ready: boolean;
  user: { id: string; name: string; email: string } | null;
  bucket: Bucket;
  count: number;
  add: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  toggleWish: (id: string) => void;
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  placeOrder: (address: string) => string | null;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(empty);
  const [ready, setReady] = useState(false);

  // Read localStorage after mount so server and first client render match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- load after mount so SSR and first client render match
      if (raw) setData({ ...empty, ...JSON.parse(raw) });
    } catch {
      // corrupted or blocked storage: start empty
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [data, ready]);

  const sessionUser = data.users.find((u) => u.id === data.session) ?? null;
  const bucket = sessionUser ? (data.buckets[sessionUser.id] ?? emptyBucket()) : data.guest;

  const update = useCallback((fn: (b: Bucket) => Bucket) => {
    setData((d) => {
      const u = d.users.find((x) => x.id === d.session);
      return u
        ? { ...d, buckets: { ...d.buckets, [u.id]: fn(d.buckets[u.id] ?? emptyBucket()) } }
        : { ...d, guest: fn(d.guest) };
    });
  }, []);

  const startSession = (d: Data, userId: string): Data => ({
    ...d,
    session: userId,
    guest: emptyBucket(),
    buckets: { ...d.buckets, [userId]: mergeGuest(d.buckets[userId] ?? emptyBucket(), d.guest) },
  });

  const signup: Ctx["signup"] = async (name, email, password) => {
    const e = email.trim().toLowerCase();
    if (data.users.some((u) => u.email === e)) return "An account with this email already exists.";
    const user: User = { id: crypto.randomUUID(), name: name.trim(), email: e, passHash: await hash(password) };
    setData((d) => startSession({ ...d, users: [...d.users, user] }, user.id));
    return null;
  };

  const login: Ctx["login"] = async (email, password) => {
    const user = data.users.find((u) => u.email === email.trim().toLowerCase());
    // same message for unknown email and wrong password
    if (!user || user.passHash !== (await hash(password))) return "Incorrect email or password.";
    setData((d) => startSession(d, user.id));
    return null;
  };

  const logout = () => setData((d) => ({ ...d, session: null }));

  const placeOrder: Ctx["placeOrder"] = (address) => {
    if (!sessionUser) return null;
    const lines = Object.entries(bucket.cart).flatMap(([id, qty]) => {
      const p = getProduct(id);
      return p ? [{ id, name: p.name, qty, price: p.price }] : [];
    });
    if (!lines.length) return null;
    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      lines,
      total: lines.reduce((s, l) => s + l.price * l.qty, 0),
      address,
    };
    update((b) => ({ ...b, cart: {}, orders: [order, ...b.orders] }));
    return order.id;
  };

  const value: Ctx = useMemo(
    () => ({
      ready,
      user: sessionUser && { id: sessionUser.id, name: sessionUser.name, email: sessionUser.email },
      bucket,
      count: cartCount(bucket),
      add: (id) => update((b) => addToCart(b, id)),
      setQuantity: (id, qty) => update((b) => setQty(b, id, qty)),
      toggleWish: (id) => update((b) => toggleWishlist(b, id)),
      signup, login, logout, placeOrder,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, data],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

// Redirects to /login when logged out; returns the user once known.
export function useRequireUser() {
  const { ready, user } = useStore();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (ready && !user) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [ready, user, router, path]);
  return user;
}
