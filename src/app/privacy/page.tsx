import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy, HIPAA & Accessibility",
  description:
    "How Seven Lights Counseling handles protected health information, website analytics, cookies, and accessibility.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    id: "phi",
    t: "Protected health information",
    b: [
      "Clinical records are maintained in an encrypted, HIPAA-compliant electronic health record and are never sold, shared for marketing, or disclosed to an insurer. Because Seven Lights is an out-of-network practice, no diagnosis is filed with any payer unless you personally choose to submit a superbill.",
      "You have the right to inspect and request a copy of your record, to request an amendment, to request restrictions on certain disclosures, and to receive an accounting of disclosures. A full Notice of Privacy Practices is provided in writing before the first session.",
    ],
  },
  {
    id: "limits",
    t: "Limits of confidentiality",
    b: [
      "Everything said in session is confidential with the narrow exceptions every licensed clinician carries in the State of Maryland: a credible risk of imminent serious harm to yourself or an identifiable other person; suspected abuse or neglect of a child, an older adult, or a vulnerable adult; and a valid court order. These are explained in full at the first session before anything else is discussed.",
    ],
  },
  {
    id: "web",
    t: "This website",
    b: [
      "Information submitted through forms on this site — name, email, phone, and the answers you give in the matching questionnaire — is used solely to respond to your enquiry and to schedule a consultation. It is not sold, rented, or added to a marketing list.",
      "Email and web forms are not secure channels. Please do not include detailed clinical information in them. Once care begins, all clinical communication moves to a secure, HIPAA-compliant portal.",
      "The site uses privacy-respecting, aggregate analytics to understand which pages are useful. No advertising trackers, no cross-site profiling, and no third-party marketing pixels are used, in keeping with FTC and OCR guidance on tracking technologies used by health providers.",
    ],
  },
  {
    id: "retention",
    t: "Retention",
    b: [
      "Enquiry records that do not lead to treatment are deleted within twelve months. Clinical records are retained for the period required by Maryland law and professional standards, and are then securely destroyed.",
    ],
  },
  {
    id: "accessibility",
    t: "Accessibility",
    b: [
      "This site is built to meet WCAG 2.2 AA: keyboard operable throughout, visible focus indicators, colour contrast tested against AA thresholds, semantic landmarks and headings, and full respect for the prefers-reduced-motion setting — with that setting enabled, all decorative motion and video parallax is disabled.",
      "The Annapolis consulting room offers step-free access from the rear entrance and a lift to the second floor. If you need an accommodation of any kind, including a different meeting format, please say so on the consultation call — it will be arranged without discussion of why.",
    ],
  },
  {
    id: "contact",
    t: "Questions",
    b: [
      `Privacy questions can be directed to ${site.contact.email} or ${site.contact.phone}. Complaints may also be filed with the U.S. Department of Health and Human Services Office for Civil Rights without retaliation of any kind.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy, HIPAA & accessibility."
        lede="Written to be read, rather than to be defensible. If anything here is unclear, ask."
        lightIds={[5, 6]}
        seed={13}
      />

      <section className="bg-paper py-section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <nav className="lg:col-span-3">
            <Reveal>
              <p className="eyebrow lg:sticky lg:top-32">
                <span className="block">On this page</span>
                <span className="mt-5 flex flex-col gap-2.5 normal-case tracking-normal">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="link-sweep font-sans text-[0.875rem] font-normal text-bark/70"
                    >
                      {s.t}
                    </a>
                  ))}
                </span>
              </p>
            </Reveal>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 50, 200)} className={i > 0 ? "mt-14" : ""}>
                <div id={s.id} className="scroll-mt-32">
                  <h2 className="font-display text-display-sm font-light text-ink">{s.t}</h2>
                  <div className="prose-editorial mt-5">
                    {s.b.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={120}>
              <p className="mt-16 border-t border-ink/[0.13] pt-8 font-sans text-[0.8125rem] leading-relaxed text-bark/45">
                This page is a plain-language summary and is not the practice&rsquo;s
                formal Notice of Privacy Practices, which is provided in writing at
                intake. Last reviewed August 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
