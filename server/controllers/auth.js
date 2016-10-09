const User = require('../models/user');
const { signJWT } = require('../utils/verification');

function authenticate (req, res) {
  const { email, password } = req.body;

  User.validateUserByEmail(email, password)
    .then(signJWT)
    .then(token => res.send({ token, success: true }))
    .catch(error => {
      console.error('Something went wrong:', error);
      res.send({ error: error.message, success: false });
    });
}

module.exports = { authenticate };
