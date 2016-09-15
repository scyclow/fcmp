const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// mongoose.connect(process.env.MONGO_URL || config.mongoUrl);
// mongoose.on('connection', () => {
//   console.log('Mongo connection established');
// });
// mongoose.on('error', () => {
//   console.log('Error connecting to mongo');
// });

const app = express();

require('./config/express')(app);
require('./server/routes')(app);

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Running NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});


module.exports = app;
