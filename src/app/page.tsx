import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ServiceIndex from "@/components/home/ServiceIndex";
import Recognise from "@/components/home/Recognise";
import SevenLights from "@/components/home/SevenLights";
import Atmosphere from "@/components/home/Atmosphere";
import Grounding from "@/components/home/Grounding";
import KerryPreview from "@/components/home/KerryPreview";
import Process from "@/components/home/Process";
import FaqPreview from "@/components/home/FaqPreview";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Holistic Therapy in Annapolis, Maryland — Seven Lights Counseling",
  description:
    "Integrative psychotherapy for young adults and adults with Kerry Garrity, LCSW-C. Addiction and recovery, complex trauma and CPTSD, anxiety and depression, attachment and codependency. In Annapolis and by telehealth across Maryland.",
  alternates: { canonical: "/" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero />
      <Manifesto />
      <ServiceIndex />
      <Recognise />
      <SevenLights />
      <Grounding />
      <KerryPreview />
      <Atmosphere />
      <Process />
      <FaqPreview />
      <CtaBand location="home_footer_cta" />
    </>
  );
}
