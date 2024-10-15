import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
            name: 'Google Chrome',
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
