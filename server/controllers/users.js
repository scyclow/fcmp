const User = require('../models/user');

function find(req, res) {
  User.find({})
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.status(500).send({error: err.message });
    });
}

function findOne(req, res) {
  const _id = req.params.id;

  User.findOne({ _id })
    .then(user => {
      console.log(`User ID ${_id}`, user);
      res.send({ id: _id, requested: user.username, verified: req.user.username });
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.status(500).send({error: err.message });
    });
}

module.exports = { find, findOne };
