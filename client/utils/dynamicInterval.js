'use strict';

const { round } = require('./_');

function dynamicInterval(fn) {
  let now = Date.now();
  let intervals = 0
  let interval, timeout;

  const newInterval = (execute, time) => {
    clearInterval(interval);
    interval = setInterval(execute, time);
  }

  const runFn = (...args) => {
    now = Date.now();
    fn(...args);
  };

  const set = (time, ...args) => {
    time = round(time);
    const execute = () => runFn(...args)

    const timeElapsed = round( Date.now() - now );
    const timeLeft = time - timeElapsed;
    const timeLeftInInterval = atLeast(timeLeft, 0);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      execute();
      newInterval(execute, time)
    }, timeLeftInInterval);
  }

  const clear = () => {
    clearInterval(interval);
    clearTimeout(timeout);
  }

  return { set, clear }
}

module.exports = dynamicInterval;
