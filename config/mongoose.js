const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

module.exports = new Promise((resolve, reject) => {
  console.log('Connecting to mongo', new Date());

  mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI, (err) => {
    if (err) return reject(new Error(`Error connecting to mongo: ${err}`));
    console.log('Mongo connection established');
    resolve();
  });
});
