'use strict';

require('./index.css');

const $ = require('./utils/$');
const _ = require('./utils/_');
const c = require('./utils/colors');
const { updateColorSpeedDistance, changeColors } = require('./utils/updateColor');


const colorSwitchers = $.cls('color-speed-distance');
const shadowChanges = $.cls('shadow-change');
const colorTimeChangers = $.cls('color-time-change');

const baseSpeed = { distance: 600, time: 1 };

// [{
//   updateColorSpeed,
//   updateCenter
// }]
const updaters = colorSwitchers.map(box =>
  updateColorSpeedDistance(box, c.applyToHex('#ff0000', { h: _.random(360) }), baseSpeed, {
    primary: ['background-color'],
    secondary: ['color']
  })
);
const baseShadowRadius = 20;
const orientAdjust = 10;

const updateBoxShadow = box => ({ coords }) => {
  const center = $.center(box);
  const distance = _.distance(coords, center);
  const degree = _.degreeAroundCenter(coords, center);

  const shadowColor = c.applyToHex('#500', {
    h: _.round(degree),
    v: _.atMost(0.5)(distance / 800),
  });

  const shadowRadius = baseShadowRadius * (distance / 350) + baseShadowRadius;
  const x = _.round(shadowRadius * _.sin(degree));
  const y = _.round(shadowRadius * _.cos(degree));

  const boxShadowStyle = `${y}px ${x}px ${baseShadowRadius}px ${shadowColor}`;

  $(box, 'box-shadow', boxShadowStyle);
};


const clearOrients = shadowChanges.map(box =>
  $.onOrient(
    $.orientEvent(({ beta, gamma, absolute, alpha }) => {

      const coords = {
        x: ((gamma < 0) ? (90 + gamma) : (90 - gamma)) * orientAdjust,
        y: (90 - beta) * orientAdjust
      };
      // beta -- forward backward tilt. 0 when flat on back, negative when backwards, converges at +/- 180 when flat upside down
      // alpha -- direction. roughly 360/0 when facing north
      // gamma -- side to side tilt. 0 when flat on either side. negative when left, postive when right (facing both sides), converges at 90

      updateBoxShadow(box, { coords });
    })
  )
);

$.onMouseMove(() => clearOrients.forEach(_.runFn));
$.onMouseMove((event) => updaters.map(updater =>
  $.coordsEvent(updater.updateColorSpeed)(event)
));
$.onMouseMove(event => shadowChanges.map(box =>
  $.coordsEvent( updateBoxShadow(box) )(event)
));

colorTimeChangers.forEach(elem => {
  let h = 1
  setInterval(() => changeColors(elem, '#ff0000')(h++), 20)
})

$.onResize(() => updaters.forEach(({ updateCenter }) => updateCenter()));