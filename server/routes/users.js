const { Router } = require('express');
const users = require('../controllers/users');
const User = require('../models/user');

const router = Router();

router.get('/', users.find);

// should only work if authenticated
router.get('/:id', users.findOne)

module.exports = router;
