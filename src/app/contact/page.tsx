import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/config/site";
import { Card, Container, Eyebrow } from "@/components/site/ui";

export const metadata: Metadata = {
  title: `Contact ${site.name}`,
  description: `Contact ${site.name} for project work, advisory engagements, or background information.`,
  alternates: {
    canonical: `${site.url}/contact`,
  },
  openGraph: {
    type: "website",
    images: [site.ogImage],
    url: `${site.url}/contact`,
    siteName: site.name,
    title: `Contact ${site.name}`,
    description: `Get in touch with ${site.name}, technology advisor, marketing strategist, and creative director.`,
  },
};

export default function Contact() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Contact {site.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        For project work, advisory engagements, or background information
        related to {site.name}, reach out by email.
      </p>

      <Card className="mt-10 p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Mail className="size-5" />
          </span>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </h2>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-block text-2xl font-bold tracking-tight underline-offset-4 hover:underline sm:text-3xl"
        >
          {site.email}
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          Note: this address is a placeholder and will be confirmed before
          launch.
        </p>
      </Card>

      <section aria-labelledby="social" className="mt-12">
        <h2 id="social" className="text-2xl font-bold tracking-tight">
          Elsewhere
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
  );
}
