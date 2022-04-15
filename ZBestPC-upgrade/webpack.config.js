const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js',
  },
  devtool: 'eval-cheap-module-source-map',
  output: {
    // [name].js  name 对应 entry 中的 key => bundle
    // [hash].js  hash 对应 webpack 的 hash
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser:{
          // 如果一个模块源码大小小于 maxSize，
          // 那么模块会被作为一个 Base64 编码的字符串注入到包中，
          // 否则模块文件会被生成到输出的目标目录中。
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          // 输出文件名称 配置hash防止重名
          filename: 'image/[name].[hash:6][ext]',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 模版名称
      template: './src/index.html', // 模版文件
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html', // 模版名称
      template: './src/login.html', // 模版文件
    }),
    new HtmlWebpackPlugin({
      filename: 'reg.html', // 模版名称
      template: './src/reg.html', // 模版文件
    }),
    new Webpack.ProvidePlugin({
      // 在每个模块中都注入 $ 和 jQuery 为全局变量 映射
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
}