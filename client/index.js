// @flow
'use strict'

const $ = require('./utils/$');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

require('./styles.js');

const callToAction = $.id('call-to-action');
const signUpModal = $.id('signup-modal-container');
const signUpModalBackground = $.cls('signup-modal-background')[0];

const navHeight = '45px';
const modalHeight = `calc(100vh - ${navHeight}`;

$(signUpModal, 'height', modalHeight)

$.onClick(
  () => setTimeout(
    () => $(signUpModal, 'margin-top', '-35px'),
    300
  ),
  callToAction
);


$.onClick(() => {

  $(signUpModal, 'margin-top', '100vh')

}, signUpModalBackground);

