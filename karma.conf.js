/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

const sauceBrowsers = require('./sauceBrowsers.conf.js');

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  return ['test/specs/index.js'];
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

      customLaunchers = sauceBrowsers;
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

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },

    autoWatch: true,
    singleRun: config.singleRun === 'true',

    preprocessors: {
      'test/**/*.+(js|jsx)': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[folder]-[name]--[local]',
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|svg)$/,
            use: [
              {
                loader: 'url-loader',
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
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
