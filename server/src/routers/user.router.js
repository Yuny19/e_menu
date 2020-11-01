const router = require('express').Router();
const User = require('../controllers/user.controller');

router.post('/', User.create);

router.post('/login/google', User.loginGoogle);

router.post('/login/manual', User.loginManual);

module.exports = router;