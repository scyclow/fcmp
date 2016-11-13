'use strict'
const $ = require('./utils/$');
const _ = require('./utils/_');
const c = require('./utils/colors');
const updateColorDistance = require('./utils/updateColorDistance');

const box = $.id('box');
const baseSpeed = { distance: 600, time: 1 };
const { updateSpeed, updateCenter } = updateColorDistance(box, '#ff0000', baseSpeed);
const baseShadowRadius = 20;

const updateBoxShadow = ({ coords }) => {
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
};

const clearOrient = $.onOrient($.orientEvent(({ beta, gamma, absolute, alpha}) => {
  console.log({beta, gamma, absolute, alpha})

  const coords = {
    x: ((gamma < 0) ? (90 + gamma) : (90 - gamma)) / 9,
    y: 90 - beta
  };
  // beta -- forward backward tilt. 0 when flat on back, negative when backwards, converges at +/- 180 when flat upside down
  // alpha -- direction. roughly 360/0 when facing north
  // gamma -- side to side tilt. 0 when flat on either side. negative when left, postive when right (facing both sides), converges at 90
  updateBoxShadow({ coords })
}));
$.onMouseMove(clearOrient)
$.onMouseMove($.coordsEvent(updateSpeed));
$.onMouseMove($.coordsEvent(updateBoxShadow));

$.onResize(updateCenter);
