const router = require('express').Router();
const Menu = require('../controllers/menu.controller');

router.post('/', Menu.create);

router.get('/', Menu.read);

module.exports = router;