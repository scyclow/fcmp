
const _ = require('./_');

$ = (elem, prop, value) => elem.style[prop] = value;

$.qsa = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = document.getElementsByClassName.bind(document);

$.eventDimensions = (event) => ({
  x: event.clientX + window.pageXOffset,
  y: event.clientY + window.pageYOffset,
});

const eventListener = (eventType) => (fn, element = document) => {
  element.addEventListener(eventType, fn);
  const clear = () => element.removeEventListener(eventType, fn);
  return clear;
}

$.onMouseMove = eventListener('mousemove');
$.onHover = eventListener('mouseover');
$.onOrient = fn => eventListener('deviceorientation')(fn, window);

$.onResize = eventListener('resize');

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
  console.log(event)
  fn({ beta, gamma, absolute, alpha, event })
}

module.exports = $;
