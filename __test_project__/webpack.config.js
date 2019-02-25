const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostCSSAssetsPlugin = require("postcss-assets-webpack-plugin");

const config = {
  mode: "development",
  entry: "./src/index.css",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-modules-extend-rule/pre")]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [require("postcss-modules-extend-rule/post")]
    })
  ]
};

module.exports = config;
