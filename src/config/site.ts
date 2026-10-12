/**
 * Central site configuration for hamiltonpinto.com.
 *
 * TODO: REPLACE `email` with Hamilton's real address once confirmed.
 * TODO: Add the LinkedIn profile URL once the exact profile is verified
 *       (a web search on 2026-10-12 did not surface the exact profile URL).
 */
export const site = {
  name: "Hamilton Pinto Jr.",
  shortName: "Hamilton Pinto",
  url: "https://hamiltonpinto.com",
  title: "Technology Advisor, Marketing Strategist, Creative Director",
  location: "Riverside, California",
  birthDate: "1983-08-04",
  birthDateDisplay: "August 4, 1983",
  // TODO: REPLACE with real address. Placeholder only, do not publish as final.
  email: "hello@hamiltonpinto.com",
  social: {
    instagram: "https://www.instagram.com/hpintojr",
    facebook: "https://www.facebook.com/hpintojr419",
    // TODO: LinkedIn URL not yet verified. Add the exact profile URL once confirmed.
    // linkedin: "",
  },
  ventures: [
    {
      name: "American Colonial Capital",
      url: "https://acc.capital",
      role: "Technology Advisor",
      blurb:
        "Technology advisory bridging software architecture, go-to-market strategy, and business execution.",
    },
    {
      name: "X-Beton",
      url: "https://www.xbeton.com",
      role: "Technology Advisor",
      blurb: "Technology advisory for the X-Beton platform and operations.",
    },
    {
      name: "Benny & Penny",
      url: "https://www.bennyandpenny.com",
      role: "Founder, CEO and Developer",
      blurb:
        "Technology company (formerly Pinto Design Group): software architecture, branding, design, and marketing for enterprise and regional clients.",
    },
    {
      name: "Mercury Call Desk",
      url: "https://mercurycalldesk.com",
      role: "Founder",
      blurb: "CRM and AI phone system for local businesses.",
    },
  ],
} as const;
