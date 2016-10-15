const User = require('../models/user');

function find(req, res) {
  User.find({})
    .then(users => {
      console.log(users);
      res.send(users);
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.status(500).send({ error: err.message });
    });
}

function findOne(req, res) {
  const { accountCode } = req.params;

  User.findByAccountCode(accountCode)
    .then(user => {
      console.log(`User ID ${accountCode}`, user);
      res.send({ accountCode, requested: user.username, verified: req.user.username });
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.status(500).send({error: err.message });
    });
}

module.exports = { find, findOne };
