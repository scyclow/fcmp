const createDummyData = require('./dummyData');
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;


// PARENT TREE
// Steve
//   Mike
//   Joe
//     Sarah
//     Emily
//   Carl
//     Rebecca
//     Brian
//       Amanda
//         Alex
const userData = [
  { name: 'steve' },
  { name: 'carl', parent: 'steve' },
  { name: 'joe', parent: 'steve' },
  { name: 'mike', parent: 'steve' },
  { name: 'brian', parent: 'carl' },
  { name: 'rebecca', parent: 'carl' },
  { name: 'sarah', parent: 'joe' },
  { name: 'emily', parent: 'joe' },
  { name: 'amanda', parent: 'brian' },
  { name: 'alex', parent: 'amanda' }
]
.map(user => _.extend(user, { _id: new ObjectId() }))
.map((user, i, users) => {
  const parentName = user.parent;
  const parent = _.find(users, { name: parentName });
  user.parent = parent && parent._id;
  return user;
})
.map(user => _.extend(user, {
  email: `${user.name}@fast.plus`,
  username: _.capitalize(user.name),
  password: '1234'
}));

createDummyData({}, userData);
