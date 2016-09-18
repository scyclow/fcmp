const user = require('./user');
const User = require('../models/user');

module.exports = (app) => {
  app.use('/api/user', user);

  app.get('/', (req, res) => {
    User.findOne({})
      .then(user => res.send(user))
      .catch(err => res.send(err))
  });
};
