import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Good Faith Estimate — No Surprises Act Notice",
  description:
    "Your right under the No Surprises Act to a Good Faith Estimate of expected charges for psychotherapy at Seven Lights Counseling.",
  alternates: { canonical: "/good-faith-estimate" },
};

const blocks = [
  {
    t: "Your right to a Good Faith Estimate",
    b: [
      "You have the right to receive a Good Faith Estimate explaining how much your medical and mental-health care will cost. Under the federal No Surprises Act, health-care providers must give people who are uninsured, or who are not using insurance, an estimate of the expected charges for medical services — including psychotherapy.",
      "You have the right to receive a Good Faith Estimate in writing for the total expected cost of any non-emergency services. You can also ask for one before you schedule anything at all.",
    ],
  },
  {
    t: "How it works here",
    b: [
      "Because psychotherapy is ongoing and its length depends on clinical need, the estimate issued at intake covers a projected course of care over twelve months, based on the agreed session frequency and the fee schedule published on the Rates page. It is updated whenever the frequency or fee changes.",
      "The estimate is a projection, not a contract. You are never obligated to a set number of sessions, and you may end therapy at any time without a penalty of any kind.",
    ],
  },
  {
    t: "If you are billed more than expected",
    b: [
      "If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute it. Start the dispute process within 120 calendar days of the date on the bill. There is a $25 administrative fee to use the dispute process, and if the disputed bill is found to be higher than the estimate, you may not have to pay the difference.",
      "Guidance and a dispute form are available at www.cms.gov/nosurprises, or by calling 1-800-985-3059.",
    ],
  },
  {
    t: "Requesting yours",
    b: [
      `A written estimate is issued automatically before your first session. To request one earlier, or to ask a question about it, contact the practice at ${site.contact.email} or ${site.contact.phone}.`,
    ],
  },
];

export default function GfePage() {
  return (
    <>
      <PageHero
        eyebrow="No Surprises Act"
        title="Your Good Faith Estimate."
        lede="A federal right to know what care will cost before it begins — and how to dispute a bill that arrives higher than expected."
        lightIds={[3, 5]}
        seed={15}
      />

      <section className="bg-paper py-section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            {blocks.map((s, i) => (
              <Reveal key={s.t} delay={Math.min(i * 60, 200)} className={i > 0 ? "mt-14" : ""}>
                <h2 className="font-display text-display-sm font-light text-ink">{s.t}</h2>
                <div className="prose-editorial mt-5">
                  {s.b.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal delay={140}>
              <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-ink/[0.13] pt-10">
                <Link href="/rates" className="btn-ghost btn-lg">
                  <span>See the fee schedule</span>
                </Link>
                <Link href="/begin" className="btn-primary btn-lg">
                  <span>Book a free consultation</span>
                </Link>
              </div>
              <p className="mt-8 font-sans text-[0.8125rem] leading-relaxed text-bark/45">
                This notice summarises rights under 45 CFR §149.610. It is provided
                for information and is not legal advice. Last reviewed August 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
