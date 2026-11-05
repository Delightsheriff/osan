import Hero from "@/components/home/Hero";
import Opening from "@/components/home/Opening";
import Practice from "@/components/home/Practice";
import { getSeries, series } from "@/content/series";

export default function Home() {
  const pills = ["senna", "veil", "overpass"].map((slug) => {
    const s = getSeries(slug)!;
    return { slug: s.slug, title: s.title, photos: s.photos.slice(0, 5) };
  });

  const senna = getSeries("senna")!;
  const frames = series.reduce((n, s) => n + s.photos.length, 0);

  return (
    <>
      <Hero pills={pills} />
      <Opening
        photo={senna.photos[3]}
        slug={senna.slug}
        title={senna.title}
        meta={`${senna.city} · ${senna.date}`}
      />
      <Practice
        stats={[
          { value: String(series.length).padStart(2, "0"), label: "Series" },
          { value: String(frames), label: "Frames kept" },
          { value: "02", label: "People on set" },
          { value: "00", label: "Strobes" },
        ]}
      />
    </>
  );
}
