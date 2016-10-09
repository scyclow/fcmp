const { Router } = require('express');
const User = require('../models/user');

const router = Router();

router.get('/', (req, res) => {
  console.log()
  User.findOne({})
    .then(user => {
      console.log(user)
      res.send(user)
    })
    .catch(err => {
      console.log('Something went wrong:', err)
      res.send(err)
    })
});

module.exports = router;
