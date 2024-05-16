const router = require('express-promise-router')();
const LoginService = require('./LoginService');

router.post('/login', LoginService.Login);

module.exports = router;