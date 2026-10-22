import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { AddToCartButton, WishlistButton } from "@/components/ProductActions";
import { formatPrice, getBySlug, products } from "@/lib/products";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export default function ProductPage(props: PageProps<"/product/[slug]">) {
  return (
    <Suspense>
      <ProductDetails params={props.params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getBySlug(slug);
  if (!p) notFound();

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex items-center justify-center border border-line bg-surface py-12">
        <ProductImage product={p} className="h-80 w-full" sizes="(min-width: 768px) 50vw, 100vw" priority />
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted">{p.family}</p>
        <h1 className="mt-2 font-serif text-5xl">{p.name}</h1>
        <p className="mt-4 text-2xl text-gold">
          {formatPrice(p.price)} <span className="text-base text-muted">· {p.sizeMl} ml</span>
        </p>
        <p className="mt-6 text-muted">{p.description}</p>
        <h2 className="mt-8 text-sm uppercase tracking-widest">Notes</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {p.notes.map((n) => <li key={n} className="border border-line px-3 py-1 text-sm">{n}</li>)}
        </ul>
        <div className="mt-10 flex gap-2">
          <AddToCartButton id={p.id} name={p.name} />
          <WishlistButton id={p.id} name={p.name} />
        </div>
      </div>
    </div>
  );
}
