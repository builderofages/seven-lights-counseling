"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";

const marks = [
  "Trauma-informed",
  "Internal Family Systems",
  "Somatic",
  "Attachment-based",
  "Harm reduction",
  "Existential",
  "ACT",
  "Motivational interviewing",
];

export default function Manifesto() {
  return (
    <section className="relative bg-paper">
      {/* marquee of modalities */}
      <div className="mask-fade-x relative overflow-hidden border-y border-ink/10 py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap will-change-transform">
          {[...marks, ...marks].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-bark/45"
            >
              {m}
              <span className="h-1 w-1 rounded-full bg-clay/50" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell pt-section">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Why people come here</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Most people wait far longer than they needed to."
              className="mt-6 max-w-[16ch] font-display text-display-lg font-light"
            />
            <div className="prose-editorial mt-9 max-w-prose">
              <Reveal delay={60}>
                <p>
                  Not because they are avoidant, but because the threshold keeps
                  moving. It is manageable. Other people have it worse. It has
                  been like this so long it has stopped registering as a problem
                  and started registering as a personality.
                </p>
              </Reveal>
              <Reveal delay={110}>
                <p>
                  Seven Lights exists for the point where that stops being true —
                  when the cost of carrying it has quietly outgrown the cost of
                  looking at it. There is no threshold of severity you have to
                  reach first. You do not need a diagnosis, a crisis, or a
                  rehearsed explanation.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  What you will find is one clinician who will know your history
                  properly, a room where nothing is too small or too strange to
                  say out loud, and a pace set by your nervous system rather than
                  a session count.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="clip" className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Reveal variant="scale" className="absolute inset-0">
                <Image
                  src="/media/room.webp"
                  alt="A private consultation room with two facing armchairs and soft morning light"
                  fill
                  sizes="(min-width:1024px) 32vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </Reveal>
            <Reveal delay={120} className="mt-6">
              <p className="font-sans text-[0.8125rem] leading-relaxed text-bark/50">
                The Annapolis consulting room. Sessions are also available by
                secure video anywhere in Maryland — the work translates better
                than most people expect.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
