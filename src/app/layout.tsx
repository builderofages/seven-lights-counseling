import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts — no third-party font requests from a health site.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/inter/index.css";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import StickyConsult from "@/components/funnel/StickyConsult";
import ExitIntent from "@/components/funnel/ExitIntent";

export const viewport: Viewport = {
  themeColor: "#14100E",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Holistic Therapy in ${site.contact.region}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Integrative psychotherapy for young adults and adults. Addiction and recovery, complex trauma, anxiety and depression, attachment and relationships — with Kerry Garrity, LCSW-C. In Annapolis and by telehealth across Maryland.",
  keywords: [
    "therapist Annapolis MD",
    "LCSW-C Maryland",
    "addiction therapy Maryland",
    "complex trauma therapist",
    "CPTSD therapy",
    "holistic therapy Maryland",
    "psychedelic integration therapist Maryland",
    "codependency therapy",
    "anxiety therapist Annapolis",
  ],
  authors: [{ name: site.clinician.fullTitle }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.slogan}`,
    description:
      "Integrative psychotherapy for young adults and adults in Maryland. Addiction, complex trauma, anxiety, attachment, and meaning — with Kerry Garrity, LCSW-C.",
    images: [{ url: "/media/hero.webp", width: 1600, height: 900, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.slogan}`,
    description: "Integrative psychotherapy for young adults and adults in Maryland.",
    images: ["/media/hero.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "ProfessionalService"],
      "@id": `${site.url}/#practice`,
      name: site.name,
      slogan: site.slogan,
      url: site.url,
      telephone: site.contact.phone,
      email: site.contact.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.addressLine1,
        addressLocality: "Annapolis",
        addressRegion: "MD",
        postalCode: "21401",
        addressCountry: "US",
      },
      areaServed: { "@type": "State", name: "Maryland" },
      medicalSpecialty: "Psychiatric",
      availableService: [
        "Individual Psychotherapy",
        "Substance Use and Addiction Treatment",
        "Anxiety and Depression Treatment",
        "Complex Trauma and PTSD Treatment",
        "Relationship Counseling",
        "Attachment and Codependency Therapy",
        "Stress and Burnout Treatment",
        "Spiritual and Religious Exploration",
        "Psychedelic Integration Support",
      ].map((n) => ({ "@type": "MedicalTherapy", name: n })),
      founder: { "@id": `${site.url}/#kerry` },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday"],
          opens: "09:00",
          closes: "15:00",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#kerry`,
      name: site.clinician.name,
      honorificSuffix: site.clinician.credentials,
      jobTitle: "Licensed Certified Social Worker–Clinical",
      worksFor: { "@id": `${site.url}/#practice` },
      url: `${site.url}/about`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('sl-theme')||'dark';document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyConsult />
        <ExitIntent />
      </body>
    </html>
  );
}
