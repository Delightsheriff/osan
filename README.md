# Osan

A concept portfolio for a fictional portrait photography studio in Port Harcourt. Designed and built by [Delight Sheriff](https://github.com/Delightsheriff).

Osan is a design and motion exercise: an editorial, image-first site where the animation supports the photographs instead of competing with them.

> **Credits.** Osan is not a real studio. Every photograph is by [Jessica Iroh](https://www.pexels.com/@jessicairoh/), used under the [Pexels licence](https://www.pexels.com/license/). The studio name, series titles and all copy are invented for this concept.

## Highlights

- **Morphing work index.** Grid, List, Feed and Full views share the same elements, so switching views animates each cover from its old position to its new one with shared layout animation. In List view a floating preview follows the cursor.
- **Live headline.** The hero sentence contains small photo pills that cycle through each series. They link to their series, and the next frame is preloaded so the crossfade never waits.
- **Scroll-driven opening.** A pill-shaped window opens to full bleed as you scroll.
- **Pinned galleries.** Each series page pins and turns vertical scroll into a horizontal strip, with a frame counter and progress bar. This works on phones too.
- **Details.** A first-visit intro (skipped for the rest of the session), word-masked text reveals, clip-path image reveals, a magnetic call to action, a custom cursor with labels, and smooth scrolling.
- **The light.** Osan means "afternoon", so the palette follows the actual time in Port Harcourt: cool morning, warm afternoon, peach golden hour, and a dark palette after 19:00. The light is chosen before first paint, so the page never flashes. Visitors can pin a light from the footer, next to a live clock and a golden-hour countdown. Each series also has its own colour, which tints its page.
- **Easter eggs.** There are a few. The footer gives away one of them.
- **Reduced motion.** With `prefers-reduced-motion` set, the intro, smooth scroll and cursor are skipped, transforms are turned off and the gallery becomes a plain stack.

## Performance

- Photos are self-hosted 2000px WebP masters, imported statically. That gives exact dimensions (no layout shift), a generated blur placeholder and content-hashed, immutable caching.
- `next/image` serves AVIF first, with trimmed `deviceSizes`/`imageSizes`, so srcsets are shorter and the cache is hit more often.
- Only the true LCP image uses `preload` (the series cover). Other above-the-fold images use `loading="eager"`. Images positioned off-screen horizontally switch to eager loading as their section approaches, because native lazy loading never looks sideways.
- Covers for a view are preloaded when you hover its button, so switching views never shows a blank frame.
- Every route is statically generated.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · Lenis · Zod

## Running locally

```bash
npm install
npm run dev
```

### Contact form

The form validates with a server action. To actually send email, set:

```bash
RESEND_API_KEY=...
CONTACT_TO=you@example.com
CONTACT_FROM="Osan <studio@yourdomain.com>"   # optional
```

Without these the form validates and shows the confirmation state, but sends nothing.

### Photos

Series membership lives in `content/photo-ids.json` (Pexels photo ids). To add or change photos:

```bash
node scripts/fetch-photos.mjs
```

This downloads any missing photos, writes 2000px WebP masters to `assets/photos/`, and regenerates `content/images.ts`. Series copy lives in `content/series.ts`.

## Structure

```
app/            routes: home, work, work/[slug], about, contact
components/     layout shell, motion primitives, home/, work/, series/
content/        site config, series copy, photo ids, generated image imports
assets/photos/  self-hosted photo masters
scripts/        photo pipeline
```
