"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Header() {
  const { user, bucket, count, logout, ready } = useStore();
  const router = useRouter();
  const link = "text-sm uppercase tracking-widest text-muted transition hover:text-gold";

  return (
    <header className="border-b border-line">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
        <Link href="/" className="font-serif text-3xl tracking-wide text-gold">Maison Aura</Link>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li><Link href="/shop" className={link}>Shop</Link></li>
          <li>
            <Link href="/wishlist" className={link}>
              Wishlist{ready && bucket.wishlist.length > 0 && ` (${bucket.wishlist.length})`}
            </Link>
          </li>
          <li>
            <Link href="/cart" className={link}>
              Cart<span aria-live="polite">{ready && count > 0 && ` (${count})`}</span>
            </Link>
          </li>
          {ready && user ? (
            <>
              <li><Link href="/account" className={link}>{user.name.split(" ")[0]}</Link></li>
              <li>
                <button className={link} onClick={() => { logout(); router.push("/"); }}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login" className={link}>Log in</Link></li>
              <li><Link href="/signup" className="btn !px-4 !py-2">Sign up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
