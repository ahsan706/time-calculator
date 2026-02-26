import { defineConfig, devices } from '@playwright/test';

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
        baseURL: 'http://localhost:4173',
      },
    },
    {
      name: 'vue',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4174',
      },
    },
    {
      name: 'svelte',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4175',
      },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @time-calculator/react-app dev --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter @time-calculator/vue-app dev --port 4174 --strictPort',
      url: 'http://localhost:4174',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter svelte-app dev --port 4175 --strictPort',
      url: 'http://localhost:4175',
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
