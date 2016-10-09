const User = require('../models/user');
const { signJWT, verifyJWT } = require('../utils/verification');

function authenticate (req, res) {
  const { email, password } = req.body;

  User.validateUser({ email }, password)
    .then(signJWT)
    .then(token => res.send({ token, success: true }))
    .catch(error => {
      console.error('Something went wrong:', error);
      res.status(500).send({ error: error.message, success: false });
    });
}

function validate (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    verifyJWT(token)
      .then(decoded => User.findByToken(decoded))
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        console.error('Something went wrong:', error);
        res.status(500).send({ error: error.message, success: false });
      });
  }
  else {
    res.status(403).send({
      success: false,
      error: 'No token provided.'
    });
  }
}

module.exports = { authenticate, validate };
