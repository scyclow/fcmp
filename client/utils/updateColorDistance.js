'use strict';

const $ = require('./$');
const _ = require('./_');
const colors = require('./colors');
const dynamicInterval = require('./dynamicInterval');
const atLeast1 = _.atLeast(1);

const polarize = (c) => colors.applyToHex(c, { h: 180 });
const updateHue = (c, h) => colors.applyToHex(c, { h });

const changeColors = (elem, baseColor, options) => {
  let primaryColor = baseColor;
  let secondaryColor = polarize(primaryColor);

  options.primary = options.primary || ['background-color']
  options.secondary = options.secondary || ['color']

  return (h) => {
    primaryColor = updateHue(primaryColor, h)
    secondaryColor = polarize(primaryColor);

    if (!window.IMPORTANT.pause) {
      options.primary.forEach(p => $(elem, p, primaryColor))
      options.secondary.forEach(s => $(elem, s, secondaryColor))
    }
  }
}

const maxChange = 20;
const baseDistance = 700;
const baseTime = 15;

const defaultOptions = { factor: 1.5 };

function createSpeedSetter (elem, baseColor, { primary, secondary, factor=1.5 } = defaultOptions) {
  const { set, clear } = dynamicInterval(changeColors(elem, baseColor, { primary, secondary }));

  return (rawDistance) => {
    const distance = atLeast1(rawDistance);
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(
      _.round(baseTime * distProportion * factor)
    );

    const colorChange = _.round(atLeast1(
      -(maxChange) * (1 - distProportion ** -0.1 )
    ));
  // set(100,100) //<- interesting behavior
    set(time, colorChange, [time, colorChange]);
  }
}

// create interface to update color speed and element center
function updateColorSpeedDistance(elem, baseColor, baseSpeed) {
  let elemCenter = $.center(elem);
  const setSpeed = createSpeedSetter(elem, baseColor);
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return {
    updateColorSpeed({coords}) {
      const distance = _.distance(coords, elemCenter);
      setSpeed(distance);
    },

    updateCenter() {
      elemCenter = $.center(elem)
    }
  }
}

module.exports = updateColorSpeedDistance;
