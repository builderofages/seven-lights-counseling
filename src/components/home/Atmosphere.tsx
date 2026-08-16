"use client";

import Link from "next/link";
import ImageMarquee from "@/components/motion/ImageMarquee";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { practiceShots, groundingShots, humanShots } from "@/lib/gallery";

export default function Atmosphere() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Atmosphere</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Grounded, warm, and unhurried."
              className="mt-6 font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.75] text-fgm/70">
              A room that does not perform calm at you. Natural materials, real
              daylight, nothing clinical — because the body reads a space long
              before the mind does.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 space-y-4 sm:space-y-6">
        <Reveal variant="fade">
          <ImageMarquee items={practiceShots} speed={82} />
        </Reveal>
        <Reveal variant="fade" delay={80}>
          <ImageMarquee items={groundingShots} speed={96} reverse height="h-[13rem] sm:h-[17rem]" />
        </Reveal>
        <Reveal variant="fade" delay={140}>
          <ImageMarquee items={humanShots} speed={74} height="h-[15rem] sm:h-[19rem]" />
        </Reveal>
      </div>

      <div className="shell mt-14">
        <Reveal className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="btn-ghost btn-lg">
            <span>See the practice</span>
          </Link>
          <p className="max-w-[44ch] font-sans text-[0.875rem] leading-relaxed text-fgm/55">
            In Annapolis, or by secure video from wherever you actually feel able
            to talk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
