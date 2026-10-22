"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll scenes for the home page, wired to data-* hooks in app/page.tsx.
// Everything is visible and static by default; motion is added only when the user allows it.
export default function HomeMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(document.querySelector("[data-home]"));

      // Hero: headline lines rise in on load; the arch photo settles from a slight zoom as you scroll away.
      gsap.from(q("[data-hero-line]"), { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" });
      gsap.fromTo(q("[data-hero-img]"), { scale: 1.15 }, {
        scale: 1,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: q("[data-hero]")[0], start: "top top", end: "bottom top", scrub: true },
      });

      // Philosophy: pinned while the side panels part like curtains and the statement lights up word by word.
      gsap.timeline({
        scrollTrigger: { trigger: q("[data-philosophy]")[0], start: "top top", end: "+=120%", pin: true, scrub: 0.6 },
      })
        .to(q("[data-curtain=left]"), { xPercent: -100, ease: "none" }, 0)
        .to(q("[data-curtain=right]"), { xPercent: 100, ease: "none" }, 0)
        .from(q("[data-word]"), { opacity: 0.12, stagger: 0.05, ease: "none" }, 0.1);

      // Mission: pinned while the two bottle arches slide in from the edges toward the statement.
      gsap.timeline({
        scrollTrigger: { trigger: q("[data-mission]")[0], start: "top top", end: "+=100%", pin: true, scrub: 0.6 },
      })
        .from(q("[data-from=left]"), { xPercent: -120, rotate: -6, ease: "none" }, 0)
        .from(q("[data-from=right]"), { xPercent: 120, rotate: 6, ease: "none" }, 0)
        .from(q("[data-mission-text]"), { opacity: 0, y: 40, ease: "none" }, 0.3);

      // Collection: pinned, vertical scroll pans the bottle row sideways.
      const rail = q("[data-rail]")[0];
      const track = q("[data-track]")[0];
      if (rail && track) {
        gsap.set(rail, { overflow: "visible" }); // reverted to the scrollable fallback with mm.revert()
        const distance = () => track.scrollWidth - rail.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-collection]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // Reviews: the dark panel opens from a small circle to full bleed.
      gsap.fromTo(q("[data-reviews]"), { clipPath: "circle(12% at 50% 50%)" }, {
        clipPath: "circle(75% at 50% 50%)",
        ease: "none",
        scrollTrigger: { trigger: q("[data-reviews]")[0], start: "top 90%", end: "top 10%", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return null;
}
