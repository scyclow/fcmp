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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

const toRadian = degree => degree * (Math.PI / 180);
const toDegree = radian => radian * 180 / Math.PI;

const sin = deg => Math.sin(toRadian(deg));
const cos = deg => Math.cos(toRadian(deg));
const tan = deg => Math.tan(toRadian(deg));
const asin = ratio => toDegree(Math.asin(ratio));
const acos = ratio => toDegree(Math.acos(ratio));
const atan = ratio => toDegree(Math.atan(ratio));

const degreeAroundCenter = (coords, center) => {
  const x = center.x - coords.x;
  const y = center.y - coords.y;

  const rawDeg = atan(y / x);

  return x < 0 ? 180 + rawDeg : y < 0 ? 360 + rawDeg : rawDeg;
};

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
  distance,

  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  toRadian,
  toDegree,
  degreeAroundCenter
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {


const _ = __webpack_require__(0);

$ = (elem, prop, value) => elem.style[prop] = value;

$.qsa = document.querySelectorAll.bind(document);
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
$.onHover = eventListener('mouseover');
$.onOrient = fn => eventListener('deviceorientation')(fn, window);

$.onResize = eventListener('resize');

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

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);
const colors = __webpack_require__(2);
const dynamicInterval = __webpack_require__(5);
const atLeast1 = _.atLeast(1);

const polarize = c => colors.applyToHex(c, { h: 180 });
const updateHue = (c, h) => colors.applyToHex(c, { h });

const changeColors = (elem, baseColor) => {
  let primaryColor = baseColor;
  let secondaryColor = polarize(primaryColor);

  return (h, speed) => {
    primaryColor = updateHue(primaryColor, h);
    secondaryColor = polarize(primaryColor);

    $(elem, 'background-color', primaryColor);
    $(elem, 'color', secondaryColor);
  };
};

const maxChange = 20;
const baseDistance = 700;
const baseTime = 15;

function setColorSpeedForElement(elem, color, factor = 1.5) {
  const { set, clear } = dynamicInterval(changeColors(elem, color));

  return rawDistance => {
    const distance = atLeast1(rawDistance);
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(_.round(baseTime * distProportion * factor));

    const colorChange = _.round(atLeast1(-maxChange * (1 - Math.pow(distProportion, -0.1))));
    // set(100,100) //<- interesting behavior
    set(time, colorChange, [time, colorChange]);
  };
}

function updateColorDistance(elem, baseColor, baseSpeed) {
  let elemCenter = $.center(elem);
  const setSpeed = setColorSpeedForElement(elem, '#ff0000');
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return {
    updateSpeed({ coords }) {
      const distance = _.distance(coords, elemCenter);
      setSpeed(distance);
    },

    updateCenter() {
      elemCenter = $.center(elem);
    }
  };
}

module.exports = updateColorDistance;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n* { padding: 0; margin:0; }\n\n#hero-container {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#box {\n  width: 400px;\n  height: 200px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  margin-top: -10px;\n  margin-left: -10px;\n  box-shadow: 20px 20px 20px #000;\n  border: 5px solid black;\n  border-radius: 5px;\n\n  font-size: 30px;\n\n  cursor: pointer;\n\n  transition: margin 100ms, box-shadow 90ms;\n}\n#box:active {\n  margin-top: 0;\n  margin-left: 0;\n  box-shadow: 0 0 0 !important;\n}\n", ""]);

// exports


/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

__webpack_require__(4);

const $ = __webpack_require__(1);
const _ = __webpack_require__(0);
const c = __webpack_require__(2);
const updateColorDistance = __webpack_require__(3);

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
    v: _.atMost(0.5)(distance / 800)
  });

  const shadowRadius = baseShadowRadius * (distance / 350) + baseShadowRadius;
  const x = shadowRadius * _.sin(degree);
  const y = shadowRadius * _.cos(degree);

  console.log('+++++++++++++++++++', x, y, coords);

  $(box, 'box-shadow', `${ _.round(y) }px ${ _.round(x) }px 20px ${ shadowColor }`);
};

const clearOrient = $.onOrient($.orientEvent(({ beta, gamma, absolute, alpha }) => {

  const coords = {
    x: (gamma < 0 ? 90 + gamma : 90 - gamma) / 9,
    y: 90 - beta
  };
  // beta -- forward backward tilt. 0 when flat on back, negative when backwards, converges at +/- 180 when flat upside down
  // alpha -- direction. roughly 360/0 when facing north
  // gamma -- side to side tilt. 0 when flat on either side. negative when left, postive when right (facing both sides), converges at 90
  updateBoxShadow({ coords });
}));
$.onMouseMove(clearOrient);
$.onMouseMove($.coordsEvent(updateSpeed));
$.onMouseMove($.coordsEvent(updateBoxShadow));

$.onResize(updateCenter);

/***/ }
/******/ ]);