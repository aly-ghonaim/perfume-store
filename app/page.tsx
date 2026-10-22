import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ProductImage from "@/components/ProductImage";
import Reveal from "@/components/Reveal";
import { products, type Product } from "@/lib/products";

const featured = products.slice(0, 2);

// Scent families derived from the catalog so counts and notes never drift from the data.
const families = Object.entries(
  products.reduce<Record<string, Product[]>>((acc, p) => {
    (acc[p.family] ??= []).push(p);
    return acc;
  }, {}),
).map(([name, items]) => ({
  name,
  count: items.length,
  notes: [...new Set(items.flatMap((p) => p.notes))].slice(0, 4).join(", "),
}));

// Unbranded demo photo (Unsplash). Replace with the shop's own hero shot.
const HERO_PHOTO = "https://images.unsplash.com/photo-1703681036028-b4dbb8811230";

const MAISON_CODE = [
  { title: "A scent for every skin", body: "Every mood. Every hour. Fragrance without rules." },
  { title: "Honest by design", body: "Every note named. Nothing hidden, nothing added for show." },
  { title: "Many hands, one accord", body: "Perfumers and makers working as one, until the blend sits right." },
  { title: "Raw materials, chosen slowly", body: "Oud, saffron and rose sourced with care and patience." },
  { title: "Measured composition", body: "Only what the scent needs. Refined until it is quiet and sure." },
  { title: "Ritual, not routine", body: "A few drops that turn an ordinary morning into a ceremony." },
];

// Demo reviews written for this store; replace with real customer quotes.
const REVIEWS = [
  { quote: "Noir Oud lasts from morning until late at night. People stop me to ask what I am wearing.", name: "N.A.", city: "Cairo" },
  { quote: "Rose Absolue smells like an actual garden after rain, not a candle. It has become my signature.", name: "S.M.", city: "Alexandria" },
  { quote: "I bought White Tea for summer and ended up wearing it every day. Clean, soft and never loud.", name: "K.H.", city: "Giza" },
];

function Divider() {
  return (
    <div aria-hidden className="mx-auto my-6 flex w-24 items-center gap-2 text-gold">
      <span className="h-px flex-1 bg-current" />
      <span className="size-1.5 rotate-45 border border-current" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.3em] text-gold">{children}</p>;
}

export default function Home() {
  return (
    // Cream palette is scoped to the home page; -my-10 cancels main's padding so it runs edge to edge.
    <div className="theme-cream -my-10 mx-[calc(50%-50vw)]">
      <section className="relative overflow-hidden px-4 pt-16 pb-24 text-center sm:px-6">
        <Eyebrow>Maison Aura · Fine fragrance</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-[16ch] font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Scent, composed like <em className="text-gold">music</em>
        </h1>

        <div className="relative mx-auto mt-12 flex max-w-5xl items-end justify-center gap-6 md:gap-10">
          <ProductImage
            product={products[2]}
            className="hidden h-64 w-40 md:block"
          />
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full border border-line">
            <Image
              src={HERO_PHOTO}
              alt="A clear glass perfume bottle catching gold light"
              fill
              priority
              sizes="(min-width: 768px) 384px, 100vw"
              className="object-cover"
            />
          </div>
          <ProductImage
            product={products[9]}
            className="hidden h-64 w-40 md:block"
          />
          {/* Side shades fade the collage into the page, like light falling off at the edges. */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background to-transparent" />
        </div>

        <Link href="/shop" className="btn mt-12">Enter the maison</Link>
      </section>

      <section className="border-t border-line bg-surface px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl uppercase tracking-[0.15em] sm:text-5xl">The Maison Code</h2>
          <Divider />
          <div className="mt-12 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {MAISON_CODE.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08} className="text-center">
                <span className="font-serif text-5xl text-gold">{i + 1}</span>
                <h3 className="mt-4 text-sm font-medium uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="px-4 py-28 text-center sm:px-6">
        <Eyebrow>Our philosophy</Eyebrow>
        <p className="mx-auto mt-8 max-w-[28ch] font-serif text-3xl leading-snug sm:text-5xl">
          We believe a fragrance should be worn, not performed. It should stay close and stay long.
        </p>
        <p className="mt-8 font-serif text-2xl italic text-gold">Maison Aura</p>
      </Reveal>

      <section className="grid items-center gap-10 bg-surface px-4 py-24 sm:px-6 md:grid-cols-3">
        {[products[6], products[4]].map((p, i) => (
          <div
            key={p.id}
            style={{ background: `color-mix(in oklab, ${p.color} 25%, var(--surface))` }}
            className={`mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-t-full ${i === 0 ? "md:order-1" : "md:order-3"}`}
          >
            <ProductImage product={p} className="h-1/2 w-1/2" />
          </div>
        ))}
        <Reveal className="text-center md:order-2">
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">
            Made outside convention.<br />
            <span className="text-gold">Blended to outlast it.</span>
          </p>
        </Reveal>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>The collection</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Meet our perfumes</h2>
            <Divider />
          </div>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className="flex h-full flex-col border border-line">
                  <div
                    style={{ background: `color-mix(in oklab, ${p.color} 18%, var(--surface))` }}
                    className="flex justify-center py-10"
                  >
                    <ProductImage product={p} className="h-72 w-48" sizes="192px" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-serif text-3xl uppercase tracking-wide">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted">{p.family}, {p.sizeMl} ml</p>
                    <p className="mt-4 text-muted">{p.description}</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">Notes</p>
                    <ul className="mt-3 divide-y divide-line border-y border-line">
                      {p.notes.map((n) => (
                        <li key={n} className="py-3 text-sm uppercase tracking-[0.15em]">{n}</li>
                      ))}
                    </ul>
                    <Link href={`/product/${p.slug}`} className="mt-6 self-start text-sm uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline">
                      Read more
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl">Explore our scent families</h2>
          <Divider />
          <dl className="mt-10 grid gap-px border border-line bg-line text-left sm:grid-cols-2 lg:grid-cols-3">
            {families.map((f) => (
              <div key={f.name} className="bg-surface p-6">
                <dt className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-2xl">{f.name}</span>
                  <span className="text-sm text-muted">{f.count} {f.count === 1 ? "perfume" : "perfumes"}</span>
                </dt>
                <dd className="mt-2 text-sm text-muted">{f.notes}</dd>
              </div>
            ))}
          </dl>
          <Link href="/shop" className="btn mt-12">Browse catalogue</Link>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <Eyebrow>What our clients say</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Words that stayed with us</h2>
          <Divider />
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col justify-between border-t border-line pt-8">
                  <blockquote className="font-serif text-xl leading-relaxed">“{r.quote}”</blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                    {r.name} · {r.city}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
