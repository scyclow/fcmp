const User = require('../models/User');

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

function transfer(req, res) {
  const { amount, recipient: recipientAccount } = req.body;
  const payer = req.user;

  payer.transfer(recipientAccount, amount)
    .then(status => res.send(status))
    .catch(err => {
      console.error(err);
      res.send(err.message)
    });
}

module.exports = { find, findOne, transfer };
