'use strict'
const $ = require('./utils/$');
const updateColorDistance = require('./utils/updateColorDistance');

const box = $.id('box');
const baseSpeed = { distance: 600, time: 1 };
const updateSpeed = updateColorDistance(box, '#ff0000', baseSpeed);

$.onMouseMove(updateSpeed(false));
// FIXME -- can't get resize events working
$.onResize(updateSpeed(true));
