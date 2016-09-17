const LocalStrategy = require('passport-local');
const User = require('../server/models/user');

const localStrategy = new LocalStrategy((username, password, next) => {
  User.validateUser(username, password, (err, user, isValid) => {
    if      (err)      next(err);
    else if (!user)    next(null, false, { error: `No user with username: ${username}.` });
    else if (!isValid) next(null, false, { error: `Password is invalid.` });
    else               next(null, user);
  })
});

module.exports = (passport) => {
  passport.use(localStrategy);
  // the whole id vs. _id thing might be a problem
  passport.serializeUser((user, cb) => cb(null, user._id));
  passport.deserializeUser((_id, cb) => User.findOne({ _id }, (err, user) => {
    if (err) cb(err);
    else cb(null, user);
  }));
}
