const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin');

const extendRule = require('postcss-extend-rule');
const extendClass = require('postcss-extend-class');
const extendFrom = require('postcss-modules-extend-from');

const config = {
  entry: './src/index.css',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [extendFrom, extendRule],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [extendClass, extendRule],
    }),
  ],
};

module.exports = config;
