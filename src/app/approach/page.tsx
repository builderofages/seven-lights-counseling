import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { lights } from "@/lib/lights";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import CtaBand from "@/components/CtaBand";
import ServiceAura from "@/components/service/ServiceAura";

export const metadata: Metadata = {
  title: "The Seven Lights Method — How the Work Is Structured",
  description:
    "A single clinical map across seven domains of a life: ground, flow, will, heart, voice, insight, and meaning. Informed by contemplative traditions, used in plain psychological terms, and requiring no belief of any kind.",
  alternates: { canonical: "/approach" },
};

const principles = [
  {
    t: "Safety before depth",
    d: "Nothing is opened that the nervous system cannot yet hold. Stabilisation is not a warm-up for the real work; it is the foundation the real work stands on.",
  },
  {
    t: "The pattern, not the episode",
    d: "Symptom relief matters and is not the destination. We treat what generates the symptom, so the change survives the next hard month.",
  },
  {
    t: "Your pace, stated out loud",
    d: "The speed of the work is a subject of the work. You are told what is being proposed and why, and 'not yet' is always a complete answer.",
  },
  {
    t: "No belief required",
    d: "The framework borrows structure from contemplative traditions and translates it into plain clinical language. The therapist's own beliefs stay out of the room.",
  },
  {
    t: "Reviewed, never drifting",
    d: "Every six to eight weeks the work is formally reviewed against what you came for. Therapy that has stopped going somewhere should be named, not extended.",
  },
  {
    t: "Ending is part of the plan",
    d: "The aim is a life you can run without this appointment in it. Endings are planned, discussed, and treated as an outcome rather than a loss.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="The method"
        title="One light bends into seven."
        lede="Seven domains of a life, each a place where things get stuck, each treatable. A map that keeps long work coherent — and that you never have to learn to benefit from."
        video="/media/prism.mp4"
        poster="/media/prism.webp"
        lightIds={[1, 2, 3, 4, 5, 6, 7]}
        seed={1}
      >
        <Link href="/begin" className="btn-primary btn-lg !bg-paper !text-ink">
          <span>Book a free 15-minute call</span>
        </Link>
      </PageHero>

      {/* ---- premise ---- */}
      <section className="bg-paper py-section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Why a map at all</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Long work goes wrong when it loses its shape."
              className="mt-6 max-w-[17ch] font-display text-display-lg font-light"
            />
            <div className="prose-editorial mt-9 max-w-prose">
              <Reveal delay={60}>
                <p>
                  Therapy that runs for a year without a frame tends to become a
                  weekly debrief — useful, comforting, and quietly static. A frame
                  is what makes it possible to say, in month nine, exactly what has
                  changed and what has not.
                </p>
              </Reveal>
              <Reveal delay={110}>
                <p>
                  The Seven Lights is that frame. It divides a life into seven
                  domains, each with its own question, its own way of going wrong,
                  and its own evidence-based routes back. Contemplative traditions
                  across many cultures have named a strikingly similar sequence for
                  centuries; here it is used descriptively, in plain psychological
                  terms.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  It is a clinical instrument, not a belief system. Nothing about it
                  requires you to accept a metaphysics, and most clients never think
                  about it at all — they simply notice that the work keeps moving.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="clip" className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Reveal variant="scale" className="absolute inset-0">
                <Image
                  src="/media/stones.webp"
                  alt="Seven flat river stones arranged in a graduated row on pale sand"
                  fill
                  sizes="(min-width:1024px) 32vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- the seven, in sequence ---- */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="grain pointer-events-none absolute inset-0 grain-light" />
        {lights.map((l, i) => (
          <div
            key={l.n}
            className="relative border-b border-paper/10 last:border-0"
            style={{ background: i % 2 ? "rgba(245,240,232,0.018)" : "transparent" }}
          >
            <ServiceAura
              lightIds={[l.n]}
              seed={l.n}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-40 mix-blend-screen"
            />
            <div className="shell relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
              <div className="lg:col-span-4">
                <Reveal>
                  <span
                    className="block h-[3px] w-14 rounded-full"
                    style={{ background: l.color }}
                  />
                  <p
                    className="mt-7 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: l.color }}
                  >
                    Light {String(l.n).padStart(2, "0")} · {l.latin}
                  </p>
                  <h2 className="mt-4 font-display text-display-md font-light">{l.name}</h2>
                  <p className="mt-3 font-sans text-[0.9375rem] text-paper/45">{l.theme}</p>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={90}>
                  <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light italic leading-[1.3] text-paper/90">
                    &ldquo;{l.question}&rdquo;
                  </p>
                  <p className="mt-7 max-w-prose text-[1.0625rem] leading-[1.78] text-paper/65">
                    {l.body}
                  </p>
                  <p className="mt-8 border-t border-paper/12 pt-5 font-sans text-[0.8125rem] uppercase tracking-[0.13em] text-paper/40">
                    {l.clinical}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ---- principles ---- */}
      <section className="bg-bone py-section">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Principles of practice</p>
              </Reveal>
              <SplitLines
                as="h2"
                text="Six commitments, held in every session."
                className="mt-6 font-display text-display-lg font-light"
              />
            </div>
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1.0625rem] leading-[1.75] text-bark/70">
                These are not aspirations. If any of them stops being true of your
                treatment, naming it is a legitimate use of a session.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal
                key={p.t}
                delay={(i % 3) * 90}
                className="bg-bone p-8 transition-colors duration-700 hover:bg-paper sm:p-9"
              >
                <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[1.4rem] font-light leading-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-4 font-sans text-[0.9375rem] leading-[1.7] text-bark/70">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title="You do not need to understand the map to walk the path."
        body="Most clients never think about the framework. They simply notice the work is going somewhere. Fifteen minutes on the phone is enough to find out whether it is right for you."
        location="approach_cta"
      />
    </>
  );
}
