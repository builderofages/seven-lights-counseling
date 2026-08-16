import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/Logo";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Thank you — your request is in",
  robots: { index: false, follow: false },
};

const next = [
  {
    n: "01",
    t: "Kerry will reply within one business day",
    d: "By email, or by phone if you left a number and told us when to call. If nothing arrives, check your spam folder before assuming it was missed.",
  },
  {
    n: "02",
    t: "The call itself is fifteen minutes",
    d: "You describe what is going on in whatever words you have. There is nothing to prepare and nothing you need to have worked out beforehand.",
  },
  {
    n: "03",
    t: "You leave with a clear next step",
    d: "Either a first session offered, or the name of a clinician better suited to what you are carrying. Both are good outcomes.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pb-24 pt-[calc(var(--header-h)+5rem)] text-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/dawn.webp"
        aria-hidden="true"
      >
        <source src="/media/dawn.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <LogoMark className="mx-auto h-10 w-auto text-clay" animate />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mt-9 text-clay">Received</p>
            <h1 className="mt-6 font-display text-display-lg font-light">
              That was the hard part.
            </h1>
            <p className="mx-auto mt-7 max-w-[50ch] text-lede text-paper/65">
              Your request is in. Most people find that sending it was heavier
              than anything that follows.
            </p>
          </Reveal>
        </div>

        <ol className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl bg-paper/12 md:grid-cols-3">
          {next.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 110}
              className="bg-ink/90 p-8 backdrop-blur-sm transition-colors duration-700 hover:bg-umber"
            >
              <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-clay">
                {s.n}
              </span>
              <h2 className="mt-6 font-display text-[1.3rem] font-light leading-tight">{s.t}</h2>
              <p className="mt-4 font-sans text-[0.9375rem] leading-[1.7] text-paper/60">{s.d}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={140} className="mx-auto mt-14 max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/approach" className="btn-light btn-lg">
              <span>Read about the method</span>
            </Link>
            <Link href="/faq" className="btn-light btn-lg">
              <span>Common questions</span>
            </Link>
          </div>

          <p className="mx-auto mt-10 max-w-[58ch] rounded-2xl border border-light-1/25 bg-light-1/[0.07] p-6 font-sans text-[0.875rem] leading-relaxed text-paper/70">
            If things become urgent before you hear back, this practice cannot
            respond to emergencies. Call <strong className="text-paper">911</strong>,
            or call or text{" "}
            <a href={site.crisis.href} className="link-sweep font-medium text-paper">
              988
            </a>{" "}
            for the Suicide &amp; Crisis Lifeline, available 24 hours a day.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
