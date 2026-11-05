"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { applyLight } from "@/lib/light";
import { site } from "@/content/site";

export const SHUTTER_EVENT = "osan:shutter";

const SECRET = "osan";

/**
 * Small rewards for the curious:
 * - type "osan" anywhere for golden hour on demand
 * - click the logo five times on the home page to take a picture
 * - leave the tab and the photos keep "developing"
 * - open the console
 */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);
  const [flash, setFlash] = useState(0);
  const typed = useRef("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const say = (text: string) => {
      clearTimeout(toastTimer.current);
      setToast(text);
      toastTimer.current = setTimeout(() => setToast(null), 3200);
    };

    console.log(
      "%cOsan%c\nLooking under the lens? This concept was designed and built by %s.\nTry typing the studio's name, or press C.",
      "font: italic 32px Georgia, serif; color: #b5832a;",
      "font: 12px ui-monospace, monospace; color: inherit;",
      site.credit.designer,
    );

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key.length !== 1) return;
      typed.current = (typed.current + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed.current === SECRET) {
        typed.current = "";
        applyLight("golden");
        say("Golden hour, on request");
      }
    };

    const onShutter = () => {
      setFlash((n) => n + 1);
      say("Click. Frame 91, kept for the archive");
    };

    const title = { current: document.title };
    const onVisibility = () => {
      if (document.hidden) {
        title.current = document.title;
        document.title = "Still developing…";
      } else {
        document.title = title.current;
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(SHUTTER_EVENT, onShutter);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SHUTTER_EVENT, onShutter);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {flash > 0 && (
          <motion.div
            key={flash}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[95] bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => setFlash(0)}
          />
        )}
      </AnimatePresence>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[96] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              className="label flex items-center gap-2 rounded-full bg-deep px-4 py-2.5 text-on-deep shadow-[0_1px_2px_rgb(0_0_0/0.12),0_8px_24px_rgb(0_0_0/0.18)]"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.15, ease: "easeOut" } }}
            >
              <span className="size-1.5 rounded-full bg-sun" />
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
