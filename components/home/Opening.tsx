"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/series";

type Props = {
  photo: PhotoData;
  slug: string;
  title: string;
  meta: string;
};

/** A pill-shaped window that opens to full bleed as you scroll through it. */
export default function Opening({ photo, slug, title, meta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useTransform(scrollYProgress, [0, 0.75], [1, 0], { clamp: true });
  const clipPath = useTransform(inset, (v) => {
    const y = 34 * v;
    const x = 38 * v;
    return `inset(${y}% ${x}% ${y}% ${x}% round ${v * 999}px)`;
  });
  const scale = useTransform(scrollYProgress, [0, 0.75], [1.35, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.65, 0.85], [24, 0]);

  return (
    <section ref={ref} className="relative h-[240svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Photo photo={photo} alt={title} sizes="100vw" fill reveal={false} className="h-full w-full" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          className="gutter absolute inset-x-0 bottom-0 flex items-end justify-between pb-8 text-on-deep"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          <div>
            <p className="label mb-3 text-on-deep/70">{meta}</p>
            <p className="display text-[clamp(3rem,8vw,8rem)]">{title}</p>
          </div>
          <Link
            href={`/work/${slug}`}
            data-cursor="Open"
            className="label mb-3 rounded-full border border-on-deep/40 px-4 py-2.5 transition-[background-color,color,scale] duration-150 ease-out hover:bg-on-deep hover:text-deep active:scale-[0.96]"
          >
            View series →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
