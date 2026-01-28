import { test, expect } from '@playwright/test';

test.describe('Registration Logic', () => {

    test('should navigate to registration form and fill details', async ({ page }) => {

        // 1. Setup: Go to Login page
        await page.goto('/login');

        // 2. Action: Switch to Register mode
        // Using a broad locator to find the toggle button. 
        // It usually says "Register" or "Create Account" or "Регистрация"
        // We look for a button near the "no account" text or similar structure.
        // In LoginForm.tsx, it's the button AFTER the separator.
        const registerToggleBtn = page.locator('button', { hasText: /Register|Регистрация|Create Account|Створити акаунт/i }).last();

        // Fallback: if there are multiple, picking the one that is likely the toggle (ghost-glow-silver variant usually implies secondary action)
        await expect(registerToggleBtn).toBeVisible();
        await registerToggleBtn.click();

        // 3. Verification: Check if Registration form is visible
        // RegisterForm has "First Name" or "Ім'я" input
        await expect(page.locator('input#firstName')).toBeVisible();

        // 4. Action: Fill Form
        await page.fill('input#firstName', 'Test');
        await page.fill('input#lastName', 'User');
        const email = `test.user.${Date.now()}@example.com`;
        await page.fill('input#email', email);
        await page.fill('input#phone', '+1234567890');
        await page.fill('input#password', 'password123');
        await page.fill('input#confirmPassword', 'password123');

        // 5. Action: Agree to terms
        await page.locator('input#terms-checkbox').check();

        // 6. Action: Submit
        const submitBtn = page.locator('button[type="submit"]');
        await expect(submitBtn).toBeVisible();

        // NOTE: We do not click submit to avoid creating junk data in production Supabase 
        // unless we mock the backend. For this smoke test, reaching this point verifies the UI works.
        // Uncomment the next line if you want to actually try submitting.
        // await submitBtn.click();

        console.log('Test completed: Form filled successfully');
    });

});
