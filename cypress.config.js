const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  fixturesFolder: './cypress/fixtures',
  downloadsFolder: './cypress/downloads',
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/report',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    reportDir: './cypress/report',
    reportFilename: '[datetime]-[name]-report',
    timestamp: 'shortDate',
    charts: true,
    embeddedScreenshots: true,
  },
  e2e: {
    baseUrl: 'https://www.amazon.com',
    supportFile: './cypress/support/index.js',
    specPattern: './cypress/e2e',
    env: {
      email: '***',
      password: '***',
      userName: 'Sezer'
    }
  },
})
