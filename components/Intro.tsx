"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { site } from "@/content/site";
import { setScrollLocked } from "./SmoothScroll";
import { INTRO_KEY, INTRO_SECONDS } from "@/lib/intro";

export default function Intro() {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-skip")) return;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setScrollLocked(true);
    const controls = animate(count, 100, { duration: INTRO_SECONDS - 0.6, ease: [0.65, 0, 0.35, 1] });
    const t = setTimeout(() => {
      setDone(true);
      setScrollLocked(false);
    }, (INTRO_SECONDS - 0.4) * 1000);
    return () => {
      controls.stop();
      clearTimeout(t);
      setScrollLocked(false);
    };
  }, [count]);

  return (
    <motion.div
      aria-hidden
      className="intro gutter fixed inset-0 z-[90] flex flex-col justify-between bg-ink py-6 text-paper"
      initial={false}
      animate={done ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="label flex justify-between text-paper/50">
        <span>{site.tagline}</span>
        <span>{site.city}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="display flex overflow-hidden text-[clamp(4rem,14vw,14rem)] font-medium">
          {site.name.split("").map((l, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.06 }}
            >
              {l}
            </motion.span>
          ))}
        </p>
        <motion.span className="label mb-[1.2em] tabular-nums text-paper/60">{label}</motion.span>
      </div>
    </motion.div>
  );
}
