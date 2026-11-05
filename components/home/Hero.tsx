"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "@/content/series";
import { site } from "@/content/site";
import { introDelay } from "@/lib/intro";
import Stamp from "./Stamp";

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
const PILL_SIZES = "12rem";

export default function Hero({ pills }: { pills: Pill[] }) {
  // Hold the headline back until the intro curtain lifts.
  const [wait] = useState(introDelay);

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
            <HeroPill key={i} pill={pills[t.pill]} order={i} wait={wait} />
          ) : (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span
                className={`inline-block ${t.word.startsWith("*") ? "accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease, delay: wait + 0.15 + i * 0.05 }}
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
          transition={{ duration: 1, ease, delay: wait + 1 }}
        >
          {site.name} is a portrait practice in {site.city}. Small crews, no
          strobes, and as much time as the picture needs.
        </motion.p>
        <div className="flex items-end justify-between gap-6 md:col-span-5 md:col-start-8 md:justify-end md:gap-10">
          <div className="mb-2 flex items-center gap-3">
            <span className="label text-mute">Scroll</span>
            <span className="relative h-px w-16 overflow-hidden bg-line">
              <motion.span
                className="absolute inset-y-0 left-0 w-1/2 bg-ink"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.2, bounce: 0, delay: wait + 1.1 }}
          >
            <Stamp text="Book a sitting · Spring 2027 · " href="/contact" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroPill({ pill, order, wait }: { pill: Pill; order: number; wait: number }) {
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

  // Fetch the next frame while this one is showing, so the crossfade never waits.
  useEffect(() => {
    const next = pill.photos[(index + 1) % pill.photos.length];
    const { props } = getImageProps({ src: next, alt: "", fill: true, sizes: PILL_SIZES });
    preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes });
  }, [index, pill.photos]);

  return (
    <motion.span
      className="mr-[0.25em] inline-block align-[-0.08em]"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "1.9em", opacity: 1 }}
      transition={{ duration: 1.2, ease, delay: wait + 0.4 + order * 0.05 }}
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
              src={photo}
              alt=""
              fill
              sizes={PILL_SIZES}
              loading="eager"
              placeholder="blur"
              className="photo-outline object-cover grayscale-[35%] transition-[scale,filter] duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:grayscale-0 motion-safe:group-hover:scale-110"
            />
          </motion.span>
        </AnimatePresence>
      </Link>
    </motion.span>
  );
}
