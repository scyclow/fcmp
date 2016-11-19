
const _ = require('./_');

const keyDict = {
  enter: 13,
  space: 32,
  P: 80,
  p: 112
};

$ = (elem, prop, value) => elem.style[prop] = value;

$.qsa = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = $.cls = (className) => [].slice.call(document.getElementsByClassName(className));

$.eventDimensions = (event) => ({
  x: event.clientX + window.pageXOffset,
  y: event.clientY + window.pageYOffset,
});


const eventListener = (eventType) => (fn, element = document) => {
  const one = (elem) => {
    elem.addEventListener(eventType, fn);
    const clear = () => elem.removeEventListener(eventType, fn);
    return clear;
  };

  const multiple = (elems) => {
    const clears = elems.map(one);
    return () => clears.map(_.runFn);
  };

  return element.length
    ? multiple(element)
    : one(element);
}

$.onMouseMove = eventListener('mousemove');
$.onHover = eventListener('mouseover');
$.onOrient = (fn) => eventListener('deviceorientation')(fn, window);
$.onResize = eventListener('resize');

const keypress = (key) => (fn, element) => eventListener('keypress')((event) => {
  if (event.keyCode === keyDict[key]) return fn(event);
}, element);

// key: string | Array<string>
// => clearing function
$.onKeyPress = (key) => {
  if (_.isArray(key)) {
    // set all keypress events
    const presses = key.map(keypress);
    // return an eventListener function
    return (fn, element) => {
      // register all press events
      const clears = presses.map(press => press(fn, element));
      // return a clearing fn
      return () => clears.forEach(_.runFn);
    }
  }
  else {
    return keypress(key);
  }
}

$.center = $.getCenterOfElement = (elem) => {
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  }
}

$.coordsEvent = (fn) => (event) => {
  const coords = $.eventDimensions(event);
  const { x, y } = coords;
  return fn({ coords, event, x, y });
}

$.orientEvent = (fn) => (event) => {
  const { beta, gamma, absolute, alpha } = event;
  fn({ beta, gamma, absolute, alpha, event })
}

module.exports = $;
