const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UgifyJsPlugin = require("uglifyjs-webpack-plugin");
const CssMiniMizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  devtool: "eval-cheap-module-source-map",
  output: {
    // [name].js  name 对应 entry 中的 key => bundle
    // [hash].js  hash 对应 webpack 的 hash
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    // 将打包文件放在内存中
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 1115,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset",
        parser: {
          // 如果一个模块源码大小小于 maxSize，
          // 那么模块会被作为一个 Base64 编码的字符串注入到包中，
          // 否则模块文件会被生成到输出的目标目录中。
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 输出文件名称 配置hash防止重名
          filename: "image/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          esModule: false, // 默认为 true，如果为 false，则模板中的 import 语句不会被解析为 ES Module
        },
      },
    ],
  },
  optimization: {
    // 压缩js代码 使用uglifyjs-webpack-plugin
    // 剥离js代码 不会改变代码的结构 但是会改变代码的可读性
    minimize: true,
    minimizer: [
      new UgifyJsPlugin({
        cache: true, // 开启缓存
        parallel: true, // 开启并行压缩
        sourceMap: false, // 开启sourceMap
      }),
      new CssMiniMizerPlugin(),
    ],
    splitChunks: {
      chunks: "all", // 全部代码分离
      minSize: 200 * 1024, // 分离的最小文件大小
      cacheGroups: {
        // 公共代码分离
        jquery: {
          test: /jquery/,
          name: "jquery",
          chunks: "all", // 全部代码分离
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // 模版名称
      template: "./src/index.html", // 模版文件
      chunks: ["index"], // 入口文件
    }),
    new HtmlWebpackPlugin({
      filename: "login.html", // 模版名称
      template: "./src/login.html", // 模版文件
      chunks: ["login"], // 入口文件
    }),
    new HtmlWebpackPlugin({
      filename: "reg.html", // 模版名称
      template: "./src/reg.html", // 模版文件
    }),
    new HtmlWebpackPlugin({
      filename: "cart.html", // 模版名称
      template: "./src/cart.html", // 模版文件
    }),
    new Webpack.ProvidePlugin({
      // 在每个模块中都注入 $ 和 jQuery 为全局变量 映射
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/img"),
          to: path.resolve(__dirname, "./dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
