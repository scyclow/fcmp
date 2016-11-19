'use strict'

require('./styles.js');
const $ = require('./utils/$');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P'])(() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);
