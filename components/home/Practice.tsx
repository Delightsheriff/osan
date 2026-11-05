"use client";

import { motion } from "motion/react";
import RevealText from "@/components/RevealText";

type Stat = { value: string; label: string };

export default function Practice({ stats }: { stats: Stat[] }) {
  return (
    <section className="gutter grid gap-10 py-32 md:grid-cols-12 md:py-48">
      <p className="label text-mute md:col-span-3">(01) Practice</p>

      <div className="md:col-span-9">
        <RevealText
          as="h2"
          className="text-[clamp(1.75rem,3.6vw,3.6rem)] leading-[1.05] tracking-[-0.03em]"
          text="Osan is a small portrait practice. We shoot in natural light, keep the crew to two people and stay until the picture is *honest.*"
          stagger={0.025}
        />

        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-line pt-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <dt className="label order-2 mt-2 text-mute">{s.label}</dt>
              <dd className="order-1 text-4xl tracking-tight md:text-5xl">{s.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
