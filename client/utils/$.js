const $ = (...args) => document.querySelector(...args);

$.s = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = document.getElementsByClassName.bind(document);

$.eventDimensions = (e) => ({
  x: e.clientX + window.pageXOffset,
  y: e.clientY + window.pageYOffset,
});

const eventListener = (eventType) => (fn, element = document) => {
  element.addEventListener(eventType, fn);
  const clear = () => element.removeEventListener(eventType, fn);
  return clear;
}

$.onMouseMove = eventListener('mousemove');
$.onResize = eventListener('resize');


module.exports = $;
