"use client";

import Link from "next/link";
import ParallaxColumns from "@/components/motion/ParallaxColumns";
import VideoTile from "@/components/motion/VideoTile";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { groundingShots, lightShots, humanShots } from "@/lib/gallery";

const films = [
  { src: "/media/svc-stress.mp4", poster: "/media/svc-stress.webp", label: "Stillness" },
  { src: "/media/svc-addiction.mp4", poster: "/media/svc-addiction.webp", label: "First light" },
  { src: "/media/svc-anxiety.mp4", poster: "/media/svc-anxiety.webp", label: "Lifting" },
  { src: "/media/svc-spiritual.mp4", poster: "/media/svc-spiritual.webp", label: "Meaning" },
];

export default function Grounding() {
  return (
    <section className="relative overflow-hidden bg-surface py-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Grounding</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="The body arrives before the story does."
              className="mt-6 max-w-[16ch] font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[1.0625rem] leading-[1.75] text-fgm/70">
              Insight that the nervous system cannot feel does not hold. So the
              work starts in the body — breath, weight, contact, pace — and the
              understanding follows it rather than the other way round.
            </p>
          </Reveal>
        </div>

        {/* moving films */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {films.map((f, i) => (
            <Reveal key={f.src} delay={i * 90} variant="fade">
              <VideoTile src={f.src} poster={f.poster} label={f.label} ratio="3 / 4" />
            </Reveal>
          ))}
        </div>

        {/* parallax stills */}
        <Reveal variant="fade" className="mt-6 sm:mt-6">
          <ParallaxColumns
            columns={[
              groundingShots.slice(0, 3),
              humanShots.slice(3, 6),
              lightShots.slice(0, 3),
            ]}
          />
        </Reveal>

        <Reveal delay={80} className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/approach" className="btn-ghost btn-lg">
            <span>How the method works</span>
          </Link>
          <p className="max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-fgm/55">
            Somatic tracking runs through everything here, whether or not you ever
            hear the word in session.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
