"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { series } from "@/content/series";
import { setScrollLocked } from "./SmoothScroll";

const WIPE_MS = 700;
const total = series.reduce((n, s) => n + s.photos.length, 0);

/**
 * Every frame on the site laid out like a film contact sheet: one roll per
 * series, edge print in amber, frame numbers under each shot.
 */
export default function ContactSheetPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
      setScrollLocked(true);
      return;
    }
    // Let the wipe finish, then hand the page back.
    const t = setTimeout(() => {
      el.close();
      setScrollLocked(false);
    }, WIPE_MS);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label="Contact sheet"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-transparent"
    >
      <motion.div
        data-lenis-prevent
        className="h-full overflow-y-auto overscroll-contain bg-deep text-on-deep"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
        transition={{ duration: WIPE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      >
        <header className="gutter sticky top-0 z-10 flex items-center justify-between bg-deep/90 py-5 backdrop-blur-sm">
          <p className="label text-on-deep/60">
            Contact sheet · {total} frames · {series.length} rolls
          </p>
          <button
            onClick={onClose}
            autoFocus
            className="label rounded-full border border-on-deep/25 px-4 py-2 transition-[background-color,color,scale] duration-150 ease-out hover:bg-on-deep hover:text-deep enabled:active:scale-[0.96]"
          >
            Close <span className="text-on-deep/50">· Esc</span>
          </button>
        </header>

        <div className="gutter space-y-14 pb-24 pt-6">
          {series.map((s, roll) => (
            <motion.section
              key={s.slug}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={open ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.35 + Math.min(roll, 5) * 0.1 }}
            >
              <p className="label mb-3 flex flex-wrap gap-x-4 text-sun">
                <span>Roll {String(roll + 1).padStart(2, "0")}</span>
                <span>{s.title}</span>
                <span className="text-on-deep/40">
                  {s.city} · {s.date}
                </span>
              </p>
              <ol className="flex flex-wrap gap-2 rounded-[2px] bg-black/40 p-2">
                {s.photos.map((p, i) => (
                  <li key={p.id}>
                    <Link
                      href={`/work/${s.slug}`}
                      onClick={onClose}
                      className="group block"
                      aria-label={`${s.title}, frame ${i + 1}`}
                    >
                      <span
                        className="relative block h-24 overflow-hidden md:h-32"
                        style={{ aspectRatio: `${p.width} / ${p.height}` }}
                      >
                        <Image
                          src={p}
                          alt=""
                          fill
                          sizes="96px"
                          placeholder="blur"
                          className="object-cover transition-opacity duration-150 group-hover:opacity-80"
                        />
                      </span>
                      <span className="label mt-1 block text-[9px] text-sun/70">
                        {i + 1}
                        <span className="text-sun/40">A</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </dialog>
  );
}
