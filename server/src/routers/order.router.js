const router = require('express').Router();
const Order = require('../controllers/order.controller');
const auth = require('../middleware/authentication');

router.post('/', auth, Order.create);

module.exports = router;