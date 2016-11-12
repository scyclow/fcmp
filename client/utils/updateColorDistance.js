'use strict';

const $ = require('./$');
const _ = require('./_');
const colors = require('./colors');
const dynamicInterval = require('./dynamicInterval');
const atLeast1 = _.atLeast(1);

const flipColor = (c) => colors.applyToHex(c, { h: 180 });


const changeColors = (elem, baseColor) => {
  let primaryColor = baseColor;
  let secondaryColor = flipColor(primaryColor);

  return (h, speed) => {
    primaryColor = colors.applyToHex(primaryColor, { h })
    secondaryColor = flipColor(primaryColor);

    // console.log(primaryColor, speed)
    $(elem, 'background-color', primaryColor);
    $(elem, 'color', secondaryColor);
  }
}

function setColorSpeedForElement (elem, color, factor = 1.5) {
  const { set, clear } = dynamicInterval(changeColors(elem, color));

  return (rawDistance) => {
    const distance = atLeast1(rawDistance);
    const maxChange = 20;
    const baseDistance = 700;
    const baseTime = 15;
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(
      _.round(baseTime * distProportion * factor)
    );

    const colorChange = _.round(atLeast1(
      -(maxChange) * (1 - distProportion ** -0.1 )
    ));
  // set(100,100) <- interesting behavior
    set(time, colorChange, [time, colorChange]);
  }
}

function updateColorDistance(elem, baseColor, baseSpeed) {
  const elemCenterCache = $.getCenterOfElement(elem);
  const setSpeed = setColorSpeedForElement(elem, '#ff0000');
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return (ignoreCenterCache) => (event) => {
    const center = ignoreCenterCache ? $.getCenterOfElement(elem) : elemCenterCache;
    const coords = $.eventDimensions(event);
    const distance = _.distance(coords, center);
    setSpeed(distance);
  }
}

module.exports = updateColorDistance;
