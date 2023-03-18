/* eslint no-console: "off" */

const path = require('path');
const webpack = require('webpack');

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  return ['test/specs/index.js'];
};

module.exports = function karma(config) {
  const localBrowsers = ['Chrome'];
  const githubBrowsers = ['Chrome'];

  let browsers;

  if (process.env.GITHUB_ACTIONS) {
    // This is a CI run on GitHub.

    console.log('Running on GitHub.');

    browsers = githubBrowsers;
  } else {
    // This is a local run.

    console.log('Running locally.');

    browsers = localBrowsers;
  }

  config.set({
    browsers,
    files: [
      { pattern: 'mockServiceWorker.js', included: false, served: true },
      ...getTestFiles(config),
    ],

    frameworks: [
      'mocha',
      'chai',
      'webpack',
    ],

    reporters: [
      'mocha',
      'coverage',
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
            exclude: path.resolve(__dirname, 'node_modules'),
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
                  modules: {
                    localIdentName: '[folder]-[name]--[local]',
                  },
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|svg)$/,
            type: 'asset/inline',
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'cspaceUI.isProduction': false,
          'cspaceUI.packageName': '"cspace-ui"',
          'cspaceUI.packageVersion': '"0.0.1-test.1"',
          'cspaceUI.buildNum': '"1234567"',
          'cspaceUI.repositoryUrl': '"https://github.com/collectionspace/cspace-ui.js.git"',
        }),
      ],
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },

    // Make webpack output less verbose.

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

    proxies: {
      '/mockServiceWorker.js': '/base/mockServiceWorker.js',
    },
  });
};
