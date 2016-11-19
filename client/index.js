'use strict'

const $ = require('./utils/$');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P'])(() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

require('./styles.js');
