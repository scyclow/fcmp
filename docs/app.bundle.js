/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

const floor = Math.floor.bind(Math);
const round = Math.round.bind(Math);
const abs = Math.abs.bind(Math);
const max = Math.max.bind(Math);
const min = Math.min.bind(Math);
const atMost = most => n => min(most, n);
const atLeast = least => n => max(least, n);
const isArray = Array.isArray.bind(Array);

function betweenLinear(n, high, low) {
  return low + (high - low) * n;
}

function portion(high, middle) {
  return (high - middle) / high;
}

function identity(...args) {
  return args.length > 0 ? args : args[0];
}

function between(n, high, low) {
  return max(min(n, high), low);
}

function isNumber(num) {
  return typeof num === 'number';
}

function isBoolean(num) {
  return typeof num === 'boolean';
}

function last(thing) {
  return thing[thing.length - 1];
}

function random(i, j, k) {
  if (isBoolean(k) && k) return floor(random(i, j));else if (isNumber(j)) return i + random(j - i);else if (isBoolean(j)) return floor(random(i));else if (isNumber(i)) return Math.random() * i;
}

function betweenLinear(n, max, min) {
  return min + (max - min) * n;
}

function portion(max, center) {
  return (max - center) / (max + 1);
}

function last(thing) {
  return thing[thing.length - 1];
}

function* timeGen(t = Infinity, fn = identity) {
  for (let i = 0; i < t; i++) yield fn(i);
}

function times(t, fn = identity) {
  let output = [];
  for (let i of timeGen(t)) output.push(fn(i));
  return output;
}

function compact(arr) {
  return arr.filter(i => !!i || i === 0);
}

function* enumerateArray(iterable) {
  let i = 0;
  for (let iter of iterable) {
    yield [iter, i++];
  }
}

function* enumerateObject(obj) {
  for (let key in obj) {
    yield [obj[key], key];
  }
}

function* enumerate(iterable) {
  yield* iterable[Symbol.iterator] ? enumerateArray(iterable) : enumerateObject(iterable);
}

function find(iterable, fn) {
  for (let [iter, i] of enumerate(iterable)) {
    if (fn(iter, i)) return iter;
  }

  return null;
}

function compose(...fnArr) {
  return (...args) => fnArr.slice(1).reduce((acc, fn) => fn(acc), fnArr[0](...args));
}

function distance(a, b) {
  const xDiff = abs(a.x - b.x);
  const yDiff = abs(a.y - b.y);
  return Math.pow(Math.pow(xDiff, 2) + Math.pow(yDiff, 2), 0.5);
}

module.exports = {
  between,
  betweenLinear,
  portion,
  identity,
  times,
  isNumber,
  isBoolean,
  isArray,
  floor,
  round,
  abs,
  max,
  min,
  atMost,
  atLeast,
  random,
  last,
  compact,
  enumerate,
  find,
  compose,
  distance
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

const _ = __webpack_require__(0);

const $ = (...args) => document.querySelector(...args);

$.s = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = document.getElementsByClassName.bind(document);

$.eventDimensions = event => ({
  x: event.clientX + window.pageXOffset,
  y: event.clientY + window.pageYOffset
});

const eventListener = eventType => (fn, element = document) => {
  element.addEventListener(eventType, fn);
  const clear = () => element.removeEventListener(eventType, fn);
  return clear;
};

$.onMouseMove = eventListener('mousemove');
$.onResize = eventListener('resize');

$.getCenterOfElement = elem => {
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  };
};

module.exports = $;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

const { between } = __webpack_require__(0);

function numToHex(num) {
  let hex = Math.round(Math.min(num, 255)).toString(16);
  return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
}

const hexToNum = hex => parseInt(hex, 16);

const rgbToHex = ({ r, g, b }) => '#' + numToHex(r) + numToHex(g) + numToHex(b);

const hexToRgb = hex => hex.length === 7 ? {
  r: hexToNum(hex.slice(1, 3)),
  g: hexToNum(hex.slice(3, 5)),
  b: hexToNum(hex.slice(5, 7))
} : {
  r: hexToNum(hex.slice(1, 2).repeat(2)),
  g: hexToNum(hex.slice(2, 3).repeat(2)),
  b: hexToNum(hex.slice(3, 4).repeat(2))
};

const round = (n, decimals = 0) => +n.toFixed(decimals);

// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
function rgbToHsv({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const value = max;
  const saturation = max ? diff / max : 0;

  let hue;
  if (!diff) {
    hue = 0;

    // For some reason website says "mod 6". This returns wonky
    // values, while + 6 appears to return the correct values.
  } else if (r === max) {
    hue = (g - b) / diff + 6;
  } else if (g === max) {
    hue = (b - r) / diff + 2;
  } else if (b === max) {
    hue = (r - g) / diff + 4;
  }

  hue *= 60;

  return {
    h: hue === 360 ? 0 : hue,
    s: round(saturation, 2),
    v: round(value, 2)
  };
}

function hsvToRgb({ h, s, v }) {
  h /= 60;
  const c = v * s;
  const x = c * (1 - Math.abs(h % 2 - 1));
  const m = v - c;

  let r, g, b;
  switch (Math.floor(h)) {
    case 0:
    case 6:
      r = c;g = x;b = 0;break;
    case 1:
      r = x;g = c;b = 0;break;
    case 2:
      r = 0;g = c;b = x;break;
    case 3:
      r = 0;g = x;b = c;break;
    case 4:
      r = x;g = 0;b = c;break;
    case 5:
      r = c;g = 0;b = x;break;
  }

  return {
    r: round((r + m) * 255),
    g: round((g + m) * 255),
    b: round((b + m) * 255)
  };
}

const hexToHsv = hex => rgbToHsv(hexToRgb(hex));
const hsvToHex = hsv => rgbToHex(hsvToRgb(hsv));

const wrap = (number, max) => number >= max ? wrap(number - max, max) : number < 0 ? wrap(max + number, max) : number;

function applyToHex(hex, { h = 0, s = 0, v = 0 } = {}, mod = 1) {
  let hsv = hexToHsv(hex);
  return hsvToHex({
    h: wrap(hsv.h + h / mod, 360),
    s: between(hsv.s + s / mod, 1, 0),
    v: between(hsv.v + v / mod, 1, 0)
  });
}

// experimental
function setHsvOnHex(hex, { h, s, v }) {
  const hsv = hexToHsv(hex);
  return hsvToHex({
    h: !isNaN(h) ? wrap(h, 360) : hsv.h,
    s: !isNaN(s) ? between(s, 1, 0) : hsv.s,
    v: !isNaN(v) ? between(v, 1, 0) : hsv.v
  });
}

const randMax = ceil => Math.floor(Math.random() * ceil);

function randHex() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += randMax(16).toString(16);
  }
  return color.toUpperCase();
}

module.exports = {
  applyToHex,
  __experimental__: { setHsvOnHex },
  hexToNum,
  hexToRgb,
  hsvToRgb,
  numToHex,
  rgbToHex,
  rgbToHsv,
  randHex
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

const _ = __webpack_require__(0);

function dynamicInterval(fn) {
  let now = Date.now();
  let intervals = 0;
  let interval, timeout;

  const newInterval = (execute, time) => {
    clearInterval(interval);
    interval = setInterval(execute, time);
  };

  const runFn = (...args) => {
    now = Date.now();
    fn(...args);
  };

  const set = (time, ...args) => {
    time = _.round(time);
    const execute = () => runFn(...args);

    const timeElapsed = _.round(Date.now() - now);
    const timeLeft = time - timeElapsed;
    const timeLeftInInterval = _.atLeast(timeLeft, 0);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      execute();
      newInterval(execute, time);
    }, timeLeftInInterval);
  };

  const clear = () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };

  return { set, clear };
}

module.exports = dynamicInterval;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);
const colors = __webpack_require__(2);
const dynamicInterval = __webpack_require__(3);
const atLeast1 = _.atLeast(1);

const changeColors = (elem, baseColor) => {
  let primaryColor = baseColor;
  let secondaryColor = colors.applyToHex(primaryColor, { h: 180 });

  return (h, speed) => {
    primaryColor = colors.applyToHex(primaryColor, { h });
    secondaryColor = colors.applyToHex(primaryColor, { h: 180 });
    // console.log(primaryColor, speed)
    elem.style['background-color'] = primaryColor;
    elem.style['color'] = secondaryColor;
  };
};

function setSpeed(elem, factor = 1.5) {
  const { set, clear } = dynamicInterval(changeColors(elem, '#ff0000'));

  return rawDistance => {
    const distance = atLeast1(rawDistance);
    const maxChange = 20;
    const baseDistance = 700;
    const baseTime = 15;
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(_.round(baseTime * distProportion * factor));

    const colorChange = _.round(atLeast1(-maxChange * (1 - Math.pow(distProportion, -0.1))));
    // set(100,100) <- interesting behavior
    set(time, colorChange, [time, colorChange]);
  };
}

const box = $.id('box');
const setSpeedForBox = setSpeed(box);
setSpeedForBox(600, 1);

const boxCenterCache = $.getCenterOfElement(box);

const updateSpeed = ignoreCenterCache => event => {
  const center = ignoreCenterCache ? $.getCenterOfElement(box) : boxCenterCache;
  if (ignoreCenterCache) console.log(center)

  const coords = $.eventDimensions(event);
  const distance = _.distance(coords, center);
  setSpeedForBox(distance);
};

$.onMouseMove(updateSpeed(false));
$.onResize(updateSpeed(true));

/***/ }
/******/ ]);
