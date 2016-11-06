const $ = require('./utils/$');
const _ = require('./utils/_');
const colors = require('./utils/colors');
const dynamicInterval = require('./utils/dynamicInterval');
const atLeast1 = _.atLeast(1);

const changeColors = (elem, baseColor) => {
  let primaryColor = baseColor;
  let secondaryColor = colors.applyToHex(primaryColor, { h: 180 });

  return (h, speed) => {
    primaryColor = colors.applyToHex(primaryColor, { h })
    secondaryColor = colors.applyToHex(primaryColor, { h: 180 });
    // console.log(primaryColor, speed)
    elem.style['background-color'] = primaryColor;
    elem.style['color'] = secondaryColor;
  }
}

function setSpeed (elem, factor = 1.5) {
  const { set, clear } = dynamicInterval(changeColors(elem, '#ff0000'));

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

const box = $.id('box');
const setSpeedForBox = setSpeed(box);
setSpeedForBox(600, 1);

const boxCenterCache = $.getCenterOfElement(box);

const updateSpeed = (ignoreCenterCache) => (event) => {
  const center = ignoreCenterCache ? $.getCenterOfElement(box) : boxCenterCache;
  if (ignoreCenterCache) console.log(center)
  const coords = $.eventDimensions(event);
  const distance = _.distance(coords, center);
  setSpeedForBox(distance);
};

$.onMouseMove(updateSpeed(false));
// FIXME -- can't get resize events working
$.onResize(updateSpeed(true));
