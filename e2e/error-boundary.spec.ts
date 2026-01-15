import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('application loads without errors - baseline screenshot', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
    
    await expect(page).toHaveScreenshot('app-healthy-state.png', {
      fullPage: false,
      maxDiffPixels: 200,
      mask: [
        page.locator('[data-testid="button-theme-toggle"]'),
      ],
    });
  });

  test('explorer tab renders platform cards correctly', async ({ page }) => {
    const explorerTab = page.locator('[data-testid="tab-explorer"]');
    await expect(explorerTab).toBeVisible({ timeout: 5000 });
    await explorerTab.click();
    await page.waitForLoadState('networkidle');
    
    const firstCard = page.locator('[data-testid^="card-platform-"]').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });
    await expect(firstCard).toHaveScreenshot('platform-card.png', {
      maxDiffPixels: 150,
    });
  });

  test('comparison tab renders correctly with selected platforms', async ({ page }) => {
    const explorerTab = page.locator('[data-testid="tab-explorer"]');
    await expect(explorerTab).toBeVisible({ timeout: 5000 });
    await explorerTab.click();
    await page.waitForTimeout(500);
    
    const compareButtons = page.locator('[data-testid^="button-compare-"]');
    await expect(compareButtons.first()).toBeVisible({ timeout: 5000 });
    
    const count = await compareButtons.count();
    for (let i = 0; i < Math.min(2, count); i++) {
      await compareButtons.nth(i).click();
      await page.waitForTimeout(300);
    }
    
    const comparisonTab = page.locator('[data-testid="tab-comparison"]');
    await expect(comparisonTab).toBeVisible();
    await comparisonTab.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main')).toHaveScreenshot('comparison-view.png', {
      maxDiffPixels: 300,
      mask: [
        page.locator('[data-testid="button-theme-toggle"]'),
      ],
    });
  });

  test('matrix tab renders capability grid correctly', async ({ page }) => {
    const matrixTab = page.locator('[data-testid="tab-matrix"]');
    await expect(matrixTab).toBeVisible({ timeout: 5000 });
    await matrixTab.click();
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main')).toHaveScreenshot('tab-matrix-view.png', {
      maxDiffPixels: 250,
      mask: [
        page.locator('[data-testid="button-theme-toggle"]'),
      ],
    });
  });

  test('dark mode renders correctly', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="button-theme-toggle"]');
    await expect(themeToggle).toBeVisible({ timeout: 5000 });
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    await expect(page.locator('main')).toHaveScreenshot('app-dark-mode.png', {
      maxDiffPixels: 200,
      mask: [themeToggle],
    });
    
    await themeToggle.click();
  });
});
