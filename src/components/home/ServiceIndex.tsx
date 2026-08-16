"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/lib/services";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { cn } from "@/lib/cn";

/**
 * Editorial index of the practice's work.
 *
 * The imagery lives in a fixed, sticky frame in the right column and
 * cross-fades to whichever row is active. Nothing tracks the cursor and
 * nothing floats — the frame never moves, only its contents change.
 */
export default function ServiceIndex() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-paper py-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">The work · Nine ways in</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="One clinician. A narrow focus, held deeply."
              className="mt-6 font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.75] text-bark/75">
              Rather than a directory of specialisms, this is a short list of
              things Kerry treats often and treats well. If what you are carrying
              is not on it, say so — a referral to the right person is a
              legitimate outcome of a first call.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-14 lg:grid-cols-12">
          {/* ---- list ---- */}
          <div className="lg:col-span-7">
            <div className="rule" />
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i * 40, 220)}>
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-5 border-b border-ink/[0.13] py-6 sm:gap-7"
                >
                  <span
                    className={cn(
                      "w-8 shrink-0 font-sans text-[0.6875rem] font-semibold tracking-[0.16em] transition-colors duration-500",
                      active === i ? "text-clay" : "text-clay/45",
                    )}
                  >
                    {s.index}
                  </span>

                  {/* mobile thumbnail — fixed in place, never floats */}
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg lg:hidden">
                    <Image src={s.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.25rem,2.5vw,1.95rem)] font-light leading-[1.14] tracking-[-0.025em] transition-colors duration-500",
                        active === i ? "text-ink" : "text-ink/70",
                      )}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1.5 block font-sans text-[0.8125rem] uppercase tracking-[0.13em] text-bark/45">
                      {s.eyebrow}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                      active === i
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 text-ink/60",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* ---- sticky frame ---- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
                {services.map((s, i) => (
                  <Image
                    key={s.slug}
                    src={s.image}
                    alt={active === i ? s.imageAlt : ""}
                    aria-hidden={active !== i}
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className={cn(
                      "object-cover transition-opacity duration-[900ms] ease-out",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-paper/60">
                    {services[active].index} · {services[active].duration}
                  </p>
                  <p className="mt-2.5 font-display text-[1.5rem] font-light leading-tight text-paper">
                    {services[active].title}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-[42ch] font-sans text-[0.9375rem] leading-[1.7] text-bark/70">
                {services[active].lede}
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={100} className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/services" className="btn-ghost btn-lg">
            <span>All services in detail</span>
          </Link>
          <p className="font-sans text-[0.875rem] text-bark/55">
            Or take the two-minute match — it points you to the right one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
