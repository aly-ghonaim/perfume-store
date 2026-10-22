import { useId } from "react";
import type { BottleShape } from "@/lib/products";

// Each silhouette in a 120x180 box, resting on y=170: cap, neck, body, label and highlight stripe.
const SHAPES: Record<
  BottleShape,
  {
    cap: { x: number; y: number; w: number; h: number; r: number };
    neck: { x: number; y: number; w: number; h: number };
    body: string;
    label: { x: number; y: number; w: number; h: number };
    shine: string;
  }
> = {
  square: {
    cap: { x: 44, y: 6, w: 32, h: 30, r: 3 },
    neck: { x: 52, y: 36, w: 16, h: 14 },
    body: "M28 50 H92 Q102 50 102 60 V160 Q102 170 92 170 H28 Q18 170 18 160 V60 Q18 50 28 50 Z",
    label: { x: 32, y: 84, w: 56, h: 44 },
    shine: "M28 62 V158",
  },
  round: {
    cap: { x: 47, y: 18, w: 26, h: 30, r: 13 },
    neck: { x: 54, y: 48, w: 12, h: 18 },
    body: "M60 66 A52 52 0 1 1 59.9 66 Z",
    label: { x: 38, y: 106, w: 44, h: 26 },
    shine: "M22 104 Q20 128 32 150",
  },
  tall: {
    cap: { x: 45, y: 2, w: 30, h: 42, r: 2 },
    neck: { x: 54, y: 44, w: 12, h: 10 },
    body: "M40 54 H80 Q84 54 84 58 V166 Q84 170 80 170 H40 Q36 170 36 166 V58 Q36 54 40 54 Z",
    label: { x: 42, y: 92, w: 36, h: 52 },
    shine: "M44 64 V160",
  },
  faceted: {
    cap: { x: 45, y: 12, w: 30, h: 28, r: 0 },
    neck: { x: 53, y: 40, w: 14, h: 12 },
    body: "M36 52 H84 L106 74 V148 L84 170 H36 L14 148 V74 Z",
    label: { x: 34, y: 92, w: 52, h: 40 },
    shine: "M24 80 V142",
  },
  flask: {
    cap: { x: 48, y: 8, w: 24, h: 30, r: 2 },
    neck: { x: 53, y: 38, w: 14, h: 18 },
    body: "M53 56 C53 66 22 70 22 96 V158 Q22 170 34 170 H86 Q98 170 98 158 V96 C98 70 67 66 67 56 Z",
    label: { x: 34, y: 104, w: 52, h: 40 },
    shine: "M32 100 V156",
  },
};

export default function Bottle({
  color,
  shape = "square",
  className = "",
}: {
  color: string;
  shape?: BottleShape;
  className?: string;
}) {
  const id = useId();
  const s = SHAPES[shape];
  return (
    <svg viewBox="0 0 120 180" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.55" />
          <stop offset="0.45" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6d33" />
          <stop offset="0.5" stopColor="#e3c783" />
          <stop offset="1" stopColor="#8a6d33" />
        </linearGradient>
      </defs>
      <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height={s.cap.h} rx={s.cap.r} fill={`url(#${id}-cap)`} />
      <rect x={s.neck.x} y={s.neck.y} width={s.neck.w} height={s.neck.h} fill="#2a2622" />
      <path d={s.body} fill={`url(#${id}-glass)`} stroke="#c9a45c" strokeOpacity="0.75" />
      <rect
        x={s.label.x} y={s.label.y} width={s.label.w} height={s.label.h}
        fill="#0b0a09" fillOpacity="0.55" stroke="#c9a45c" strokeOpacity="0.6"
      />
      <path d={s.shine} stroke="#fff" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
