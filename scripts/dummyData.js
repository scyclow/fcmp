require('../config/mongoose')(require('mongoose'));

const _ = require('lodash');
const User = require('../server/models/user');

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

const cleanDB = () => User.remove({});
const logUser = (user) => console.log(`Creating user: ${JSON.stringify(user, null, 3)}`);
const createUsers = (userDate) => () => userDate.map(user => User.create(user));
const verifyUsers = (usersCreated) => {
  usersCreated.forEach(user => user.then(logUser));
  return Promise.all(usersCreated);
};


cleanDB()
  .then(createUsers(userData))
  .then(verifyUsers)
  .then(process.exit)
  .catch(err => {
    console.error(`Error deleting data: ${err}`);
    process.exit();
  });

