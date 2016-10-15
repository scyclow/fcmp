const _ = require('lodash');
const User = require('../server/models/user');

const connectMongo = require('../config/mongoose');

const cleanDB = (criteria = {}) => () => User.remove(criteria);
const createUsers = (userData) => () => userData.map(user => User.create(user));
const logUser = (user) => console.log(`Creating user: ${JSON.stringify(user, null, 3)}`);
const verifyUsers = (usersCreated) => Promise.all(
  usersCreated.map(user => user.then(logUser))
);

const createDummyData = (remove, userData) => {
  if (!_.isArray(userData)) {
    userData = [userData];
  }

  return connectMongo
    .then(cleanDB(remove))
    .then(createUsers(userData))
    .then(verifyUsers)
    .then(process.exit)
    .catch(err => {
      console.error(`Error creating dummy data: ${err}`);
      process.exit();
    });
}

module.exports = createDummyData;
