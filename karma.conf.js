/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

const webpack = require('webpack');

const sauceLaunchers = {
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
  // 'safari-ios-10.0': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platformName: 'iOS',
  //   platformVersion: '10.0',
  //   deviceName: 'iPad Air 2 Simulator',
  //   appiumVersion: '1.6.0',
  // },
};

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  const defaultTestDirs = [
    'test/specs',
    'test/integration',
  ];

  const testDirs = config.dir ? config.dir.split(',') : defaultTestDirs;

  return testDirs.map(dir => `${dir}/**/*.+(js|jsx)`);
};

module.exports = function karma(config) {
  let browsers = [];
  let customLaunchers = {};

  if (process.env.TRAVIS_BUILD_NUMBER) {
    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.SAUCE_USERNAME &&
        process.env.SAUCE_ACCESS_KEY) {
      // We're on Travis, and Sauce Labs environment variables are available.
      // Run on the Sauce Labs cloud using the full set of browsers.

      console.log('Running on Sauce Labs.');

      customLaunchers = sauceLaunchers;
      browsers = Object.keys(customLaunchers);
    } else {
      // We're on Travis, but Sauce Labs environment variables aren't available.
      // Run on Travis, using Firefox.

      console.log('Running on Travis.');

      browsers = [
        'Firefox',
      ];
    }
  } else {
    // This is a local run.
    const karmaBrowsers = process.env.KARMA_BROWSERS;
    const localBrowsers = karmaBrowsers ? karmaBrowsers.split(',') : ['Chrome'];

    console.log('Running locally.');

    browsers = localBrowsers;
  }

  config.set({
    browsers,
    customLaunchers,
    files: getTestFiles(config),

    frameworks: [
      'mocha',
      'chai',
    ],

    reporters: [
      'mocha',
      'coverage',
      'saucelabs',
    ],

    autoWatch: true,
    singleRun: config.singleRun === 'true',

    preprocessors: {
      'test/**/*.+(js|jsx)': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      devtool: 'cheap-module-inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&localIdentName=[folder]-[name]--[local]',
          },
          {
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader',
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ],
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
    },

    // Make webpack output less verbose, so Travis can display the entire log.

    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

    port: 9876,
    colors: true,

    // Code will have been instrumented via Babel and babel-plugin-istanbul
    // when NODE_ENV is 'test' (see .babelrc).

    coverageReporter: {
      type: 'json',
      dir: 'coverage/',
    },

    // Sauce Labs configuration.

    sauceLabs: {
      testName: 'cspace-ui tests',
      recordScreenshots: false,
      public: true,
      connectOptions: {
        directDomains: ['cdn.polyfill.io'],
      },
    },

    // Tolerate Sauce Labs slowness/flakiness.

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,

    // Add middleware to fall back to the base path.
    // This allows running React Router with browser history.

    beforeMiddleware: ['fallbackMiddleware'],

    plugins: [
      ...config.plugins,

      {
        'middleware:fallbackMiddleware': ['factory', function create() {
          const contextPath = '/context.html';
          const debugPath = '/debug.html';

          return function fallback(req, res, next) {
            let basePath = null;

            if (req.url.startsWith(contextPath)) {
              basePath = contextPath;
            } else if (req.url.startsWith(debugPath)) {
              basePath = debugPath;
            }

            if (basePath) {
              const rest = req.url.substring(basePath.length);

              if (rest.indexOf('.') >= 0) {
                const parts = rest.split('/');
                const last = parts.pop();

                req.url = `/${last}`; // eslint-disable-line no-param-reassign
              } else {
                req.url = basePath; // eslint-disable-line no-param-reassign
              }
            }

            next();
          };
        }],
      },
    ],
  });
};
