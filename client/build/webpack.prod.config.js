const webpack = require('webpack');
const defaults = require('./webpack.default.config');


defaults.module.rules[0].use[0].options.plugins = [
  "transform-flow-strip-types",
  "transform-async-to-generator",
  "transform-exponentiation-operator",
  "transform-object-rest-spread"
];

defaults.plugins.push(
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production'),
      'API_ROOT': JSON.stringify('https://fastcashmoneyplus.herokuapp.com/api/'),
      'CLIENT_ROOT': JSON.stringify('http://steviep.xyz/fcmp')
    }
  })
);
module.exports = defaults;
