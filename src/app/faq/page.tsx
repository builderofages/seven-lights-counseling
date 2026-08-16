import type { Metadata } from "next";
import Link from "next/link";
import { faqs, faqGroups } from "@/lib/faq";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Common Questions — Starting Therapy at Seven Lights",
  description:
    "Plain answers about first sessions, how long therapy takes, out-of-network insurance and superbills, confidentiality, telehealth, psychedelic integration, and what happens if it is not the right fit.",
  alternates: { canonical: "/faq" },
};

const ld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <PageHero
        eyebrow="Common questions"
        title="Answered the way they would be on the phone."
        lede="Including the awkward ones. If yours is not here, it is a good use of the free fifteen minutes."
        video="/media/curtain.mp4"
        poster="/media/curtain.webp"
        lightIds={[5, 6]}
        seed={9}
      >
        <Link href="/begin" className="btn-primary btn-lg !bg-paper !text-ink">
          <span>Ask on a free call</span>
        </Link>
      </PageHero>

      <section className="bg-paper py-section">
        <div className="shell">
          {faqGroups.map((g, gi) => (
            <div key={g} className={gi > 0 ? "mt-20" : ""}>
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <Reveal>
                    <p className="eyebrow lg:sticky lg:top-32">{g}</p>
                  </Reveal>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  <Accordion items={faqs.filter((f) => f.group === g)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title="The rest gets answered in fifteen minutes."
        body="A free call with Kerry — no intake forms, no cost, and an honest answer about whether this is the right practice for you."
        location="faq_cta"
      />
    </>
  );
}
