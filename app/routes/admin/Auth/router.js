const router = require('express').Router();
const LoginService = require('./LoginService');

router.post('/login', LoginService.Login);

module.exports = router;