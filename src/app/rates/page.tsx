import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqs } from "@/lib/faq";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import Accordion from "@/components/Accordion";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Rates & Insurance — Fees, Superbills, and Reduced-Fee Places",
  description:
    "Transparent session fees, how out-of-network reimbursement works, a script for calling your insurer, sliding-scale availability, and Good Faith Estimate information.",
  alternates: { canonical: "/rates" },
};

const rates = [
  {
    t: "Consultation call",
    p: "No charge",
    d: "Fifteen minutes by phone. Enough to describe what is going on and hear honestly whether this is the right practice.",
    tag: "Always free",
  },
  {
    t: "Initial assessment",
    p: "$250",
    d: "Sixty minutes. History, current load, risk screening, and an initial formulation with a proposed shape for the work.",
    tag: "60 minutes",
  },
  {
    t: "Individual session",
    p: "$195",
    d: "The standard weekly hour. CPT 90837, the code most out-of-network plans reimburse.",
    tag: "50 minutes",
  },
  {
    t: "Extended session",
    p: "$285",
    d: "Eighty minutes. Used for trauma processing and integration work, where a fifty-minute container is too short to open and close safely.",
    tag: "80 minutes",
  },
];

const steps = [
  {
    n: "01",
    t: "Call the number on your card",
    d: "Ask for member services and say you want to check out-of-network outpatient mental-health benefits.",
  },
  {
    n: "02",
    t: "Ask these three questions",
    d: "Do I have out-of-network outpatient mental-health benefits? What is my out-of-network deductible, and how much of it have I met this year? What percentage of the allowed amount do you reimburse for CPT code 90837?",
  },
  {
    n: "03",
    t: "Do the arithmetic",
    d: "Those three answers give you your real per-session cost after your deductible is met. Most PPO plans land somewhere between 50% and 80% reimbursement.",
  },
  {
    n: "04",
    t: "Submit the superbill",
    d: "A superbill arrives by secure message at the start of each month. You upload it through your insurer's portal; reimbursement usually lands within two to four weeks.",
  },
];

export default function RatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Rates & insurance"
        title="The money part, stated plainly."
        lede="No hidden fees, no packages, no minimum commitment. Everything below is what you would be told on the phone anyway."
        video="/media/svc-stress.mp4"
        poster="/media/svc-stress.webp"
        lightIds={[3, 6]}
        seed={7}
      >
        <Link href="/begin" className="btn-primary btn-lg !bg-onc !text-scrim">
          <span>Book a free consultation</span>
        </Link>
      </PageHero>

      {/* rates */}
      <section className="tint tint-3 bg-surface py-section">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Fees</p>
              </Reveal>
              <SplitLines
                as="h2"
                text="Four numbers. That is the whole schedule."
                className="mt-6 max-w-[19ch] font-display text-display-lg font-light"
              />
            </div>
            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <p className="text-[1.0625rem] leading-[1.75] text-fgm/70">
                Payment is due at the time of session by card or HSA/FSA card.
                Cancellations with more than 24 hours&rsquo; notice are not charged.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-scrim/10 md:grid-cols-2">
            {rates.map((r, i) => (
              <Reveal
                key={r.t}
                delay={(i % 2) * 90}
                className="group bg-surface p-8 transition-colors duration-700 hover:bg-surface-2 sm:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
                      {r.tag}
                    </p>
                    <h3 className="mt-4 font-display text-[1.55rem] font-light leading-tight text-fg">
                      {r.t}
                    </h3>
                  </div>
                  <p className="shrink-0 font-display text-[2rem] font-light leading-none tracking-[-0.03em] text-fg">
                    {r.p}
                  </p>
                </div>
                <p className="mt-5 max-w-[46ch] font-sans text-[0.9375rem] leading-[1.7] text-fgm/70">
                  {r.d}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-6 rounded-2xl border border-line/10 bg-surface-2/60 p-8 md:grid-cols-2">
              <div>
                <p className="eyebrow">Reduced-fee places</p>
                <p className="mt-4 max-w-[46ch] font-sans text-[0.9375rem] leading-[1.7] text-fgm/75">
                  A limited number of reduced-fee places are held at any given
                  time, prioritised for people for whom the standard fee is a
                  genuine barrier to care. Ask on the consultation call — it is a
                  normal question and will not change how you are treated.
                </p>
              </div>
              <div>
                <p className="eyebrow">Accepted payment</p>
                <p className="mt-4 max-w-[46ch] font-sans text-[0.9375rem] leading-[1.7] text-fgm/75">
                  All major cards, HSA and FSA cards, and bank transfer. Superbills
                  are issued monthly for out-of-network reimbursement. Seven Lights
                  does not bill insurers directly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* insurance walkthrough */}
      <section className="relative overflow-hidden bg-contrast py-section text-onc">
        <div className="grain pointer-events-none absolute inset-0 grain-light" />
        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-accent">Out of network</p>
              </Reveal>
              <SplitLines
                as="h2"
                text="How to find out what your plan will actually pay."
                className="mt-6 max-w-[19ch] font-display text-display-lg font-light"
              />
            </div>
            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <p className="text-[1.0625rem] leading-[1.75] text-onc/60">
                Being out of network keeps your record private, keeps session
                length and treatment decisions clinical rather than administrative,
                and means no diagnosis has to be filed with an insurer to justify
                your care.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-surface/12 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={i * 90}
                className="bg-contrast p-8 transition-colors duration-700 hover:bg-contrast-2"
              >
                <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-accent">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-[1.35rem] font-light leading-tight">{s.t}</h3>
                <p className="mt-4 font-sans text-[0.9375rem] leading-[1.7] text-onc/60">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={80}>
            <div className="mt-10 rounded-2xl border border-onc/15 bg-surface/[0.04] p-8">
              <p className="eyebrow text-onc/45">Good Faith Estimate</p>
              <p className="mt-4 max-w-[70ch] font-sans text-[0.9375rem] leading-[1.7] text-onc/70">
                Under the No Surprises Act, anyone who is uninsured or not using
                insurance is entitled to a written Good Faith Estimate of expected
                charges before care begins. One is issued automatically at intake,
                and you can request one at any point beforehand.{" "}
                <Link href="/good-faith-estimate" className="link-sweep font-medium text-onc">
                  Read the full notice
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* money FAQs */}
      <section className="tint tint-3 bg-surface-2 py-section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Still wondering</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Questions about cost."
              className="mt-6 font-display text-display-md font-light"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-[1.7] text-fgm/70">
                Nobody has ever been treated differently here for asking about
                money.
              </p>
              <a href={site.contact.phoneHref} className="btn-ghost btn-md mt-8">
                <span>Call {site.contact.phone}</span>
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs.filter((f) => f.group === "Fees & insurance")} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title="Ask about cost on the free call."
        body="Fifteen minutes, no charge, and no obligation. Fee, availability, and fit all get settled in one conversation."
        location="rates_cta"
      />
    </>
  );
}
