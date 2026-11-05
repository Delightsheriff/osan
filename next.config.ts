import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: roughly 20% smaller than WebP for photographs.
    formats: ["image/avif", "image/webp"],
    // Fewer, more useful breakpoints than the defaults: smaller srcsets and
    // more cache hits. Masters are 2000px, so nothing larger is ever needed.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 192, 256, 384],
    qualities: [70, 75],
    // Masters are content-hashed static imports, so cached variants never go stale.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
