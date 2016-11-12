'use strict';

const $ = require('./$');
const _ = require('./_');
const colors = require('./colors');
const dynamicInterval = require('./dynamicInterval');
const atLeast1 = _.atLeast(1);

const polarize = (c) => colors.applyToHex(c, { h: 180 });
const updateHue = (c, h) => colors.applyToHex(c, { h });

const changeColors = (elem, baseColor) => {
  let primaryColor = baseColor;
  let secondaryColor = polarize(primaryColor);

  return (h, speed) => {
    primaryColor = updateHue(primaryColor, h)
    secondaryColor = polarize(primaryColor);

    $(elem, 'background-color', primaryColor);
    $(elem, 'color', secondaryColor);
  }
}

const maxChange = 20;
const baseDistance = 700;
const baseTime = 15;

function setColorSpeedForElement (elem, color, factor = 1.5) {
  const { set, clear } = dynamicInterval(changeColors(elem, color));

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

function updateColorDistance(elem, baseColor, baseSpeed) {
  let elemCenter = $.center(elem);
  const setSpeed = setColorSpeedForElement(elem, '#ff0000');
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return {
    updateSpeed({coords}) {
      const distance = _.distance(coords, elemCenter);
      setSpeed(distance);
    },

    updateCenter() {
      elemCenter = $.center(elem)
    }
  }
}

module.exports = updateColorDistance;
