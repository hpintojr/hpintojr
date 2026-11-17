// Builds the static Strategy Session pages into public/strategy from sessions.json.
// Run: npm run strategy   (node scripts/strategy/build.mjs, no dependencies)
//   /strategy                    -> public/strategy/index.html            (the one "upcoming" session)
//   /strategy/confirmed          -> public/strategy/confirmed/index.html  (post-registration page)
//   /strategy/strategy-session.ics                                         (calendar file for the upcoming session)
//   /strategy/archive/<slug>     -> public/strategy/archive/<slug>/index.html (every session, kept in Git)
// Compliance (MCX, Nov 13): no MasterClass / Chicago Booth logos or artwork, noindex,
// "Live only" notice, member-hosted disclaimer. No replays or recordings.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const data = JSON.parse(readFileSync(join(here, 'sessions.json'), 'utf8'));
const BASE = data.basePath;
const OUT = join(root, 'public', BASE.slice(1));
const SITE = 'https://hamiltonpinto.com';
const SULUS = 'https://crm.sulus.ai/f/';

const esc = (s = '') => String(s).replace(/&(?!(#\d+|#x[0-9a-f]+|[a-z]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sessions = [...data.sessions].sort((a, b) => b.slug.localeCompare(a.slug));
const upcoming = sessions.filter((s) => s.status === 'upcoming');
if (upcoming.length !== 1) throw new Error(`sessions.json needs exactly one "upcoming" session, found ${upcoming.length}`);
const next = upcoming[0];
for (const s of sessions) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.slug)) throw new Error(`Bad slug ${s.slug}`);
  if (Number.isNaN(Date.parse(s.startUtc)) || Number.isNaN(Date.parse(s.endUtc))) throw new Error(`Bad times for ${s.slug}`);
}
if (/PENDING/i.test(next.meetUrl)) console.warn(`WARNING: ${next.slug} meetUrl is still a placeholder (${next.meetUrl}). Do not deploy.`);

const compact = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
const enc = encodeURIComponent;
const title = 'Strategy Session with Hamilton Pinto Jr.';

