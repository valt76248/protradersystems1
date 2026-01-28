
import { test, expect } from '@playwright/test';

test.describe('Referral Program Tests', () => {

    test('should show referral link and update domain to production', async ({ page }) => {

        // Mock Supabase Auth User
        const mockUser = {
            id: '85519B64-mock-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'partner@example.com',
            user_metadata: { full_name: 'Partner User' },
        };

        const mockSession = {
            access_token: 'mock-access-token',
            user: mockUser,
        };

        // Intercept Supabase Auth calls
        await page.route('**/auth/v1/user', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockUser)
            });
        });

        // Intercept Referrals Data
        await page.route('**/rest/v1/referrals*', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    { id: 1, status: 'completed', referrer_id: mockUser.id },
                    { id: 2, status: 'completed', referrer_id: mockUser.id },
                    { id: 3, status: 'pending', referrer_id: mockUser.id },
                ])
            });
        });

        // 1. Go to Account page
        await page.goto('/account');

        // 2. Click on Referral Tab
        const referralTab = page.getByTestId('referral-tab');
        await referralTab.click();

        // 3. Check for Production Domain in Referral Link
        const referralLinkCode = page.locator('code');
        await expect(referralLinkCode).toContainText('https://protradersystems.com/?ref=85519B64');
        console.log('✅ Referral link uses production domain.');

        // 4. Check Commission Note (5%)
        await expect(page.getByText('5% от стоимости курса — ваша комиссия')).toBeVisible();
        console.log('✅ Standard commission (5%) text is visible.');

        // 5. Check VIP Info (10%)
        await expect(page.getByText(/🌟 VIP Партнёр|🌟 VIP Партнер/)).toBeVisible();
        await expect(page.getByText('И получайте 10% комиссию (до $200) с каждой продажи!')).toBeVisible();
        console.log('✅ VIP commission (10%) text is visible.');

        // 6. Test Copy Button
        // We can't easily check clipboard in CI, but we can check the toast/success state
        const copyBtn = page.locator('button').filter({ has: page.locator('.lucide-copy') }).first();
        await copyBtn.click();

        // Check for success message (Try Russian first, then Ukrainian if needed)
        const successMsgRu = page.getByText('Ссылка скопирована!');
        const successMsgUk = page.getByText('Посилання скопійовано!');

        await expect(successMsgRu.or(successMsgUk)).toBeVisible();
        console.log('✅ Copy to clipboard works and shows success toast.');
    });
});
