import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services, getService, serviceVideo } from "@/lib/services";
import { lights } from "@/lib/lights";
import { site } from "@/lib/site";
import ServiceHero from "@/components/service/ServiceHero";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import CtaBand from "@/components/CtaBand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Therapy in Maryland`,
    description: s.lede,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} · ${site.name}`,
      description: s.lede,
      images: [{ url: s.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const seed = services.findIndex((s) => s.slug === slug);
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  const engaged = service.lights.map((n) => lights.find((l) => l.n === n)!).filter(Boolean);

  const ld = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.lede,
    provider: { "@type": "MedicalBusiness", name: site.name, url: site.url },
    url: `${site.url}/services/${service.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <ServiceHero
        service={service}
        video={serviceVideo[service.slug] ?? "/media/prism.mp4"}
        seed={seed}
      />

      {/* ---------- recognition ---------- */}
      <section className="bg-paper py-section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">You might recognise</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="Any one of these is reason enough."
              className="mt-6 font-display text-display-md font-light"
            />
            <Reveal delay={120}>
              <Link href="/begin" className="btn-primary btn-lg mt-9">
                <span>Book a free 15-minute call</span>
              </Link>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {service.signals.map((sig, i) => (
              <Reveal key={sig} as="li" delay={i * 60} className="border-b border-ink/[0.13] first:border-t">
                <p className="flex items-start gap-5 py-6 font-display text-[clamp(1.1rem,2vw,1.5rem)] font-light leading-[1.35] tracking-[-0.02em] text-ink/85">
                  <span className="mt-[0.6em] block h-px w-6 shrink-0 bg-clay/70" />
                  {sig}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- body ---------- */}
      <section className="bg-bone py-section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="clip" className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28">
              <Reveal variant="scale" className="absolute inset-0">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">The work itself</p>
            </Reveal>
            <div className="prose-editorial mt-8">
              {service.body.map((p, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-ink/[0.13] pt-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Session shape</p>
                  <p className="mt-2 font-sans text-[0.9375rem] text-bark/80">{service.duration}</p>
                </div>
                <div>
                  <p className="eyebrow">Approaches drawn on</p>
                  <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-bark/80">
                    {service.modalities.join(" · ")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- how the work goes ---------- */}
      <section className="relative overflow-hidden bg-ink py-section text-paper">
        <div className="grain pointer-events-none absolute inset-0 grain-light" />
        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-clay">Arc of treatment</p>
              </Reveal>
              <SplitLines
                as="h2"
                text="How this work actually goes."
                className="mt-6 font-display text-display-lg font-light"
              />
            </div>
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1.0625rem] leading-[1.75] text-paper/60">
                Four movements, not four appointments. They overlap, and the pace
                is set by your nervous system rather than a protocol.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-paper/12 md:grid-cols-2 xl:grid-cols-4">
            {service.work.map((w, i) => (
              <Reveal
                key={w.title}
                as="li"
                delay={i * 90}
                className="group relative bg-ink p-8 transition-colors duration-700 hover:bg-umber"
              >
                <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[1.45rem] font-light leading-tight">{w.title}</h3>
                <p className="mt-4 font-sans text-[0.9375rem] leading-[1.7] text-paper/60">{w.text}</p>
              </Reveal>
            ))}
          </ol>

          {/* lights engaged */}
          <div className="mt-20 grid gap-10 border-t border-paper/12 pt-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-clay">Lights engaged</p>
              <p className="mt-5 max-w-[34ch] font-sans text-[0.9375rem] leading-relaxed text-paper/55">
                Where this work sits on the map. Most people never think about it —
                it simply keeps the treatment coherent.
              </p>
              <Link href="/approach" className="link-sweep mt-6 inline-block font-sans text-[0.875rem] text-paper/70">
                See the full method
              </Link>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {engaged.map((l, i) => (
                <Reveal key={l.n} delay={i * 90} className="rounded-2xl border border-paper/12 p-6">
                  <span className="block h-[3px] w-10 rounded-full" style={{ background: l.color }} />
                  <p className="mt-5 font-display text-[1.25rem] font-light">{l.name}</p>
                  <p className="mt-1 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-paper/35">
                    {l.latin}
                  </p>
                  <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-paper/55">
                    {l.theme}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- related ---------- */}
      <section className="bg-paper py-section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Often alongside</p>
          </Reveal>
          <SplitLines
            as="h2"
            text="These rarely arrive on their own."
            className="mt-6 max-w-[20ch] font-display text-display-md font-light"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <Link href={`/services/${r.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      sizes="(min-width:768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-ink/10 transition-opacity duration-700 group-hover:opacity-0" />
                  </span>
                  <span className="mt-5 flex items-baseline gap-3">
                    <span className="font-sans text-[0.625rem] font-semibold tracking-[0.16em] text-clay/70">
                      {r.index}
                    </span>
                    <span className="font-display text-[1.3rem] font-light leading-tight text-ink">
                      {r.title}
                    </span>
                  </span>
                  <span className="mt-2 block font-sans text-[0.875rem] leading-relaxed text-bark/55">
                    {r.eyebrow}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        title={`Start with ${service.title.toLowerCase()}.`}
        body="Fifteen minutes on the phone, at no cost, to find out whether this is the right room for what you are carrying."
        location={`service_cta_${service.slug}`}
      />
    </>
  );
}
