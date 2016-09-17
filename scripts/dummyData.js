const mongoose = require('mongoose');
const config = require('../config');
const User = require('../server/models/user');

mongoose.connect(process.env.MONGO_URL || config.mongoURL, (err) => {
  if (err) console.log(`Error connecting to mongo: ${err}`);
  else console.log('Mongo connection established');
});

User.remove({}, (err) => {
  if (err) {
    console.error(`Error deleting data: ${err}`);
    process.exit();
  }

  User.create({
    email: 'steve@fast.plus',
    username: 'Steve'
  }, (err, user) => {
    if (err) {
      console.error(`Error creating user: ${err}`);
      process.exit();
    }
    console.log('Created user: ', user);
    process.exit();
  });
});
