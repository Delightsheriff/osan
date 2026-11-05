import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import WorkIndex from "@/components/work/WorkIndex";
import { categories, series, toCard } from "@/content/series";

export const metadata: Metadata = {
  title: "Work",
  description: "Every series, in grid, list, feed or full-bleed view.",
};

export default function WorkPage() {
  return (
    <>
      <section className="gutter pt-36 md:pt-48">
        <RevealText as="h1" immediate className="display text-[clamp(4.5rem,16vw,16rem)]" text="Work" />
      </section>
      <WorkIndex cards={series.map(toCard)} categories={categories} heading="Index" />
    </>
  );
}
