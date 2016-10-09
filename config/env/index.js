const _ = require('lodash');

const defaults = {
  SECRET: 'dreamWEALTH!1FAST8z1poz',
};

const production = _.defaults(require('./production'), defaults);
const development = _.defaults(require('./development'), defaults);
const test = _.defaults(require('./test'), defaults);

const environment = process.env.NODE_ENV || 'development';
const config = {
  development,
  production,
  test,
}[environment];

const envVars = _.pick(process.env, ['MONGODB_URI', 'PORT', 'SECRET']);
const env = _.defaults(envVars, config);

module.exports = env;
