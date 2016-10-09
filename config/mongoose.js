const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

module.exports = () => mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI, (err) => {
  if (err) console.error(`Error connecting to mongo: ${err}`);
  else console.log('Mongo connection established');
});
