/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const sauceBrowsers = require('./sauceBrowsers.conf.js');

const port = 8888;

let server;

let config = {
  specs: [
    './test/integration/**/*.js',
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'firefox',
  }],
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: `http://localhost:${port}`,
  waitforTimeout: 5000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    'selenium-standalone',
  ],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 40000,
  },
  onPrepare: () => {
    server = new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer);

    server.listen(port, '127.0.0.1', () => {
      console.log(`Starting webpack dev server on http://localhost:${port}`);
    });
  },
  before: () => {
    // Set up chai here, so every test file doesn't have to do it.
    // eslint-disable-next-line global-require
    const chai = require('chai');

    chai.should();
  },
  onComplete: () => {
    server.close();
  },
};

if (
  process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
  process.env.SAUCE_USERNAME &&
  process.env.SAUCE_ACCESS_KEY
) {
  // We're on Travis, and Sauce Labs environment variables are available.
  // Run on the Sauce Labs cloud using the full set of browsers.

  console.log('Running on Sauce Labs.');

  config = Object.assign({}, config, {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce', 'selenium-standalone'],
    sauceConnect: true,
    capabilities: Object.values(sauceBrowsers).map(capability => Object.assign({}, capability, {
      name: 'cspace-ui integration tests',
      build: process.env.TRAVIS_BUILD_NUMBER,
    })),
  });
}

exports.config = config;
