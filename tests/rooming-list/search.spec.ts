import { test, expect } from '@playwright/test';

test.describe('Rooming List - Search Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.reload(); 

        const importButton = page.getByRole('button', { name: /import data/i });
        if (await importButton.isVisible()) {
            await importButton.click();
            await expect(page.getByText('No rooming lists found')).toBeHidden();
        }

        const groupHeader = page.locator('text=Austin City Limits');
        await expect(groupHeader).toBeVisible();
    });


    test('TC01 - Search input is visible', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Search');
        await expect(searchInput).toBeVisible();
    });

    test('TC02 - User can type in the Search input', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Search');
        await searchInput.fill('ACL');
        await expect(searchInput).toHaveValue('ACL');
    });

    test('TC04 - Search returns empty state when no matches found', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Search' }).click();
        await page.getByRole('textbox', { name: 'Search' }).fill('no match');
        await expect(page.getByRole('heading', { name: 'No rooming lists found' })).toBeVisible();
    });

    test('TC03 - Filter event list with search term', async ({ page }) => {
        const searchInput = page.getByPlaceholder('Search');
        await searchInput.fill('Ultra');

        const filteredResults = page.locator('div:has-text("Ultra")');
        const count = await filteredResults.count();

        expect(count).toBeGreaterThan(0);

        const aclEvents = page.locator('div:has-text("ACL")');
        await expect(aclEvents).toHaveCount(0);
    });

    test('TC05 - Filters button is visible', async ({ page }) => {
        const filtersButton = page.getByRole('button', { name: /filters/i });
        await expect(filtersButton).toBeVisible();
    });


});
