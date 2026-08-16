"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { site } from "@/lib/site";

const credentials = [
  { k: "Licensure", v: "LCSW-C · Maryland" },
  { k: "Clinical focus", v: "Addiction, complex trauma, attachment" },
  { k: "Modalities", v: "IFS · Somatic · ACT · MI" },
  { k: "Works with", v: "Young adults & adults, 18+" },
];

export default function KerryPreview() {
  return (
    <section className="relative bg-paper py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal variant="clip" className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Reveal variant="scale" className="absolute inset-0">
              <Image
                src="/media/kerry.webp"
                alt={`${site.clinician.fullTitle}, founder of ${site.name}`}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">The practice is one person</p>
          </Reveal>
          <SplitLines
            as="h2"
            text="Kerry Garrity, LCSW-C"
            className="mt-6 font-display text-display-lg font-light"
          />
          <div className="prose-editorial mt-8 max-w-prose">
            <Reveal delay={60}>
              <p>
                Kerry is a Licensed Certified Social Worker–Clinical practising in
                Annapolis and by telehealth throughout Maryland. Her work sits at
                the meeting point of addiction, complex trauma, and attachment —
                three things that are rarely separate in a real life and are too
                often treated as though they were.
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p>
                Her approach is direct and unhurried. She will not pathologise
                what you bring, and she will not soften something that needs to be
                said plainly. Clients tend to describe the room as safe rather
                than gentle — which is usually the more useful of the two.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-ink/[0.13] pt-8 sm:grid-cols-2">
              {credentials.map((c) => (
                <div key={c.k}>
                  <dt className="eyebrow">{c.k}</dt>
                  <dd className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-bark/80">
                    {c.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={180}>
            <Link href="/about" className="btn-ghost btn-lg mt-10">
              <span>More about Kerry</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
