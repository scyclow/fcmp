// @flow
'use strict'

const $ = require('./utils/$');
const _ = require('./utils/_');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

require('./styles.js');
require('./components/signup.js');
require('./components/floater.js');
