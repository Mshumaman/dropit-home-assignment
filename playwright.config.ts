import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    timeout: 1200000,
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
        {
            name: 'Microsoft Edge',
            use: {...devices['Desktop Edge'], channel: 'msedge'},
        },
        //
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
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
        }
    },

});
