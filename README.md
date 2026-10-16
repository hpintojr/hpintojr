# Hamilton Pinto Jr. website

Next.js and Tailwind consultant site with signature branding and the existing licensed CodedVisuals components.

## Development and checks

Run `npm ci`, then `npm run dev`. Before release, run `npm test`, `npm run lint`, and `npm run build`.

## Search and AI discovery

The canonical production domain is `https://hamiltonpinto.com`.

- `src/app/sitemap.xml` is served by Next.js at `https://hamiltonpinto.com/sitemap.xml` and lists all five public pages. Update it whenever a public page is added, removed, or renamed. Only add `lastmod` when the actual significant content-change date is known; do not use deployment or request timestamps.
- `src/app/robots.ts` serves `/robots.txt`, allows all search and AI crawlers through the wildcard rule, and advertises the sitemap.
- The root metadata explicitly allows indexing and following links. Each page has a canonical URL.
- `public/llms.txt` serves an optional plain-text page directory for AI tools. Support varies; it is not a universal AI registration mechanism or a replacement for the sitemap.

After deployment, confirm the sitemap and robots URLs return HTTP 200, then:

1. Add and verify `hamiltonpinto.com` in [Google Search Console](https://search.google.com/search-console). In **Sitemaps**, submit `https://hamiltonpinto.com/sitemap.xml`. Use **URL inspection** to request indexing of the homepage and important pages.
2. Add and verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/), or import the verified site from Google Search Console. In **Sitemaps**, submit the same sitemap URL.
3. Monitor the indexing reports for crawl errors. If a CDN or firewall is introduced, ensure it permits legitimate crawlers without authentication or browser challenges.

Account verification and submission are owner actions and are not performed by this repository. Crawl permission and sitemap submission do not guarantee indexing or inclusion in an AI answer.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Bing sitemap guidance](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed), and [Next.js sitemap conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

## MCD / Sulus CRM intake

The Contact, Consulting, and UGC forms share the server action in `src/app/actions/lead.ts`. Configure `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_SECRET` as private Vercel environment variables for production and preview. For local use, put them in the gitignored `.env.local`; never commit their values.

Use the Mercury Call Desk location on crm.sulus.ai and its published **Website Contact Form -> New Lead** workflow. It creates or updates the contact by email/phone, creates a New Lead opportunity in the Mercury Call Desk Sales Pipeline, and saves the inquiry as a contact note. The server signs the exact JSON body using HMAC-SHA256 in `X-Webhook-Signature`.

The payload includes first/last name, email, optional phone/company, inquiry topic, full message, source page, timestamp, `tags`, and the workflow-compatible `tagsCsv`. Sources distinguish `hamiltonpinto.com/contact`, `/consulting`, and `/ugc`. No SMS consent or AI callback is implied by a form submission.

Missing CRM configuration, webhook rejection, or a timeout shows an error instead of reporting successful delivery. `LEADS_WEBHOOK_URL` remains a compatibility option for a legacy unsigned intake. A CRM acknowledgement confirms intake acceptance; use the CRM execution log to verify contact, opportunity, and note creation.

## Business card QR pages (/card)

Static HTML in `public/card`, served through rewrites in `next.config.ts` (no site header or nav, `noindex`).

- `/card`: swipeable carousel of three QR codes (`public/card/qr-join|book|saved.png/.svg`). `/card#book` and `/card#contact` open on the second and third code.
- `/card/join`: name, phone, email (required) and address (optional). Posts to the Mercury Call Desk **Hamilton Business Card** form (`z17cy2zekkdt2fxwz1a8e1cd618gc38z`); the **Hamilton Card: Form to Lead** workflow tags `hamilton-card`, creates a New Lead opportunity and alerts Hamilton. Then redirects to `/card/saved?joined=1`.
- `/card/book`: embeds the MCD **Strategy Session** calendar (`https://crm.sulus.ai/b/strategy-session`, 60 minutes, Mon to Fri 9 to 5 PT, Google Meet). The **Hamilton Card: Strategy Session Booked** workflow tags `strategy-session` and creates a Demo Booked opportunity.
- `/card/saved`: phone, email, socials, False Idols (code BPCREW) and `public/hamilton.vcf` (with photo).

If a URL changes, regenerate the matching QR code with the same path so printed cards keep working.
