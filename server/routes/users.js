const { Router } = require('express');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

const router = Router();

router.get('/', users.find);
router.post('/', users.create);

// should only work if authenticated
// router.get('/:address/:token', auth.validate, users.findOne);
// router.post('/transfer', auth.validate, users.transfer);


// TESTING
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  const User = require('../models/User');

  router.post('/makeFastCash/:address/:amount', (req, res) => {
    const { address, amount } = req.params;

    User.findByAddress(address)
      .then(user => user.makeFastCash(amount))
      .then(user => res.send(user))
      .catch(err => {
        console.error(err);
        res.send(err)
      });
  });
}

module.exports = router;
