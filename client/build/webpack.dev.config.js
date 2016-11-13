'use strict';

const path = require('path');
const webpack = require('webpack');
const html = (params) => new (require('html-webpack-plugin'))(params);
const rootDir = (...paths) => path.join(__dirname, '../..', ...paths);

module.exports = {
  context: rootDir('client'),
  entry: {
    app: './index.js'
  },
  output: {
    path: rootDir('docs'),
    filename: '[name].bundle.js'
  },
  plugins: [
    html({
      template: rootDir('client/index.html'),
      inject: 'body'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { plugins: ['transform-exponentiation-operator'] }
      }]
    }, {
      test: /\.css/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
