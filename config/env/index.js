const defaults = {};

const production = Object.assign({}, defaults, require('./production'));
const development = Object.assign({}, defaults, require('./development'));
const test = Object.assign({}, defaults, require('./test'));

const environment = process.env.NODE_ENV || 'development';

module.exports = {
  development,
  production,
  test,
}[environment];
