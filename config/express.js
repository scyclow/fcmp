const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const config = require('./index');

require('./passport')(passport);

module.exports = (app) => {
  app.use(logger('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());
  // I might need ot do some shit with cookieSession and/or cookieParser
  // Also might need to do something so session isn't saved in memory
  // Also, probably don't need jwt, but might need it if making an api for non-web stuff
  app.use(session({
    secret: config.secret,
    resave: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
