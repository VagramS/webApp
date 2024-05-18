const router = require('express-promise-router')();
const ToppingsService = require('./ToppingService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.post('/create', AuthMiddleware.verifyToken, ToppingsService.CreateTopping);

router.patch('/update', AuthMiddleware.verifyToken, ToppingsService.UpdateTopping);

router.delete('/delete', AuthMiddleware.verifyToken, ToppingsService.DeleteTopping);

module.exports = router;