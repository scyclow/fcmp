const { Router } = require('express');
const router = Router();
const transfers = require('../controllers/transfers');

router.get('/', transfers.find);
router.post('/', transfers.create);
router.post('/execute', transfers.execute);

module.exports = router;
