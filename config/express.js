const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const config = require('./env');

require('./passport')(passport);

module.exports = (app) => {
  app.use(logger('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());
  /**
    TODO handle this error message:
      `express-session deprecated undefined saveUninitialized option; provide saveUninitialized option config/express.js:20:11`
  */
  // I might need to do some shit with cookieSession and/or cookieParser
  // Also might need to do something so session isn't saved in local memory -- reddis/mongoStore?
  // Also, probably don't need jwt, but might need it if making an api for non-web stuff
  app.use(session({
    secret: config.secret,
    resave: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
