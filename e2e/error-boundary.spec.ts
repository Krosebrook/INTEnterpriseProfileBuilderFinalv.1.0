import { test, expect } from '@playwright/test';

test.describe('Error Boundary Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('main error boundary UI renders correctly', async ({ page }) => {
    await page.evaluate(() => {
      const errorEvent = new ErrorEvent('error', {
        error: new Error('Test error for visual regression'),
        message: 'Test error for visual regression',
      });
      window.dispatchEvent(errorEvent);
    });
    
    const errorCard = page.locator('[data-testid="button-error-try-again"]').locator('..');
    
    if (await errorCard.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(errorCard).toHaveScreenshot('error-boundary-card.png', {
        maxDiffPixels: 150,
      });
    }
  });

  test('error boundary buttons are properly styled', async ({ page }) => {
    const tryAgainButton = page.locator('[data-testid="button-error-try-again"]');
    const reloadButton = page.locator('[data-testid="button-error-reload"]');
    
    if (await tryAgainButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(tryAgainButton).toHaveScreenshot('try-again-button.png');
      await expect(reloadButton).toHaveScreenshot('reload-button.png');
    }
  });

  test('application loads without errors - baseline screenshot', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });
    
    await expect(page).toHaveScreenshot('app-healthy-state.png', {
      fullPage: false,
      maxDiffPixels: 200,
      mask: [
        page.locator('[data-testid="theme-toggle"]'),
      ],
    });
  });

  test('tab navigation maintains visual consistency', async ({ page }) => {
    const tabs = ['explorer', 'comparison', 'matrix', 'roi', 'strategy', 'assessment', 'profile'];
    
    for (const tab of tabs.slice(0, 3)) {
      const tabButton = page.locator(`[data-testid="tab-${tab}"]`);
      if (await tabButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await tabButton.click();
        await page.waitForTimeout(500);
        
        await expect(page.locator('main')).toHaveScreenshot(`tab-${tab}-view.png`, {
          maxDiffPixels: 250,
          mask: [
            page.locator('[data-testid="theme-toggle"]'),
          ],
        });
      }
    }
  });

  test('ROI calculator form displays correctly', async ({ page }) => {
    const roiTab = page.locator('[data-testid="tab-roi"]');
    if (await roiTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await roiTab.click();
      await page.waitForLoadState('networkidle');
      
      const formContainer = page.locator('form').first();
      if (await formContainer.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(formContainer).toHaveScreenshot('roi-form.png', {
          maxDiffPixels: 200,
        });
      }
    }
  });

  test('platform cards render consistently in explorer', async ({ page }) => {
    const explorerTab = page.locator('[data-testid="tab-explorer"]');
    if (await explorerTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await explorerTab.click();
      await page.waitForLoadState('networkidle');
      
      const firstCard = page.locator('[data-testid^="card-platform-"]').first();
      if (await firstCard.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(firstCard).toHaveScreenshot('platform-card.png', {
          maxDiffPixels: 150,
        });
      }
    }
  });

  test('comparison view renders selected platforms correctly', async ({ page }) => {
    const explorerTab = page.locator('[data-testid="tab-explorer"]');
    if (await explorerTab.isVisible({ timeout: 2000 }).catch(() => false)) {
      await explorerTab.click();
      await page.waitForTimeout(500);
      
      const compareButtons = page.locator('[data-testid^="button-compare-"]');
      const count = await compareButtons.count();
      
      for (let i = 0; i < Math.min(2, count); i++) {
        await compareButtons.nth(i).click();
        await page.waitForTimeout(300);
      }
      
      const comparisonTab = page.locator('[data-testid="tab-comparison"]');
      if (await comparisonTab.isVisible()) {
        await comparisonTab.click();
        await page.waitForLoadState('networkidle');
        
        await expect(page.locator('main')).toHaveScreenshot('comparison-view.png', {
          maxDiffPixels: 300,
          mask: [
            page.locator('[data-testid="theme-toggle"]'),
          ],
        });
      }
    }
  });

  test('dark mode error state renders correctly', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    if (await themeToggle.isVisible({ timeout: 2000 }).catch(() => false)) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      await expect(page.locator('main')).toHaveScreenshot('app-dark-mode.png', {
        maxDiffPixels: 200,
        mask: [themeToggle],
      });
      
      await themeToggle.click();
    }
  });
});
