"use client";

import { useEffect } from "react";

/** Washes the whole page, header and selection included, in a series' colour. */
export default function SeriesTone({ tone }: { tone: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tone", tone);
    root.dataset.tinted = "";
    return () => {
      root.style.removeProperty("--tone");
      delete root.dataset.tinted;
    };
  }, [tone]);

  return null;
}
