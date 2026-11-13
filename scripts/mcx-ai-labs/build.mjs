// Builds the static MCX AI Labs portfolio into public/MCX-AI-Labs from labs.json.
// Run: node scripts/mcx-ai-labs/build.mjs   (no dependencies)
// Hub:  /MCX-AI-Labs            -> public/MCX-AI-Labs/index.html
// Lab:  /MCX-AI-Labs/<slug>     -> public/MCX-AI-Labs/<slug>/index.html (completed labs only)
// Assets (videos, decks, MD files) stay in each lab's own repo and Vercel deployment (assetBase).
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const data = JSON.parse(readFileSync(join(here, 'labs.json'), 'utf8'));
const BASE = data.basePath;
const OUT = join(root, 'public', BASE.slice(1));
const SITE = 'https://hamiltonpinto.com';

const esc = (s = '') => String(s).replace(/&(?!(#\d+|#x[0-9a-f]+|[a-z]+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const txt = (s = '') => String(s).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const abs = (lab, href) => (/^(https?:)?\/\//.test(href) || href.startsWith('#') || href.startsWith('/ama') ? href : lab.assetBase + href);
const ext = (href) => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';

const labs = data.labs;
const done = labs.filter((l) => l.status === 'completed');
const statusClass = (l) => (l.status === 'completed' ? 'done' : /next/i.test(l.when) ? 'next' : 'soon');
const statusText = (l) => (l.status === 'completed' ? 'Completed' : l.when);

function head({ title, description, path }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#05070b">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/labs.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>`;
}

function topbar(crumbs) {
  const parts = [`<a href="/">Hamilton Pinto Jr.</a>`];
  crumbs.forEach((c, i) => {
    parts.push('<span class="sep" aria-hidden="true">/</span>');
    parts.push(i === crumbs.length - 1 ? `<span class="here" aria-current="page">${esc(c.label)}</span>` : `<a href="${c.href}">${esc(c.label)}</a>`);
  });
  return `
<header class="top">
  <div class="wrap top-in">
    <nav class="crumbs" aria-label="Breadcrumb">${parts.join('')}</nav>
    <a class="chip" href="${BASE}">${done.length} of ${labs.length} labs complete</a>
  </div>
</header>`;
}

const logos = `
    <div class="logos">
      <img class="logo-mc" src="${BASE}/brand/masterclass-executive.png" alt="MasterClass Executive" width="440" height="150">
      <span aria-hidden="true">&times;</span>
      <img class="logo-booth" src="${BASE}/brand/chicago-booth.png" alt="The University of Chicago Booth School of Business" width="810" height="205">
    </div>`;

const heroOpen = `
<section class="hero">
  <img class="mark-bg" src="${BASE}/brand/masterclass-mark-bg.webp" alt="" aria-hidden="true" width="1600" height="900">
  <div class="wrap hero-in">${logos}`;
const heroClose = `
  </div>
  <div class="blocks" aria-hidden="true"></div>
</section>`;

const footer = `
<footer class="foot">
  <div class="blocks" aria-hidden="true"></div>
  <div class="wrap">
    <p><strong>Hamilton Pinto Jr.</strong> &middot; ${esc(data.program)}, ${esc(data.cohort)} member &middot; <a href="/">hamiltonpinto.com</a></p>
    <p class="fine">Learner projects completed during the program. Logos identify the educational context; these pages are not an official MasterClass Executive or University of Chicago Booth School of Business publication.</p>
  </div>
</footer>
</body>
</html>
`;

function hub() {
  const pct = Math.round((done.length / labs.length) * 100);
  const next = labs.find((l) => l.status !== 'completed');
  const cards = labs.map((l) => {
    const inner = `
        <span class="num">LAB ${l.number}</span>
        <h3>${esc(l.title)}</h3>
        ${l.cardSummary ? `<p>${l.cardSummary}</p>` : ''}
        <div class="foot-row"><span class="status ${statusClass(l)}">${esc(statusText(l))}</span>${l.status === 'completed' ? '<span class="go">Open lab &rarr;</span>' : ''}</div>`;
    return l.status === 'completed'
      ? `      <a class="lab done" href="${BASE}/${l.slug}">${inner}\n      </a>`
      : `      <article class="lab upcoming">${inner}\n      </article>`;
  }).join('\n');
  return `${head({ title: 'MCX AI Labs | Hamilton Pinto Jr.', description: `My ${data.program} portfolio: ${labs.length} hands-on AI labs, each with the recording, script, deliverables and proof-of-work files.`, path: BASE })}
${topbar([{ label: 'MCX AI Labs' }])}
${heroOpen}
    <p class="eyebrow">${esc(data.program)} &middot; ${esc(data.cohort)}</p>
    <h1>Twelve AI Labs.<br><span class="hl">The work behind each one.</span></h1>
    <p class="lede">A running portfolio of every lab in the program. Each completed lab has its own page with my recorded presentation, the script, the finished deliverable and the working files: prompts, briefs, evidence registers and verification notes.</p>
    <dl class="facts">
      <div><dt>Progress</dt><dd>${done.length} of ${labs.length} complete<br><span class="dim">Updated as each lab ships</span></dd></div>
      <div><dt>Up next</dt><dd>${esc(next ? next.title : 'All labs complete')}<br><span class="dim">${esc(next ? next.when : '')}</span></dd></div>
      <div><dt>Each lab includes</dt><dd>Recording, script, deliverable<br><span class="dim">plus proof-of-work files</span></dd></div>
    </dl>
    <div class="cta-row">
      <a class="btn primary" href="#labs">Browse the labs</a>
      <a class="btn ghost" href="${BASE}/${done[done.length - 1].slug}">Latest: ${esc(done[done.length - 1].title)}</a>
    </div>
    <p class="host">Learner projects by Hamilton Pinto Jr. Not an official MasterClass Executive or Chicago Booth publication.</p>${heroClose}

<main id="main">
<section class="band" id="labs" aria-labelledby="labs-title">
  <div class="wrap">
    <p class="eyebrow">The curriculum</p>
    <h2 id="labs-title">All ${labs.length} labs</h2>
    <div class="progress" role="img" aria-label="${done.length} of ${labs.length} labs complete">
      <div class="bar"><span style="width:${pct}%"></span></div>
      <p>${done.length} of ${labs.length} complete &middot; ${pct}%</p>
    </div>
    <div class="labs">
${cards}
    </div>
  </div>
</section>

<section class="band alt" aria-labelledby="how-title">
  <div class="wrap">
    <p class="eyebrow">How each lab is documented</p>
    <h2 id="how-title">From the lab to the proof</h2>
    <p class="sub">Every lab follows the same structure, so you can go as deep as you want.</p>
    <ol class="levels">
      <li><h3>The lab</h3><p>The problem, the case and what I decided, on one page.</p></li>
      <li><h3>The recording</h3><p>My presentation of the work, in my own voice, as submitted.</p></li>
      <li><h3>The deliverable</h3><p>The decks, dashboard or app itself, live or downloadable.</p></li>
      <li><h3>The proof</h3><p>Scripts, prompts, briefs, claim registers and verification notes as Markdown files.</p></li>
    </ol>
  </div>
</section>
</main>
${footer}`;
}

function labPage(lab) {
  const i = done.indexOf(lab);
  const prev = done[i - 1];
  const next = done[i + 1];
  const facts = lab.facts.map(([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${dd}</dd></div>`).join('');
  const cta = lab.cta.map((c) => `<a class="btn ${c.primary ? 'primary' : 'ghost'}" href="${abs(lab, c.href)}"${ext(c.href)}>${esc(c.label)}</a>`).join('\n      ');
  const v = lab.video;
  const recording = `
<section class="band" id="recording" aria-labelledby="rec-title">
  <div class="wrap">
    <p class="eyebrow">Level 2 &middot; The recording</p>
    <h2 id="rec-title">${esc(v.title)}</h2>
    <p class="sub">${esc(v.caption)}</p>
    <div class="player">
      <video controls playsinline preload="metadata" poster="${abs(lab, v.poster)}" aria-label="${esc(v.title)}: ${esc(lab.title)}">
        <source src="${abs(lab, v.src)}" type="video/mp4">
        <a href="${abs(lab, v.src)}">Watch the presentation</a>.
      </video>
    </div>
    <p class="player-meta"><strong>${v.meta}</strong>${lab.officialUrl ? `<a class="fine" href="${lab.officialUrl}" target="_blank" rel="noopener">Official lab page and recording (cohort login) &rarr;</a>` : ''}</p>
  </div>
</section>`;

  const approach = `
<section class="band alt" aria-labelledby="app-title">
  <div class="wrap">
    <p class="eyebrow">How I approached it</p>
    <h2 id="app-title">The decisions that shaped the work</h2>
    <ul class="steps">
      ${lab.approach.map((a) => `<li>${a.replace(/^<strong>(.*?)<\/strong>\s*/, '<strong>$1</strong>')}</li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  let work = '';
  if (lab.galleries) {
    const g = lab.galleries.map((d) => `
    <div class="gallery">
      <div class="gallery-head">
        <div><h3>${esc(d.title)}</h3><span class="dim">${esc(d.subtitle)} &middot; ${d.slides.length} cards</span></div>
        <div class="gallery-links">
          <a class="btn ghost small" href="${d.gamma}" target="_blank" rel="noopener">Open in Gamma</a>
          <a class="btn ghost small" href="${abs(lab, d.pptx)}">Download PPTX</a>
        </div>
      </div>
      <div class="track" tabindex="0" aria-label="${esc(d.title)} deck cards">
        ${d.slides.map((t, n) => {
          const nn = String(n + 1).padStart(2, '0');
          return `<a class="slide" href="${lab.assetBase}/slides/${d.id}/${nn}.jpg" target="_blank" rel="noopener"><figure style="margin:0"><img src="${lab.assetBase}/slides/${d.id}/${nn}-thumb.jpg" alt="${esc(d.title)} card ${n + 1}: ${esc(t)}" width="640" height="360" loading="lazy"><figcaption><b>${n + 1}</b>${esc(t)}</figcaption></figure></a>`;
        }).join('\n        ')}
      </div>
    </div>`).join('');
    const xv = lab.extraVideo ? `
    <div class="gallery">
      <div class="gallery-head"><div><h3>${esc(lab.extraVideo.title)}</h3><span class="dim">${esc(lab.extraVideo.caption)}</span></div></div>
      <div class="player" style="max-width:720px"><video controls playsinline muted loop preload="metadata"><source src="${abs(lab, lab.extraVideo.src)}" type="video/mp4"></video></div>
    </div>` : '';
    work = `
<section class="band" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <p class="eyebrow">Level 3 &middot; The deliverable</p>
    <h2 id="work-title">The decks</h2>
    <p class="sub">Swipe through each deck. Select a card to open it full size.</p>${g}${xv}
  </div>
</section>`;
  } else if (lab.showcase) {
    work = `
<section class="band" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <p class="eyebrow">Level 3 &middot; The deliverable</p>
    <h2 id="work-title">${esc(lab.showcase.title)}</h2>
    <div class="cards">
      ${lab.showcase.cards.map((c) => `<article class="card"><p class="tag">${c.tag}</p><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p><a href="${abs(lab, c.href)}"${ext(abs(lab, c.href))}>${esc(c.link)} &rarr;</a></article>`).join('\n      ')}
    </div>
  </div>
</section>`;
  }

  const proofGroups = lab.proof.map((g) => `
      <section><h3>${esc(g.group)}</h3><ul>
        ${g.items.map((it) => `<li><a href="${abs(lab, it.href)}" target="_blank" rel="noopener"><span class="pl">${esc(it.label)}</span><span class="pm">${it.meta}</span></a></li>`).join('\n        ')}
      </ul></section>`).join('');
  const related = lab.related && lab.related.length ? `
      <section><h3>Related</h3><ul>
        ${lab.related.map((r) => `<li><a href="${r.href}"><span class="pl">${esc(r.label)}</span><span class="pm">${esc(r.meta)}</span></a></li>`).join('\n        ')}
      </ul></section>` : '';
  const repo = lab.repo.private
    ? `Source repository: ${esc(lab.repo.name)} (private).`
    : `Source repository: <a href="https://github.com/${lab.repo.name}" target="_blank" rel="noopener">github.com/${esc(lab.repo.name)}</a>.`;
  const proof = `
<section class="band alt" id="proof" aria-labelledby="proof-title">
  <div class="wrap">
    <p class="eyebrow">Level 4 &middot; Proof of work</p>
    <h2 id="proof-title">Scripts, prompts and working files</h2>
    <p class="sub">The files behind the deliverable, exactly as used. Markdown files open as plain text.</p>
    <div class="proof">${proofGroups}${related}
    </div>
    <p class="fine" style="margin-top:22px">${repo} Files are hosted at <a href="${lab.assetBase}" target="_blank" rel="noopener">${esc(lab.assetBase.replace('https://', ''))}</a>.</p>
  </div>
</section>`;

  const pager = `
<section class="band" aria-label="More labs">
  <div class="wrap pager">
    ${prev ? `<a href="${BASE}/${prev.slug}"><span class="k">&larr; Previous lab</span><span class="t">${esc(prev.title)}</span></a>` : `<a href="${BASE}"><span class="k">&larr; Back</span><span class="t">All ${labs.length} labs</span></a>`}
    ${next ? `<a class="next" href="${BASE}/${next.slug}"><span class="k">Next lab &rarr;</span><span class="t">${esc(next.title)}</span></a>` : `<a class="next" href="${BASE}#labs"><span class="k">All labs &rarr;</span><span class="t">See what's coming next</span></a>`}
  </div>
</section>`;

  return `${head({ title: `${lab.title} | MCX AI Labs | Hamilton Pinto Jr.`, description: txt(lab.lede).slice(0, 300), path: `${BASE}/${lab.slug}` })}
${topbar([{ label: 'MCX AI Labs', href: BASE }, { label: `Lab ${lab.number}` }])}
${heroOpen}
    <p class="eyebrow">AI Lab ${lab.number} &middot; ${esc(lab.title)} &middot; ${esc(lab.when)}</p>
    <h1>${esc(lab.hero.a)}<br><span class="hl">${esc(lab.hero.b)}</span></h1>
    <p class="lede">${lab.lede}</p>
    <dl class="facts">${facts}</dl>
    <div class="cta-row">
      ${cta}
    </div>${heroClose}

<main id="main">${recording}${approach}${work}${proof}${pager}
</main>
${footer}`;
}

// Clean previously generated lab folders (keep brand/ and labs.css).
if (existsSync(OUT)) {
  for (const entry of readdirSync(OUT, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'brand') rmSync(join(OUT, entry.name), { recursive: true });
  }
}
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'index.html'), hub());
for (const lab of done) {
  mkdirSync(join(OUT, lab.slug), { recursive: true });
  writeFileSync(join(OUT, lab.slug, 'index.html'), labPage(lab));
}
console.log(`MCX AI Labs: hub + ${done.length} lab pages written to public${BASE}/`);
