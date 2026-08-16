import type { Metadata } from "next";
import Link from "next/link";
import { faqs, faqGroups } from "@/lib/faq";
import PageHero from "@/components/PageHero";
import Accordion from "@/components/Accordion";
import { cn } from "@/lib/cn";
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
        <Link href="/begin" className="btn-primary btn-lg !bg-onc !text-scrim">
          <span>Ask on a free call</span>
        </Link>
      </PageHero>

      <section className="tint tint-6 bg-surface py-section">
        <div className="shell grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* rail: navigation + a live CTA, so the column is never empty */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Contents</p>
              <nav className="mt-6 flex flex-col gap-3 border-l border-line/15 pl-5">
                {faqGroups.map((g) => (
                  <a
                    key={g}
                    href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="link-sweep font-sans text-[0.875rem] text-fgm/80 transition-colors hover:text-fg"
                  >
                    {g}
                  </a>
                ))}
              </nav>

              <div className="mt-10 rounded-2xl border border-line/15 bg-fg/[0.03] p-6">
                <p className="font-display text-[1.15rem] font-light leading-snug text-fg">
                  Not answered here?
                </p>
                <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-fgm/80">
                  Fifteen minutes on the phone, free, and Kerry will answer it
                  properly.
                </p>
                <Link href="/begin" className="btn-primary btn-sm mt-5 w-full">
                  <span>Book a call</span>
                </Link>
                <a
                  href="tel:+14105550117"
                  className="mt-3 block text-center font-sans text-[0.8125rem] text-fgm/70"
                >
                  (410) 555-0117
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {faqGroups.map((g, gi) => (
              <div
                key={g}
                id={g.toLowerCase().replace(/[^a-z]+/g, "-")}
                className={cn("scroll-mt-32", gi > 0 && "mt-16")}
              >
                <h2 className="font-display text-display-sm font-light text-fg">{g}</h2>
                <div className="mt-6">
                  <Accordion items={faqs.filter((f) => f.group === g)} />
                </div>
              </div>
            ))}
          </div>
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
