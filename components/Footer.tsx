"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { nav, site } from "@/content/site";
import LightClock from "./LightClock";
import { openContactSheet } from "./ContactSheet";

export default function Footer() {
  const letters = site.name.split("");

  return (
    <footer className="gutter overflow-hidden bg-deep pt-24 text-on-deep">
      <div className="grid gap-12 border-b border-on-deep/15 pb-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-2xl leading-tight tracking-tight md:text-3xl">
            Portraits made slowly, in <span className="accent text-sun">afternoon</span> light.
          </p>
          <button
            onClick={openContactSheet}
            className="label mt-8 flex items-center gap-2 text-on-deep/60 transition-[color,scale] duration-150 ease-out hover:text-on-deep enabled:active:scale-[0.96]"
          >
            <kbd className="rounded-[3px] border border-on-deep/30 px-1.5 py-0.5 font-mono">C</kbd>
            Open the contact sheet
          </button>
        </div>

        <div className="md:col-span-4 md:col-start-6">
          <LightClock />
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-3 md:col-start-10 md:grid-cols-1">
          <div>
            <p className="label mb-4 text-on-deep/50">Index</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/" className="transition-colors duration-150 hover:text-on-deep/60">Home</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-150 hover:text-on-deep/60">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-4 text-on-deep/50">Credits</p>
            <p className="text-sm leading-relaxed text-on-deep/80">
              Photography by{" "}
              <a href={site.credit.photographerUrl} target="_blank" rel="noreferrer" className="underline decoration-on-deep/30 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-on-deep">
                {site.credit.photographer}
              </a>{" "}
              on Pexels. Concept, design and build by{" "}
              <a href={site.credit.designerUrl} target="_blank" rel="noreferrer" className="underline decoration-on-deep/30 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-on-deep">
                {site.credit.designer}
              </a>
              . Osan is a fictional studio.
            </p>
          </div>
        </div>
      </div>

      <div className="label flex justify-between py-5 text-on-deep/50">
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
              whileHover={{ y: "-6%", color: "var(--sun)", transition: { type: "spring", duration: 0.4, bounce: 0 } }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ type: "spring", duration: 0.9, bounce: 0, delay: i * 0.07 }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </p>
    </footer>
  );
}
