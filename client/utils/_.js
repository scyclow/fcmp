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
  return low + ((high - low) * n);
}

function portion(high, middle) {
  return (high - middle) / high;
}

function identity(...args) {
  return args.length > 0 ? args : args[0];
}

function between(n, high, low) {
  return max(
    min(n, high), low
  );
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
  if (isBoolean(k) && k) return floor(random(i, j))
  else if (isNumber(j))  return i + random(j - i)
  else if (isBoolean(j)) return floor(random(i))
  else if (isNumber(i))  return Math.random() * i
}

function betweenLinear(n, max, min) {
  return min + ((max - min) * n);
}

function portion(max, center) {
  return (max - center) / (max+1);
}

function last(thing) {
  return thing[thing.length - 1];
}


function *timeGen(t=Infinity, fn=identity) {
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
  compose
};
