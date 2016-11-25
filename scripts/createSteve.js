require('babel-register');
const createDummyData = require('./createDummyData');

const email = 'spike716@gmail.com';
createDummyData({ email }, {
  email,
  pin: 'Password1'
});

