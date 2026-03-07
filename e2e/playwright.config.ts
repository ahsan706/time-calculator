import { defineConfig, devices } from '@playwright/test';

const host = '127.0.0.1';

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  retries: 1,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'react',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://${host}:4173`,
      },
    },
    {
      name: 'vue',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://${host}:4174`,
      },
    },
    {
      name: 'svelte',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://${host}:4175`,
      },
    },
    {
      name: 'angular',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://${host}:4176`,
      },
    },
  ],
  webServer: [
    {
      command: `pnpm --filter @time-calculator/react-app dev --host ${host} --port 4173 --strictPort`,
      url: `http://${host}:4173`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: `pnpm --filter @time-calculator/vue-app dev --host ${host} --port 4174 --strictPort`,
      url: `http://${host}:4174`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: `pnpm --filter svelte-app dev --host ${host} --port 4175 --strictPort`,
      url: `http://${host}:4175`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: `pnpm --filter @time-calculator/angular-app exec ng serve --host ${host} --port 4176`,
      url: `http://${host}:4176`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
