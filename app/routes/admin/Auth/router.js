const router = require('express-promise-router')();
const LoginService = require('./LoginService');
const verifyToken = require('../../../utils/Middlewares/AuthMiddleware');

router.post('/registration', verifyToken.verifyRegistration, LoginService.Registration);

router.post('/login', LoginService.Login);

module.exports = router;
