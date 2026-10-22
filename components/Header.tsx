"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function Header() {
  const { user, bucket, count, logout, ready } = useStore();
  const router = useRouter();
  // On the home page the header floats over the full-bleed scenes in bronze, like a masthead.
  const overlay = usePathname() === "/";
  const link = overlay
    ? "text-[15px] text-[#b08a5c] transition hover:text-[#d4b08a]"
    : "text-sm uppercase tracking-widest text-muted transition hover:text-gold";

  return (
    <header className={overlay ? "fixed inset-x-0 top-0 z-50" : "border-b border-line"}>
      <nav aria-label="Main" className="mx-auto grid max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-4 py-5 sm:px-8">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li><Link href="/shop" className={link}>Shop</Link></li>
          <li>
            <Link href="/wishlist" className={link}>
              Wishlist{ready && bucket.wishlist.length > 0 && ` (${bucket.wishlist.length})`}
            </Link>
          </li>
        </ul>
        <Link href="/" className={`font-serif tracking-wide ${overlay ? "text-4xl text-[#b08a5c]" : "text-3xl text-gold"}`}>
          {overlay ? <span aria-label="Maison Aura">MA</span> : "Maison Aura"}
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
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
              {!overlay && <li><Link href="/signup" className="btn !px-4 !py-2">Sign up</Link></li>}
            </>
          )}
          <li>
            <Link href="/cart" className={link}>
              Cart<span aria-live="polite">{ready && count > 0 && ` (${count})`}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
