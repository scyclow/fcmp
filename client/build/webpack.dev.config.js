'use strict';

const webpack = require('webpack');
const defaults = require('./webpack.default.config');

defaults.plugins.push(
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API': JSON.stringify('http://localhost:8421/api/')
    }
  })
);

module.exports = defaults;
