/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');

const library = 'cspaceUI';
const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const filename = `${library}${isProduction ? '.min' : ''}.js`;

const config = {
  entry: './src/index.js',
  output: {
    filename,
    path: 'dist',
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (isProduction) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
