import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Business card pages are static HTML in public/card (no site header).
  async rewrites() {
    return [
      { source: "/card", destination: "/card/index.html" },
      { source: "/card/:page(join|book|saved)", destination: "/card/:page/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/hamilton.vcf",
        headers: [
          { key: "Content-Type", value: "text/vcard; charset=utf-8" },
          { key: "Content-Disposition", value: 'inline; filename="Hamilton-Pinto-Jr.vcf"' },
          { key: "Cache-Control", value: "public, max-age=300" },
        ],
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
