# Osan

**Live:** [osan-psi.vercel.app](https://osan-psi.vercel.app)

Osan is a portfolio site for a fictional portrait studio in Port Harcourt. I designed and built it as a design and motion study. The site is editorial and puts the images first, and every animation exists to serve the photographs, not to compete with them.

> **Credits.** Osan is not a real studio. Every photograph is by [Jessica Iroh](https://www.pexels.com/@jessicairoh/), used under the [Pexels licence](https://www.pexels.com/license/). The studio name, series titles and all copy are invented. Design and code by [Delight Sheriff](https://github.com/Delightsheriff).

## What's in it

| Page | What happens |
| --- | --- |
| **Home** | The hero sentence carries small photo pills that cycle through the series, and each pill links to its series. As you scroll, a pill-shaped window opens to full bleed. A rotating stamp shows the booking status. |
| **Work** | One index with four views: Grid, List, Feed and Full. Every view renders the same elements, so switching animates each cover from where it was to where it lands. In List view a preview follows the cursor. You can filter by category. |
| **Series** | Each series page pins in place and turns vertical scroll into a horizontal strip, with a frame counter and a progress bar. It works on phones too. The page takes on the series' own colour. |
| **About / Contact** | Studio copy and a validated contact form. |

### The light

*Osan* means "afternoon" in Yoruba, so the palette follows the real time in Port Harcourt:

- **Morning** (06:00–10:59): cool and pale
- **Afternoon** (11:00–16:59): warm paper
- **Golden hour** (17:00–18:59): peach
- **Night** (19:00–05:59): dark

A small inline script chooses the light before first paint, so the page never flashes the wrong palette. The footer shows a live Port Harcourt clock and a countdown to golden hour, and lets you pin any light. That choice is saved in `localStorage`. Changing the light uses a View Transition, and other transitions are switched off during the swap so colours don't smear.

### Details

- A first-visit intro, skipped for the rest of the session
- Word-masked text reveals, clip-path image reveals and a magnetic call to action
- A custom cursor with contextual labels (only on fine pointers)
- Smooth scrolling with Lenis, driven by Motion's frame loop
- A contact sheet of every frame, which opens with **C**
- A few easter eggs. The footer and the browser console each give one away.

### Reduced motion

With `prefers-reduced-motion` set, the intro, smooth scrolling and custom cursor are skipped. Transforms are swapped for opacity fades, and the pinned gallery becomes a plain vertical stack.

## Performance

The photos came from Pexels, and loading them from there cost 1–1.4 s per image. They are now self-hosted, which cut that to milliseconds once cached.

- **Static imports.** Photos are 2000px WebP masters in `assets/photos`, imported statically. That gives exact dimensions (no layout shift), a generated blur placeholder and content-hashed, immutable caching.
- **Tuned `next/image`.** AVIF is served first, with trimmed `deviceSizes` and `imageSizes`. That makes srcsets shorter and cache hits more frequent. A typical cover is about 75 KB as AVIF, against 152 KB before.
- **Loading priority.** Only the real LCP image uses `preload`. Other above-the-fold images use `loading="eager"`.
- **Off-screen images.** Images placed off-screen horizontally switch to eager loading as their section approaches, because native lazy loading never looks sideways.
- **Warm before switching.** Covers for a view are preloaded when you hover or focus its button. The hero preloads its next frame before the crossfade.
- **Code splitting.** The contact sheet imports every photo, so it is a separate chunk that loads the first time it opens.
- **Static routes.** All 16 routes are statically generated.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- [Motion](https://motion.dev)
- [Lenis](https://lenis.darkroom.engineering)
- Zod
- [Resend](https://resend.com) (optional)

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` for a production build and `npm run lint` to lint.

### Contact form

The form posts to a server action and is validated with Zod. To actually send email, add these to `.env.local`:

```bash
RESEND_API_KEY=...
CONTACT_TO=you@example.com
CONTACT_FROM="Osan <studio@yourdomain.com>"   # optional
```

Without them the form still validates and shows its confirmation, but sends nothing.

### Changing photos

Series membership is defined in `content/photo-ids.json`, as Pexels photo ids. After editing it, run:

```bash
node scripts/fetch-photos.mjs
```

The script downloads any missing photos, writes 2000px WebP masters to `assets/photos/` and regenerates `content/images.ts`. Titles, stories and tones for each series live in `content/series.ts`.

## Project structure

```
app/              routes: home, work, work/[slug], about, contact
components/       shell (header, footer, cursor, intro), motion primitives
  home/           hero, opening, practice, commissions, stamp
  work/           the morphing work index
  series/         pinned horizontal gallery, series hero, page tint
content/          site config, series copy, photo ids, generated imports
lib/              light schedule, intro timing, media-query hooks
assets/photos/    self-hosted photo masters
scripts/          photo pipeline
```

## Deployment

The site deploys on Vercel. Every push to `main` ships to production.
