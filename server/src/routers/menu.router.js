const router = require('express').Router();
const Menu = require('../controllers/menu.controller');
const authent = require('../middleware/authentication');
const authori = require('../middleware/authorization');

router.post('/', authent, authori, Menu.create);

router.get('/', Menu.read);

router.get('/:id', Menu.findId);

router.delete('/:id', authent, authori, Menu.delete);

module.exports = router;