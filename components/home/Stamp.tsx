import Link from "next/link";

/** A slowly turning text ring around an arrow. Stops turning under reduced motion. */
export default function Stamp({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      data-cursor="Book"
      aria-label="Book a sitting"
      className="group relative block size-28 shrink-0 transition-[scale] duration-150 ease-out active:scale-[0.96] md:size-32"
    >
      <svg viewBox="0 0 100 100" className="size-full motion-safe:animate-[spin_18s_linear_infinite]" aria-hidden>
        <defs>
          <path id="stamp-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink font-mono text-[8.6px] uppercase tracking-[0.18em]">
          <textPath href="#stamp-ring" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-sun text-deep transition-[scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110">
        <svg viewBox="0 0 16 16" className="size-4 -rotate-45" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}
