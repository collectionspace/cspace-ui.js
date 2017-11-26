// Browsers to test in Sauce Labs. This configuration is used by both Karma and WDIO test runners.
// See karma.conf.js and wdio.conf.js.

module.exports = {
  'chrome-latest-mac': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'macOS 10.12',
  },
  'chrome-previous-mac': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'macOS 10.12',
  },
  'firefox-latest-mac': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'macOS 10.12',
  },
  'firefox-previous-mac': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'macOS 10.12',
  },
  // 'safari-latest-mac': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   version: 'latest',
  //   platform: 'macOS 10.12',
  // },
  // 'edge-latest-win10': {
  //   base: 'SauceLabs',
  //   browserName: 'microsoftedge',
  //   version: 'latest',
  //   platform: 'Windows 10',
  // },
  // 'safari-ios-10.2': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platformName: 'iOS',
  //   platformVersion: '10.2',
  //   deviceName: 'iPad Retina Simulator',
  //   appiumVersion: '1.6',
  // },
};
