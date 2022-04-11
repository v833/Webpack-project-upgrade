// 指向当前weppack.config.js文件的相对路径
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "eval-cheap-module-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: "./public",
    port: "1115",
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.wq$/,
        use: [path.resolve(__dirname, "./loader/wq-loader.js")],
      },
    ],
  },
};
