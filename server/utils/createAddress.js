const _  = require('lodash');
const crypto  = require('crypto');

const keyWords = [
  'god',
  'sex',
  'power',
  'love',
  'wealth',
  'fast',
  'cash',
  'now',
  'money',
  'click',
  'fuck',
  'opportunity',
  'digital',
  'dream',
  'energy',
  'spirit',
  'pure',
  'clean',
  'plus',
  'advanced',
  'electric',
  'freedom',
  'life',
  'death',
  'accumulation',
  'easy',
  'fear',
  'destiny',
  'believe'
];

function randInsert (original, content) {
  const randIx = _.random(2, original.length - 1);

  return original.slice(0, randIx)
    + content
    + original.slice(randIx);
};

function makeHash(min, max) {
  const seed = '' + Date.now() + Math.random();

  return crypto
    .createHash('sha1').update(seed).digest('base64')
    .replace('/', '!').replace('+', '$')
    .slice(0, _.random(min, max));
}

function createAddress() {
  const hash = makeHash(8, 15);

  return [
    _.sample(keyWords),
    _.sample(keyWords).toUpperCase(),
    randInsert(hash, _.sample(keyWords).toUpperCase())
  ].join('');
}

module.exports = { createAddress, makeHash };
