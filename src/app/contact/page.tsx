import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact ${site.name}`,
  description: `Contact ${site.name} for project work, advisory engagements, or background information.`,
  alternates: {
    canonical: `${site.url}/contact`,
  },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    siteName: site.name,
    title: `Contact ${site.name}`,
    description: `Get in touch with ${site.name}, technology advisor, marketing strategist, and creative director.`,
  },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
        Contact
      </p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
        Contact {site.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
        For project work, advisory engagements, or background information
        related to {site.name}, reach out by email.
      </p>

      <div className="mt-10 rounded-lg border border-neutral-200 p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Email
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-2 inline-block font-serif text-2xl font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
        >
          {site.email}
        </a>
        <p className="mt-2 text-sm text-neutral-500">
          Note: this address is a placeholder and will be confirmed before
          launch.
        </p>
      </div>

      <section aria-labelledby="social" className="mt-10">
        <h2
          id="social"
          className="font-serif text-2xl font-semibold tracking-tight"
        >
          Elsewhere
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
  );
}
