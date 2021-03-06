require('dotenv').config()
console.log('Starting server', new Date());
// require('babel-register');
// console.log('Babel complete', new Date());

const express = require('express');
const config = require('./config/env');
const connectMongo = require('./config/mongoose');

// Configure express app
const app = express();
require('./config/express')(app);
// require('./server/routes')(app);
require('./update')(app);

// Start server
const port = config.PORT;
const env = process.env.NODE_ENV || 'development';

if (env === 'development') require('pretty-error').start();

const startServer = () => app.listen(port, (err) => {
  if (err) throw new Error(`Something went wrong with express: ${err}`);

  console.log('Server started', new Date());
  console.log(`App listening on port ${port}`);
  console.log(`Running NODE_ENV: ${env}`);
});

connectMongo
  .then(startServer)
  .catch(err => {
    console.error(err);
    process.exit();
  });

// if (env === 'development') require('./client/devServer');


module.exports = app;
