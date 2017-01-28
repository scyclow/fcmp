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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
//  weak

'use strict';

const floor = Math.floor.bind(Math);
const round = Math.round.bind(Math);
const abs = Math.abs.bind(Math);
const max = Math.max.bind(Math);
const min = Math.min.bind(Math);

const toRadian = degree => degree * (Math.PI / 180);
const toDegree = radian => radian * 180 / Math.PI;

const sin = deg => Math.sin(toRadian(deg));
const cos = deg => Math.cos(toRadian(deg));
const tan = deg => Math.tan(toRadian(deg));
const asin = ratio => toDegree(Math.asin(ratio));
const acos = ratio => toDegree(Math.acos(ratio));
const atan = ratio => toDegree(Math.atan(ratio));

const runFn = fn => fn();
const noop = () => {};
const assign = Object.assign;

function degreeAroundCenter(coords, center) {
  const x = center.x - coords.x;
  const y = center.y - coords.y;

  const rawDeg = atan(y / x);

  return x < 0 ? 180 + rawDeg : y < 0 ? 360 + rawDeg : rawDeg;
}

const atMost = most => n => min(most, n);
const atLeast = least => n => max(least, n);
const isArray = Array.isArray.bind(Array);

function betweenLinear(n, high, low) {
  return low + (high - low) * n;
}

function portion(high, middle) {
  return (high - middle) / high;
}

function identity(arg) {
  return arg;
}

function between(n, high, low) {
  return max(min(n, high), low);
}

function wrap(number, max) {
  return number >= max ? wrap(number - max, max) : number < 0 ? wrap(max + number, max) : number;
}

function isNumber(num) {
  return typeof num === 'number' && num !== NaN;
}

function isBoolean(bool) {
  return typeof bool === 'boolean';
}