function calLinks(s) {
  const details = `Two hour member-hosted Strategy Session.\nHour one: ${s.hourOne.title}.\nHour two: ${s.hourTwo.title}.\nJoin: ${s.meetUrl}\nDetails: ${SITE}${BASE}`;
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(title)}&dates=${compact(s.startUtc)}%2F${compact(s.endUtc)}&details=${enc(details)}&location=${enc(s.meetUrl)}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=${enc(title)}&startdt=${enc(s.startUtc)}&enddt=${enc(s.endUtc)}&body=${enc(`Two hour member-hosted Strategy Session.\nJoin: ${s.meetUrl}\nDetails: ${SITE}${BASE}`)}&location=${enc(s.meetUrl)}`,
  };
}

const EXTRA_CSS = `<style>
.lineup{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:28px}
.lineup .card{padding:20px}
.lineup h3{margin:0 0 6px;font-size:18px}
.lineup .kind{display:block;font-size:13px;color:var(--muted);margin-bottom:8px}
.catalog{list-style:none;margin:24px 0 0;padding:0;border:1px solid var(--line);border-radius:14px;background:var(--card)}
.catalog li{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 20px;border-top:1px solid var(--line)}
.catalog li:first-child{border-top:0}
.catalog a{font-weight:600;color:var(--text);text-decoration:none}
.catalog a:hover{color:var(--brand);text-decoration:underline}
.catalog .when{font-size:13.5px;color:var(--muted)}
.pill{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:4px 10px;white-space:nowrap}
.pill.up{color:var(--brand);background:var(--accent)}
.pill.past{color:var(--dim);background:var(--soft)}
.ended{max-width:760px;margin:0 0 26px;padding:14px 18px;border-radius:12px;background:var(--accent);color:var(--text);font-size:15px}
.ended a{color:var(--brand);font-weight:600}
.facts .when-cell dd{display:flex;align-items:center;gap:16px}
.date-tile{flex:none;display:flex;flex-direction:column;align-items:center;width:78px;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--card);box-shadow:0 6px 18px rgba(23,43,52,.08)}
.dt-mon{display:block;width:100%;text-align:center;background:var(--brand);color:#fff;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:4px 0}
.dt-day{font-family:Georgia,"Times New Roman",serif;font-size:38px;line-height:1;color:var(--text);padding:8px 0 2px}
.dt-wd{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);padding-bottom:8px}
.when-txt{display:flex;flex-direction:column;line-height:1.35}
.when-day{font-family:Georgia,"Times New Roman",serif;font-size:21px;color:var(--text);font-weight:400}
.when-time{font-size:16px;font-weight:700;color:var(--brand);margin-top:2px}
@media (max-width:900px){.lineup{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:640px){.lineup{grid-template-columns:1fr}.catalog li{flex-direction:column;align-items:flex-start;gap:6px}}
</style>`;

function head(s, path, isNext) {
  const t = isNext ? `Strategy Session | ${s.shortDate}, 3:00 PM PT | Hamilton Pinto Jr.` : `Strategy Session | ${s.shortDate} (archived) | Hamilton Pinto Jr.`;
  const d = `A two hour member-hosted Strategy Session for the MasterClass Executive Fall 2026 cohort. Hour one: ${s.hourOne.title}. Hour two: ${s.hourTwo.title}. ${s.dateLabel}, ${s.timeLabel} on Google Meet.`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#faf9f6">
<meta name="robots" content="noindex">
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}">
<meta property="og:title" content="${esc(`Strategy Session: ${s.shortDate}, 3:00 PM PT`)}">
<meta property="og:description" content="${esc(`Two hours on Google Meet. Hour one: ${s.hourOne.title}. Hour two: ${s.hourTwo.title}. Member-hosted by Hamilton Pinto Jr.`)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}${BASE}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE}${BASE}/og.jpg">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/ama/ama.css">
${EXTRA_CSS}
</head>
<body>`;
}

const header = `
<header class="top">
  <div class="wrap top-in">
    <div class="brandline"><a class="who" href="/" aria-label="Hamilton Pinto Jr., home"><img class="signature" src="/hamilton-signature-black.svg" alt="Hamilton Pinto Jr., Consultant" width="1793" height="625"></a><span class="sep" aria-hidden="true">|</span><span class="program">MasterClass Executive</span></div>
    <span class="chip">Member-hosted session</span>
  </div>
</header>`;

const footer = `
<footer class="foot">
  <div class="blocks" aria-hidden="true"></div>
  <div class="wrap">
    <p><strong>Hamilton Pinto Jr.</strong> &middot; MasterClass Executive, Fall 2026 cohort, Pod 3 lead &middot; <a href="/">hamiltonpinto.com</a></p>
    <p class="fine">This is a member-hosted session. This page is not an official MasterClass Executive or University of Chicago Booth School of Business publication or event.</p>
  </div>
</footer>`;

function dateTile(s) {
  const d = new Date(s.startUtc.replace('Z', '-08:00').replace(/T\d{2}:\d{2}:\d{2}-08:00$/, 'T12:00:00-08:00'));
  const [wd, mon, day] = [d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'America/Los_Angeles' }), d.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Los_Angeles' }), d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'America/Los_Angeles' })];
  return `<span class="date-tile" aria-hidden="true"><span class="dt-mon">${mon}</span><span class="dt-day">${day}</span><span class="dt-wd">${wd}</span></span>`;
}

