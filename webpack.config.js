const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const CONFIG = {
  FILENAME: 'server.bundle.js',
  PATH: path.resolve(__dirname, 'build')
}

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(module) {
    nodeModules[module] = 'commonjs ' + module;
  });

module.exports = {
  entry: [
    // Support async/await
    'babel-polyfill',
    './server.js'
  ],
  context: __dirname,
  target: 'node',
  output: {
    path: CONFIG.PATH,
    filename: CONFIG.FILENAME
  },
  module: {
    loaders: [{
      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      // 使用 Babel 編譯 ES2015 的語法
      loader: 'babel',
      // query 用於向 loader 傳遞參數，不同的 loader 接收的參數同
      query: {
        presets: ['es2015', 'stage-3']
      }
    }]
  },
  // 忽略第三方的模組 ./node_modules/
  externals: nodeModules
}
