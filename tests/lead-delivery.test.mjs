import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/app/actions/lead.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function loadAction(env, fetch = async () => { throw new Error('Unexpected delivery'); }) {
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: createRequire(import.meta.url), process: { env }, fetch, AbortSignal, console: { error() {} } });
  return exports.submitLead;
}
function lead(page = 'contact', overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: 'Website Integration Test', email: 'website-test@example.com', message: 'Controlled integration test; no follow-up required.', topic: 'Consulting', page, ...overrides })) data.set(key, value);
  return data;
}

test('all three forms send signed raw JSON with the inquiry, attribution, and CRM-compatible tags', async () => {
  for (const page of ['contact', 'consulting', 'ugc']) {
    let captured;
    const secret = 'unit-test-only-signing-secret';
    const submit = loadAction({ CRM_WEBHOOK_URL: 'https://crm.example.test/intake', CRM_WEBHOOK_SECRET: secret }, async (url, request) => {
      captured = { url, ...request };
      return { ok: true };
    });
    assert.equal((await submit({}, lead(page, { topic: page === 'ugc' ? 'UGC / brand partnership' : 'Consulting' }))).status, 'success');
    const body = JSON.parse(captured.body);
    assert.equal(captured.url, 'https://crm.example.test/intake');
    assert.equal(captured.method, 'POST');
    assert.equal(captured.headers['X-Webhook-Signature'], 'sha256=' + createHmac('sha256', secret).update(captured.body).digest('hex'));
    assert.equal(body.source, `hamiltonpinto.com/${page}`);
    assert.equal(body.firstName, 'Website');
    assert.equal(body.lastName, 'Integration Test');
    assert.equal(body.tagsCsv, body.tags.join(','));
    assert.equal(body.callbackRequested, 'no');
    assert.equal(body.message, 'Controlled integration test; no follow-up required.');
    assert.equal(body.tags.includes('sms-consent'), false);
    assert.equal(body.topic, page === 'ugc' ? 'UGC / brand partnership' : 'Consulting');
  }
});
test('missing configuration and unsigned native CRM intake never report delivery', async () => {
  for (const env of [{}, { CRM_WEBHOOK_URL: 'https://crm.example.test/intake' }]) assert.equal((await loadAction(env)({}, lead())).status, 'error');
});
test('CRM rejection and network failure report an error', async () => {
  const env = { CRM_WEBHOOK_URL: 'https://crm.example.test/intake', CRM_WEBHOOK_SECRET: 'test-secret' };
  assert.equal((await loadAction(env, async () => ({ ok: false, status: 401 }))({}, lead())).status, 'error');
  assert.equal((await loadAction(env, async () => { throw new Error('Timeout'); })({}, lead())).status, 'error');
});
test('validation and honeypot block delivery before any network call', async () => {
  const submit = loadAction({ CRM_WEBHOOK_URL: 'https://crm.example.test/intake', CRM_WEBHOOK_SECRET: 'test-secret' });
  const invalid = await submit({}, lead('contact', { name: '', email: 'invalid', message: 'short' }));
  assert.equal(invalid.status, 'error');
  assert.deepEqual(Object.keys(invalid.fieldErrors).sort(), ['email', 'message', 'name']);
  assert.equal((await submit({}, lead('contact', { website: 'spam' }))).status, 'success');
});
test('legacy webhook remains supported and an unknown page cannot forge source attribution', async () => {
  let payload;
  const submit = loadAction({ LEADS_WEBHOOK_URL: 'https://legacy.example.test/intake' }, async (_url, request) => { payload = JSON.parse(request.body); assert.equal(request.headers['X-Webhook-Signature'], undefined); return { ok: true }; });
  assert.equal((await submit({}, lead('untrusted-site'))).status, 'success');
  assert.equal(payload.source, 'hamiltonpinto.com/contact');
});
