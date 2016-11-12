'use strict'
const $ = require('./utils/$');
const _ = require('./utils/_');
const c = require('./utils/colors');
const updateColorDistance = require('./utils/updateColorDistance');

const box = $.id('box');
const baseSpeed = { distance: 600, time: 1 };
const { updateSpeed, updateCenter } = updateColorDistance(box, '#ff0000', baseSpeed);
const baseShadowRadius = 20;

$.onMouseMove(updateSpeed);
$.onMouseMove($.coordsEvent(({ coords, event }) => {
  const center = $.center(box);
  const distance = _.distance(coords, center);
  const degree = _.degreeAroundCenter(coords, center);

  const shadowColor = c.applyToHex('#500', {
    h: _.round(degree),
    v: _.atMost(0.5)(distance / 800),
  });

  const shadowRadius = baseShadowRadius * (distance / 350) + baseShadowRadius;
  const x = shadowRadius * _.sin(degree);
  const y = shadowRadius * _.cos(degree);

  $(
    box,
    'box-shadow',
    `${y}px ${x}px 20px ${shadowColor}`
  );
}));

$.onResize(updateCenter);
