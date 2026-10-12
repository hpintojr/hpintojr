import { site } from "@/config/site";

/** Canonical bio. Used verbatim across the site and in structured data. */
export const bio =
  "Hamilton Pinto Jr. is a Southern California-based technology advisor, marketing strategist, and creative director. He serves as a technology advisor to American Colonial Capital and X-Beton, and operates Pinto Design Group & HDG Technical Services, delivering marketing, branding, and technical solutions to enterprise clients including Johnson & Johnson, Nestle, Anchor Blue, Bimbo Bakeries, and Lancome, alongside Southern California local businesses. He is the founder of Mercury Call Desk, an AI phone assistant platform, and President, CEO, and Developer of Benny & Penny, a technology and creative studio.";

export const education =
  "Westwood College, Bachelor of Arts in Visual Communications; UC Berkeley Haas School of Business, Undergraduate Certificate in Cryptography and Blockchain Technologies; executive leadership programs, Chicago Booth.";

export const bioParagraphs = [
  "Hamilton Pinto Jr. is a Southern California-based technology advisor, marketing strategist, and creative director.",
  "He serves as a technology advisor to American Colonial Capital and X-Beton, and operates Pinto Design Group & HDG Technical Services, delivering marketing, branding, and technical solutions to enterprise clients including Johnson & Johnson, Nestle, Anchor Blue, Bimbo Bakeries, and Lancome, alongside Southern California local businesses.",
  "He is the founder of Mercury Call Desk, an AI phone assistant platform, and President, CEO, and Developer of Benny & Penny, a technology and creative studio.",
];

/**
 * Schema.org Person entity for the Google Knowledge Graph.
 * sameAs contains ONLY verified URLs. LinkedIn is intentionally omitted
 * until the exact profile URL is confirmed (see site.ts TODO).
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: ["Hamilton Pinto", "hpintojr"],
    url: site.url,
    birthDate: site.birthDate,
    jobTitle: site.title,
    description: bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riverside",
      addressRegion: "CA",
      addressCountry: "US",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Westwood College" },
      {
        "@type": "CollegeOrUniversity",
        name: "UC Berkeley Haas School of Business",
      },
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "American Colonial Capital",
        url: "https://acc.capital",
      },
      {
        "@type": "Organization",
        name: "X-Beton",
        url: "https://www.xbeton.com",
      },
      {
        "@type": "Organization",
        name: "Pinto Design Group & HDG Technical Services",
      },
      {
        "@type": "Organization",
        name: "Mercury Call Desk",
        url: "https://mercurycalldesk.com",
      },
      {
        "@type": "Organization",
        name: "Benny & Penny",
        url: "https://www.bennyandpenny.com",
      },
    ],
    knowsAbout: [
      "Technology advisory",
      "Marketing strategy",
      "Creative direction",
      "Brand development",
      "Software architecture",
      "AI phone systems",
      "CRM automation",
      "GoHighLevel",
    ],
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      "https://www.bennyandpenny.com",
      "https://mercurycalldesk.com",
    ],
  };
}
