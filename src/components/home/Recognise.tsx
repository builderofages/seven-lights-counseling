"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { track } from "@/lib/analytics";

const lines = [
  "You are competent everywhere and exhausted everywhere.",
  "You have explained the pattern to yourself a hundred times and it has not moved.",
  "Something happened years ago and your body has not been told it is over.",
  "The drink, the scroll, the work — it is not the problem, it is the solution to the problem.",
  "You keep meeting the same person in different bodies.",
  "You cannot tell any more which of your preferences are actually yours.",
  "There is a question about what your life is for and no one to ask.",
];

export default function Recognise() {
  return (
    <section className="relative overflow-hidden bg-bone py-section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Recognition</p>
            </Reveal>
            <SplitLines
              as="h2"
              text="If one of these lands, that is enough to call."
              className="mt-6 font-display text-display-md font-light"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-[38ch] text-[1.0625rem] leading-[1.7] text-bark/70">
                You do not have to be able to articulate it. Half of the first
                session is usually finding the words.
              </p>
              <Link
                href="/begin"
                onClick={() => track("cta_click", { location: "recognise" })}
                className="btn-primary btn-lg mt-8"
              >
                <span>Book a free 15-minute call</span>
              </Link>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {lines.map((l, i) => (
              <Reveal key={i} delay={i * 55} as="li" className="border-b border-ink/[0.13]">
                <p className="flex items-start gap-5 py-6 font-display text-[clamp(1.15rem,2.1vw,1.6rem)] font-light leading-[1.32] tracking-[-0.02em] text-ink/85">
                  <span className="mt-[0.55em] block h-px w-6 shrink-0 bg-clay/70" />
                  {l}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
