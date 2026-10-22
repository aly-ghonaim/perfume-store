// Decorative line art for the home page. All shapes are aria-hidden and sized by className.

// A three-petal bloom, used as the numbered marks on the house-principles arc.
export function Bloom({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 36" className={className} fill="currentColor">
      <path d="M20 34c-1.5-6-1.5-11 0-16 1.5 5 1.5 10 0 16Z" />
      <path d="M20 18C14 15 9 9 10 2c5 3 9 8 10 16Z" />
      <path d="M20 18c6-3 11-9 10-16-5 3-9 8-10 16Z" />
      <path d="M20 20c-6 0-12-3-16-8 6-1 12 2 16 8Zm0 0c6 0 12-3 16-8-6-1-12 2-16 8Z" opacity=".7" />
    </svg>
  );
}

// Stacked stage-arch bands, mirrored for the right side with -scale-x-100.
export function Curtain({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 600" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="22">
      <path d="M20 600V60c50-30 110-40 170-30" />
      <path d="M70 600V110c35-20 75-26 120-22" />
      <path d="M115 600V160c25-12 50-16 75-14" />
      <path d="M155 600V210" />
    </svg>
  );
}

// A tall stem-and-bud pillar that frames the mission statement.
export function Pillar({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 700" className={className} fill="currentColor">
      <path d="M60 10c22 30 34 62 34 96 0 26-12 46-34 58-22-12-34-32-34-58 0-34 12-66 34-96Z" />
      <path d="M60 40c-10 22-14 44-12 66 2 18 6 30 12 38 6-8 10-20 12-38 2-22-2-44-12-66Z" fill="#fff" opacity=".45" />
      <path d="M57 160h6v540h-6z" />
      <path d="M60 220c-24 10-42 30-50 60 24-6 42-24 50-60Zm0 0c24 10 42 30 50 60-24-6-42-24-50-60Z" opacity=".8" />
      <path d="M60 380 30 420l30 40 30-40-30-40Z" opacity=".6" />
      <path d="M20 700V500M100 700V500" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}
