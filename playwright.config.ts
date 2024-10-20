import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    timeout: 1200000,
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', {open: 'never'}],
        ['junit', {outputFile: 'results.xml'}]],

    projects: [
        {
            name: 'UI Automation',
            testDir: 'uiAutomation',
            use: {...devices['Desktop Chrome'], channel: 'chrome'},
        },
        {
            name: 'API Automation',
            testDir: 'api',
            use: {...devices['Desktop Chrome'], channel: 'chrome'},
        },
        // {
        //     name: 'Microsoft Edge',
        //     use: {...devices['Desktop Edge'], channel: 'msedge'},
        // },
        // {
        //   name: 'chromium',
        //   use: { ...devices['Desktop Chrome'] },
        // },
        //
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

    ],
    use: {
        viewport: {width: 1440, height: 900},
        trace: 'on-first-retry',
        screenshot: 'on',
        video: {
            mode: "retain-on-failure",
        },
        actionTimeout: 30000,
        launchOptions: {
            slowMo: 250,
            args: ['--start-maximized']
        }
    },

});