function hero(s, isNext) {
  const ended = isNext ? '' : `\n    <p class="ended">This session took place on ${esc(s.dateLabel)}. It was live only and not recorded. <a href="${BASE}">See the next Strategy Session &rarr;</a></p>`;
  const cta = isNext
    ? `
    <div class="cta-row">
      <a class="btn primary" href="#register">Reserve my seat</a>
      <span class="count" id="countdown" role="status" aria-live="polite"></span>
    </div>`
    : `
    <div class="cta-row">
      <a class="btn primary" href="${BASE}">Go to the next session</a>
    </div>`;
  return `
<section class="hero">
  <div class="wrap hero-in">${ended}
    <p class="eyebrow">Fall 2026 cohort &middot; Strategy Session &middot; ${esc(s.shortDate)}</p>
    <h1>${esc(s.headlineA)}<br><span class="hl">${esc(s.headlineB)}</span></h1>
    <p class="lede">${esc(s.lede)}</p>

    <dl class="facts">
      <div class="when-cell"><dt>When</dt><dd>${dateTile(s)}<span class="when-txt"><span class="when-day">${esc(s.dateLabel)}</span><span class="when-time">${esc(s.timeLabel)}</span><span class="dim">${esc(s.etLabel)}</span></span></dd></div>
      <div><dt>Where</dt><dd>Google Meet<br><span class="dim">${isNext ? 'Link emailed when you register' : 'Live only, not recorded'}</span></dd></div>
      <div><dt>Seats</dt><dd>Open to the whole cohort<br><span class="dim">No seat limit</span></dd></div>
    </dl>
${cta}
    <p class="host">Hosted by Hamilton Pinto Jr., Pod 3 lead, Fall 2026 cohort. Not an official MasterClass Executive or Chicago Booth event.</p>
  </div>
  <div class="blocks" aria-hidden="true"></div>
</section>`;
}

function lineup(s) {
  if (!s.upcomingWeek?.length) return '';
  const cards = s.upcomingWeek.map((w) => `
      <article class="card">
        <p class="tag">${esc(w.date)}</p>
        <h3>${esc(w.who)}</h3>
        <span class="kind">${esc(w.kind)}</span>
        <p>${esc(w.blurb)}</p>
      </article>`).join('');
  return `
<section class="band alt" aria-labelledby="w-title">
  <div class="wrap">
    <p class="eyebrow">Who's up next</p>
    <h2 id="w-title">Labs &amp; guest speaker on deck</h2>
    <p class="sub">The MCX program lineup leading into ${esc(s.dateLabel)}. Hour one breaks it down.</p>
    <div class="lineup">${cards}
    </div>
  </div>
</section>`;
}

function register(s) {
  const form = SULUS + s.sulusFormId;
  return `
<section class="band" id="register">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="eyebrow">Register</p>
      <h2>Get the Google Meet link</h2>
      <p>Register and the link is yours on the spot. It takes about 20 seconds. Registered for an earlier session? This is a new one, so register again.</p>
      <ol class="steps">
        <li><strong>Register here.</strong> Name and email. Phone is optional.</li>
        <li><strong>Save it to your calendar.</strong> The next screen and your confirmation email both have one-tap buttons for Apple, Google and Outlook.</li>
        <li><strong>Join at 3:00 PM PT.</strong> No waiting room. Click the link and you're in. We wrap at 5:00 PM PT.</li>
      </ol>
      <p class="notice"><strong>Live only.</strong> These sessions are not recorded, so come join us live.</p>
    </div>
    <div class="reg-card">
      <div class="reg-head">
        <span class="live-dot" aria-hidden="true"></span>
        <strong>Reserve your seat</strong>
        <span class="seats">Open to all</span>
      </div>
      <iframe class="form" title="Register for the ${esc(s.shortDate)} Strategy Session" src="${form}" loading="eager"></iframe>
      <p class="fine center after">Your Meet link and calendar buttons appear as soon as you register.</p>
      <p class="fine center">Form not loading? <a href="${form}" target="_blank" rel="noopener">Open it in a new tab</a>.</p>
    </div>
  </div>
</section>`;
}

