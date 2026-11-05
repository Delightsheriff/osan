"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a precise hovering pointer, when motion is allowed. */
export function useFinePointer() {
  return useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
}
