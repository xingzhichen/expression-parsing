const path = require("path");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "ts-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      })
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
