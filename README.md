# Time Calculator Monorepo

This repository contains multiple implementations of the same time calculator app (Angular, React, Svelte, and Vue), shared utilities, and Playwright end-to-end tests.

## Workspace Layout

- `apps/angular-app`
- `apps/react-app`
- `apps/svelte-app`
- `apps/vue-app`
- `apps/landing`
- `packages/common`
- `e2e`

## Prerequisites

- Node.js 20+
- pnpm 10+

## Install

```bash
pnpm install
```

## Common Commands

```bash
pnpm build
pnpm test:e2e
pnpm build:pages
```

## Notes

- The repo uses `pnpm` workspaces and `turbo` for task orchestration.
- Production-ready static output for all apps can be assembled with `pnpm build:pages`.
