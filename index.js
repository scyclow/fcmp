const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/env');

// Connect to mongo
require('./config/mongoose')(mongoose);

// Configure express app
const app = express();
require('./config/express')(app);
require('./server/routes')(app);

// Start server
const port = process.env.PORT || config.port;
const env = process.env.NODE_ENV || 'development';

app.listen(port, (err) => {
  if (err) return console.log(`Something went wrong with express: ${err}`);
  console.log(`App listening on port ${port}`);
  console.log(`Running NODE_ENV: ${env}`);
});

module.exports = app;
