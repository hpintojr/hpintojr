import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { personJsonLd } from "@/content/person";
import { ButtonLink, Card, Container, Eyebrow } from "@/components/site/ui";
import { VentureCard } from "@/components/site/venture-card";
import { PressSection } from "@/components/site/press-section";
import { BrandVisual, PhoneVisual, WebVisual } from "@/components/site/service-visuals";
import headshot from "../../public/hamilton-pinto-jr.jpg";

const services = [
  { number: "01", title: "Technology advisory", body: "Make confident platform and software decisions. Connect architecture, integrations, and execution to the way your business works.", detail: "Architecture · Platforms · Go-to-market", Visual: WebVisual },
  { number: "02", title: "Brand & creative direction", body: "Give your business a clear identity and a consistent voice, from positioning and design to the marketing systems behind them.", detail: "Positioning · Identity · Marketing", Visual: BrandVisual },
  { number: "03", title: "CRM & AI phone systems", body: "Connect the customer journey with systems that answer, route, book, and follow up, built through Mercury Call Desk.", detail: "CRM · Automation · AI assistants", Visual: PhoneVisual },
];
const clients = ["Johnson & Johnson", "Nestle", "Anchor Blue", "Bimbo Bakeries", "Lancome"];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      <section className="home-hero" aria-labelledby="hero-title">
        <Container>
          <div className="hero-topline">
            <span>Independent perspective. Hands-on execution.</span>
            <span className="hero-location"><MapPin size={13} aria-hidden="true" /> {site.location}</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow>Hamilton Pinto Jr. / Consultant</Eyebrow>
              <h1 id="hero-title">Clarity for your <em>next move.</em></h1>
              <p className="hero-description">I help companies connect their technology, marketing, and brand. A clear direction. The right systems. A business ready to move forward.</p>
              <div className="hero-actions">
                <ButtonLink href="/consulting">Explore consulting</ButtonLink>
                <Link href="/about" className="text-link">Meet Hamilton <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
              <p className="hero-disciplines">Technology advisor <span aria-hidden="true">/</span> Marketing strategist <span aria-hidden="true">/</span> Creative director</p>
            </div>
            <figure className="hero-portrait">
              <div className="portrait-frame">
                <Image src={headshot} alt={`${site.name}, portrait`} priority placeholder="blur" sizes="(min-width: 1024px) 440px, (min-width: 640px) 480px, 100vw" className="portrait-image" />
              </div>
              <figcaption><span>Hamilton Pinto Jr.</span><span>Strategy meets execution.</span></figcaption>
            </figure>
          </div>
        </Container>
      </section>
      <section aria-labelledby="clients" className="client-section">
        <Container>
          <div className="client-inner">
            <h2 id="clients" className="client-label">Selected client experience<br /><span>through Benny &amp; Penny</span></h2>
            <ul className="client-list">{clients.map((client) => <li key={client}>{client}</li>)}</ul>
          </div>
        </Container>
      </section>
      <section aria-labelledby="services" className="section-space">
        <Container>
          <div className="section-heading">
            <div><Eyebrow>How I can help</Eyebrow><h2 id="services">A connected approach<br />to your business.</h2></div>
            <p>From the decisions that shape your company to the systems that keep it moving, I bring technology, marketing, and creative direction together.</p>
          </div>
          <div className="service-grid">
            {services.map(({ number, title, body, detail, Visual }) => (
              <Card key={number} className="service-card">
                <div className="service-visual" aria-hidden="true"><Visual /></div>
                <div className="service-content">
                  <span className="service-number">/ {number}</span>
                  <h3>{title}</h3><p>{body}</p>
                  <div className="service-detail">{detail}</div>
                  <Link href="/consulting" className="service-link" aria-label={`Explore ${title.toLowerCase()}`}>Explore service <ArrowUpRight size={17} aria-hidden="true" /></Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section aria-labelledby="ventures" className="venture-section section-space">
        <Container>
          <div className="section-heading">
            <div><Eyebrow>Ventures &amp; collaborations</Eyebrow><h2 id="ventures">Built on real work.</h2></div>
            <p>Companies I lead, advise, market, and create for. Different industries, connected by technology, marketing, and brand.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{site.ventures.map((venture) => <VentureCard key={venture.name} venture={venture} />)}</div>
        </Container>
      </section>
      <PressSection className="pt-20" />
      <section aria-labelledby="cta" className="section-space">
        <Container>
          <div className="contact-banner">
            <div><p className="contact-eyebrow">Let&apos;s work together</p><h2 id="cta">What&apos;s your<br /><em>next move?</em></h2></div>
            <div className="contact-banner-copy"><p>For advisory engagements, project work, or a fresh perspective on your business, start a conversation.</p><ButtonLink href="/contact" variant="outline">Get in touch</ButtonLink></div>
          </div>
        </Container>
      </section>
    </>
  );
}
