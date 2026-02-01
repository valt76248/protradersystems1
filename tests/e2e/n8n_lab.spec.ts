import { test, expect } from '@playwright/test';

test.describe('N8N Lab System Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the Lab page
        await page.goto('/n8n-lab', { waitUntil: 'domcontentloaded' });
        // Wait for components to be ready
        await expect(page.getByText('n8n Workflow Lab', { exact: false })).toBeVisible({ timeout: 20000 });
    });

    test('should load all initial elements correctly', async ({ page }) => {
        // Increased timeout for slow dev environments
        await expect(page.getByText('n8n Workflow Lab', { exact: false })).toBeVisible({ timeout: 15000 });
        await expect(page.getByTestId('execute-pulse-button')).toBeVisible();
        await expect(page.getByTestId('payload-editor')).toBeVisible();
    });

    test('should switch workflows and update payload', async ({ page }) => {
        // Wait for sidebar to be visible
        await expect(page.getByTestId('workflow-select-quiz-lead')).toBeVisible();

        // Switch to Quiz workflow (id is quiz-lead)
        await page.getByTestId('workflow-select-quiz-lead').click({ force: true });

        // Check if the payload editor contains quiz-related data with retry
        await expect(page.getByTestId('payload-editor')).toHaveValue(/student@trading\.com/, { timeout: 10000 });
    });

    test('should simulate a logic pulse execution', async ({ page }) => {
        // Select Pre-registration (default)
        const wfSelect = page.getByTestId('workflow-select-pre-registration');
        await expect(wfSelect).toBeVisible();
        await wfSelect.click({ force: true });

        // Click execute
        const executeBtn = page.getByTestId('execute-pulse-button');
        await expect(executeBtn).toBeEnabled();
        await executeBtn.click({ force: true });

        // Wait a bit for the JS propagation to start
        await page.waitForTimeout(1000);

        // Check if nodes start lighting up (animation status)
        const firstNode = page.getByTestId('lab-node-webhook-pre-registration');
        await expect(firstNode).toContainText(/Processing|Success/, { timeout: 25000 });

        // Wait for the final response in the stream
        const outputStream = page.getByTestId('output-stream');
        await expect(outputStream).not.toContainText('Waiting for kernel response', { timeout: 40000 });

        // Also verify we don't have a server-level failure (404/500/Forbidden)
        await expect(outputStream).not.toContainText(/HTTP Error (4|5)\d{2}|"status": (4|5)\d{2}/, { timeout: 2000 });
    });

    test('should handle manual payload editing', async ({ page }) => {
        const editor = page.getByTestId('payload-editor');
        await editor.fill(JSON.stringify({ test: "manual_value" }));
        await expect(editor).toHaveValue(/manual_value/);
    });
});
