"use client";

import { motion } from "motion/react";

const offers = [
  {
    title: "Portrait sittings",
    body: "Half a day, one location, natural light. For people who want one picture they will keep for twenty years.",
    meta: "Half day · 12 frames",
  },
  {
    title: "Editorial & campaign",
    body: "Small productions for magazines and brands that care about the details. Concept, casting, styling and the shoot.",
    meta: "1–3 days · scoped",
  },
  {
    title: "Bridal portraits",
    body: "Not the wedding: the bride. A quiet session before or after the day, when nobody is in a hurry.",
    meta: "Half day · 20 frames",
  },
];

export default function Commissions() {
  return (
    <section className="gutter grid gap-10 border-t border-line py-24 md:grid-cols-12 md:py-32">
      <p className="label text-mute md:col-span-3">(03) Commissions</p>

      <ol className="md:col-span-9">
        {offers.map((o, i) => (
          <motion.li
            key={o.title}
            className="group grid gap-4 border-b border-line py-8 first:pt-0 md:grid-cols-9 md:gap-8"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.1 }}
          >
            <span className="label text-accent md:col-span-1">0{i + 1}</span>
            <h3 className="text-3xl leading-none tracking-[-0.035em] md:col-span-4 md:text-4xl">
              {o.title}
            </h3>
            <div className="md:col-span-4">
              <p className="text-[15px] leading-relaxed text-ink-soft">{o.body}</p>
              <p className="label mt-4 text-mute">{o.meta}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
