const assert = require('node:assert/strict');
const { test } = require('node:test');
const CachePolicy = require('http-cache-semantics');

const request = {
  url: 'https://example.test/account',
  method: 'GET',
  headers: { host: 'example.test' },
};

function policy(headers, shared = true) {
  return new CachePolicy(request, { status: 200, headers }, { shared });
}

// GHSA-ch52-4w7c-c8xp: client max-stale must not override reuse restrictions.
const restrictedResponses = {
  'shared session cookie': { 'cache-control': 'max-age=600', 'set-cookie': 'session=secret' },
  'shared proxy-revalidate': { 'cache-control': 'max-age=600, proxy-revalidate' },
  'response no-cache': { 'cache-control': 'no-cache, max-age=600' },
  'response no-store': { 'cache-control': 'no-store, max-age=600' },
  'shared private response': { 'cache-control': 'private, max-age=600' },
};

for (const [name, headers] of Object.entries(restrictedResponses)) {
  for (const directive of ['max-stale', 'max-stale=999999']) {
    test(`${name} requires revalidation despite ${directive}`, () => {
      const cached = policy(headers);
      const incoming = { ...request, headers: { ...request.headers, 'cache-control': directive } };
      // Cached policies are also deserialized by make-fetch-happen.
      for (const entry of [cached, CachePolicy.fromObject(cached.toObject())]) {
        assert.equal(entry.satisfiesWithoutRevalidation(incoming), false);
        const result = entry.evaluateRequest(incoming);
        assert.equal(result.response, undefined);
        assert.equal(result.revalidation.synchronous, true);
      }
    });
  }
}

test('stale-while-revalidate cannot expose a shared session cookie', () => {
  const cached = policy({
    'cache-control': 'max-age=600, stale-while-revalidate=600',
    'set-cookie': 'session=secret',
  });
  assert.equal(cached.evaluateRequest(request).response, undefined);
});

test('ordinary expired public responses still honor max-stale', () => {
  const cached = policy({ 'cache-control': 'public, max-age=0' });
  cached.now = () => cached._responseTime + 1000;
  const incoming = { ...request, headers: { ...request.headers, 'cache-control': 'max-stale=60' } };
  assert.equal(cached.satisfiesWithoutRevalidation(request), false);
  assert.equal(cached.satisfiesWithoutRevalidation(incoming), true);
});

test('explicitly public cookies and private-cache cookies remain reusable', () => {
  assert.equal(policy({ 'cache-control': 'public, max-age=600', 'set-cookie': 'id=1' })
    .satisfiesWithoutRevalidation(request), true);
  assert.equal(policy({ 'cache-control': 'private, max-age=600', 'set-cookie': 'id=1' }, false)
    .satisfiesWithoutRevalidation(request), true);
});
