# Hamilton Pinto Jr. website

Next.js and Tailwind consultant site with signature branding and the existing licensed CodedVisuals components.

## Development and checks

Run `npm ci`, then `npm run dev`. Before release, run `npm test`, `npm run lint`, and `npm run build`.

## MCD / Sulus CRM intake

The Contact, Consulting, and UGC forms share the server action in `src/app/actions/lead.ts`. Configure `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_SECRET` as private Vercel environment variables for production and preview. For local use, put them in the gitignored `.env.local`; never commit their values.

Use the Mercury Call Desk location on crm.sulus.ai and its published **Website Contact Form -> New Lead** workflow. It creates or updates the contact by email/phone, creates a New Lead opportunity in the Mercury Call Desk Sales Pipeline, and saves the inquiry as a contact note. The server signs the exact JSON body using HMAC-SHA256 in `X-Webhook-Signature`.

The payload includes first/last name, email, optional phone/company, inquiry topic, full message, source page, timestamp, `tags`, and the workflow-compatible `tagsCsv`. Sources distinguish `hamiltonpinto.com/contact`, `/consulting`, and `/ugc`. No SMS consent or AI callback is implied by a form submission.

Missing CRM configuration, webhook rejection, or a timeout shows an error instead of reporting successful delivery. `LEADS_WEBHOOK_URL` remains a compatibility option for a legacy unsigned intake. A CRM acknowledgement confirms intake acceptance; use the CRM execution log to verify contact, opportunity, and note creation.
