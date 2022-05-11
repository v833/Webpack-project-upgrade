const path = require("path");
const Webpack = require("webpack");

const dllPath = path.resolve(__dirname, "../dll");

module.exports = {
  mode: "production",
  entry: {
    // 在node_modules中的模块
    jquery: ["jquery"],
    // scroll: ['better-scroll']
    vue: ['vue', 'vue-router']
  },
  output: {
    path: dllPath,
    filename: "[name].dll.js",
    library: "[name]_[hash]",
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.join(dllPath, "[name].manifest.json"), 
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}