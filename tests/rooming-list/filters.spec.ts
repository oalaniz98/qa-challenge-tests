import { test, expect } from '@playwright/test';

test.describe('Rooming List - Filters Functionality', () => {
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

    test('TC06 - Clicking Filters button opens the filter dropdown', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await expect(page.getByRole('banner')).toContainText('Active');
    });


    test('TC07 - Filter options are Active, Closed, and Cancelled', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await expect(page.getByText('ActiveClosedCancelled')).toBeVisible();
    });

    test('TC08 - Selecting a filter updates the event list', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await page.locator('.sc-jyynfN').first().click();
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('main')).toContainText('Active');
    });

    test('TC09 - Save button applies the selected filters', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await page.locator('div:nth-child(3) > .sc-jyynfN').click();
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.getByText('Closed').first()).toBeVisible();
    });

    test('TC10 - Selected filters remain checked after reopening filter menu', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await page.locator('.sc-jyynfN').first().click(); // Active check
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await expect(page.getByRole('banner').getByRole('img').nth(2)).toBeVisible(); // Expected active check
    });

    test('TC11 - Multiple filters can be selected and deselected', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await page.locator('.sc-jyynfN').first().click();
        await page.locator('.sc-jyynfN.iFWSdw').first().click();
        await page.getByRole('banner').getByRole('img').nth(4).click();
        await page.getByRole('banner').getByRole('img').nth(3).click();
        await page.locator('div').filter({ hasText: /^ActiveClosedCancelled$/ }).getByRole('img').click();
        await expect(page.getByText('ActiveClosedCancelled')).toBeVisible();
    });

    test('TC12 - Events are grouped under event names like festivals', async ({ page }) => {
        await expect(page.getByText('Austin City Limits')).toBeVisible();
        await expect(page.getByText('Ultra Musical Festival')).toBeVisible();
    });

    test('TC13 - Event cards display RFP name, agreement type, and dates', async ({ page }) => {
        await page.getByText('[ACL Headliner Suites]Agreement: ArtistSEP3Cut-Off DateOct 16, 2023 - Oct 23,').click();
        await expect(page.getByText('Agreement: Artist').first()).toBeVisible();
        await expect(page.getByText('Oct 16, 2023 - Oct 23,')).toBeVisible();
    });

    test('TC14 - View Bookings button is visible on each event card', async ({ page }) => {
        const bookingButtons = page.locator('button:has-text("View Bookings")');
        const count = await bookingButtons.count();
        expect(count).toBeGreaterThan(0);
    });

    test('TC15 - Booking number matches expected data', async ({ page }) => {
        const bookingText = await page.locator('text=View Bookings').first().innerText();
        expect(bookingText).toMatch(/View Bookings\s*\(\d+\)/);
    });

    test('TC16 - Clicking View Bookings opens booking details', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Oct 16, 2023 - Oct 23, 2023ActiveView Bookings \(2\)$/ }).getByRole('button').first().click();
        await expect(page.getByRole('heading', { name: 'Bookings' })).toBeVisible();
    });

    test('TC17 - Horizontal scroll is functional on event list', async ({ page }) => {
        const scrollTrigger = page.locator('.sc-jJAtPt').first();
        const scrollRightButton = page.locator('.sc-fMGxnE.dqnWDz > .sc-gZEilz').first();
        const scrollIndicator = page.locator('.sc-dcKlJK').first();

        await scrollTrigger.click();
        await scrollRightButton.click();
        await scrollRightButton.click();

        await expect(scrollIndicator).toBeVisible();
    });

    test('TC18 - Page title is correctly displayed', async ({ page }) => {
        await expect(page.getByText('Rooming List Management: Events')).toBeVisible();
    });

    test('TC19 - Filters dropdown is aligned properly', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await expect(page.getByRole('banner')).toContainText('ActiveClosedCancelled');
    });


    test('TC20 - Event groups have visual separators', async ({ page }) => {
        await expect(page.locator('.sc-fPyrPm').first()).toBeVisible();
    });


    test('TC21 - Shows empty state when no events are available', async ({ page }) => {
        // Simulate empty state by navigating to a clean state (if supported)
        await page.reload();

        const importButton = page.getByRole('button', { name: /import data/i });
        if (await importButton.isVisible()) {
            await expect(page.getByText('No rooming lists found')).toBeVisible();
        }
    });

    test('TC22 - Search and filters work together', async ({ page }) => {
        await page.getByRole('button', { name: 'Filters Filters' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('textbox', { name: 'Search' }).fill('acl tour');
        await expect(page.getByText('[ACL Tour Management]')).toBeVisible();
    });

    test('TC23 - Event cards are responsive', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Rooming List Management:' })).toBeVisible();
    });

});
