import { site } from "@/config/site";
import { personJsonLd } from "@/content/person";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  ExternalLink,
  Pill,
} from "@/components/site/ui";
import { VentureOrbit } from "@/components/site/venture-orbit";
import {
  BrandVisual,
  PhoneVisual,
  WebVisual,
} from "@/components/site/service-visuals";
import { MapPin } from "lucide-react";

const services = [
  {
    title: "Technology advisory",
    body: "Software architecture, platform choices, and go-to-market execution for growing companies, as an advisor to American Colonial Capital and X-Beton.",
    Visual: WebVisual,
  },
  {
    title: "Brand and creative direction",
    body: "Branding, design, and marketing systems through Benny & Penny, built on work for enterprise clients and Southern California businesses.",
    Visual: BrandVisual,
  },
  {
    title: "CRM and AI phone systems",
    body: "Mercury Call Desk gives local businesses a CRM and an AI phone system that answers, routes, and follows up on every call.",
    Visual: PhoneVisual,
  },
];

const clients = [
  "Johnson & Johnson",
  "Nestle",
  "Anchor Blue",
  "Bimbo Bakeries",
  "Lancome",
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,var(--color-muted),transparent)]"
        />
        <Container className="relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Pill>
              <MapPin className="size-3.5" />
              {site.location}
            </Pill>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl">
              {site.title}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Advisor to American Colonial Capital and X-Beton, Founder and
              CEO of Benny &amp; Penny, and founder of Mercury Call Desk. I
              help companies connect their technology, marketing, and brand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Work with me</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                About Hamilton
              </ButtonLink>
            </div>
          </div>
          <div className="h-80 sm:h-96">
            <VentureOrbit />
          </div>
        </Container>
      </section>

      <section aria-labelledby="services" className="py-20">
        <Container>
          <Eyebrow>What I do</Eyebrow>
          <h2
            id="services"
            className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Technology, marketing, and design under one roof.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map(({ title, body, Visual }) => (
              <Card key={title} className="overflow-hidden">
                <div className="h-52 border-b bg-muted/40">
                  <Visual />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="ventures" className="border-y bg-muted/30 py-20">
        <Container>
          <Eyebrow>Ventures and roles</Eyebrow>
          <h2
            id="ventures"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Where I work
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {site.ventures.map((v) => (
              <Card key={v.name} className="flex flex-col p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {v.name}
                  </h3>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {v.role}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {v.blurb}
                </p>
                {v.url ? (
                  <div className="mt-5">
                    <ExternalLink href={v.url}>
                      {v.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </ExternalLink>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="clients" className="py-20">
        <Container>
          <Eyebrow>Selected clients</Eyebrow>
          <h2 id="clients" className="sr-only">
            Selected clients
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="cta">
        <Container>
          <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
            <h2
              id="cta"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/70">
              For advisory engagements, project work, or background
              information, reach out directly.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-foreground px-6 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
