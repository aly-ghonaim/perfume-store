import Image from "next/image";
import Link from "next/link";
import FeaturedSwitch from "@/components/FeaturedSwitch";
import HomeMotion from "@/components/HomeMotion";
import { Bloom, Curtain, Pillar } from "@/components/Ornaments";
import ProductImage from "@/components/ProductImage";
import { products, type Product } from "@/lib/products";

const bySlug = (slug: string) => products.find((p) => p.slug === slug) as Product;

// Unbranded demo photo (Unsplash). Replace with the shop's own hero shot.
const HERO_PHOTO = "https://images.unsplash.com/photo-1703681036028-b4dbb8811230";

// Hero strip: the photo sits in the middle, flanked by lit bottle "shots" on tinted backdrops.
const STRIP = ["sea-salt", "noir-oud", "photo", "golden-saffron", "rose-absolue"] as const;

const PRINCIPLES = [
  { title: "Worn close", body: ["Composed to sit near the skin,", "noticed by those who lean in."] },
  { title: "A slow dry-down", body: ["Built in layers that open", "over hours, not minutes."] },
  { title: "Every note named", body: ["What is in the bottle is on the label.", "No filler, no mystery musk."] },
  { title: "Rested, then poured", body: ["Concentrates sit for weeks", "before a single bottle is filled."] },
  { title: "Small batches", body: ["Poured in short runs", "so every bottle leaves fresh."] },
  { title: "Made to return to", body: ["Scents you reach for again,", "long after the first spray."] },
];

const CREDO = "A fragrance should be worn, not performed. It should stay close and stay long.";
const PROMISE = "Twelve perfumes. No trends. Only what lasts.";

// Demo reviews written for this store; replace with real customer quotes.
const REVIEWS = [
  { quote: "Noir Oud lasts from morning until late at night. People stop me to ask what I am wearing.", name: "N.A.", city: "Cairo" },
  { quote: "Rose Absolue smells like a garden after rain, not a candle. It has quietly become my signature.", name: "S.M.", city: "Alexandria" },
  { quote: "I bought White Tea for summer and ended up wearing it every day. Clean, soft and never loud.", name: "K.H.", city: "Giza" },
];

const NOTES = [...new Set(products.flatMap((p) => p.notes))].slice(0, 8);

