import Link from "next/link";
import Bottle from "@/components/Bottle";
import Reveal from "@/components/Reveal";
import { formatPrice, getBySlug, products, type Product } from "@/lib/products";

const bestsellers = products.slice(0, 5);

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

const heroBottles = [
  { slug: "rose-absolue", box: "bottom-8 left-[4%] h-[52%]", delay: 0.25 },
  { slug: "golden-saffron", box: "inset-x-0 bottom-0 mx-auto w-fit h-[86%]", delay: 0.1 },
  { slug: "velvet-iris", box: "bottom-14 right-[4%] h-[60%]", delay: 0.4 },
];

export default function Home() {
  return (
    <>
      <section className="grid min-h-[calc(100dvh-12rem)] items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Scent, composed like <span className="text-gold">music</span>
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg text-muted">
            Twelve signature perfumes, from smoked oud to white tea. Find the one that stays with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn">Shop perfumes</Link>
            <a href="#bestsellers" className="btn-ghost">See bestsellers</a>
          </div>
        </div>
        <div className="relative h-[22rem] bg-[radial-gradient(ellipse_at_50%_75%,rgb(201_164_92/0.14),transparent_65%)] sm:h-[28rem] md:col-span-6 md:h-[34rem]">
          {heroBottles.map(({ slug, box, delay }) => {
            const p = getBySlug(slug)!;
            return (
              <Reveal key={slug} delay={delay} className={`absolute ${box}`}>
                <Bottle color={p.color} className="h-full" />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="bestsellers" className="mt-24 scroll-mt-8">
        <h2 className="font-serif text-4xl sm:text-5xl">Bestsellers</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
          {bestsellers.map((p, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={p.id}
                delay={i * 0.06}
                className={featured ? "sm:col-span-2 md:row-span-2" : ""}
              >
                <Link
                  href={`/product/${p.slug}`}
                  style={{ background: `color-mix(in oklab, ${p.color} 22%, var(--surface))` }}
                  className="group flex h-full min-h-72 flex-col justify-between border border-line p-6 transition hover:border-gold active:scale-[0.99]"
                >
                  <div className="flex flex-1 items-center justify-center py-4">
                    <Bottle
                      color={p.color}
                      className={`${featured ? "h-64 md:h-96" : "h-32"} transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0`}
                    />
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className={`font-serif ${featured ? "text-4xl" : "text-2xl"}`}>{p.name}</h3>
                      <p className="text-sm text-muted">{p.family}, {p.sizeMl} ml</p>
                    </div>
                    <p className="text-gold">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-serif text-4xl sm:text-5xl">Find your scent family</h2>
        <dl className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {families.map((f, i) => (
            <Reveal key={f.name} delay={(i % 2) * 0.08} className="border-t border-line pt-5">
              <dt className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-3xl">{f.name}</span>
                <span className="text-sm text-muted">{f.count} {f.count === 1 ? "perfume" : "perfumes"}</span>
              </dt>
              <dd className="mt-2 text-muted">{f.notes}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Reveal className="mt-24 flex flex-col items-start justify-between gap-6 border border-line bg-surface px-6 py-12 sm:px-10 md:flex-row md:items-center">
        <h2 className="font-serif text-4xl sm:text-5xl">Ready to find your scent?</h2>
        <Link href="/shop" className="btn shrink-0">Shop perfumes</Link>
      </Reveal>
    </>
  );
}
