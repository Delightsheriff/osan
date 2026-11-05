"use client";

import type { ImageLoaderProps } from "next/image";

// Pexels resizes on its own CDN, so Next only has to pick the width.
export default function pexelsLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.pexels.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(width));
  if (quality) url.searchParams.set("q", String(quality));
  return url.toString();
}
