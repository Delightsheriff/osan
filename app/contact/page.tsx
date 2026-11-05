import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import { site } from "@/content/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a portrait sitting, editorial shoot or bridal session with Osan.",
};

const details = [
  ["Studio", `${site.city}, Nigeria`],
  ["Travel", "Anywhere in Nigeria, further by arrangement"],
  ["Reply", "Within two working days"],
  ["Availability", site.booking],
];

export default function ContactPage() {
  return (
    <section className="gutter grid gap-16 pb-32 pt-36 md:grid-cols-12 md:pt-48">
      <div className="md:col-span-5">
        <RevealText as="h1" immediate className="display text-[clamp(3.5rem,8vw,8rem)]" text="Book a *sitting.*" />
        <dl className="mt-16 space-y-5">
          {details.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-line pt-4">
              <dt className="label text-mute">{k}</dt>
              <dd className="text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="md:col-span-6 md:col-start-7">
        <ContactForm />
      </div>
    </section>
  );
}
