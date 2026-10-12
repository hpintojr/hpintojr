import type { Metadata } from "next";
import Link from "next/link";
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
  openGraph: {
    type: "website",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <header className="border-b border-neutral-200">
          <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight"
            >
              {site.name}
            </Link>
            <nav aria-label="Primary">
              <ul className="flex gap-6 text-sm font-medium">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; 2026 {site.name}. {site.location}.
            </p>
            <nav aria-label="Footer">
              <ul className="flex gap-6 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
