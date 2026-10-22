"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fades and lifts content in once as it scrolls into view. Content is visible by default,
// so it still shows if scripts fail.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Plays even with prefers-reduced-motion: the owner chose to always play the site's motion.
    const tween = gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      delay,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
