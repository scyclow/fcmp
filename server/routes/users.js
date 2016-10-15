const { Router } = require('express');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

const router = Router();

router.get('/', users.find);

// should only work if authenticated
router.get('/:accountCode', auth.validate, users.findOne)


// TESTING
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  const User = require('../models/User');

  router.post('/makeFastCash/:accountCode/:amount', (req, res) => {
    User.findByAccountCode(req.params.accountCode)
      .then(user => user.makeFastCash(10))
      .then(user => res.send(user))
      .catch(err => {
        console.error(err);
        res.send(err)
      });
  });

  router.post('/transfer/:payer/:payee', (req, res) => {
    const { payer, payee } = req.params;

    User.findByAccountCode(req.params.payer)
      .then(payer => payer.transfer(payee, 10))
      .then(status => res.send(status))
      .catch(err => {
        console.error(err);
        res.send(err.message)
      });
  });
}

module.exports = router;
