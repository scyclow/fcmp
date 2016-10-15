const express = require('express');
const config = require('./config/env');
const connectMongo = require('./config/mongoose');

// Configure express app
const app = express();
require('./config/express')(app);
require('./server/routes')(app);

// Start server
const port = config.PORT;
const env = process.env.NODE_ENV || 'development';

connectMongo.then(() => app.listen(port, (err) => {
  if (err) return console.error(`Something went wrong with express: ${err}`);

  console.log(`App listening on port ${port}`);
  console.log(`Running NODE_ENV: ${env}`);
}))
.catch(err => console.error(err));

module.exports = app;
