
import { test, expect } from '@playwright/test';

test.describe('Full Course Purchase Flow', () => {

    test('should register, login, and "buy" two courses via pre-registration', async ({ page }) => {

        // Mock Supabase Auth
        const mockUser = {
            id: 'mock-user-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'test@example.com',
            email_confirmed_at: new Date().toISOString(),
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: { full_name: 'Test User' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const mockSession = {
            access_token: 'mock-access-token',
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'mock-refresh-token',
            user: mockUser,
        };

        // Intercept Signup
        await page.route('**/auth/v1/signup', async route => {
            console.log('Intercepted Supabase SignUp');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockSession)
            });
        });

        // Intercept Login (token grant)
        await page.route('**/auth/v1/token?grant_type=password', async route => {
            console.log('Intercepted Supabase Login');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockSession)
            });
        });

        // Intercept getUser (often called on mount)
        await page.route('**/auth/v1/user', async route => {
            // If we have a token in header, return user.
            // For simplicity, always return user if asked (simulating logged in state persistence)
            // But initially we are not logged in.
            // Actually, `supabase-js` checks local storage.
            // If we mock login, it writes to local storage.
            // Next time it calls getUser.
            console.log('Intercepted Supabase GetUser');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockUser)
            });
        });


        // --- 1. Registration ---
        console.log('--- Step 1: Registration ---');
        await page.goto('/login');

        // Toggle to Register mode
        const registerSwitch = page.locator('button').filter({ hasText: /Создать аккаунт|Регистрация|Create Account|Створити акаунт/i }).last();
        await expect(registerSwitch).toBeVisible();
        await registerSwitch.click();

        // Fill Registration Form
        const timestamp = Date.now();
        const email = `testuser_${timestamp}@example.com`;
        const password = 'Password@123';

        await page.fill('input#firstName', 'Test');
        await page.fill('input#lastName', 'User');
        await page.fill('input#email', email);
        await page.fill('input#phone', '+1234567890');
        await page.fill('input#password', password);
        await page.fill('input#confirmPassword', password);

        // Terms checkbox
        await page.locator('input#terms-checkbox').check();

        // Submit registration
        const submitBtn = page.locator('button[type="submit"]');
        await submitBtn.click();

        // Wait for logged in state
        // Since we mocked success with session, client should proceed to store session and redirect/close.
        // Navbar check
        const accountLink = page.getByRole('link', { name: /Аккаунт|Account/i });

        await expect(accountLink).toBeVisible({ timeout: 15000 });
        console.log('User registered and logged in (Mocked).');

        // --- 2. Buy Course 1 ---
        console.log('--- Step 2: Buy Course 1 ---');
        await page.goto('/courses');

        const buttons = page.locator('button:has(.lucide-bitcoin)');
        await expect(buttons.first()).toBeVisible();
        await buttons.first().click();

        // Handle Crypto Modal
        await expect(page.getByText('Оплата криптовалютой')).toBeVisible();
        await page.getByRole('button', { name: /Я оплатил/i }).click();

        await expect(page).toHaveURL(/\/pre-registration/);

        // Intercept n8n webhook
        await page.route('https://n8n.protradersystems.com/webhook/pre-registration', async route => {
            console.log('Intercepted webhook request');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ status: 'success', message: 'Intercepted!' })
            });
        });

        // Fill Pre-registration Form
        await page.getByPlaceholder('Ваше имя').fill('Test');
        await page.getByPlaceholder('Ваша фамилия').fill('User');
        await page.locator('input[type="email"]').fill(email);
        await page.getByPlaceholder('+380 XX XXX XX XX').fill('+1234567890');
        await page.getByRole('radio', { name: 'Telegram' }).check();
        await page.getByPlaceholder('@username').first().fill('@testuser');
        await page.getByLabel('до 500 $').check();
        await page.getByText('Финансовые трудности').click();
        await page.getByPlaceholder('Например: стабильный винрейт, работа над дисциплиной...').fill('Test goal');
        await page.getByPlaceholder('Опишите ваши финансовые и профессиональные цели...').fill('Test result');
        await page.getByPlaceholder('Опишите вашу текущую мотивацию...').fill('Test motivation');
        await page.getByLabel('Да, я уже прямо сейчас готов(а) платить').check();

        await page.getByRole('button', { name: /Отправить заявку|Submit|Отправить/i }).click();

        await expect(page.getByText('Анкета отправлена!')).toBeVisible({ timeout: 15000 });

        await page.getByText('Вернуться на главную').click();
        await expect(page).toHaveURL(/\/$/);

        // --- 3. "Buy" Course 2 ---
        console.log('--- Step 3: Buy Course 2 ---');
        await page.goto('/courses');

        const secondButton = buttons.nth(1);
        await expect(secondButton).toBeVisible();
        await secondButton.click();

        // Handle Crypto Modal
        await expect(page.getByText('Оплата криптовалютой')).toBeVisible();
        await page.getByRole('button', { name: /Я оплатил/i }).click();

        await expect(page).toHaveURL(/\/pre-registration/);

        await page.getByPlaceholder('Ваше имя').fill('Test');
        await page.getByPlaceholder('Ваша фамилия').fill('User');
        await page.locator('input[type="email"]').fill(email);
        await page.getByPlaceholder('+380 XX XXX XX XX').fill('+1234567890');
        await page.getByRole('radio', { name: 'Telegram' }).check();
        await page.getByPlaceholder('@username').first().fill('@testuser');
        await page.getByLabel('до 500 $').check();
        await page.getByText('Финансовые трудности').click();
        await page.getByPlaceholder('Например: стабильный винрейт, работа над дисциплиной...').fill('Test goal 2');
        await page.getByPlaceholder('Опишите ваши финансовые и профессиональные цели...').fill('Test result 2');
        await page.getByPlaceholder('Опишите вашу текущую мотивацию...').fill('Test motivation 2');
        await page.getByLabel('Да, я уже прямо сейчас готов(а) платить').check();

        await page.getByRole('button', { name: /Отправить заявку|Submit|Отправить/i }).click();

        await expect(page.getByText('Анкета отправлена!')).toBeVisible({ timeout: 15000 });
        console.log('Second course "purchased".');

    });
});