function plan(s, isNext, alt) {
  return `
<section class="band${alt ? ' alt' : ''}" aria-labelledby="a-title">
  <div class="wrap">
    <p class="eyebrow">The two-hour plan</p>
    <h2 id="a-title">${isNext ? 'What we cover' : 'What we covered'}</h2>
    <div class="sessions">
      <article class="card now">
        <p class="tag">Hour one &middot; 3:00 to 4:00 PM PT</p>
        <h3>${esc(s.hourOne.title)}</h3>
        <p>${esc(s.hourOne.body)}</p>
      </article>
      <article class="card live">
        <p class="tag">Hour two &middot; 4:00 to 5:00 PM PT</p>
        <h3>${esc(s.hourTwo.title)}</h3>
        <p>${esc(s.hourTwo.body)}</p>
      </article>
    </div>
  </div>
</section>`;
}

function catalog(current, alt) {
  const rows = sessions.map((s) => {
    const href = s.status === 'upcoming' ? BASE : `${BASE}/archive/${s.slug}`;
    const pill = s.status === 'upcoming' ? '<span class="pill up">Up next</span>' : '<span class="pill past">Archived</span>';
    const label = `${s.dateLabel}: ${s.hourOne.title}`;
    const link = s.slug === current.slug ? `<span aria-current="page"><strong>${esc(label)}</strong></span>` : `<a href="${href}">${esc(label)}</a>`;
    return `
      <li><div>${link}<br><span class="when">${esc(s.timeLabel)} (${esc(s.etLabel)})</span></div>${pill}</li>`;
  }).join('');
  return `
<section class="band${alt ? ' alt' : ''}" aria-labelledby="c-title">
  <div class="wrap">
    <p class="eyebrow">Session catalog</p>
    <h2 id="c-title">Every Monday session</h2>
    <ul class="catalog">${rows}
    </ul>
  </div>
</section>`;
}

function countdown(s) {
  const st = Date.parse(s.startUtc), en = Date.parse(s.endUtc);
  return `
<script>
(function(){
  // Countdown to ${s.longDate}, 3:00 PM Pacific (${s.startUtc}), ending 5:00 PM Pacific.
  var start=${st}, end=${en}, el=document.getElementById('countdown');
  function tick(){
    var now=Date.now(), d=start-now, t;
    if(now>=end){t='This session has ended.';}
    else if(d<=0){t='Live now until 5:00 PM PT';}
    else{var days=Math.floor(d/864e5), h=Math.floor(d%864e5/36e5), m=Math.floor(d%36e5/6e4); t='Starts in '+(days?days+'d ':'')+(h?h+'h ':'')+m+'m';}
    el.textContent=t;
  }
  tick(); setInterval(tick,30000);
})();
</script>`;
}

function page(s, path) {
  const isNext = s.status === 'upcoming';
  const body = isNext
    ? `${lineup(s)}${register(s)}${plan(s, true, true)}${catalog(s, false)}`
    : `${plan(s, false, true)}${catalog(s, false)}`;
  return `${head(s, path, isNext)}
${isNext ? '<a class="skip" href="#register">Skip to registration</a>' : '<a class="skip" href="#a-title">Skip to content</a>'}
${header}
${hero(s, isNext)}

<main>${body}
</main>
${footer}
${isNext ? countdown(s) : ''}
</body>
</html>
`;
}