function Shot({ product }: { product: Product }) {
  return (
    <div
      style={{ background: `radial-gradient(circle at 50% 45%, color-mix(in oklab, ${product.color} 55%, #d9b98a) 0%, color-mix(in oklab, ${product.color} 35%, #0c0804) 70%)` }}
      className="flex h-full items-center justify-center"
    >
      <ProductImage product={product} className="h-1/2 w-1/3 drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

export default function Home() {
  return (
    // -my-10 cancels main's padding so the scenes run edge to edge under the floating header.
    <div data-home className="home -my-10 mx-[calc(50%-50vw)]">
      <HomeMotion />

      {/* 1. Hero strip */}
      <section data-hero className="relative h-[85svh] min-h-[520px] overflow-hidden bg-[var(--ink)]">
        {/* Elements GSAP moves are centred with flex or margins: it absorbs Tailwind's translate utilities. */}
        <div className="absolute inset-0 flex justify-center">
          <div data-strip className="flex h-full w-max shrink-0">
            {STRIP.map((key) => (
              <div key={key} data-panel className="relative h-full w-[42vw] min-w-[300px] overflow-hidden">
                {key === "photo" ? (
                  <Image src={HERO_PHOTO} alt="A glass perfume bottle catching warm light" fill priority sizes="42vw" className="object-cover" />
                ) : (
                  <Shot product={bySlug(key)} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        <h1 className="sr-only">Maison Aura, fine fragrance</h1>
        <div className="absolute inset-x-0 bottom-16 flex justify-center">
          <Link href="/shop" data-hero-cta className="btn-pill border-[#d4b08a] text-[#ecd9bf] !transition-colors">
            Enter the house
          </Link>
        </div>
      </section>

      {/* 2. Six principles: pinned, the arc of blooms counts 1 to 6 while the script title changes */}
      <section data-principles className="relative h-svh overflow-hidden bg-[linear-gradient(160deg,#f9f2e9_55%,#efe3e3)]">
        <div aria-hidden className="absolute inset-y-0 left-6 w-3 border-x border-[var(--line)] sm:left-10" />
        <div aria-hidden className="absolute inset-y-0 right-6 w-3 border-x border-[var(--line)] sm:right-10" />
        <div aria-hidden className="absolute left-1/2 top-[22%] aspect-square w-[min(90vw,1500px)] -translate-x-1/2 rounded-full border border-[#e3cfb8]" />
        <h2 className="label absolute inset-x-0 top-24 text-center text-gold">Six notes of the house</h2>
        <ol className="absolute left-1/2 top-[18%] h-0 w-0">
          {PRINCIPLES.map((_, i) => {
            // Spread the blooms along an upper arc from -50° to 50°.
            const a = ((-50 + i * 20) * Math.PI) / 180;
            return (
              <li
                key={i}
                data-bloom
                style={{ transform: `translate(${Math.sin(a) * 340 - 22}px, ${(1 - Math.cos(a)) * 340}px)` }}
                className={`absolute flex flex-col items-center text-xs ${i === 0 ? "text-gold" : "text-[#e3cfb8]"}`}
              >
                <span className="font-serif">{i + 1}</span>
                <Bloom className="size-11" />
              </li>
            );
          })}
        </ol>
        <div className="absolute inset-x-0 top-[44%] grid place-items-center px-6 text-center">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} data-principle className={`[grid-area:1/1] ${i === 0 ? "" : "opacity-0"}`}>
              <h3 className="script text-6xl text-[#7a5a3a] sm:text-8xl">{p.title}</h3>
              <p className="mt-6 text-xl text-gold">{p.body[0]}<br />{p.body[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Credo: deep plum, curtains part as the heading lands */}
      <section data-credo className="relative flex h-svh items-center justify-center overflow-hidden bg-[var(--plum)] px-6 text-center text-white">
        <Curtain className="absolute -left-4 top-20 h-[110%] w-[22vw] text-[var(--plum-2)]" />
        <Curtain className="absolute -right-4 top-20 h-[110%] w-[22vw] -scale-x-100 text-[var(--plum-2)]" />
        <div className="relative">
          <h2 className="display overflow-hidden text-6xl sm:text-8xl lg:text-9xl">
            {"The Credo".split("").map((c, i) => (
              <span key={i} data-char className="inline-block whitespace-pre">{c}</span>
            ))}
          </h2>
          <p data-credo-text className="mx-auto mt-10 max-w-[46ch] text-xl leading-relaxed text-white/90">{CREDO}</p>
          <p data-credo-text className="script mt-8 text-5xl text-white/80">Maison Aura</p>
        </div>
      </section>

      {/* 4. Promise: giant bronze headline between pillars, then a sand circle rises over it */}
      <section data-promise className="relative h-svh overflow-hidden bg-[var(--surface)]">
        <Pillar className="absolute -bottom-10 left-[4vw] h-[95%] text-[#e2d8cc]" />
        <Pillar className="absolute -bottom-10 right-[4vw] h-[95%] text-[#e2d8cc]" />
        <div className="absolute inset-x-0 top-[22%] px-6 text-center">
          <p className="label text-gold">Our promise</p>
          <h2 className="display mx-auto mt-6 max-w-[14ch] text-5xl sm:text-7xl lg:text-8xl">
            {/* Gradient sits on each word: a clipped parent background skips transformed children. */}
            {PROMISE.split(" ").map((w, i) => (
              <span key={i} data-word className="bronze inline-block pr-[0.25em]">{w}</span>
            ))}
          </h2>
        </div>
        <div data-circle className="absolute inset-x-0 top-full mx-auto flex aspect-square w-[70vmax] flex-col items-center rounded-full bg-[var(--sand)] pt-[8vmax]">
          <p className="label text-gold">Inside the bottles</p>
          <p className="display bronze mt-4 text-[18vw] leading-none">Notes</p>
        </div>
      </section>

      {/* 5. Notes: product tabs around a bottle, then framed note cards */}
      <section className="bg-[var(--sand)] px-4 pb-28 pt-16 sm:px-8">
        <FeaturedSwitch items={[bySlug("noir-oud"), bySlug("rose-absolue")]} />
        <div data-cards className="mt-20 flex gap-6 overflow-x-auto pb-4">
          {NOTES.map((n) => (
            <Link
              key={n}
              href="/shop"
              data-card
              className="group relative flex min-h-56 w-64 shrink-0 flex-col items-center justify-center bg-[var(--background)] p-8 text-center outline outline-1 -outline-offset-[10px] outline-[var(--line)]"
            >
              <Bloom className="size-10 text-[#7a5a3a] transition group-hover:-translate-y-1" />
              <span className="label mt-6 text-[#5a4430]">{n}</span>
              <span className="script mt-3 text-3xl text-gold">Discover</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Showcase: pinned dark stage, then the reviews circle rises over it */}
      <section data-showcase className="relative h-svh overflow-hidden bg-[var(--ink)]">
        <div data-ring aria-hidden className="absolute inset-x-0 top-[8%] mx-auto aspect-square w-[min(60vw,640px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,#8a6a45,#2a1d10_60%,transparent_72%)] ring-1 ring-[#a07a52]/50" />
        <div className="absolute inset-x-0 bottom-[16%] flex items-end justify-center gap-[4vw]">
          {["velvet-iris", "noir-oud", "golden-saffron"].map((slug, i) => (
            <div key={slug} data-stage className="flex flex-col items-center">
              <ProductImage product={bySlug(slug)} className={`${i === 1 ? "h-80 w-48" : "h-60 w-36"} drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]`} />
              <div className={`${i === 1 ? "h-24 w-64" : "h-16 w-48"} rounded-[50%/20%] bg-gradient-to-b from-[#3d4652] to-[#151a20]`} />
            </div>
          ))}
        </div>
        <Link href="/shop" className="btn-pill absolute bottom-8 left-1/2 -translate-x-1/2 border-[#d4b08a] text-[#ecd9bf]">
          Browse the collection
        </Link>
        <div data-review-circle className="absolute inset-x-0 top-full mx-auto flex aspect-square w-[80vmax] flex-col items-center overflow-hidden rounded-full bg-[var(--sand)] pt-[7vmax]">
          <p className="label text-gold">What our clients say</p>
          <p data-marquee className="display bronze mt-6 whitespace-nowrap text-[14vw] leading-none">Kind words · Kind words</p>
        </div>
      </section>

      {/* 7. Reviews: paper cards fan out */}
      <section data-reviews className="relative -mt-px bg-[var(--sand)] px-4 pb-32 pt-10 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} data-review className="flex flex-col justify-between bg-[var(--background)] p-10 shadow-[0_20px_50px_rgba(90,60,30,0.15)] outline outline-1 -outline-offset-[10px] outline-[var(--line)]">
              <p className="text-center font-serif text-3xl text-gold">MA</p>
              <blockquote className="mt-6 text-lg leading-relaxed text-[#5a4430]">“{r.quote}”</blockquote>
              <figcaption className="label mt-8 text-gold">{r.name} · {r.city}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
