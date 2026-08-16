import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Kerry Garrity, LCSW-C — Founder & Clinical Director",
  description:
    "Kerry Garrity is a Licensed Certified Social Worker–Clinical practising in Annapolis and by telehealth across Maryland, specialising in addiction and recovery, complex trauma, and attachment.",
  alternates: { canonical: "/about" },
};

const facts = [
  { k: "Licence", v: "LCSW-C — Licensed Certified Social Worker–Clinical, Maryland" },
  { k: "Clinical focus", v: "Addiction & recovery · Complex trauma · Attachment & codependency" },
  { k: "Primary modalities", v: "Internal Family Systems · Somatic approaches · ACT · Motivational Interviewing" },
  { k: "Populations", v: "Young adults and adults, 18 and over" },
  { k: "Settings", v: "Annapolis consulting room · HIPAA-compliant telehealth statewide" },
  { k: "Also offers", v: "Psychedelic preparation & integration support · Clinical consultation" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The practice is one person"
        title="Kerry Garrity, LCSW-C"
        lede="A single clinician who will know your history properly — rather than a rota of people each holding a fragment of it."
        video="/media/svc-talk.mp4"
        poster="/media/svc-talk.webp"
        lightIds={[4, 5, 7]}
        seed={4}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/begin" className="btn-primary btn-lg !bg-onc !text-scrim">
            <span>Book a free call</span>
          </Link>
          <a href={site.contact.phoneHref} className="btn-light btn-lg">
            <span>{site.contact.phone}</span>
          </a>
        </div>
      </PageHero>

      <section className="tint tint-2 bg-surface py-section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade" className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28">
              <Reveal variant="scale" className="absolute inset-0">
                <Image
                  src="/media/kerry.webp"
                  alt={`${site.clinician.fullTitle}, founder of ${site.name}`}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </Reveal>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">In her own words</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="I am interested in what is underneath."
              className="mt-6 font-display text-display-md font-light"
            />

            <div className="prose-editorial mt-9">
              <Reveal delay={60}>
                <p>
                  I spent the first part of my career watching people get treated
                  in pieces. The substance use in one building, the trauma in
                  another, the relationship falling apart in a third — and nobody
                  holding the thread that ran through all of it. It is not that
                  those services were poor. It is that a person is not a set of
                  presenting problems, and the thing that actually needs treating
                  usually sits underneath all three.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  Seven Lights is my attempt to do it the other way around. One
                  clinician, one map, one relationship that lasts long enough to
                  get to the root. I work most often with people carrying some
                  combination of addiction, complex trauma, and early attachment
                  injury — because in a real life those three are almost never
                  separate.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p>
                  I am direct. I will not soften something that needs saying
                  plainly, and I will not pathologise a reasonable response to an
                  unreasonable situation. Clients often tell me the room feels
                  safe rather than gentle — which, most of the time, is the more
                  useful of the two.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p>
                  I also make space for the questions that a lot of clinical
                  settings quietly avoid: what your life is for, what happens when
                  a framework you were raised inside stops holding, what to do
                  with an experience you have no vocabulary for. You do not have
                  to believe anything in particular to bring those here. I will
                  not be bringing my own beliefs into the room.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <dl className="mt-14 divide-y divide-line/[0.13] border-y border-line/[0.13]">
                {facts.map((f) => (
                  <div key={f.k} className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
                    <dt className="eyebrow pt-1">{f.k}</dt>
                    <dd className="font-sans text-[0.9375rem] leading-relaxed text-fgm/80 sm:col-span-2">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 font-sans text-[0.8125rem] leading-relaxed text-fgm/45">
                Licence numbers, degree details, and full training history are
                supplied in the practice paperwork before the first session and
                are verifiable through the Maryland Board of Social Work Examiners.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what it is like */}
      <section className="relative overflow-hidden bg-contrast-2 py-section text-onc">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/media/room.webp"
          aria-hidden="true"
        >
          <source src="/media/room.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-contrast-2 via-contrast-2/90 to-contrast-2" />

        <div className="shell relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-sand/70">The room</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="What it is actually like."
              className="mt-6 font-display text-display-md font-light"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="prose-editorial mt-2">
              <Reveal>
                <p className="!text-onc/70">
                  No couch. No note-taking through the whole hour. No silence you
                  are expected to fill. Sessions run fifty minutes, or eighty when
                  the work calls for it, and start on time.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="!text-onc/70">
                  You will be asked questions. You will not be asked to disclose
                  anything you are not ready to disclose — &lsquo;not yet&rsquo; is
                  a complete answer and will be respected without negotiation.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="!text-onc/70">
                  You can swear, cry, arrive late, say the ugly version of the
                  thought, or spend twenty minutes talking about something that
                  seems irrelevant. None of it is a problem. Most of it is the
                  work.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title="Fifteen minutes to find out if this is the right room."
        body="No forms, no cost, no obligation. If Seven Lights is not the right fit, Kerry will tell you and make a proper referral."
        location="about_cta"
      />
    </>
  );
}
