// 指向当前weppack.config.js文件的相对路径
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.wq$/,
        use: [path.resolve(__dirname, './loader/wq-loader.js')],
      }
    ]
  }
}