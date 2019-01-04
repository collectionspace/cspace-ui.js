// Browsers to test in Sauce Labs. This configuration is used by both Karma and WDIO test runners.
// See karma.conf.js and wdio.conf.js.

module.exports = {
  'chrome-latest-macos': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'macOS 10.13',
  },
  'chrome-previous-macos': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'macOS 10.13',
  },
  'firefox-latest-macos': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'macOS 10.13',
  },
  'firefox-previous-macos': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'macOS 10.13',
  },
  // 'safari-latest-macos': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   version: 'latest',
  //   platform: 'macOS 10.13',
  // },
  // 'edge-latest-win10': {
  //   base: 'SauceLabs',
  //   browserName: 'microsoftedge',
  //   version: 'latest',
  //   platform: 'Windows 10',
  // },
  // 'safari-ios-11.2': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platformName: 'iOS',
  //   platformVersion: '11.2',
  //   deviceName: 'iPad Simulator',
  // },
};
