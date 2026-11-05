"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { nav, site } from "@/content/site";

export default function Footer() {
  const letters = site.name.split("");

  return (
    <footer className="gutter overflow-hidden bg-ink pt-24 text-paper">
      <div className="grid gap-12 border-b border-paper/15 pb-16 md:grid-cols-12">
        <p className="text-2xl leading-tight tracking-tight md:col-span-5 md:text-3xl">
          Portraits made slowly, in <span className="accent">afternoon</span> light.
        </p>

        <div className="md:col-span-2 md:col-start-7">
          <p className="label mb-4 text-paper/50">Index</p>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link href="/" className="hover:text-paper/60">Home</Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper/60">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <p className="label mb-4 text-paper/50">Credits</p>
          <p className="text-sm leading-relaxed text-paper/80">
            Photography by{" "}
            <a href={site.credit.photographerUrl} target="_blank" rel="noreferrer" className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
              {site.credit.photographer}
            </a>{" "}
            on Pexels. Concept, design and build by{" "}
            <a href={site.credit.designerUrl} target="_blank" rel="noreferrer" className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
              {site.credit.designer}
            </a>
            . Osan is a fictional studio.
          </p>
        </div>
      </div>

      <div className="label flex justify-between py-5 text-paper/50">
        <span>{site.city}, NG</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

      <p
        aria-hidden
        className="display -mb-[0.2em] flex justify-between text-[clamp(6rem,33vw,34rem)] font-medium leading-none"
      >
        {letters.map((l, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </p>
    </footer>
  );
}
