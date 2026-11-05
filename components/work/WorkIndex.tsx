"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  type Transition,
} from "motion/react";
import { pexelsSrc, type Category, type SeriesCard } from "@/content/series";
import { useFinePointer } from "@/lib/use-media-query";

const views = ["Grid", "List", "Feed", "Full"] as const;
type View = (typeof views)[number];
type Filter = "All" | Category;

const morph: Transition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] };
const fade: Transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

const layouts: Record<View, { list: string; card: string; cover: string; sizes: string }> = {
  Grid: {
    list: "grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-4 md:gap-y-16",
    card: "flex flex-col gap-4",
    cover: "aspect-[4/5] w-full",
    sizes: "(min-width: 768px) 33vw, 50vw",
  },
  List: {
    list: "flex flex-col border-t border-line",
    card: "grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-3 md:grid-cols-[4.5rem_1fr_auto] md:gap-8",
    cover: "aspect-[4/5] w-12 md:w-[4.5rem]",
    sizes: "6rem",
  },
  Feed: {
    list: "mx-auto flex max-w-xl flex-col gap-24",
    card: "flex flex-col gap-5",
    cover: "aspect-[4/5] w-full",
    sizes: "(min-width: 640px) 36rem, 100vw",
  },
  Full: {
    list: "-mx-[clamp(1rem,3vw,2.5rem)] flex flex-col gap-1",
    card: "relative",
    cover: "h-[88svh] w-full",
    sizes: "100vw",
  },
};

export default function WorkIndex({
  cards,
  categories,
  heading = "Selected work",
}: {
  cards: SeriesCard[];
  categories: Category[];
  heading?: string;
}) {
  const [view, setView] = useState<View>("Grid");
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<SeriesCard | null>(null);
  const fine = useFinePointer();

  // Fetch the cover sizes a view needs before switching, so covers never flash blank.
  const warm = (v: View) => {
    for (const card of cards) {
      const { props } = getImageProps({ src: pexelsSrc(card.cover.id), alt: "", fill: true, sizes: layouts[v].sizes });
      preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes });
    }
  };

  const visible = filter === "All" ? cards : cards.filter((c) => c.category === filter);
  const l = layouts[view];

  return (
    <section className="gutter py-24 md:py-32">
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <h2 className="text-[clamp(2rem,4.2vw,4rem)] leading-none tracking-[-0.04em] md:col-span-5">
          {heading}
          <sup className="label ml-1 align-super text-mute">
            (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={visible.length}
                className="inline-block"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={fade}
              >
                {String(visible.length).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            )
          </sup>
        </h2>

        <div className="flex gap-10 md:col-span-3">
          <p className="label text-mute">Filter</p>
          <ul className="label space-y-1">
            {(["All", ...categories] as Filter[]).map((c) => (
              <li key={c}>
                <button
                  onClick={() => setFilter(c)}
                  className={`transition-colors ${filter === c ? "text-ink" : "text-mute hover:text-ink"}`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between gap-4 md:col-span-4 md:justify-end md:gap-8">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              onPointerEnter={() => warm(v)}
              onFocus={() => warm(v)}
              aria-pressed={view === v}
              className={`relative text-[clamp(1.25rem,2vw,1.75rem)] tracking-tight transition-colors ${
                view === v ? "text-ink" : "text-mute/60 hover:text-mute"
              }`}
            >
              {v}
              {view === v && (
                <motion.span
                  layoutId="view-underline"
                  className="absolute inset-x-0 -bottom-1 h-px bg-ink"
                  transition={morph}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <LayoutGroup>
        <motion.ul layout transition={morph} className={l.list}>
          <AnimatePresence mode="popLayout">
            {visible.map((card) => (
              <motion.li
                key={card.slug}
                layout
                transition={morph}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: fade }}
                onPointerEnter={() => view === "List" && setHovered(card)}
                onPointerLeave={() => setHovered(null)}
              >
                <Link
                  href={`/work/${card.slug}`}
                  data-cursor={view === "List" ? undefined : "View"}
                  className={`group ${l.card}`}
                >
                  <motion.div
                    layout
                    transition={morph}
                    className={`relative overflow-hidden bg-paper-2 ${l.cover}`}
                  >
                    <motion.div layout transition={morph} className="absolute inset-0">
                      <Image
                        src={pexelsSrc(card.cover.id)}
                        alt={`${card.title}, ${card.city}`}
                        fill
                        sizes={l.sizes}
                        placeholder={card.cover.blur as `data:image/${string}`}
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </motion.div>
                    {view === "Full" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    )}
                  </motion.div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={view}
                      layout="position"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { ...fade, delay: 0.45 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className={view === "Full" ? "absolute inset-x-0 bottom-0" : "contents"}
                    >
                      <Meta view={view} card={card} index={cards.indexOf(card) + 1} />
                    </motion.div>
                  </AnimatePresence>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {fine && view === "List" && <ListPreview card={hovered} />}
    </section>
  );
}

function Meta({ view, card, index }: { view: View; card: SeriesCard; index: number }) {
  const n = String(index).padStart(2, "0");

  if (view === "List") {
    return (
      <>
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="label hidden text-mute sm:inline">{n}</span>
          <span className="text-[clamp(1.5rem,4vw,3.5rem)] leading-none tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
            {card.title}
          </span>
        </div>
        <div className="label flex gap-6 text-right text-mute md:gap-12">
          <span className="hidden md:inline">{card.category}</span>
          <span className="hidden lg:inline">{card.city}</span>
          <span>{card.year}</span>
        </div>
      </>
    );
  }

  if (view === "Full") {
    return (
      <div className="gutter flex items-end justify-between pb-8 text-paper">
        <div>
          <p className="label mb-3 text-paper/70">
            {n} · {card.category}
          </p>
          <p className="display text-[clamp(3rem,9vw,9rem)]">{card.title}</p>
        </div>
        <p className="label mb-3 hidden text-right text-paper/70 sm:block">
          {card.city}
          <br />
          {card.date}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <p className={view === "Feed" ? "text-3xl tracking-tight" : "text-lg tracking-tight md:text-xl"}>
          {card.title}
        </p>
        <p className="label text-mute">{card.year}</p>
      </div>
      <p className="label text-mute">
        {card.category} · {card.city} · {card.count} frames
      </p>
      {view === "Feed" && <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">{card.summary}</p>}
    </div>
  );
}

/** Floating cover that trails the pointer while hovering rows in List view. */
function ListPreview({ card }: { card: SeriesCard | null }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 120);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 w-[min(22vw,320px)]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <AnimatePresence>
        {card && (
          <motion.div
            key={card.slug}
            className="relative aspect-[4/5] overflow-hidden"
            initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(50% 50% 50% 50%)", transition: { duration: 0.35 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={pexelsSrc(card.cover.id)}
              alt=""
              fill
              sizes="320px"
              placeholder={card.cover.blur as `data:image/${string}`}
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
