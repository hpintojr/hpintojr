import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Monogram } from "@/components/site/ui";
import { SiteNav } from "@/components/site/site-nav";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Hamilton Pinto Jr. is a Southern California-based technology advisor, marketing strategist, and creative director serving American Colonial Capital and X-Beton, Founder and CEO of Benny & Penny, and founder of Mercury Call Desk.",
  alternates: {
    canonical: site.url,
  },
  twitter: {
    card: "summary_large_image",
    images: [site.ogImage.url],
  },
  openGraph: {
    type: "website",
    images: [site.ogImage],
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description:
      "Technology advisor, marketing strategist, and creative director based in Riverside, California.",
  },
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/consulting", label: "Consulting" },
  { href: "/ugc", label: "UGC" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <header className="site-header sticky top-0 z-50 border-b">
          <Container className="header-inner flex items-center justify-between gap-4">
            <Link
              href="/"
              className="signature-link"
              aria-label={`${site.name} — home`}
            >
              <Image src="/hamilton-signature-black.svg" alt={`${site.name}, Consultant`} width={1793} height={625} priority className="signature-logo" />
            </Link>
            <SiteNav />
          </Container>
        </header>
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <footer className="site-footer mt-24 border-t">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Monogram className="size-7 text-xs" />
              <p className="text-sm text-muted-foreground">
                &copy; 2026 {site.name}. {site.location}.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </footer>
      </body>
    </html>
  );
}
