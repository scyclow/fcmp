const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(process.env.MONGO_URL || config.mongoURL, (err) => {
  if (err) console.log(`Error connecting to mongo: ${err}`);
  else console.log('Mongo connection established');
});

const app = express();

require('./config/express')(app);
require('./server/routes')(app);

const port = process.env.PORT || config.port;

app.listen(port, (err) => {
  if (err) return console.log(`Something went wrong with express: ${err}`);
  console.log(`App listening on port ${port}`);
  console.log(`Running NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
