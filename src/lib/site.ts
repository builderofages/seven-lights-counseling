export const site = {
  name: "Seven Lights Counseling",
  shortName: "Seven Lights",
  slogan: "Illuminate the path within",
  url: "https://sevenlightscounseling.com",
  clinician: {
    name: "Kerry Garrity",
    credentials: "LCSW-C",
    fullTitle: "Kerry Garrity, LCSW-C",
    role: "Founder & Clinical Director",
    licenseNote:
      "Licensed Certified Social Worker–Clinical (LCSW-C), State of Maryland",
  },
  // ---- PLACEHOLDER CONTACT DETAILS — replace before launch ----
  contact: {
    phone: "(410) 555-0117",
    phoneHref: "tel:+14105550117",
    email: "hello@sevenlightscounseling.com",
    addressLine1: "Suite 204, 187 Main Street",
    addressLine2: "Annapolis, MD 21401",
    region: "Maryland",
    telehealthNote: "Telehealth available statewide in Maryland",
    hours: [
      { day: "Monday – Thursday", time: "9:00a – 7:00p" },
      { day: "Friday", time: "9:00a – 3:00p" },
      { day: "Saturday", time: "By arrangement" },
    ],
  },
  crisis: {
    line: "988",
    label: "988 Suicide & Crisis Lifeline",
    href: "tel:988",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "The Seven Lights", href: "/approach" },
    { label: "About Kerry", href: "/about" },
    { label: "Rates & Insurance", href: "/rates" },
    { label: "Questions", href: "/faq" },
  ],
  footerNav: [
    {
      title: "Care",
      links: [
        { label: "All services", href: "/services" },
        { label: "Individual therapy", href: "/services/individual-therapy" },
        { label: "Substance use & recovery", href: "/services/substance-use-recovery" },
        { label: "Complex trauma & PTSD", href: "/services/complex-trauma-ptsd" },
        { label: "Psychedelic integration", href: "/services/psychedelic-integration" },
      ],
    },
    {
      title: "Practice",
      links: [
        { label: "The Seven Lights method", href: "/approach" },
        { label: "About Kerry Garrity", href: "/about" },
        { label: "Rates & insurance", href: "/rates" },
        { label: "Common questions", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy & HIPAA notice", href: "/privacy" },
        { label: "Good Faith Estimate", href: "/good-faith-estimate" },
        { label: "Accessibility", href: "/privacy#accessibility" },
      ],
    },
  ],
  cta: {
    primary: { label: "Book a free consultation", href: "/begin" },
    secondary: { label: "Find your starting point", href: "/begin?mode=match" },
  },
} as const;

export type Site = typeof site;
