import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";

export const metadata: Metadata = {
  title: "Contact — Seven Lights Counseling, Annapolis MD",
  description:
    "Phone, email, and location for Seven Lights Counseling in Annapolis, Maryland. Telehealth available statewide. Free fifteen-minute consultations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Three ways to reach the practice."
        lede="Whichever you choose, a real person reads it and replies within one business day."
        video="/media/entry.mp4"
        poster="/media/entry.webp"
        lightIds={[2, 4]}
        seed={11}
      >
        <Link href="/begin" className="btn-primary btn-lg !bg-onc !text-scrim">
          <span>Request a consultation</span>
        </Link>
      </PageHero>

      <section className="tint tint-5 bg-surface py-section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Direct</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Call, write, or use the form."
              className="mt-6 font-display text-display-md font-light"
            />

            <dl className="mt-12 divide-y divide-line/[0.13] border-y border-line/[0.13]">
              <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                <dt className="eyebrow pt-1">Phone</dt>
                <dd className="sm:col-span-2">
                  <a href={site.contact.phoneHref} className="link-sweep font-display text-[1.4rem] font-light text-fg">
                    {site.contact.phone}
                  </a>
                  <p className="mt-2 font-sans text-[0.875rem] text-fgm/60">
                    Voicemail is confidential and checked twice daily.
                  </p>
                </dd>
              </div>

              <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                <dt className="eyebrow pt-1">Email</dt>
                <dd className="sm:col-span-2">
                  <a href={`mailto:${site.contact.email}`} className="link-sweep font-display text-[1.4rem] font-light text-fg">
                    {site.contact.email}
                  </a>
                  <p className="mt-2 max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-fgm/60">
                    Email is not a secure channel. Please keep clinical detail out
                    of it — a sentence about wanting to book is plenty.
                  </p>
                </dd>
              </div>

              <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                <dt className="eyebrow pt-1">In person</dt>
                <dd className="sm:col-span-2">
                  <p className="font-sans text-[1rem] leading-relaxed text-fgm/85">
                    {site.contact.addressLine1}
                    <br />
                    {site.contact.addressLine2}
                  </p>
                  <p className="mt-2 font-sans text-[0.875rem] text-fgm/60">
                    Street parking and a lift to the second floor. Step-free access
                    from the rear entrance.
                  </p>
                </dd>
              </div>

              <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                <dt className="eyebrow pt-1">Telehealth</dt>
                <dd className="sm:col-span-2">
                  <p className="max-w-[46ch] font-sans text-[1rem] leading-relaxed text-fgm/85">
                    Secure video sessions anywhere in the state of Maryland, on a
                    HIPAA-compliant platform. No app or account required — a link
                    arrives before each session.
                  </p>
                </dd>
              </div>

              <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                <dt className="eyebrow pt-1">Hours</dt>
                <dd className="sm:col-span-2">
                  <ul className="space-y-1.5">
                    {site.contact.hours.map((h) => (
                      <li key={h.day} className="flex max-w-sm justify-between gap-6 font-sans text-[0.9375rem] text-fgm/80">
                        <span>{h.day}</span>
                        <span className="text-fg">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal variant="fade" className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Reveal variant="scale" className="absolute inset-0">
                <Image
                  src="/media/entry.webp"
                  alt="The entry to the Annapolis consulting room — an oak bench, dried botanicals, and warm plaster"
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </Reveal>

            <Reveal delay={120} className="mt-8 rounded-2xl border border-light-1/25 bg-light-1/[0.06] p-6">
              <p className="eyebrow text-light-1">In an emergency</p>
              <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-fgm/80">
                This practice does not provide crisis services and messages are not
                monitored out of hours. If you or someone else is in immediate
                danger, call <strong className="text-fg">911</strong>. For urgent
                support at any hour, call or text{" "}
                <a href={site.crisis.href} className="link-sweep font-medium text-fg">
                  988
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={160} className="mt-6">
              <Link href="/begin" className="btn-primary btn-lg w-full">
                <span>Request a free consultation</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
