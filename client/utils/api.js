'use strict';

const _ = require('./_');

const BASE_ADDR = 'http://localhost:8421/api/';

function get(route = '', headers = {}) {
  return fetch(BASE_ADDR + route, { headers })
    .then(response => response.json())
}

function post(route = '', body = {}, headers = {}) {

  return fetch(BASE_ADDR + route, {
      method: 'POST',
      body: JSON.stringify({ email: 'awe', pin: 123})
    }).then(response => response.json())
}

module.exports = { get, post };
