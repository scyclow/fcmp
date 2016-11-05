'use strict';

const path = require('path');
const webpack = require('webpack');

console.log(__dirname)
module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    app: './index.js'
  },
  output: {
    path: path.join(__dirname, '../../docs'),
    filename: '[name].bundle.js'
  }
};
