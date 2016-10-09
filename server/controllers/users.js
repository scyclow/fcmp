function find(req, res) {
  User.find({})
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.send(err);
    });
}

function findOne(req, res) {
  const _id = req.params.id;
  User.findOne({ _id })
    .then(user => {
      console.log(`User ID ${_id}`, user);
      res.send({ id: _id, user });
    })
    .catch(err => {
      console.error('Something went wrong:', err);
      res.send(err);
    });
}

module.exports = { find, findOne };
