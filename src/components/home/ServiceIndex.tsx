"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { cn } from "@/lib/cn";

/**
 * Editorial index of the practice's work.
 * On fine pointers a floating plate follows the cursor and cross-fades to the
 * hovered row's image; on touch the imagery collapses into the row itself.
 */
export default function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const plate = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine.current) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;
      if (plate.current) {
        plate.current.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = listRef.current?.getBoundingClientRect();
      if (!r) return;
      tx = e.clientX - r.left - 170;
      ty = e.clientY - r.top - 120;
    };

    const node = listRef.current;
    node?.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      node?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

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

        <div ref={listRef} className="relative mt-16">
          {/* floating preview plate */}
          <div
            ref={plate}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-20 hidden h-[300px] w-[340px] overflow-hidden rounded-2xl transition-opacity duration-500 lg:block",
              active === null ? "opacity-0" : "opacity-100",
            )}
          >
            {services.map((s, i) => (
              <Image
                key={s.slug}
                src={s.image}
                alt=""
                fill
                sizes="340px"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  active === i ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-ink/10" />
          </div>

          <div className="rule" />
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 45, 260)}>
              <Link
                href={`/services/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative flex items-center gap-5 border-b border-ink/[0.13] py-6 sm:gap-8 sm:py-8"
              >
                {/* hover wash */}
                <span className="absolute inset-x-[-1.5rem] inset-y-0 -z-0 origin-bottom scale-y-0 rounded-lg bg-ink/[0.028] transition-transform duration-[560ms] ease-out group-hover:scale-y-100" />

                <span className="relative z-10 w-8 shrink-0 font-sans text-[0.6875rem] font-semibold tracking-[0.16em] text-clay/70">
                  {s.index}
                </span>

                <span className="relative z-10 min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-[clamp(1.35rem,3.1vw,2.35rem)] font-light leading-[1.1] tracking-[-0.025em] text-ink transition-transform duration-[620ms] ease-out sm:group-hover:translate-x-2">
                      {s.title}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[58ch] font-sans text-[0.875rem] leading-relaxed text-bark/55 transition-transform duration-[620ms] ease-out sm:group-hover:translate-x-2 lg:max-w-[46ch]">
                    {s.eyebrow} — {s.lede.split(" ").slice(0, 14).join(" ")}…
                  </span>
                </span>

                {/* touch image */}
                <span className="relative z-10 hidden h-20 w-28 shrink-0 overflow-hidden rounded-lg sm:block lg:hidden">
                  <Image src={s.image} alt="" fill sizes="112px" className="object-cover" />
                </span>

                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-[560ms] ease-out group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-12 flex flex-wrap items-center gap-4">
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
