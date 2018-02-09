// Browsers to test in Sauce Labs. This configuration is used by both Karma and WDIO test runners.
// See karma.conf.js and wdio.conf.js.

module.exports = {
  'chrome-latest-osx': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'OS X 10.13',
  },
  'chrome-previous-osx': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'OS X 10.13',
  },
  'firefox-latest-osx': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'OS X 10.13',
  },
  'firefox-previous-osx': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'OS X 10.13',
  },
  // 'safari-latest-osx': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   version: 'latest',
  //   platform: 'OS X 10.13',
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
