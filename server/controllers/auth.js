const User = require('../models/User');
const Account = require('../models/Account');

const getToken = (req) => (
  req.params.token ||
  req.query.token  ||
  req.body.token   ||
  req.headers['x-access-token']
);

function authenticate (req, res) {
  const { email, pin } = req.body;

  User.validateUser({ email }, pin)
    .then(user => user.createToken())
    .then(token => res.send({ token, success: true }))
    .catch(error => {
      console.error('Something went wrong:', error);
      res.status(500).send({ error: error.message, success: false });
    });
}


function validate (req, res, next) {
  const token = getToken(req);

  if (token) {
    User.findByToken(token)
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

async function validateAccount (req, res, next) {
  const token = getToken(req);

  if (token) {
    const account = await Account.findByToken(token);

    if (account) {
      req.account = account;
      next();
    }
    else {
      res.status(404).send({
        success: false,
        error: 'No such account exists',
      });
    }
  }
  else {
    res.status(403).send({
      success: false,
      error: 'No token provided.'
    });
  }

}

module.exports = { authenticate, validate, validateAccount };
