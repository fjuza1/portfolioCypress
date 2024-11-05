const { defineConfig } = require('cypress');
const { SOVATESTURL,TIMEOUT, SUPPORT_FILE } = require('./cypress/support/config.js');
const prostredia = require('./prostredia.js');

module.exports = defineConfig({
  projectId: '3o13nv',
  e2e: {
    supportFile: SUPPORT_FILE,
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
