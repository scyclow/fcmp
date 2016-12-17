const $ = require('utils/$');
require('styles');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

