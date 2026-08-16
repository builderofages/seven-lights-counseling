"use client";

import Link from "next/link";
import { faqs } from "@/lib/faq";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";

export default function FaqPreview() {
  const picked = [faqs[0], faqs[3], faqs[6], faqs[7], faqs[10]];

  return (
    <section className="tint tint-6 relative bg-surface-2 py-section">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Before you call</p>
          </Reveal>
          <SplitLines
            as="h2"
            text="The questions people ask first."
            className="mt-6 font-display text-display-md font-light"
          />
          <Reveal delay={120}>
            <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-[1.7] text-fgm/70">
              Answered plainly, including the ones about money.
            </p>
            <Link href="/faq" className="btn-ghost btn-md mt-8">
              <span>All questions</span>
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={picked} />
        </div>
      </div>
    </section>
  );
}
