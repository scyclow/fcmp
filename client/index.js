// @flow
'use strict'

const $ = require('./utils/$');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P'])(() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

require('./styles.js');

const callToAction = $.id('call-to-action');
const signUpModal = $.id('signup-modal-container');
$.onClick(
  () => setTimeout(
    () => $(signUpModal, 'margin-left', 0),
    300
  ),
  callToAction
);
