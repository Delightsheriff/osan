"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OPEN_EVENT = "osan:contact-sheet";

/** Opens the contact sheet from anywhere, e.g. the footer hint. */
export function openContactSheet() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// The sheet pulls in every photo, so it only loads the first time it opens.
const Panel = dynamic(() => import("./ContactSheetPanel"), { ssr: false });

/** Listens for the C key (outside form fields) and mounts the sheet on demand. */
export default function ContactSheet() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => {
      setMounted(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "c" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
      show();
    };
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return mounted ? <Panel open={open} onClose={() => setOpen(false)} /> : null;
}
