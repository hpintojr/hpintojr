import type { Metadata } from "next";
import { site } from "@/config/site";
import { bioParagraphs, education, personJsonLd } from "@/content/person";
import { Card, Container, Eyebrow, ExternalLink } from "@/components/site/ui";

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
      <Container className="max-w-4xl py-16 sm:py-24">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          About {site.name}
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          {bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-foreground" : undefined}>
              {p}
            </p>
          ))}
        </div>

        <section aria-labelledby="facts" className="mt-16">
          <h2 id="facts" className="text-2xl font-bold tracking-tight">
            Facts
          </h2>
          <Card className="mt-6">
            <dl className="divide-y">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[150px_1fr] sm:gap-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>

        <section aria-labelledby="ventures" className="mt-16">
          <h2 id="ventures" className="text-2xl font-bold tracking-tight">
            Ventures
          </h2>
          <div className="mt-6 grid gap-4">
            {site.ventures.map((v) => (
              <Card key={v.name} className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {v.name}
                  </h3>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {v.role}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.blurb}
                </p>
                {v.url ? (
                  <div className="mt-4">
                    <ExternalLink href={v.url}>
                      {v.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </ExternalLink>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="connect" className="mt-16">
          <h2 id="connect" className="text-2xl font-bold tracking-tight">
            Connect
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[
              { href: site.social.instagram, label: "Instagram" },
              { href: site.social.facebook, label: "Facebook" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex h-10 items-center rounded-lg border bg-card px-4 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
