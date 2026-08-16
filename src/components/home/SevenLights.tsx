"use client";

import Link from "next/link";
import { useState } from "react";
import { lights } from "@/lib/lights";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { cn } from "@/lib/cn";

export default function SevenLights() {
  const [i, setI] = useState(3);
  const active = lights[i];

  return (
    <section
      id="seven-lights"
      className="relative overflow-hidden bg-contrast py-section text-onc"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/media/prism.webp"
        aria-hidden="true"
      >
        <source src="/media/prism.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-scrim via-scrim/85 to-scrim" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent">The method</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="One light bends into seven."
              className="mt-6 font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.75] text-onc/65">
              A single map that keeps the work honest. Seven domains of a life —
              each one a place where things get stuck, each one treatable.
              Contemplative traditions have named these for centuries; here they
              are used in plain psychological terms, and no belief is required to
              use them.
            </p>
          </Reveal>
        </div>

        {/* ---- spectrum selector ---- */}
        <Reveal delay={80} className="mt-16">
          <div
            role="tablist"
            aria-label="The seven lights"
            className="flex h-[190px] items-end gap-1.5 sm:h-[240px] sm:gap-3"
          >
            {lights.map((l, idx) => {
              const on = idx === i;
              return (
                <button
                  key={l.n}
                  role="tab"
                  aria-selected={on}
                  aria-controls="light-panel"
                  id={`light-tab-${l.n}`}
                  onClick={() => setI(idx)}
                  onMouseEnter={() => setI(idx)}
                  className={cn(
                    "group relative flex-1 overflow-hidden rounded-t-[3px] transition-all duration-[680ms] ease-out",
                    on ? "opacity-100" : "opacity-45 hover:opacity-80",
                  )}
                  style={{
                    height: on ? "100%" : `${46 + Math.abs(3 - idx) * 2}%`,
                    background: `linear-gradient(to top, ${l.color} 0%, ${l.color}00 100%)`,
                  }}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500"
                    style={{ background: l.color, opacity: on ? 1 : 0.5 }}
                  />
                  <span className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-1">
                    <span
                      className={cn(
                        "font-sans text-[0.6rem] font-semibold tracking-[0.14em] transition-colors",
                        on ? "text-onc" : "text-onc/60",
                      )}
                    >
                      {String(l.n).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "hidden font-display text-[0.8rem] tracking-[0.06em] transition-colors sm:block",
                        on ? "text-onc" : "text-onc/50",
                      )}
                    >
                      {l.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- panel ---- */}
        <div
          id="light-panel"
          role="tabpanel"
          aria-labelledby={`light-tab-${active.n}`}
          className="mt-12 grid gap-10 border-t border-onc/12 pt-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <div key={active.n} className="r-up is-in">
              <p
                className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em]"
                style={{ color: active.color }}
              >
                Light {String(active.n).padStart(2, "0")} · {active.latin}
              </p>
              <h3 className="mt-5 font-display text-display-md font-light">{active.name}</h3>
              <p className="mt-3 font-sans text-[0.9375rem] text-onc/50">{active.theme}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div key={`${active.n}-b`} className="r-up is-in">
              <p className="font-display text-[1.5rem] font-light italic leading-[1.35] text-onc/90">
                &ldquo;{active.question}&rdquo;
              </p>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-onc/65">{active.body}</p>
              <p className="mt-7 border-t border-onc/12 pt-5 font-sans text-[0.8125rem] uppercase tracking-[0.13em] text-onc/40">
                {active.clinical}
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={60} className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/approach" className="btn-light btn-lg">
            <span>How the method works in session</span>
          </Link>
          <p className="max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-onc/45">
            Nothing here is required to start. Most people never think about the
            framework — they just notice the work is going somewhere.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
