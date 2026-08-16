"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";

/**
 * The room — three images, three fixed slots, each captioned.
 * Deliberately not a gallery: every frame is here because it answers a
 * question a prospective client actually has about the space.
 */
const FRAMES = [
  {
    src: "/media/entry.webp",
    alt: "The entry nook — an oak bench, dried botanicals and warm plaster",
    label: "Arriving",
    caption:
      "A private entrance and a waiting nook of your own. You will not sit in a shared corridor.",
    ratio: "3 / 4",
  },
  {
    src: "/media/room.webp",
    alt: "The consulting room with two facing armchairs and morning light",
    label: "The room",
    caption:
      "Two chairs, real daylight, no desk between you. Fifty minutes that start on time.",
    ratio: "4 / 3",
  },
  {
    src: "/media/g-window-seat.webp",
    alt: "A deep window seat with a folded wool throw and a stoneware cup",
    label: "Afterwards",
    caption:
      "A quiet place to sit before you drive home. Sessions rarely end neatly on the hour.",
    ratio: "3 / 4",
  },
];

export default function Atmosphere() {
  return (
    <section className="tint tint-7 relative bg-surface-2 py-section">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">The space</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Three rooms, and what happens in each."
              className="mt-6 max-w-[19ch] font-display text-display-lg font-light"
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[1.0625rem] leading-[1.75] text-fgm">
              In Annapolis, or by secure video from wherever you actually feel
              able to talk. The body reads a space long before the mind does,
              so the space was built first.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-6 md:grid-cols-3 md:gap-8">
          {FRAMES.map((f, i) => (
            <Reveal
              key={f.src}
              delay={i * 110}
              className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-6" : ""}
            >
              <figure>
                <div
                  className="relative overflow-hidden rounded-2xl bg-surface-3"
                  style={{ aspectRatio: f.ratio }}
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(min-width:768px) 31vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-accent">
                    {f.label}
                  </span>
                  <p className="mt-2.5 max-w-[34ch] font-sans text-[0.9375rem] leading-[1.7] text-fgm">
                    {f.caption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-14">
          <Link href="/contact" className="btn-ghost btn-lg">
            <span>Location & access</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
