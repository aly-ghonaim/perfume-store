"use client";

import Image from "next/image";
import { useState } from "react";
import Bottle from "./Bottle";
import type { Product } from "@/lib/products";

// Shows the product photo when one is set, otherwise (or if it fails to load) the SVG bottle.
// The wrapper's className sets the size; the photo fills it.
export default function ProductImage({
  product,
  className = "",
  sizes = "(min-width: 768px) 25vw, 100vw",
  priority = false,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const photo = product.image && !failed ? product.image : null;

  return (
    <div className={`relative ${className}`}>
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Bottle color={product.color} shape={product.shape} className="h-full w-full" />
      )}
    </div>
  );
}
