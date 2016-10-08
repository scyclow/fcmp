const { Router } = require('express');
const User = require('../models/user');

const router = Router();

router.get('/', (req, res) => {
  User.findOne({})
    .then(user => res.send(user))
    .catch(err => res.send(err))
});

module.exports = router;
