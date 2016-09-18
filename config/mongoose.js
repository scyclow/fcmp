const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

module.exports = () => mongoose.connect(process.env.MONGO_URL || config.mongoURL, (err) => {
  if (err) console.log(`Error connecting to mongo: ${err}`);
  else console.log('Mongo connection established');
});
