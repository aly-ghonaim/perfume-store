"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRONZE = "#997550";
const PALE = "#e3cfb8";

// Scroll scenes for the home page, wired to data-* hooks in app/page.tsx.
// Motion always plays (owner's choice), so it ignores prefers-reduced-motion.
export default function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-home]");
    if (!root) return;
    const q = gsap.utils.selector(root);
    const one = (s: string) => q(s)[0];

    const ctx = gsap.context(() => {
      // 1. Hero: panels open from their centre lines, then the strip drifts as you scroll away.
      gsap.timeline()
        .from(q("[data-panel]"), { clipPath: "inset(50% 0 50% 0)", duration: 1.4, stagger: { each: 0.12, from: "center" }, ease: "expo.inOut" })
        .from(one("[data-hero-cta]"), { autoAlpha: 0, y: 30, duration: 1, ease: "expo.out" }, "-=0.5");
      gsap.to(one("[data-strip]"), {
        x: () => -window.innerWidth * 0.12,
        ease: "none",
        scrollTrigger: { trigger: one("[data-hero]"), start: "top top", end: "bottom top", scrub: true },
      });

      // 2. Principles: pinned; each step lights the next bloom and swaps the script title.
      const steps = q("[data-principle]");
      const blooms = q("[data-bloom]");
      const principles = gsap.timeline({
        scrollTrigger: { trigger: one("[data-principles]"), start: "top top", end: `+=${steps.length * 70}%`, pin: true, scrub: 0.8 },
      });
      steps.slice(1).forEach((step, i) => {
        principles
          .to(steps[i], { opacity: 0, y: -40, duration: 0.5 }, i + 0.5)
          .fromTo(step, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, i + 0.8)
          .to(blooms[i], { color: PALE, duration: 0.3 }, i + 0.8)
          .to(blooms[i + 1], { color: BRONZE, duration: 0.3 }, i + 0.8);
      });

      // 3. Credo: pinned; curtains part while the heading letters rise.
      gsap.timeline({
        scrollTrigger: { trigger: one("[data-credo]"), start: "top top", end: "+=120%", pin: true, scrub: 0.8 },
      })
        .from(q("[data-credo] svg:first-of-type"), { xPercent: 40, ease: "none" }, 0)
        .from(q("[data-credo] svg:nth-of-type(2)"), { xPercent: -40, ease: "none" }, 0)
        .from(q("[data-char]"), { yPercent: 110, opacity: 0, stagger: 0.04, ease: "power2.out" }, 0)
        .from(q("[data-credo-text]"), { opacity: 0, y: 30, stagger: 0.15 }, 0.4);

      // 4. Promise: pinned; words fill in, pillars rise, then the sand circle climbs over the page.
      gsap.timeline({
        scrollTrigger: { trigger: one("[data-promise]"), start: "top top", end: "+=220%", pin: true, scrub: 0.8 },
      })
        .from(q("[data-promise] svg"), { yPercent: 25, opacity: 0, ease: "none" }, 0)
        .from(q("[data-word]"), { opacity: 0.08, y: 50, stagger: 0.12, ease: "none" }, 0)
        .to(one("[data-circle]"), { y: () => -window.innerHeight * 0.88, ease: "none", duration: 1.4 }, 1);

      // 5. Note cards slide in from the right.
      gsap.from(q("[data-card]"), {
        x: 160,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: one("[data-cards]"), start: "top 85%" },
      });

      // 6. Showcase: pinned; bottles rise onto their plinths, the halo turns, then the reviews circle climbs in.
      gsap.timeline({
        scrollTrigger: { trigger: one("[data-showcase]"), start: "top top", end: "+=220%", pin: true, scrub: 0.8 },
      })
        .from(q("[data-stage]"), { y: 260, opacity: 0, stagger: 0.15, ease: "power2.out" }, 0)
        .fromTo(one("[data-ring]"), { scale: 0.7, rotate: -40 }, { scale: 1.1, rotate: 30, ease: "none", duration: 2 }, 0)
        .to(one("[data-review-circle]"), { y: () => -window.innerHeight * 0.9, ease: "none", duration: 1.2 }, 1)
        .fromTo(one("[data-marquee]"), { xPercent: 20 }, { xPercent: -30, ease: "none", duration: 1.4 }, 1);

      // 7. Review cards fan up from a tilted stack.
      gsap.from(q("[data-review]"), {
        y: 140,
        rotate: (i: number) => [-10, 4, 12][i] ?? 0,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: one("[data-reviews]"), start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
