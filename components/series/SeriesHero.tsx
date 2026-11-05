"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/series";

/** Full-bleed cover that drifts slower than the page. */
export default function SeriesHero({ photo, title }: { photo: PhotoData; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={ref}
      className="relative h-[80svh] overflow-hidden md:h-[92svh]"
      initial={{ clipPath: "inset(12% 6% 0% 6%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
    >
      <motion.div className="absolute inset-[-12%_0]" style={{ y }}>
        <Photo photo={photo} alt={title} sizes="100vw" fill priority reveal={false} className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}
