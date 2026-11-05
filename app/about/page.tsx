import type { Metadata } from "next";
import Photo from "@/components/Photo";
import RevealText from "@/components/RevealText";
import { getSeries } from "@/content/series";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "How Osan works: natural light, small crews and slow sittings.",
};

const process = [
  ["Conversation", "A call before anything else. What the picture is for, who will see it, and what you would rather nobody saw."],
  ["Location", "We scout in the same light we will shoot in, usually the two hours before sunset. Most of the work is choosing where to stand."],
  ["Sitting", "Two people on set at most. No strobes, no monitor, no rush. Sittings run long because nothing good happens in the first hour."],
  ["Edit", "You see a tight edit, not a contact sheet. Colour is kept close to what the day looked like."],
];

const kit = ["One body", "35mm and 85mm primes", "A white bedsheet", "No strobes", "Patience"];

export default function AboutPage() {
  const portrait = getSeries("white-rose")!.photos[2];
  const secondary = getSeries("palm-house")!.photos[3];

  return (
    <>
      <section className="gutter grid gap-12 pb-24 pt-36 md:grid-cols-12 md:pt-48">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Photo
              photo={portrait}
              alt="Portrait from the White Rose series"
              sizes="(min-width: 768px) 40vw, 100vw"
              loading="eager"
              className="rounded-t-full"
            />
            <p className="label mt-3 text-mute">From White Rose, {site.city}</p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="label mb-8 text-mute">About</p>
          <RevealText
            as="h1"
            immediate
            className="text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[1] tracking-[-0.04em]"
            text="A small studio for people who would rather not be *photographed.*"
            stagger={0.035}
          />

          <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-ink-soft">
            <p>
              {site.name} means afternoon. It is the hour we shoot in, and the
              pace we work at. The studio started with friends who hated having
              their picture taken, and most of the people we photograph still
              say that at the start of a sitting.
            </p>
            <p>
              The method is simple. Find good light, take the time it needs,
              and keep the room small enough that people forget the camera.
              The work ranges from portraits and bridal sittings to small
              editorial and campaign shoots across Nigeria.
            </p>
          </div>

          <div className="mt-24">
            <p className="label mb-6 text-mute">Process</p>
            <ol className="border-t border-line">
              {process.map(([title, body], i) => (
                <li key={title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 md:grid-cols-[3rem_12rem_1fr]">
                  <span className="label pt-1.5 text-mute">0{i + 1}</span>
                  <h2 className="text-2xl tracking-tight">{title}</h2>
                  <p className="col-start-2 text-[15px] leading-relaxed text-ink-soft md:col-start-3">{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-24 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label mb-6 text-mute">In the bag</p>
              <ul className="space-y-1.5 text-lg tracking-tight">
                {kit.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <Photo
              photo={secondary}
              alt="Frame from the Palm House series"
              sizes="(min-width: 768px) 22vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
