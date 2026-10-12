import type { Metadata } from "next";
import Link from "next/link";
import { Container, Monogram } from "@/components/site/ui";
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
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
          <Container className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold tracking-tight"
            >
              <Monogram />
              <span className="hidden sm:inline">{site.name}</span>
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-1">
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-1 hidden h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 sm:inline-flex"
              >
                Work with me
              </Link>
            </nav>
          </Container>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24 border-t">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Monogram className="size-7 text-xs" />
              <p className="text-sm text-muted-foreground">
                &copy; 2026 {site.name}. {site.location}.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="flex gap-5 text-sm">
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
