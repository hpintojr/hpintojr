import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container, Eyebrow } from "@/components/site/ui";
import { ContactForm } from "@/components/site/contact-form";
import { SocialIcon, socialLinks } from "@/components/site/social-icons";

export const metadata: Metadata = {
  title: `Contact ${site.name}`,
  description: `Contact ${site.name} for consulting, UGC and brand partnerships, press, or project work.`,
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
    <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Consulting, UGC and brand partnerships, press, or a project you
          want a second opinion on. Send a note and I&apos;ll get back to you
          directly.
        </p>
        <section aria-labelledby="social" className="mt-10">
          <h2
            id="social"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Elsewhere
          </h2>
          <ul className="mt-4 flex flex-wrap items-center gap-3">
            {socialLinks().map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={l.label}
                  title={l.label}
                  className="inline-flex size-12 items-center justify-center rounded-xl border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  <SocialIcon label={l.label} className="size-6" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ContactForm page="contact" />
    </Container>
  );
}
