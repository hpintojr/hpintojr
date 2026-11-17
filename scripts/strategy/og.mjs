// Renders a 1200x630 share image (og:image) for a Strategy Session from og-template.html.
// Usage: npm run strategy:og -- 2026-11-30   (defaults to the "upcoming" session)
// Writes public/strategy/og-<slug>.jpg and sets that session's ogImage in sessions.json.
// Then run `npm run strategy` to rebuild the pages. Needs Playwright with Chromium installed
// (npx playwright install chromium) and, for JPEG output, sharp (optional; falls back to PNG).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const dataPath = join(here, 'sessions.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const slug = process.argv[2] || data.sessions.find((s) => s.status === 'upcoming')?.slug;
const s = data.sessions.find((x) => x.slug === slug);
if (!s) throw new Error(`No session ${slug} in sessions.json`);

const d = new Date(`${s.slug}T12:00:00-08:00`);
const f = (o) => d.toLocaleDateString('en-US', { ...o, timeZone: 'America/Los_Angeles' });
const n = [...data.sessions].sort((a, b) => a.slug.localeCompare(b.slug)).findIndex((x) => x.slug === s.slug) + 1;
const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const vars = {
  SIG: pathToFileURL(join(root, 'public/email/hamilton-signature-white.png')).href,
  MON: f({ month: 'short' }).toUpperCase(), DAY: f({ day: 'numeric' }), WD: f({ weekday: 'short' }).toUpperCase(),
  EYEBROW: `Strategy Session #${n} · Fall 2026 cohort`,
  HEADLINE_A: s.headlineA, HEADLINE_B: s.headlineB,
  TIME_PT: s.timeLabel.replace(' to ', '–'), TIME_ET: s.etLabel.replace(' to ', '–'),
  HOUR1: s.ogHour1 || s.hourOne.title, HOUR2: s.ogHour2 || s.hourTwo.title,
};
let html = readFileSync(join(here, 'og-template.html'), 'utf8');
for (const [k, v] of Object.entries(vars)) html = html.replaceAll(`{{${k}}}`, k === 'SIG' ? v : esc(v));
const tmp = join(here, '.og-render.html');
writeFileSync(tmp, html);

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(tmp).href);
await page.waitForTimeout(300);
const png = await page.screenshot();
await browser.close();

let file = `og-${s.slug}.png`, out = png;
try {
  const sharp = (await import('sharp')).default;
  out = await sharp(png).resize(1200, 630).jpeg({ quality: 88 }).toBuffer();
  file = `og-${s.slug}.jpg`;
} catch { /* sharp not installed: keep the 2x PNG */ }
writeFileSync(join(root, 'public/strategy', file), out);
s.ogImage = file;
writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');
console.log(`wrote public/strategy/${file} and set ogImage for ${s.slug}. Now run: npm run strategy`);
