import { site } from "@/config/site";

/** Canonical bio. Used verbatim across the site and in structured data. */
export const bio =
  "Hamilton Pinto Jr. is a Southern California-based technology advisor, marketing strategist, and creative director. He serves as a technology advisor to American Colonial Capital and X-Beton, and is Founder, CEO and Developer of Benny & Penny, a technology company (formerly Pinto Design Group) that has delivered marketing, branding, and technical solutions to enterprise clients including Johnson & Johnson, Nestle, Anchor Blue, Bimbo Bakeries, and Lancome, alongside Southern California local businesses. He is also the founder of Mercury Call Desk, a CRM and AI phone system for local businesses.";

export const education =
  "Westwood College, Bachelor of Arts in Visual Communications; UC Berkeley Haas School of Business, Undergraduate Certificate in Cryptography and Blockchain Technologies; executive leadership programs, Chicago Booth.";

export const bioParagraphs = [
  "Hamilton Pinto Jr. is a Southern California-based technology advisor, marketing strategist, and creative director.",
  "He serves as a technology advisor to American Colonial Capital and X-Beton, and is Founder, CEO and Developer of Benny & Penny, a technology company (formerly Pinto Design Group) that has delivered marketing, branding, and technical solutions to enterprise clients including Johnson & Johnson, Nestle, Anchor Blue, Bimbo Bakeries, and Lancome, alongside Southern California local businesses.",
  "He is also the founder of Mercury Call Desk, a CRM and AI phone system for local businesses.",
];

/**
 * Schema.org Person entity for the Google Knowledge Graph.
 * sameAs contains only verified or owner-confirmed URLs.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: ["Hamilton Pinto", "hpintojr"],
    url: site.url,
    image: `${site.url}${site.headshot}`,
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
        name: "Mercury Call Desk",
        url: "https://mercurycalldesk.com",
        sameAs: ["https://www.crunchbase.com/organization/mercury-call-desk"],
      },
      {
        "@type": "Organization",
        name: "Benny & Penny",
        alternateName: "Pinto Design Group",
        url: "https://www.bennyandpenny.com",
        sameAs: ["https://www.crunchbase.com/organization/benny-penny"],
      },
      {
        "@type": "Organization",
        name: "Advantage First Financial",
        url: "https://www.advantagefirst.com",
      },
    ],
    knowsAbout: [
      "Technology advisory",
      "Marketing strategy",
      "Creative direction",
      "Brand development",
      "Software architecture",
      "AI phone systems",
      "CRM systems",
      "CRM automation",
      "GoHighLevel",
    ],
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.linkedin,
      site.social.x,
      "https://www.crunchbase.com/person/hamilton-pinto-jr",
      "https://www.bennyandpenny.com",
      "https://mercurycalldesk.com",
    ],
  };
}
