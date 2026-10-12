import type { Metadata } from "next";
import { site } from "@/config/site";
import { bioParagraphs, education, personJsonLd } from "@/content/person";

export const metadata: Metadata = {
  title: `About ${site.name}`,
  description: `About ${site.name}: technology advisor to American Colonial Capital and X-Beton, Founder and CEO of Benny & Penny, founder of Mercury Call Desk.`,
  alternates: {
    canonical: `${site.url}/about`,
  },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    siteName: site.name,
    title: `About ${site.name}`,
    description: `Technology advisor, marketing strategist, and creative director based in ${site.location}.`,
  },
};

const facts = [
  { label: "Full name", value: site.name },
  { label: "Title", value: site.title },
  { label: "Location", value: site.location },
  { label: "Born", value: site.birthDateDisplay },
  { label: "Education", value: education },
  {
    label: "Roles",
    value:
      "Technology Advisor, American Colonial Capital; Technology Advisor, X-Beton; Founder, CEO and Developer, Benny & Penny (formerly Pinto Design Group); Founder, Mercury Call Desk",
  },
];

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          About
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
          About {site.name}
        </h1>

        <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-700">
          {bioParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <section aria-labelledby="facts" className="mt-12">
          <h2
            id="facts"
            className="font-serif text-2xl font-semibold tracking-tight"
          >
            Facts
          </h2>
          <dl className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 px-6 py-4 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {f.label}
                </dt>
                <dd className="text-neutral-800">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="ventures" className="mt-12">
          <h2
            id="ventures"
            className="font-serif text-2xl font-semibold tracking-tight"
          >
            Ventures
          </h2>
          <ul className="mt-6 space-y-4">
            {site.ventures.map((v) => (
              <li
                key={v.name}
                className="rounded-lg border border-neutral-200 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{v.name}</h3>
                  <span className="text-sm font-medium text-neutral-500">
                    {v.role}
                  </span>
                </div>
                <p className="mt-2 text-neutral-700">{v.blurb}</p>
                {v.url ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
                  >
                    {v.url.replace("https://", "").replace("http://", "")}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="connect" className="mt-12">
          <h2
            id="connect"
            className="font-serif text-2xl font-semibold tracking-tight"
          >
            Connect
          </h2>
          <ul className="mt-6 flex flex-wrap gap-4">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer me"
                className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:border-neutral-900 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer me"
                className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:border-neutral-900 transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
