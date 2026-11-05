import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-svh flex-col justify-end pb-24 pt-36">
      <p className="label mb-6 text-mute">404</p>
      <h1 className="display max-w-[14ch] text-[clamp(3rem,9vw,9rem)]">
        Nothing in <span className="accent">this</span> frame.
      </h1>
      <Link href="/work" className="label mt-12 w-fit border-b border-ink pb-1">
        Back to the work →
      </Link>
    </section>
  );
}
