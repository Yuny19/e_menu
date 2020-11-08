const router = require('express').Router();
const Menu = require('../controllers/menu.controller');
const authent = require('../middleware/authentication');
const authori = require('../middleware/authorization');
const upload = require('../middleware/upload-imgur');

router.post('/', authent, authori, upload, Menu.create);

router.get('/', Menu.read);
router.get('/:id', Menu.findId);

router.put('/:id', authent, authori,upload, Menu.update);

router.delete('/:id', authent, authori, Menu.delete);

module.exports = router;