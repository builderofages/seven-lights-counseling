"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { track } from "@/lib/analytics";

const steps = [
  {
    n: "01",
    t: "A 15-minute call",
    d: "Free, by phone, no intake forms. You describe what is going on in whatever words you have. Kerry tells you honestly whether this is the right practice — and if it is not, who to call instead.",
    meta: "Usually within 48 hours",
  },
  {
    n: "02",
    t: "First session",
    d: "Fifty minutes. History, current load, and what you want to be different. Nothing is required of you that you are not ready to say. You leave with an initial read and a proposed shape for the work.",
    meta: "In person or secure video",
  },
  {
    n: "03",
    t: "The work",
    d: "Weekly to begin with, because momentum matters early. Every six to eight weeks you and Kerry step back and check the work is actually going somewhere. Ending well is part of the plan from the start.",
    meta: "Reviewed openly, not indefinitely",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-umber py-section text-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/media/caustic.webp"
        aria-hidden="true"
      >
        <source src="/media/caustic.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-umber via-umber/90 to-umber" />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-sand/70">Starting</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Three steps, and the first one costs nothing."
              className="mt-6 font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.75] text-paper/60">
              The hardest part of therapy is almost always the part before it
              starts. This is designed to be as low-friction as it can honestly be.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-paper/12 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 110}
              className="group relative bg-umber p-8 transition-colors duration-700 hover:bg-bark sm:p-10"
            >
              <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-sand/60">
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-[1.6rem] font-light leading-tight">{s.t}</h3>
              <p className="mt-4 font-sans text-[0.9375rem] leading-[1.7] text-paper/60">{s.d}</p>
              <p className="mt-7 border-t border-paper/12 pt-4 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-sand/50">
                {s.meta}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80} className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/begin"
            onClick={() => track("cta_click", { location: "process" })}
            className="btn-light btn-lg"
          >
            <span>Request a consultation</span>
          </Link>
          <Link href="/rates" className="link-sweep font-sans text-[0.875rem] text-paper/60">
            See rates & insurance
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
