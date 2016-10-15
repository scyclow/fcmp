const { Router } = require('express');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

const router = Router();

router.get('/', users.find);

// should only work if authenticated
router.get('/:accountCode', auth.validate, users.findOne);
router.post('/transfer', auth.validate, users.transfer)


// TESTING
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  const User = require('../models/User');

  router.post('/makeFastCash/:accountCode/:amount', (req, res) => {
    const { accountCode, amount } = req.params;
    User.findByAccountCode(accountCode)
      .then(user => user.makeFastCash(amount))
      .then(user => res.send(user))
      .catch(err => {
        console.error(err);
        res.send(err)
      });
  });
}

module.exports = router;
