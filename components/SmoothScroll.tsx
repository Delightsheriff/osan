"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { frame, cancelFrame } from "motion/react";

let lenis: Lenis | null = null;

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    // Drive Lenis from Motion's frame loop so scroll and animations share one tick.
    const update = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
