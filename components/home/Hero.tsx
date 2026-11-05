"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pexelsSrc, type Photo } from "@/content/series";
import { site } from "@/content/site";

export type Pill = { slug: string; title: string; photos: Photo[] };

type Token = { word: string } | { pill: number };

// The headline, with photo pills dropped in between the words.
const tokens: Token[] = [
  { word: "Portraits" },
  { pill: 0 },
  { word: "made" },
  { word: "slowly," },
  { word: "in" },
  { pill: 1 },
  { word: "afternoon" },
  { word: "*light,*" },
  { word: "for" },
  { word: "people" },
  { pill: 2 },
  { word: "who" },
  { word: "rarely" },
  { word: "sit" },
  { word: "still." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ pills }: { pills: Pill[] }) {
  return (
    <section className="gutter flex min-h-svh flex-col justify-between pb-8 pt-28 md:pt-32">
      <div className="label flex justify-between text-mute">
        <span>Portrait &amp; editorial photography</span>
        <span>{site.city}, NG</span>
      </div>

      <h1
        className="display max-w-[16ch] text-[clamp(2.75rem,7.4vw,8.25rem)]"
        aria-label="Portraits made slowly, in afternoon light, for people who rarely sit still."
      >
        {tokens.map((t, i) =>
          "pill" in t ? (
            <HeroPill key={i} pill={pills[t.pill]} order={i} />
          ) : (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span
                className={`inline-block ${t.word.startsWith("*") ? "accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease, delay: 0.15 + i * 0.05 }}
              >
                {t.word.replaceAll("*", "")}
              </motion.span>
              &nbsp;
            </span>
          ),
        )}
      </h1>

      <div className="grid items-end gap-8 md:grid-cols-12">
        <motion.p
          className="max-w-sm text-[15px] leading-relaxed text-ink-soft md:col-span-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1 }}
        >
          {site.name} is a portrait practice in {site.city}. Small crews, no
          strobes, and as much time as the picture needs.
        </motion.p>
        <div className="flex items-center gap-3 md:col-span-3 md:col-start-10 md:justify-end">
          <span className="label text-mute">Scroll</span>
          <span className="relative h-px w-16 overflow-hidden bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/2 bg-ink"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroPill({ pill, order }: { pill: Pill; order: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Offset each pill so they never change at the same moment.
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => setIndex((n) => (n + 1) % pill.photos.length), 2600);
    }, 900 * order);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [order, pill.photos.length]);

  const photo = pill.photos[index];

  return (
    <motion.span
      className="mr-[0.25em] inline-block align-[-0.08em]"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "1.9em", opacity: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.4 + order * 0.05 }}
    >
      <Link
        href={`/work/${pill.slug}`}
        data-cursor="View"
        aria-label={`View ${pill.title}`}
        className="group relative block h-[0.78em] w-[1.9em] overflow-hidden rounded-full bg-paper-2"
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={photo.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <Image
              src={pexelsSrc(photo.id)}
              alt=""
              fill
              sizes="12rem"
              priority={index === 0}
              placeholder={photo.blur as `data:image/${string}`}
              className="object-cover grayscale-[35%] transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
          </motion.span>
        </AnimatePresence>
      </Link>
    </motion.span>
  );
}
