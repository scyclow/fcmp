const _ = require('./_');

const $ = (...args) => document.querySelector(...args);

$.s = document.querySelectorAll.bind(document);
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
$.onResize = eventListener('resize');

$.getCenterOfElement = (elem) => {
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  }
}

module.exports = $;
