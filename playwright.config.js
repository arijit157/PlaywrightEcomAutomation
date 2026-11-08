// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: 'html',

  //retries: 1,

  timeout: 40 * 1000,

  expect: {
    timeout: 30*1000
  },

  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on',
    browserName: 'chromium',
    headless: process.env.CI === 'true',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 1000
    },
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true
  },

  /* Configure projects for major browsers */
  /*projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]*/
});
