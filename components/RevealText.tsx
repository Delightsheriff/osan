"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

type Props = {
  /** Wrap a word in *asterisks* to set it in the italic serif accent. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

const word: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i },
  }),
};

export default function RevealText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.045,
  immediate = false,
}: Props) {
  const words = text.split(" ");
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      };

  return (
    <Tag className={className} aria-label={text.replaceAll("*", "")}>
      <motion.span aria-hidden {...trigger} className="contents">
        {words.map((w, i) => {
          const accent = w.startsWith("*") && w.endsWith("*");
          return (
            <span
              key={i}
              className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
            >
              <motion.span
                variants={word}
                custom={delay + i * stagger}
                className={`inline-block ${accent ? "accent" : ""}`}
              >
                {accent ? w.slice(1, -1) : w}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
