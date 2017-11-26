/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');
const path = require('path');

const library = 'cspaceUI';
const isProduction = process.env.NODE_ENV === 'production';
const filename = `${library}${isProduction ? '.min' : ''}.js`;

const config = {
  entry: './src/index.jsx',
  output: {
    filename,
    library,
    libraryTarget: 'umd',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    inline: true,
  },
};

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
