"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { nav, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="gutter fixed inset-x-0 top-0 z-40 grid grid-cols-3 items-center py-5 text-white mix-blend-difference">
      <Link href="/" className="text-[15px] font-medium tracking-tight">
        {site.name}
        <sup className="label ml-0.5 align-super text-[9px]">®</sup>
      </Link>

      <nav className="flex justify-center gap-6 text-[13px]">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="relative py-1">
              {item.label}
              {active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-current"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <p className="label hidden items-center justify-end gap-2 sm:flex">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
        {site.booking}
      </p>
    </header>
  );
}
