const createDummyData = require('./dummyData');
const _ = require('lodash');

const userData = [
  'steve',
  'carl',
  'joe',
  'mike',
  'brian',
  'rebecca',
  'sarah',
  'elizabith',
  'amanda',
  'alex'
].map(name => ({
  email: `${name}@fast.plus`,
  username: _.capitalize(name),
  password: '1234'
}));

createDummyData({}, userData);
