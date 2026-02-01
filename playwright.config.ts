import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    timeout: 60 * 1000,
    expect: {
        timeout: 15000,
    },
    use: {
        baseURL: 'http://localhost:8080',
        trace: 'on-first-retry',
        actionTimeout: 20000,
        navigationTimeout: 30000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:8080',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
