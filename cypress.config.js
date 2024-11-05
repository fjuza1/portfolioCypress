const { defineConfig } = require('cypress');
const { SOVATESTURL,TIMEOUT } = require('./cypress/support/config.js');
const prostredia = require('./prostredia.js');

module.exports = defineConfig({
  projectId: '64pvue',
  e2e: {
    baseUrl: SOVATESTURL,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--auto-open-devtools-for-tabs');
        }
        return launchOptions;
      });
      config.env.configFile = prostredia;
      return config;
    },
    testIsolation: true,
    headless: true,
    chromeWebSecurity: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalCspAllowList: ["frame-src"],
  },
  env: {
    USER:'filip.juza@kdcsro.sk',
    PASS:'Nvrm@mlu1.',
  },
  experimentalStudio: true,
  viewportHeight: 720,
  viewportWidth: 1280,
  downloadsFolder: './downloads',
  video: true,
  watchForFileChanges: true,
  experimentalFetchPolyfill: true,
  trashAssetsBeforeRuns: true,
  scrollBehavior: 'nearest',
});
