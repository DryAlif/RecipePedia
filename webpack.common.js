// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //   {
          //     loader: MiniCssExtractPlugin.loader,
          //     // This is required for asset imports in CSS, such as url()
          //     options: { publicPath: "" },
          //   },
          "style-loader",
          "css-loader",
          //   "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // new MiniCssExtractPlugin(),
  ],
};
