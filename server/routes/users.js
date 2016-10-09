const { Router } = require('express');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

const router = Router();

router.get('/', users.find);

// should only work if authenticated
router.get('/:id', auth.validate, users.findOne)

module.exports = router;
