import { useId } from "react";

export default function Bottle({ color, className = "" }: { color: string; className?: string }) {
  const id = useId();
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
      <rect x="44" y="6" width="32" height="30" rx="3" fill={`url(#${id}-cap)`} />
      <rect x="52" y="36" width="16" height="14" fill="#2a2622" />
      <rect x="18" y="50" width="84" height="120" rx="10" fill={`url(#${id}-glass)`} stroke="#c9a45c" strokeOpacity="0.5" />
      <rect x="32" y="84" width="56" height="44" fill="#0b0a09" fillOpacity="0.55" stroke="#c9a45c" strokeOpacity="0.6" />
      <path d="M28 60 v100" stroke="#fff" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
