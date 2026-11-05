"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/series";

type Props = { photos: PhotoData[]; title: string };

/**
 * Desktop: the section pins and vertical scroll drives the strip sideways.
 * Mobile: a plain vertical stack.
 */
export default function HorizontalGallery({ photos, title }: Props) {
  return (
    <>
      <div className="hidden md:block">
        <Pinned photos={photos} title={title} />
      </div>
      <div className="gutter flex flex-col gap-4 md:hidden">
        {photos.map((p, i) => (
          <Photo key={p.id} photo={p} alt={`${title}, frame ${i + 1}`} sizes="100vw" />
        ))}
      </div>
    </>
  );
}

function Pinned({ photos, title }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [frame, setFrame] = useState(1);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFrame(Math.min(photos.length, Math.floor(v * photos.length) + 1));
  });

  return (
    <section ref={section} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x: smoothX }} className="gutter flex w-max items-center gap-6">
          {photos.map((p, i) => (
            <figure
              key={p.id}
              className="relative h-[70svh] shrink-0"
              style={{ aspectRatio: `${p.width} / ${p.height}` }}
            >
              <Photo
                photo={p}
                alt={`${title}, frame ${i + 1}`}
                sizes={`${Math.round((70 * p.width) / p.height)}vh`}
                fill
                className="h-full w-full"
              />
              <figcaption className="label absolute -bottom-7 left-0 text-mute">
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-6">
          <span className="label tabular-nums">
            {String(frame).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 bg-line">
            <motion.span className="absolute inset-y-0 left-0 bg-ink" style={{ width: bar }} />
          </span>
          <span className="label text-mute">Scroll</span>
        </div>
      </div>
    </section>
  );
}
