const router = require('express').Router();
const User = require('../controllers/user.controller');
const authent = require('../middleware/authentication');
const authori = require('../middleware/authorization');

router.post('/', User.create);

router.post('/login/google', User.loginGoogle);

router.post('/login/manual', User.loginManual);

router.post('/login/admin', User.loginAdmin);

router.get('/', authent, User.read);

router.delete('/:id', authent, authori, User.delete);

router.put('/:id', authent, authori, User.update);

module.exports = router;