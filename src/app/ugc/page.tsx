import type { Metadata } from "next";
import {
  Camera,
  Clapperboard,
  Dumbbell,
  MessageSquareQuote,
  MonitorSmartphone,
  PackageOpen,
} from "lucide-react";
import { site } from "@/config/site";
import { ButtonLink, Card, Container, Eyebrow } from "@/components/site/ui";
import { ContactForm } from "@/components/site/contact-form";
import { VentureCard } from "@/components/site/venture-card";

const title = `UGC and brand partnerships with ${site.name}`;
const description =
  "User-generated content for apparel, fitness, lifestyle, and tech brands: product demos, unboxings, reviews, and short-form video from Hamilton Pinto Jr.";

export const metadata: Metadata = {
  title: "UGC and Brand Partnerships",
  description,
  alternates: { canonical: `${site.url}/ugc` },
  openGraph: {
    type: "website",
    images: [site.ogImage],
    url: `${site.url}/ugc`,
    siteName: site.name,
    title,
    description,
  },
};

const formats = [
  {
    Icon: Clapperboard,
    title: "Short-form video",
    body: "Reels and TikTok-style clips with a hook in the first seconds, built for paid and organic.",
  },
  {
    Icon: PackageOpen,
    title: "Unboxing and first look",
    body: "Honest first impressions that show fit, feel, and quality the way a customer would.",
  },
  {
    Icon: Dumbbell,
    title: "Lifestyle and fitness",
    body: "Your product in real use: training, everyday wear, and on the go.",
  },
  {
    Icon: MessageSquareQuote,
    title: "Reviews and testimonials",
    body: "Talking-head reviews that answer the questions buyers actually ask.",
  },
  {
    Icon: MonitorSmartphone,
    title: "Tech and software walkthroughs",
    body: "Clear screen-recorded demos for apps, CRMs, and SaaS, from someone who builds them.",
  },
  {
    Icon: Camera,
    title: "Product photos",
    body: "Clean product and lifestyle stills for your store, ads, and social.",
  },
];

const ambassadorships = site.ventures.filter((v) => v.disclosure);

export default function Ugc() {
  return (
    <>
      <section className="border-b">
        <Container className="py-16 sm:py-24">
          <Eyebrow>UGC and brand partnerships</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Content that sounds like a customer, made by a marketer.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I create user-generated content for apparel, fitness, lifestyle,
            and tech brands. You get the authenticity of a real customer
            with the strategy of someone who has run marketing for
            enterprise brands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#ugc-form">Work with me</ButtonLink>
            <a
              href={site.ugcInstagram}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex h-11 items-center gap-2 rounded-lg border bg-card px-5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              See my content on Instagram
            </a>
          </div>
        </Container>
      </section>

      <section aria-labelledby="formats" className="py-20">
        <Container>
          <h2 id="formats" className="text-3xl font-bold tracking-tight">
            What I create
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map(({ Icon, title, body }) => (
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

      {ambassadorships.length ? (
        <section
          aria-labelledby="brands"
          className="border-y bg-muted/30 py-20"
        >
          <Container>
            <h2 id="brands" className="text-3xl font-bold tracking-tight">
              Brands I represent
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ambassadorships.map((v) => (
                <VentureCard key={v.name} venture={v} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section id="ugc-form" aria-labelledby="pitch" className="scroll-mt-20 py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="pitch" className="text-3xl font-bold tracking-tight">
              Pitch me your product
            </h2>
            <p className="mt-4 text-muted-foreground">
              Share your brand, the product, and what you need (number of
              videos, platforms, timeline). I&apos;ll reply with ideas and
              rates.
            </p>
          </div>
          <ContactForm
            page="ugc"
            defaultTopic="UGC / brand partnership"
            companyLabel="Brand"
            messagePlaceholder="Product, deliverables, platforms, and timeline."
          />
        </Container>
      </section>
    </>
  );
}
