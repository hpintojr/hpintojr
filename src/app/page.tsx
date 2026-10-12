import Link from "next/link";
import { site } from "@/config/site";
import { bioParagraphs, personJsonLd } from "@/content/person";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <div className="mx-auto max-w-4xl px-6">
        <section className="py-16 sm:py-24 grid gap-10 sm:grid-cols-[1fr_240px] items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              {site.location}
            </p>
            <h1 className="mt-3 font-serif text-5xl sm:text-6xl font-semibold tracking-tight">
              {site.name}
            </h1>
            <p className="mt-4 text-xl text-neutral-700">{site.title}</p>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-700">
              {bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
              >
                About Hamilton
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-900 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
          <aside
            aria-label="Photo placeholder"
            className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 text-center"
          >
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 text-sm font-medium">
              Photo
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              Photo placeholder. Professional headshot coming soon.
            </p>
          </aside>
        </section>

        <section aria-labelledby="ventures" className="py-8">
          <h2
            id="ventures"
            className="font-serif text-3xl font-semibold tracking-tight"
          >
            Ventures
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {site.ventures.map((v) => (
              <article
                key={v.name}
                className="rounded-lg border border-neutral-200 p-6 hover:border-neutral-400 transition-colors"
              >
                <h3 className="text-lg font-semibold">{v.name}</h3>
                <p className="mt-1 text-sm font-medium text-neutral-500">
                  {v.role}
                </p>
                <p className="mt-3 text-neutral-700">{v.blurb}</p>
                {v.url ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
                  >
                    Visit site
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="cta"
          className="my-12 rounded-lg bg-neutral-900 px-8 py-12 text-center"
        >
          <h2
            id="cta"
            className="font-serif text-3xl font-semibold tracking-tight text-white"
          >
            Work with Hamilton
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-300">
            For project work, advisory engagements, or background information,
            reach out directly.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            Contact
          </Link>
        </section>
      </div>
    </>
  );
}
