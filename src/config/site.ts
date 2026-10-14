/**
 * Central site configuration for hamiltonpinto.com.
 *
 * TODO: Add the LinkedIn profile URL once the exact profile is verified
 *       (a web search on 2026-10-12 did not surface the exact profile URL).
 */
export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
};

export type Venture = {
  name: string;
  url: string;
  role: string;
  category: string;
  image: string;
  blurb: string;
  linkLabel?: string;
  instagram?: string;
  disclosure?: string;
};

export const site = {
  name: "Hamilton Pinto Jr.",
  shortName: "Hamilton Pinto",
  url: "https://hamiltonpinto.com",
  headshot: "/hamilton-pinto-jr.jpg",
  ogImage: {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Hamilton Pinto Jr., portrait",
  },
  title: "Technology Advisor, Marketing Strategist, Creative Director",
  location: "Riverside, California",
  birthDate: "1983",
  birthDateDisplay: "1983",
  // Mercury Call Desk booking page for discovery calls. Until it is set, the
  // "Book a call" buttons fall back to the contact form.
  bookingUrl: null as string | null,
  // Articles and features. The Press section appears once this has entries.
  press: [] as PressItem[],
  ugcInstagram: "https://www.instagram.com/bpcrew.falseidols/",
  social: {
    instagram: "https://www.instagram.com/hpintojr",
    facebook: "https://www.facebook.com/hpintojr419",
    // TODO: LinkedIn URL not yet verified. Add the exact profile URL once confirmed.
    // linkedin: "",
  },
  ventures: [
    {
      name: "Benny & Penny",
      url: "https://www.bennyandpenny.com",
      role: "Founder, CEO and Developer",
      category: "Technology",
      image: "/ventures/benny-and-penny-20261013.jpg",
      blurb:
        "Technology company (formerly Pinto Design Group): software architecture, branding, design, and marketing for enterprise and regional clients.",
    },
    {
      name: "Mercury Call Desk",
      url: "https://mercurycalldesk.com",
      role: "Founder",
      category: "Communications",
      image: "/ventures/mercury-call-desk.jpg",
      blurb:
        "CRM, dialer, and AI phone assistants that answer, call, book, and follow up for local businesses, 24/7.",
    },
    {
      name: "American Colonial Capital",
      url: "https://acc.capital",
      role: "Technology Advisor",
      category: "Capital & Finance",
      image: "/ventures/american-colonial-capital.jpg",
      blurb:
        "Technology advisory bridging software architecture, go-to-market strategy, and business execution.",
    },
    {
      name: "X-Beton",
      url: "https://www.xbeton.com",
      role: "Technology Advisor",
      category: "Construction Technology",
      image: "/ventures/xbeton.jpg",
      blurb:
        "Technology advisory for a nano-graphene AAC building-systems company: commerce platform, integrations, and go-to-market systems.",
    },
    {
      name: "Advantage First Financial",
      url: "https://www.advantagefirst.com",
      role: "Marketing",
      category: "Financial Services",
      image: "/ventures/advantage-first-financial.jpg",
      blurb:
        "Marketing for a debt resolution firm, backed by lead-capture, compliance, and sales-performance systems.",
    },
    {
      name: "False Idols",
      url: "https://www.falseidols.us/discount/bpcrew",
      role: "Brand Ambassador",
      category: "Apparel & UGC",
      image: "/ventures/false-idols.jpg",
      blurb:
        "Freestyle athletics apparel. I create UGC for the brand on Instagram, and code BPCREW takes a discount off your order.",
      linkLabel: "Shop with code BPCREW",
      instagram: "https://www.instagram.com/bpcrew.falseidols/",
      disclosure:
        "I'm a False Idols brand ambassador. This link applies my discount code.",
    },
  ] as Venture[],
} as const;
