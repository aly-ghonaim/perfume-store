"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import ProductImage from "./ProductImage";
import type { Product } from "@/lib/products";

// Two product tabs either side of a hero bottle; switching spins the bottle out and the new one in.
export default function FeaturedSwitch({ items }: { items: [Product, Product] }) {
  const [active, setActive] = useState(0);
  const bottle = useRef<HTMLDivElement>(null);

  function pick(i: number) {
    if (i === active || !bottle.current) return;
    gsap.timeline()
      .to(bottle.current, { rotateY: 90, scale: 0.85, opacity: 0, duration: 0.35, ease: "power2.in", onComplete: () => setActive(i) })
      .to(bottle.current, { rotateY: 0, scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
  }

  const tab = (i: number) =>
    `label border-b pb-3 transition ${i === active ? "border-gold text-gold" : "border-transparent text-muted hover:text-gold"}`;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
      <button type="button" aria-pressed={active === 0} onClick={() => pick(0)} className={`${tab(0)} md:justify-self-end`}>
        {items[0].name}
      </button>
      <div className="[perspective:900px]">
        <div ref={bottle} className="flex flex-col items-center">
          <ProductImage product={items[active]} className="h-72 w-44 drop-shadow-[0_30px_30px_rgba(60,40,20,0.35)]" sizes="176px" />
          <p className="mt-6 max-w-[34ch] text-center text-muted">{items[active].description}</p>
        </div>
      </div>
      <button type="button" aria-pressed={active === 1} onClick={() => pick(1)} className={`${tab(1)} md:justify-self-start`}>
        {items[1].name}
      </button>
    </div>
  );
}
