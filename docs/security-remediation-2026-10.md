# Dependency security remediation — 2026-10-24

The local dependency graph addresses the 28 active Dependabot alerts below.
The remaining alert (#231) was withdrawn upstream. GitHub alert status will only
reflect these dependency changes after they reach the default branch and are rescanned.

## Dependabot alerts

| Alerts | Package | Resolution in the lockfile |
| --- | --- | --- |
| #218 | brace-expansion | 5.0.12 |
| #219 | ip-address | 10.7.4 |
| #220, #237 | hono | 4.13.11 |
| #221 | piscina | 5.3.2 |
| #222–#227, #233 | devalue | 5.9.4 |
| #228 | http-cache-semantics | 4.3.0 with the committed pnpm security patch |
| #229, #234, #238–#240 | @modelcontextprotocol/sdk | 1.32.0 |
| #230 | compression | 1.8.2 |
| #231 | braces | [Advisory withdrawn on 2026-10-23](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); no suppression added |
| #232 | postcss-selector-parser | 7.1.6 |
| #235, #236 | follow-redirects | 1.16.1 |
| #241–#243 | Vite 8 | 8.3.5 across React, Vue, and Svelte |
| #244–#246 | Vite 7 | 7.3.7 within Angular's build tooling |

## Additional audit findings

The registry audit identified newer advisories beyond the open GitHub alerts.
The updates also cover fast-uri (3.1.9), source-map-js (1.2.2), proxy-addr (2.0.8),
shell-quote (1.11.0), launch-editor (2.14.2), zod (4.6.6), body-parser (1.20.9 and
2.4.0), undici (7.30.1), serialize-javascript (7.1.3), and Vue/server-renderer
(3.5.44). SvelteKit 3.1.0 addresses the enhanced-form redirect and prerendered
cache-control injection advisories.

SvelteKit now uses adapter-static 4.0.0, Svelte 5.57.2, and TypeScript 6.0.3.
Configuration lives in the Vite plugin and the TypeScript configuration extends
`$app/tsconfig`. The project requires Node.js 22.17 or later. The cookie override
only applies to pre-1.0 consumers so SvelteKit can use its required cookie 2 API.

## Cache patch maintenance

[GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp)
lists affected versions through 4.2.0, but its cache-reuse flaw also reproduces
in the published 4.3.0 package. An audit alone therefore misses the issue.

`patches/http-cache-semantics@4.3.0.patch` requires synchronous revalidation for
non-storable responses, response `no-cache`, shared `proxy-revalidate`, and shared
session cookies without an explicit public/immutable policy. This prevents
client `max-stale` and stale-while-revalidate from overriding those restrictions.
The pnpm lockfile applies the patch to both the test dependency and Angular's
transitive make-fetch-happen dependency.

Run `pnpm test:security` when updating or retiring the patch. The tests exercise
live and deserialized policies, both max-stale forms, stale-while-revalidate,
and legitimate public/private-cache reuse. Eleven tests fail against unpatched
4.3.0; all thirteen pass with the patch.

CI now runs these tests and the full low-severity audit without
`--ignore-unfixable`. The previous CVE exclusions were removed.

## Validation

Validated with Node.js 22.22.3 and pnpm 10.30.2:

- Frozen lockfile installation succeeds.
- `pnpm audit --audit-level low`: no known vulnerabilities, with no exclusions.
- `pnpm test:security`: 13 passing regression tests.
- `pnpm --filter svelte-app check`: no errors or warnings.
- `pnpm build`: all applications build; Vue and React type checks pass.
- `GITHUB_ACTIONS=true pnpm build:pages`: deployment artifacts build successfully.
- `pnpm test:e2e`: all 12 tests pass across Angular, React, Svelte, and Vue.
- Browser smoke checks of each built app at `/time-calculator/<app>/` load
  without asset failures or JavaScript errors and can add and remove periods.