function confirmed(s) {
  const c = calLinks(s);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>You're in | Strategy Session ${esc(s.shortDate)} | Hamilton Pinto Jr.</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<style>
*{box-sizing:border-box}
html{background:#faf9f6}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 16px;background:#faf9f6;color:#172b34;font-family:"Inter Variable",Inter,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-text-size-adjust:100%}
main{width:100%;max-width:460px;margin:0 auto;padding:30px 24px 24px;text-align:center;background:#fff;border:1px solid #dedfd8;border-radius:18px;box-shadow:0 20px 50px rgba(23,43,52,.08)}
.back{margin:18px 0 0;font-size:14px}
.back a{color:#59686b}
.tick{width:52px;height:52px;border-radius:50%;background:#e7efeb;color:#346459;display:grid;place-items:center;margin:0 auto 14px;font-size:26px;font-weight:700}
h1{margin:0 0 8px;font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:30px;line-height:1.15}
p{margin:0 0 14px;font-size:15px;line-height:1.55;color:#59686b}
.btn{display:flex;align-items:center;justify-content:center;min-height:50px;padding:12px 20px;border-radius:999px;font-weight:600;font-size:16px;text-decoration:none}
.join{background:#172b34;color:#faf9f6;margin:4px 0 8px}
.join:hover{background:#346459}
.link{font-size:13px;color:#7a8689;word-break:break-all;margin-bottom:18px}
.cal-title{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#7a8689;margin:0 0 8px}
.cal{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.cal a{display:flex;align-items:center;justify-content:center;min-height:44px;padding:8px 6px;border:1px solid #dedfd8;border-radius:10px;color:#172b34;font-weight:600;font-size:14px;text-decoration:none}
.cal a:hover{border-color:#346459;color:#346459}
.fine{font-size:12.5px;color:#7a8689;margin:0}
.fine a{color:#346459}
a:focus-visible{outline:2px solid #346459;outline-offset:2px}
</style>
</head>
<body>
<main>
  <div class="tick" aria-hidden="true">&#10003;</div>
  <h1>You're in!</h1>
  <p>Your seat is confirmed for the Strategy Session on ${esc(s.dateLabel)}, ${esc(s.timeLabel)} (${esc(s.etLabel)}). Save it to your calendar now. The link is also in your confirmation email.</p>
  <a class="btn join" href="${esc(s.meetUrl)}" target="_blank" rel="noopener">Google Meet link for ${esc(s.shortDate)}</a>
  <p class="link">${esc(s.meetUrl)}</p>
  <p class="cal-title">Add it to your calendar</p>
  <div class="cal">
    <a href="${BASE}/strategy-session.ics" download="strategy-session.ics">Apple</a>
    <a href="${esc(c.google)}" target="_blank" rel="noopener">Google</a>
    <a href="${esc(c.outlook)}" target="_blank" rel="noopener">Outlook</a>
  </div>
  <p class="fine">Using Outlook at work (Microsoft 365)? Tap Apple instead; the .ics file opens in any calendar app. Live only, not recorded. Member-hosted session, not an official MasterClass Executive or Chicago Booth event.</p>
</main>
<p class="back"><a href="${BASE}">&larr; Back to the event page</a></p>
</body>
</html>
`;
}

function ics(s) {
  const icsText = (v) => String(v).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  const desc = `Two hour member-hosted Strategy Session for the MasterClass Executive Fall 2026 cohort.\nHour one: ${s.hourOne.title}.\nHour two: ${s.hourTwo.title}.\nJoin: ${s.meetUrl}\nDetails: ${SITE}${BASE}\nLive only, not recorded. Member-hosted session, not an official MasterClass Executive or Chicago Booth event.`;
  const stamp = compact(new Date(Date.parse(s.startUtc) - 13 * 864e5).toISOString()).replace(/\d{4}Z$/, '0000Z');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hamilton Pinto Jr.//Strategy Session//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:strategy-session-${s.slug.replace(/-/g, '')}@hamiltonpinto.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${compact(s.startUtc)}`,
    `DTEND:${compact(s.endUtc)}`,
    `SUMMARY:${icsText(title)}`,
    `DESCRIPTION:${icsText(desc)}`,
    `LOCATION:${s.meetUrl}`,
    `URL:${s.meetUrl}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:Strategy Session starts in 15 minutes', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
}

function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('wrote', join('public', BASE.slice(1), rel));
}

rmSync(join(OUT, 'archive'), { recursive: true, force: true });
write('index.html', page(next, BASE));
write('confirmed/index.html', confirmed(next));
write('strategy-session.ics', ics(next));
for (const s of sessions) write(`archive/${s.slug}/index.html`, page(s, `${BASE}/archive/${s.slug}`));