function isString(str) {
  return typeof str === 'string';
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isDefined(def) {
  return def !== undefined;
}

function last(thing) {
  return thing[thing.length - 1];
}

function random(i, j, k) {
  if (isBoolean(k) && k) return floor(random(i, j));
  // $FlowFixMe
  else if (isNumber(j)) return i + random(j - i);else if (isBoolean(j)) return floor(random(i));else return Math.random() * i;
}

function betweenLinear(n, max, min) {
  return min + (max - min) * n;
}

function portion(max, center) {
  return (max - center) / (max + 1);
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

function pick(obj, props) {
  return props.reduce((output, prop) => set(output, prop, obj[prop]), {});
}

function extend(obj1, obj2) {
  for (let [key, val] of enumerateObject(obj2)) {
    obj1[key] = val;
  }

  return obj1;
}

function cond(conditions, _default = noop) {
  for (let [condition, result] of conditions) {
    if (condition) return result();
  }
  return _default();
}

const propsPath = path => cond([[isString(path), () => path.split('.')], [isArray(path), () => path]], () => {
  throw new Error('Path must be string or array');
});

function get(obj, path, _default) {
  const props = propsPath(path);

  let lastObj = obj;
  for (let prop of props) {
    if (isDefined(lastObj[prop])) {
      lastObj = lastObj[prop];
    } else {
      return _default;
    }
  }

  return lastObj;
}

function set(obj, path, val) {
  const props = propsPath(path);
  const existingProps = props.slice(0, -1);
  const lastProp = last(props);

  let lastObj = obj;
  for (let prop of existingProps) {
    if (isDefined(lastObj[prop])) {
      lastObj = lastObj[prop];
    } else {
      const newObj = isNumber(Number(prop)) ? [] : {};
      lastObj[prop] = newObj;
      lastObj = newObj;
    }
  }

  lastObj[lastProp] = val;
  return obj;
}

const promise = {
  wait: (ms, result) => new Promise(resolve => setTimeout(() => resolve(result), ms))
};

module.exports = {
  between,
  betweenLinear,
  wrap,
  portion,
  identity,
  times,
  isNumber,
  isBoolean,
  isArray,
  isString,
  isFunction,
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
  distance,
  runFn,
  noop,
  set,
  pick,
  extend,
  assign,
  get,
  cond,

  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  toRadian,
  toDegree,
  degreeAroundCenter,

  promise
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

//  weak

const _ = __webpack_require__(0);

const keyDict = {
  enter: 13,
  space: 32,
  P: 80,
  p: 112
};

const $ = (elem, prop, value) => elem.style[prop] = value;

$.qsa = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = $.cls = className => [].slice.call(document.getElementsByClassName(className));

$.eventDimensions = event => ({
  x: event.clientX + window.pageXOffset,
  y: event.clientY + window.pageYOffset
});

const eventListener = (eventType, hasCoords) => (element = document) => fn => {
  const one = elem => {
    const listener = hasCoords ? $.coordsEvent(fn) : fn;
    elem.addEventListener(eventType, listener);
    const clear = () => elem.removeEventListener(eventType, listener);
    return clear;
  };

  const multiple = elems => {
    const clears = elems.map(one);
    return () => clears.map(_.runFn);
  };

  return element.length ? multiple(element) : one(element);
};

$.onMouseMove = eventListener('mousemove', true);
$.onHover = eventListener('mouseover');
$.onOrient = fn => eventListener('deviceorientation')(window)($.orientEvent(fn));
$.onResize = eventListener('resize', true);

const keypress = key => (fn, element) => eventListener('keypress')(element)(event => {
  if (event.keyCode === keyDict[key]) return fn(event);
});

// key: string | Array<string>
// => clearing function
$.onKeyPress = key => {
  if (_.isArray(key)) {
    // set all keypress events
    const presses = key.map(keypress);
    // return an eventListener function
    return (fn, element) => {
      // register all press events
      const clears = presses.map(press => press(fn, element));
      // return a clearing fn
      return () => clears.forEach(_.runFn);
    };
  } else {
    return keypress(key);
  }
};

$.center = $.getCenterOfElement = elem => {
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  };
};

$.coordsEvent = fn => event => {
  const coords = $.eventDimensions(event);
  const { x, y } = coords;
  return fn({ coords, event, x, y });
};

$.orientEvent = fn => event => {
  const { beta, gamma, absolute, alpha } = event;
  fn({ beta, gamma, absolute, alpha, event });
};

$.distanceFromCenter = (elem, event) => _.distance($.center(elem), event.coords || $.eventDimensions(event));

$.onHover = element => (fnEnter, fnLeave) => {
  if (!_.isFunction(fnLeave) && !element) {
    element = fnLeave;
    fnLeave = null;
  }

  const clears = [eventListener('mouseenter')(element)(fnEnter), fnLeave ? eventListener('mouseleave')(element)(fnLeave) : _.noop];

  return () => clears.forEach(_.runFn);
};

$.onClick = eventListener('click', true);

$.window = {
  get width() {
    return window.innerWidth;
  },
  get height() {
    return window.innerHeight;
  }
};

window.$ = $;
module.exports = $;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

//  weak

const { between, wrap } = __webpack_require__(0);

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

  let hue = 0;
  if (!diff) {}
  // For some reason website says "mod 6". This returns wonky
  // values, while + 6 appears to return the correct values.
  else if (r === max) {
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

function applyToHex(hex, { h = 0, s = 0, v = 0 }, mod = 1) {
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

function polarize(hex) {
  return applyToHex(hex, { h: 180 });
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
  randHex,
  polarize
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

__webpack_require__(10);

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);
const c = __webpack_require__(2);
const { updateColorSpeedDistance, changeColors } = __webpack_require__(6);

const colorSwitchers = $.cls('color-speed-distance');
const colorMouses = $.cls('color-distance');
const shadowChanges = $.cls('shadow-change');
const colorTimeChangers = $.cls('color-time-change');

const baseSpeed = { distance: 600, time: 1 };

const baseShadowRadius = 20;
const orientAdjust = 10;

const updateBoxShadow = box => ({ coords }) => {
  const center = $.center(box);
  const distance = _.distance(coords, center);
  const degree = _.degreeAroundCenter(coords, center);

  const shadowColor = c.applyToHex('#500', {
    h: _.round(degree),
    v: _.atMost(0.5)(distance / 800)
  });

  const shadowRadius = baseShadowRadius * (distance / 350) + baseShadowRadius;
  const x = _.round(shadowRadius * _.sin(degree));
  const y = _.round(shadowRadius * _.cos(degree));

  const boxShadowStyle = `${ y }px ${ x }px ${ baseShadowRadius }px ${ shadowColor }`;

  $(box, 'box-shadow', boxShadowStyle);
};

// change box shadow when device orientation changes
// beta -- forward backward tilt. 0 when flat on back, negative when backwards, converges at +/- 180 when flat upside down
// alpha -- direction. roughly 360/0 when facing north
// gamma -- side to side tilt. 0 when flat on either side. negative when left, postive when right (facing both sides), converges at 90
const clearOrients = shadowChanges.map(box => {
  const update = updateBoxShadow(box);

  return $.onOrient(({ beta, gamma, absolute, alpha }) => {
    const coords = {
      x: (gamma < 0 ? 90 + gamma : 90 - gamma) * orientAdjust,
      y: (90 - beta) * orientAdjust
    };

    update({ coords });
  });
});

// remove orientation effects when there is a mouse event
$.onMouseMove()(() => clearOrients.forEach(_.runFn));

const updaters = colorSwitchers.map(box => updateColorSpeedDistance(box, c.applyToHex('#ff0000', { h: _.random(360) }), baseSpeed, {
  primary: ['background-color'],
  secondary: ['color']
}));

// update color speed of element based on distace from mouse
$.onMouseMove()(event => {
  updaters.map(updater => updater.updateColorSpeed(event));
});

// FIXME (onResize) -- update center of element on window resize
// $.onResize()(() => updaters.forEach(({ updateCenter }) => updateCenter()));

// change shadow angle and color depending mouse position relative to center of element
$.onMouseMove()(event => shadowChanges.map(box => updateBoxShadow(box)(event)));

// continuously rotate element color
colorTimeChangers.forEach(elem => {
  let h = 1;
  setInterval(() => changeColors(elem, '#ff0000')(h++), 20);
});

const baseButtonColor = c.polarize('#ff0000');

// Color changes as mouse gets closer to center of element; polarizes on hover
colorMouses.forEach(elem => {
  // random color when there is no initial mouse
  changeColors(elem, baseButtonColor)(_.random(360));

  let isHovering;

  $.onHover(elem)(enterEvent => isHovering = true, leaveEvent => isHovering = false);

  $.onMouseMove()(event => {
    const dist = $.distanceFromCenter(elem, event);
    const hue = _.round(dist / 3);
    const adj = isHovering ? 180 : 0;
    changeColors(elem, baseButtonColor)(hue + adj);
  });
});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

let get = (() => {
  var _ref = _asyncToGenerator(function* (route = '', headers = {}) {
    const response = yield fetch(API_ROOT + route, { headers });
    return response.json();
  });

  return function get(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let post = (() => {
  var _ref2 = _asyncToGenerator(function* (route = '', withBody = {}, withHeaders = {}) {
    const method = 'POST';
    const headers = _.assign({ 'Content-Type': 'application/json' }, withHeaders);
    const body = JSON.stringify(withBody);

    const response = yield fetch(API_ROOT + route, { headers, body, method });
    return response.json();
  });

  return function post(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const _ = __webpack_require__(0);

const API_ROOT = "https://fastcashmoneyplus.herokuapp.com/api/";

module.exports = { get, post, root: API_ROOT };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

const _ = __webpack_require__(0);

/*
  @fn : (setArgs) => void

  // => {
    set: (time, setArgs) => sets new interval for fn, calling it each time with setArgs
    clear: () => clears interval
  }
*/


function dynamicInterval(fn) {
  let now = Date.now();
  let intervals = 0;
  let interval, timeout;

  // clear old interval, create a new interval
  const newInterval = (execute, time) => {
    clearInterval(interval);
    interval = setInterval(execute, time);
  };

  const set = (time, ...setArgs) => {
    time = _.round(time);

    // execute fn with setArgs,
    const execute = () => {
      now = Date.now();
      fn(...setArgs);
    };

    // find the amount of time already elapsed, deduct that from the new interval,
    // and set the new interval in the-amount-of-time-left
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//  weak

'use strict';

const _ = __webpack_require__(0);
const c = __webpack_require__(2);
const dynamicInterval = __webpack_require__(5);
const atLeast1 = _.atLeast(1);

const changeColors = (elem, baseColor, properties = {}) => {
  let primaryColor = baseColor;
  let secondaryColor = c.polarize(primaryColor);

  properties.primary = properties.primary || ['background-color'];
  properties.secondary = properties.secondary || ['color'];

  return input => {
    const hsv = {
      h: typeof input === 'number' ? input : input.h,
      s: typeof input === 'number' ? undefined : input.s,
      v: typeof input === 'number' ? undefined : input.v
    };

    if (!window.IMPORTANT.pause) {
      primaryColor = c.applyToHex(primaryColor, hsv);
      secondaryColor = c.polarize(primaryColor);

      properties.primary.forEach(p => $(elem, p, primaryColor));
      properties.secondary.forEach(s => $(elem, s, secondaryColor));
    }
  };
};

const maxChange = 30;
const baseDistance = 700;
const baseTime = 15;

const defaultOptions = { factor: 1.5, primary: undefined, secondary: undefined };

function createSpeedSetter(elem, baseColor, { primary, secondary, factor = 1.5 } = defaultOptions) {
  const { set, clear } = dynamicInterval(changeColors(elem, baseColor, { primary, secondary }));

  return rawDistance => {
    const distance = atLeast1(rawDistance);
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(_.round(baseTime * distProportion * factor));

    const colorChange = _.round(atLeast1(-maxChange * (1 - Math.pow(distProportion, -0.1))));
    // set(100,100) //<- interesting behavior
    set(time, colorChange, [time, colorChange]);
  };
}

// create interface to update color speed and element center


function updateColorSpeedDistance(elem, baseColor, baseSpeed) {
  let elemCenter = $.center(elem);
  const setSpeed = createSpeedSetter(elem, baseColor);
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return {
    updateColorSpeed({ coords }) {
      const distance = _.distance(coords, elemCenter);
      setSpeed(distance);
    },

    updateCenter() {
      elemCenter = $.center(elem);
    }
  };
}

module.exports = { updateColorSpeedDistance, changeColors };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "\n* { padding: 0; margin:0; }\n\nnav {\n  width: 100%;\n  min-height: 50px;\n  position: fixed;\n  top: 0;\n  border: 5px solid black;\n}\n\nnav .nav-header {\n  font-size: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-bottom: 5px solid black;\n}\n\nnav .nav-menu {\n  display: flex;\n}\n\nnav .nav-menu .nav-menu-item {\n  flex: 1;\n  min-height: 30px;\n  border-right: 5px solid black;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.content {\n  margin-top: 120px;\n}\n\n.section {\n  padding: 15px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#call-to-action {\n  width: 400px;\n  height: 200px;\n\n  display: inline-block;\n  border: 5px solid;\n  border-color: #999 #555;\n  border-radius: 5px;\n\n  font-size: 30px;\n\n  cursor: pointer;\n\n  transition: margin 100ms, box-shadow 90ms;\n}\n\n#call-to-action > * {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n}\n\n.shadow-change {\n  box-shadow: 20px 20px 20px #000;\n}\n\n.shadow-change:active {\n  margin-top: 10px;\n  margin-left: 10px;\n  box-shadow: 0 0 0 !important;\n}\n\n@media (max-width: 420px) {\n  nav .nav-header {\n    font-size: 25px;\n  }\n\n  #call-to-action {\n    width: 300px;\n    height: 150px;\n  }\n}\n", ""]);

// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 9 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(9)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);

const floaters = $.cls('floater');

floaters.forEach((floater, i) => {
  const moveFloater = () => {
    if (window.IMPORTANT.pause) return;
    const moveX = _.random(0, $.window.width) + 'px';
    const moveY = _.random(0, $.window.height) + 'px';
    $(floater, 'margin-left', moveX);
    $(floater, 'margin-top', moveY);
  };

  moveFloater();
  const floating = setInterval(moveFloater, _.random(1000, 3000, true));

  $.onClick(floater)(() => {
    console.log('clicked floader', i);
    $(floater, 'display', 'none');
    clearInterval(floating);
  });
});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);
const api = __webpack_require__(4);
const API_ROOT = api.root;
const CLIENT_ROOT = "http://steviep.xyz/fcmp/";

const signupTemplate = __webpack_require__(13);

const callToAction = $.id('call-to-action');
const signUpModal = $.id('signup-modal-container');
const signUpModalBackground = $.cls('signup-modal-background')[0];
const submission = $.id('signup-submission');
const signupForm = $.id('signup-form');
const signupLoading = $.id('signup-loading');
const signupOutput = $.id('signup-output');

const navHeight = '45px';
const modalHeight = `calc(100vh - ${ navHeight }`;

$(signUpModal, 'height', modalHeight);

// display modal when call to action is clicked
$.onClick(callToAction)(() => setTimeout(() => $(signUpModal, 'margin-top', '-75px'), 300));

// Hide modal when clickin background
$.onClick(signUpModalBackground)(() => {

  $(signUpModal, 'margin-top', '100vh');
});

function* nextLoadingChar(str) {
  let i = 0;
  while (true) yield str[i++ % str.length];
}

function setLoadingAnimation() {
  $(signupForm, 'display', 'none');
  signupLoading.innerHTML = 'LOADING ';
  const loadingChars = nextLoadingChar('>>>>>>>$$$$$$$$+++++++');

  const loadingAnimation = setInterval(() => signupLoading.innerHTML += loadingChars.next().value, 50);

  return () => {
    // clearInterval(loadingAnimation);
    // $(signupLoading, 'display', 'none');
  };
};

function renderResponse({ address, secretToken }) {
  return signupTemplate({
    address, secretToken, API_ROOT, CLIENT_ROOT
  });
}

$.onClick(submission)(_asyncToGenerator(function* () {
  const clearLoadingAnimation = setLoadingAnimation();

  const wait5s = _.promise.wait(2000);
  const request = api.post('accounts').catch(function (e) {
    return console.error(e);
  });

  const [response, something] = yield Promise.all([request, wait5s]);

  clearLoadingAnimation();

  signupOutput.innerHTML = renderResponse(response);
}));

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = function (scope) {
  return `<style>
  .response-section {
    border-bottom: 1px solid;
    overflow-wrap: break-word;
    font-size: 18px;
    padding: 5px 0;
  }

  .response-data {
    font-size: 28px;
    background-color: #000;
    color: #fff;
  }

  .response-data a {
    color: #fff;
  }

  .api-section {
    padding-bottom: 5px;
    border-bottom: 1px dotted;
  }

  #signup-loading {
    border: 1px solid black;
  }
</style>

<div>
  <div class="response-section">
    YOUR NEW FASTCASH ADDRESS IS: <br>
    <span class="response-data">${ scope.address }</span>
  </div>
  <div class="response-section">
    This is your secret token DO NOT GIVE THIS TO ANYONE.
    Whoever posseses this token will have unmitigated access to your fastcash account.<br>
    SECRET TOKEN: <span class="response-data">${ scope.secretToken }</span>
  </div>

  <div class="response-section">
    FASTCASHMONEYPLUS.biz is currently in Development Beta mode. As such, the public FASTCASH API is available, with a graphical user interface forthcoming. Esxpected sometime in early 2017.
    <div class="api-section">
      VIEW ALL FASTCASH ADDRESSES AND BALANCES:
      <div class="response-data">
        GET <a href="${ scope.CLIENT_ROOT }accounts">
          ${ scope.API_ROOT }accounts
        </a>
      </div>
    </div>
    <div class="api-section">
      CREATE A NEW ADDRESS:
      <div class="response-data">
        POST ${ scope.API_ROOT }accounts
      </div>
    </div>
    <div class="api-section">
      VIEW ALL TRANSFERS:
      <div class="response-data">
        GET <a href="${ scope.API_ROOT }transfers">
          ${ scope.API_ROOT }transfers
        </a>
      </div>
    </div>
    <div class="api-section">
      TRANSFER FUNDS FROM YOUR ADDRESS TO ANOTHER ADDRESS
      (NOTE: In development beta, this only queues transfers in the system. A second execution request is required for funds to change hands):
      <div class="response-data">
        POST ${ scope.API_ROOT }transfers
      </div>
      WITH THE FOLLOWING JAVA SCRIPT OBJECT NOTATION ("JSON") INCLUDED IN THE REQUEST BODY:<br>
      { payer: &lt;payer address&gt;, payee: &lt;payee address&gt;, amount: &lt;amount: Number&gt; }<br>
      THE REQUEST RETURNS A "JSON" RESPONSE WITH THE FOLLOWING FIELDS:<br>
      { _id: &lt;alpha-numeric identification string&gt;, createdAt: &lt;date of transfer request&gt;, staus: &lt;'PENDING' | 'PROCESSING' | 'FULFILLED'&gt; payer: &lt;payer address&gt;, payee: &lt;payee address&gt;, amount: &lt;amount: Number&gt; }
    </div>
    <div class="api-section">
      EXECUTE TRANSFER:
      <div class="response-data">
        POST ${ scope.API_ROOT }transfers/execute
      </div>
      WITH THE FOLLOWING JAVA SCRIPT OBJECT NOTATION ("JSON") INCLUDED IN THE REQUEST BODY:<br>
      { transferId: &gt;_id of transfer request&lt;, payerToken: &gt;address's SECRET TOKEN&lt; }<br>
      THE REQUEST WILL RETURN EITHER A 200 (the transfer was success) OR 500 (the transfer was unsuccess) RESPONSE CODE
    </div>
  </div>
</div>
`;
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P'])(() => window.IMPORTANT.pause = !window.IMPORTANT.pause);

__webpack_require__(3);
__webpack_require__(12);
__webpack_require__(11);

/***/ }
/******/ ]);