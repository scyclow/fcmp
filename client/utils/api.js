'use strict';

const _ = require('./_');

const BASE_ADDR = process.env.BASE_API;

async function get(route = '', headers = {}) {
  const response = await fetch(BASE_ADDR + route, { headers });
  return response.json();
}

async function post(route = '', withBody = {}, withHeaders = {}) {
  const method = 'POST';
  const headers = _.assign({ 'Content-Type': 'application/json' }, withHeaders);
  const body = JSON.stringify(withBody);

  const response = await fetch(BASE_ADDR + route, { headers, body, method });
  return response.json();
}

module.exports = { get, post };
