import type { Metadata } from "next";
import {
  CalendarCheck,
  Compass,
  Megaphone,
  Palette,
  PhoneCall,
  Rocket,
  Search,
} from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink, Card, Container, Eyebrow } from "@/components/site/ui";
import { ContactForm } from "@/components/site/contact-form";

const title = `Consulting with ${site.name}`;
const description =
  "Technology, marketing, and brand consulting for growing companies: software and platform decisions, go-to-market, creative direction, and CRM and AI phone systems.";

export const metadata: Metadata = {
  title: "Consulting",
  description,
  alternates: { canonical: `${site.url}/consulting` },
  openGraph: {
    type: "website",
    images: [site.ogImage],
    url: `${site.url}/consulting`,
    siteName: site.name,
    title,
    description,
  },
};

const services = [
  {
    Icon: Compass,
    title: "Technology advisory",
    body: "Platform and software architecture decisions, vendor selection, and a build plan your team can execute.",
  },
  {
    Icon: Megaphone,
    title: "Marketing and growth",
    body: "Go-to-market strategy, lead capture, and campaigns tied to the numbers that matter for your business.",
  },
  {
    Icon: Palette,
    title: "Brand and creative direction",
    body: "Positioning, identity, and creative systems that keep your website, content, and sales material consistent.",
  },
  {
    Icon: PhoneCall,
    title: "CRM and AI phone systems",
    body: "Pipelines, automations, and AI assistants that answer, book, and follow up, built on Mercury Call Desk.",
  },
];

const steps = [
  {
    Icon: CalendarCheck,
    title: "Discovery call",
    body: "A short call about where you are, where you want to be, and what is in the way.",
  },
  {
    Icon: Search,
    title: "Proposal",
    body: "A clear scope, timeline, and fee, as an advisory retainer or a defined project.",
  },
  {
    Icon: Rocket,
    title: "Build and advise",
    body: "Hands-on work with your team, with regular check-ins and measurable milestones.",
  },
];

const bookHref = site.bookingUrl ?? "#consulting-form";

export default function Consulting() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: title,
    url: `${site.url}/consulting`,
    description,
    areaServed: "US",
    provider: { "@id": `${site.url}/#person` },
    serviceType: services.map((s) => s.title),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b">
        <Container className="py-16 sm:py-24">
          <Eyebrow>Consulting</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Technology, marketing, and brand, working as one plan.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I help founders and growing companies make the technology
            decisions, marketing moves, and brand choices that move the
            business forward, drawing on work for enterprise clients and
            Southern California businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={bookHref}>Book a call</ButtonLink>
            <ButtonLink href="/about" variant="outline">
              About Hamilton
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="services" className="py-20">
        <Container>
          <h2 id="services" className="text-3xl font-bold tracking-tight">
            How I can help
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map(({ Icon, title, body }) => (
              <Card key={title} className="p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="process" className="border-y bg-muted/30 py-20">
        <Container>
          <h2 id="process" className="text-3xl font-bold tracking-tight">
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(({ Icon, title, body }, i) => (
              <li key={title}>
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="consulting-form"
        aria-labelledby="start"
        className="scroll-mt-20 py-20"
      >
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="start" className="text-3xl font-bold tracking-tight">
              Start a conversation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell me a little about your company and what you need. I&apos;ll
              reply with next steps and times for a discovery call.
            </p>
          </div>
          <ContactForm page="consulting" defaultTopic="Consulting" />
        </Container>
      </section>
    </>
  );
}
