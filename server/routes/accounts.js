const { Router } = require('express');
const accounts = require('../controllers/accounts');
const auth = require('../controllers/auth');

const router = Router();

router.get('/', accounts.find);

// should only work if authenticated
// router.get('/:address/:token', auth.validate, users.findOne);
// router.post('/transfer', auth.validate, users.transfer);
router.post('/', accounts.create);

router.post('/test', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})


// // TESTING
// if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
//   const User = require('../models/User');

//   router.post('/makeFastCash/:address/:amount', (req, res) => {
//     const { address, amount } = req.params;

//     User.findByAddress(address)
//       .then(user => user.makeFastCash(amount))
//       .then(user => res.send(user))
//       .catch(err => {
//         console.error(err);
//         res.send(err)
//       });
//   });
// }

module.exports = router;
