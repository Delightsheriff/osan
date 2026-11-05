import type { StaticImageData } from "next/image";
import ids from "./photo-ids.json";
import { images } from "./images";

export type Category = "Portrait" | "Editorial" | "Bridal" | "Documentary";

/** A self-hosted photo: a static import (src, size, blur) plus its Pexels id. */
export type Photo = StaticImageData & { id: number };

export type Series = {
  slug: keyof typeof ids;
  title: string;
  category: Category;
  city: string;
  date: string;
  year: number;
  summary: string;
  story: string[];
  photos: Photo[];
};

type SeriesCopy = Omit<Series, "photos">;

const copy: SeriesCopy[] = [
  {
    slug: "senna",
    title: "Senna",
    category: "Portrait",
    city: "Port Harcourt",
    date: "October 2025",
    year: 2025,
    summary: "A yellow dress, a yellow hedge, twenty minutes of good sun.",
    story: [
      "The senna trees on the old estate road flower for about three weeks a year. We went on the second Saturday, after the rain had cleared and before the light turned flat.",
      "No reflectors and no assistants, only the dress, the hedge and whatever the wind was doing. Most of the series happened in the last twenty minutes.",
    ],
  },
  {
    slug: "fan-study",
    title: "Fan Study",
    category: "Editorial",
    city: "Port Harcourt",
    date: "October 2025",
    year: 2025,
    summary: "Hand fans, a balcony and a sky with nothing in it.",
    story: [
      "A study in shape. Two hand fans, one colour, and a concrete balcony that faces west.",
      "We kept the frame almost empty so the gestures would carry it, a little like a dance written out as stills.",
    ],
  },
  {
    slug: "veil",
    title: "Veil",
    category: "Bridal",
    city: "Rivers State",
    date: "September 2025",
    year: 2025,
    summary: "A bride, a lawn, and twelve metres of tulle in the wind.",
    story: [
      "A bridal portrait without the wedding. No guests, no schedule, just an open lawn and a veil long enough to catch the wind.",
      "Half of it was shot from above. From up there the fabric stops looking like a veil and starts to look like weather.",
    ],
  },
  {
    slug: "overpass",
    title: "Overpass",
    category: "Editorial",
    city: "Abuja",
    date: "August 2025",
    year: 2025,
    summary: "Street style under concrete, in hard midday light.",
    story: [
      "Noon is usually the worst time to shoot, and that was the point. The overpass on Constitution Avenue cuts the light into hard slices.",
      "We walked the same fifty metres for an hour and let the shadows do the styling.",
    ],
  },
  {
    slug: "low-light",
    title: "Low Light",
    category: "Editorial",
    city: "Lagos",
    date: "August 2025",
    year: 2025,
    summary: "Leather, gold and one lamp in a dark room.",
    story: [
      "A small campaign concept for leather goods, shot with a single practical lamp and nothing else.",
      "Keeping the room dark made the objects the brightest thing in the frame, so the bags carry the pictures.",
    ],
  },
  {
    slug: "monochrome",
    title: "Knots",
    category: "Portrait",
    city: "Port Harcourt",
    date: "December 2025",
    year: 2025,
    summary: "Four frames in black and white. Bantu knots and pearls.",
    story: [
      "A short sitting, four frames kept. The hair took longer than the shoot.",
      "With the colour gone, you look at the structure: the knots, the jawline, the earrings catching the light.",
    ],
  },
  {
    slug: "palm-house",
    title: "Palm House",
    category: "Portrait",
    city: "Port Harcourt",
    date: "December 2025",
    year: 2025,
    summary: "A summer dress and a palm that has seen a lot of portraits.",
    story: [
      "Every photographer in the neighbourhood knows this palm. We went at an hour when nobody else was using it.",
      "Blue sky, white dress, green fronds. Three colours and a lot of patience.",
    ],
  },
  {
    slug: "white-rose",
    title: "White Rose",
    category: "Editorial",
    city: "Port Harcourt",
    date: "December 2025",
    year: 2025,
    summary: "Pink on green, one white rose, and a lot of playing around.",
    story: [
      "A loose, playful sitting: a pink suit, a silk headscarf and a single white rose bought on the way.",
      "The best frames came after we stopped directing and let the sitter take over.",
    ],
  },
  {
    slug: "sunday-drive",
    title: "Sunday Drive",
    category: "Documentary",
    city: "Port Harcourt",
    date: "June 2025",
    year: 2025,
    summary: "Friends, a borrowed vintage car and a long afternoon.",
    story: [
      "Someone's uncle lent us the car on the condition that it came back clean. It came back mostly clean.",
      "Less a shoot than an afternoon with a camera. Friends, a field, and nowhere to be.",
    ],
  },
];

export const series: Series[] = copy.map((s) => ({
  ...s,
  photos: ids[s.slug].map((id) => ({ ...images[id], id })),
}));

export const categories: Category[] = [
  "Portrait",
  "Editorial",
  "Bridal",
  "Documentary",
];

export function getSeries(slug: string) {
  return series.find((s) => s.slug === slug);
}

/** Lightweight shape for client components: cover only, no full photo list. */
export type SeriesCard = Omit<Series, "photos" | "story"> & {
  cover: Photo;
  count: number;
};

export function toCard(s: Series): SeriesCard {
  return {
    slug: s.slug,
    title: s.title,
    category: s.category,
    city: s.city,
    date: s.date,
    year: s.year,
    summary: s.summary,
    cover: s.photos[0],
    count: s.photos.length,
  };
}
