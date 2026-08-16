import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services — Therapy for Adults in Maryland",
  description:
    "Nine areas of focused clinical work: individual therapy, substance use and recovery, anxiety and depression, complex trauma and CPTSD, adult relationships, attachment and codependency, stress and burnout, spiritual exploration, and psychedelic integration.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nine ways in"
        title="What we treat, and how."
        lede="A short list rather than a directory. These are things Kerry treats often and treats well — and in a real life they almost never arrive one at a time."
        video="/media/caustic.mp4"
        poster="/media/caustic.webp"
        lightIds={[1, 4, 6]}
        seed={5}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/begin?mode=match" className="btn-primary btn-lg !bg-paper !text-ink">
            <span>Find your starting point</span>
          </Link>
          <Link href="/begin" className="btn-light btn-lg">
            <span>Book a free call</span>
          </Link>
        </div>
      </PageHero>

      <section className="bg-paper py-section">
        <div className="shell grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <Link href={`/services/${s.slug}`} className="group flex h-full flex-col">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width:1280px) 30vw, (min-width:768px) 46vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
                  <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 font-sans text-[0.625rem] font-semibold tracking-[0.16em] text-ink">
                    {s.index}
                  </span>
                </span>

                <span className="mt-6 block font-display text-[1.55rem] font-light leading-[1.15] tracking-[-0.02em] text-ink transition-transform duration-[620ms] ease-out group-hover:translate-x-1.5">
                  {s.title}
                </span>
                <span className="mt-1.5 block font-sans text-[0.75rem] uppercase tracking-[0.14em] text-clay/80">
                  {s.eyebrow}
                </span>
                <span className="mt-4 block flex-1 font-sans text-[0.9375rem] leading-[1.7] text-bark/70">
                  {s.lede}
                </span>
                <span className="mt-6 flex items-center gap-3 font-sans text-[0.8125rem] font-medium text-ink">
                  Read more
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure which"
        title="Two minutes will tell you where to start."
        body="Six questions, no email required to see the result, and an honest answer — including if the answer is a different clinician."
        location="services_index_cta"
      />
    </>
  );
}
