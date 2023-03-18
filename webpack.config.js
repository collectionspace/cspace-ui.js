/* eslint import/no-extraneous-dependencies: "off" */

const { execSync } = require('child_process');
const path = require('path');
const webpack = require('webpack');

const library = 'cspaceUI';
const isProduction = process.env.NODE_ENV === 'production';
const filename = `${library}${isProduction ? '.min' : ''}.js`;
const buildNum = execSync('git rev-parse --short=7 HEAD').toString().trim();
const repositoryUrl = JSON.parse(execSync('npm pkg get repository.url').toString().trim());

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    filename,
    library,
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
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
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: __dirname,
    },
  },
};

module.exports = config;
