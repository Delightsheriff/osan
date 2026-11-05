import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealText from "@/components/RevealText";
import HorizontalGallery from "@/components/series/HorizontalGallery";
import SeriesHero from "@/components/series/SeriesHero";
import { getSeries, pexelsSrc, series } from "@/content/series";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSeries((await params).slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
    openGraph: { images: [`${pexelsSrc(s.photos[0].id)}?auto=compress&cs=tinysrgb&w=1200`] },
  };
}

export default async function SeriesPage({ params }: Props) {
  const s = getSeries((await params).slug);
  if (!s) notFound();

  const index = series.indexOf(s);
  const next = series[(index + 1) % series.length];
  const facts = [
    ["Category", s.category],
    ["Location", s.city],
    ["Date", s.date],
    ["Frames", String(s.photos.length).padStart(2, "0")],
  ];

  return (
    <article>
      <header className="gutter pb-12 pt-32 md:pt-44">
        <p className="label mb-6 text-mute">
          Series {String(index + 1).padStart(2, "0")} / {String(series.length).padStart(2, "0")}
        </p>
        <RevealText as="h1" immediate className="display text-[clamp(4rem,15vw,15rem)]" text={s.title} />

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="label text-mute">{k}</dt>
              <dd className="mt-1.5 text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <SeriesHero photo={s.photos[0]} title={s.title} />

      <section className="gutter grid gap-8 py-24 md:grid-cols-12 md:py-36">
        <p className="label text-mute md:col-span-3">About the series</p>
        <div className="space-y-6 md:col-span-7 md:col-start-5">
          <RevealText
            as="p"
            className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] tracking-[-0.025em]"
            text={s.summary}
            stagger={0.03}
          />
          {s.story.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </section>

      <HorizontalGallery photos={s.photos.slice(1)} title={s.title} />

      <Link
        href={`/work/${next.slug}`}
        data-cursor="Next"
        className="gutter group relative mt-24 flex items-end justify-between overflow-hidden border-t border-line py-16 md:py-24"
      >
        <div className="relative z-10">
          <p className="label mb-4 text-mute">Next series</p>
          <p className="display text-[clamp(3.5rem,11vw,11rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
            {next.title}
          </p>
        </div>
        <div className="relative hidden aspect-[4/5] w-48 overflow-hidden md:block">
          <Image
            src={pexelsSrc(next.photos[0].id)}
            alt=""
            fill
            sizes="12rem"
            placeholder={next.photos[0].blur as `data:image/${string}`}
            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
        </div>
      </Link>
    </article>
  );
}
