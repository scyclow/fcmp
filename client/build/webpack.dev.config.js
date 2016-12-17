'use strict';

const webpack = require('webpack');
const defaults = require('./webpack.default.config');

defaults.plugins.push(
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('development'),
      'API_ROOT': JSON.stringify('http://localhost:8421/api/'),
      'CLIENT_ROOT': JSON.stringify('http://localhost:3000/')
    }
  })
);

module.exports = defaults;
