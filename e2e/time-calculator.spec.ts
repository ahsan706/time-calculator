import { expect, test } from '@playwright/test';

test('renders calculator shell with zero state', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Time Calculator', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 })).toContainText('0 day');
  await expect(page.getByRole('button', { name: 'Add Period' })).toBeVisible();
});

test('can add and remove a period card', async ({ page }) => {
  await page.goto('/');

  const addPeriodButton = page.getByRole('button', { name: 'Add Period' });
  const removePeriodButtons = page.getByRole('button', { name: 'Remove Period' });

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await addPeriodButton.click();
    if ((await removePeriodButtons.count()) > 0) {
      break;
    }
    await page.waitForTimeout(150);
  }
  await expect(removePeriodButtons).toHaveCount(1);

  await removePeriodButtons.click();
  await expect(removePeriodButtons).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 2 })).toContainText('0 day');
});

test('loads saved periods from localStorage and updates total', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'periodList',
      JSON.stringify([
        {
          id: 'period-1',
          startDate: '2025-01-01T00:00:00.000Z',
          endDate: '2025-01-11T00:00:00.000Z',
        },
      ]),
    );
  });

  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Remove Period' })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2 })).toContainText('10 days');
});
