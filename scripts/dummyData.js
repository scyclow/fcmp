require('../config/mongoose')(require('mongoose'));

const _ = require('lodash');
const User = require('../server/models/user');

const cleanDB = (criteria = {}) => User.remove(criteria);
const logUser = (user) => console.log(`Creating user: ${JSON.stringify(user, null, 3)}`);
const createUsers = (userData) => () => userData.map(user => User.create(user));
const verifyUsers = (usersCreated) => Promise.all(
  usersCreated.map(user => user.then(logUser))
);


const createDummyData = (remove, userData) => {
  if (!_.isArray(userData)) {
    userData = [userData];
  }

  cleanDB(remove)
    .then(createUsers(userData))
    .then(verifyUsers)
    .then(process.exit)
    .catch(err => {
      console.error(`Error deleting data: ${err}`);
      process.exit();
    });
}

module.exports = createDummyData;
