/* eslint import/no-extraneous-dependencies: "off" */
/* eslint-disable no-console */

const { execSync } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServerConfig = require('./webpackDevServerConfig');

/**
 * The public path to local webpack assets. This is chosen to have low chance of collision with any
 * path on a proxied back-end (e.g., "/cspace/core" or "/cspace-services"). This should start and
 * end with slashes.
 */
const publicPath = '/webpack-dev-assets/';

const library = 'cspaceUI';
const isProduction = process.env.NODE_ENV === 'production';

let buildNum = '';
let repositoryUrl = '';

try {
  buildNum = execSync('git rev-parse --short=7 HEAD').toString().trim();
} catch (err) {
  console.log('Failed to get build number from git: %s', err.stderr.toString());
}

try {
  repositoryUrl = JSON.parse(execSync('npm pkg get repository.url').toString().trim());
} catch (err) {
  console.log('Failed to get repository url from npm: %s', err.stderr.toString());
}

module.exports = async () => ({
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: {
      import: './src/index.jsx',
      filename: `${library}${isProduction ? '.min' : ''}.js`,
    },
    service: {
      import: './src/service.jsx',
      filename: `${library}-[name]${isProduction ? '.min' : ''}.js`,
    },
  },
  output: {
    library,
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
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
      [`${library}.isProduction`]: isProduction,
      [`${library}.packageName`]: JSON.stringify(process.env.npm_package_name),
      [`${library}.packageVersion`]: JSON.stringify(process.env.npm_package_version),
      [`${library}.buildNum`]: JSON.stringify(buildNum),
      [`${library}.repositoryUrl`]: JSON.stringify(repositoryUrl),
    }),
    !process.env.npm_config_back_end && new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: await webpackDevServerConfig({
    library,
    localIndex: process.env.npm_config_local_index,
    proxyTarget: process.env.npm_config_back_end,
    publicPath,
  }),
});
