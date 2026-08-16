"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { track } from "@/lib/analytics";

export default function CtaBand({
  eyebrow = "Begin",
  title = "The first call is fifteen minutes and costs nothing.",
  body = "You do not need to know what to say. That is what the call is for — and if Seven Lights is not the right fit, you will leave it with the name of someone who is.",
  location = "cta_band",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  location?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/media/dawn.webp"
        aria-hidden="true"
      >
        <source src="/media/dawn.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <div className="shell relative py-section">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow text-clay">{eyebrow}</p>
          </Reveal>
          <SplitLines
            as="h2"
            text={title}
            className="mx-auto mt-7 max-w-[18ch] font-display text-display-lg font-light"
          />
          <Reveal delay={140}>
            <p className="mx-auto mt-7 max-w-[54ch] text-lede text-paper/65">{body}</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Link
                  href={site.cta.primary.href}
                  onClick={() => track("cta_click", { location })}
                  className="btn-primary btn-lg !bg-paper !text-ink"
                >
                  <span>Book a free consultation</span>
                </Link>
              <a href={site.contact.phoneHref} className="btn-light btn-lg">
                <span>Call {site.contact.phone}</span>
              </a>
            </div>
            <p className="mt-7 font-sans text-[0.8125rem] text-paper/40">
              Replies within one business day · {site.contact.telehealthNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
