import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HomeMotion from "@/components/HomeMotion";
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

const PHILOSOPHY = "We believe a fragrance should be worn, not performed. It should stay close and stay long.";

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
    <div data-home className="theme-cream -my-10 mx-[calc(50%-50vw)]">
      <HomeMotion />
      <section data-hero className="relative overflow-hidden px-4 pt-16 pb-24 text-center sm:px-6">
        <Eyebrow>Maison Aura · Fine fragrance</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-[16ch] font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden"><span data-hero-line className="block">Scent, composed</span></span>
          <span className="block overflow-hidden"><span data-hero-line className="block">like <em className="text-gold">music</em></span></span>
        </h1>

        <div className="relative mx-auto mt-12 flex max-w-5xl items-end justify-center gap-6 md:gap-10">
          <ProductImage
            product={products[2]}
            className="hidden h-64 w-40 md:block"
          />
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full border border-line">
            <div data-hero-img className="absolute inset-0">
              <Image
                src={HERO_PHOTO}
                alt="A clear glass perfume bottle catching gold light"
                fill
                priority
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
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

      <section data-philosophy className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-foreground px-4 text-center text-background sm:px-6">
        {/* Gold-ribbed side panels that part on scroll, a nod to stage curtains. */}
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            data-curtain={side}
            aria-hidden
            className={`absolute inset-y-0 w-1/4 bg-[repeating-linear-gradient(90deg,var(--gold)_0_2px,transparent_2px_22px)] opacity-40 ${side === "left" ? "left-0" : "right-0"}`}
          />
        ))}
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-background/70">Our philosophy</p>
          <p className="mx-auto mt-8 max-w-[24ch] font-serif text-3xl leading-snug sm:text-5xl">
            {PHILOSOPHY.split(" ").map((w, i) => (
              <span key={i} data-word>{w} </span>
            ))}
          </p>
          <p className="mt-8 font-serif text-2xl italic text-background/80">Maison Aura</p>
        </div>
      </section>

      <section data-mission className="grid min-h-dvh items-center gap-10 overflow-hidden bg-surface px-4 py-24 sm:px-6 md:grid-cols-3">
        {[products[6], products[4]].map((p, i) => (
          <div
            key={p.id}
            data-from={i === 0 ? "left" : "right"}
            style={{ background: `color-mix(in oklab, ${p.color} 25%, var(--surface))` }}
            className={`mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-t-full ${i === 0 ? "md:order-1" : "md:order-3"}`}
          >
            <ProductImage product={p} className="h-1/2 w-1/2" />
          </div>
        ))}
        <div data-mission-text className="text-center md:order-2">
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">
            Made outside convention.<br />
            <span className="text-gold">Blended to outlast it.</span>
          </p>
        </div>
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

      <section data-collection className="flex min-h-dvh flex-col justify-center gap-10 overflow-hidden bg-foreground py-24 text-background">
        <div className="px-4 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-background/70">The full collection</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Twelve signatures</h2>
        </div>
        {/* Scrollable row by default; HomeMotion turns it into a pinned sideways pan. */}
        <div data-rail className="overflow-x-auto">
          <div data-track className="flex w-max gap-6 px-4 sm:px-6">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                style={{ background: `color-mix(in oklab, ${p.color} 30%, #2a2018)` }}
                className="group flex w-60 shrink-0 flex-col items-center rounded-t-full px-6 pt-16 pb-8 transition hover:-translate-y-1"
              >
                <ProductImage product={p} className="h-48 w-28" sizes="112px" />
                <h3 className="mt-6 font-serif text-2xl">{p.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-background/70">{p.family}</p>
              </Link>
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

      <section data-reviews className="bg-foreground px-4 py-28 text-background sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-background/70">What our clients say</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Words that stayed with us</h2>
          <Divider />
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col justify-between border-t border-background/20 pt-8">
                  <blockquote className="font-serif text-xl leading-relaxed">“{r.quote}”</blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.3em] text-background/70">
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
