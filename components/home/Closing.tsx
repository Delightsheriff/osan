import Link from "next/link";
import RevealText from "@/components/RevealText";
import Magnetic from "@/components/Magnetic";

export default function Closing() {
  return (
    <section className="gutter flex flex-col items-start gap-12 py-32 md:flex-row md:items-end md:justify-between md:py-48">
      <div>
        <p className="label mb-8 text-mute">(04) Get in touch</p>
        <RevealText
          as="h2"
          className="display max-w-[12ch] text-[clamp(3rem,8.5vw,9rem)]"
          text="Let's make something *slow.*"
        />
      </div>

      <Magnetic>
        <Link
          href="/contact"
          className="group relative flex size-36 items-center justify-center overflow-hidden rounded-full bg-ink text-paper md:size-44"
        >
          <span className="absolute inset-0 translate-y-full rounded-full bg-ink-soft transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
          <span className="label relative">Book a sitting</span>
        </Link>
      </Magnetic>
    </section>
  );
}
