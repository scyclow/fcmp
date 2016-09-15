const bodyParser = require('body-parser');
const logger = require('morgan');

module.exports = (app) => {
  app.use(logger('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
