"use client";

import Link from "next/link";
import VideoTile from "@/components/motion/VideoTile";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";

/**
 * Four films, one per movement of the work. Fixed 4-up, each labelled —
 * not a mood board. No parallax, no drifting, nothing decorative.
 */
const MOVEMENTS = [
  {
    src: "/media/svc-stress.mp4",
    poster: "/media/svc-stress.webp",
    n: "01",
    label: "Settle",
    text: "Regulate the body first. Nothing useful happens in a nervous system that is still braced.",
  },
  {
    src: "/media/svc-anxiety.mp4",
    poster: "/media/svc-anxiety.webp",
    n: "02",
    label: "Clear",
    text: "Interrupt the loop. Sleep, rumination and avoidance get worked on before the deeper material.",
  },
  {
    src: "/media/svc-addiction.mp4",
    poster: "/media/svc-addiction.webp",
    n: "03",
    label: "Excavate",
    text: "The origin — attachment, trauma, the beliefs formed before you could evaluate them.",
  },
  {
    src: "/media/svc-spiritual.mp4",
    poster: "/media/svc-spiritual.webp",
    n: "04",
    label: "Integrate",
    text: "Practise the new response until it stops being a technique and starts being you.",
  },
];

export default function Grounding() {
  return (
    <section className="tint tint-5 relative overflow-hidden bg-surface py-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Grounding</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="The body arrives before the story does."
              className="mt-6 max-w-[19ch] font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[1.0625rem] leading-[1.75] text-fgm">
              Insight the nervous system cannot feel does not hold. So the work
              runs in four movements, and it starts in the body — breath,
              weight, contact, pace — with the understanding following after.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {MOVEMENTS.map((m, i) => (
            <Reveal key={m.n} as="li" delay={i * 100}>
              <VideoTile src={m.src} poster={m.poster} ratio="3 / 4" />
              <div className="mt-5">
                <span className="font-sans text-[0.625rem] font-semibold tracking-[0.2em] text-accent">
                  {m.n}
                </span>
                <p className="mt-2 font-display text-[1.3rem] font-light leading-tight text-fg">
                  {m.label}
                </p>
                <p className="mt-2.5 font-sans text-[0.9rem] leading-[1.68] text-fgm">
                  {m.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={80} className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/approach" className="btn-ghost btn-lg">
            <span>How the method works</span>
          </Link>
          <p className="max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-fgm/75">
            Somatic tracking runs through all four, whether or not you ever hear
            the word in session.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
