'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const html = (params) => new HtmlWebpackPlugin(params);
const rootDir = (...paths) => path.join(__dirname, '../..', ...paths);


module.exports = {
  context: rootDir('client'),
  entry: {
    index: './index.js',
    accounts: './pages/accounts.js'
  },
  output: {
    path: rootDir('docs'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: [
    html({
      template: rootDir('client/index.html'),
      inject: 'body',
      chunks: ['index']
    }),
    html({
      filename: 'accounts/index.html',
      template: rootDir('client/pages/accounts.html'),
      inject: 'body',
      chunks: ['accounts']
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
