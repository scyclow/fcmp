const User = require('../models/User');

function find(req, res) {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.status(500).send({ error: err.message });
    });
}

function findOne(req, res) {
  const { address } = req.params;

  User.findByAddress(address)
    .then(user => {
      res.send({ address, requested: user.address, verified: req.user.address });
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
