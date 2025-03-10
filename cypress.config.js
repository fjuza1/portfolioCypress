const { defineConfig } = require('cypress');
const { SOVATESTURL,TIMEOUT, SKILLSURL, PROJECTSURL, CONTACTURL, ABOUTURL, JOURNEYURL, MIN_RES } = require('./cypress/support/config.js');

module.exports = defineConfig({
  projectId: 'vo5xuz',
  env:{
    skillsUrl: SKILLSURL,
    projectsUrl:PROJECTSURL,
    contactUrl:CONTACTURL,
    journeyUrl:JOURNEYURL,
    aboutUrl:ABOUTURL,
    results: MIN_RES,
    timeout: TIMEOUT,
  },
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
      return config;
    },
    testIsolation: true,
    keystrokeDelay: 200,
    headless: true,
    chromeWebSecurity: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalCspAllowList: ["frame-src"],
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
