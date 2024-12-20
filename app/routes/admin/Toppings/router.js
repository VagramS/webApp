const router = require('express-promise-router')();
const ToppingsService = require('./ToppingService');
const AuthMiddleware = require('../../../utils/Middlewares/AuthMiddleware');

router.get('/view', AuthMiddleware.verifyToken, ToppingsService.ViewAllToppings);

router.post('/create', AuthMiddleware.verifyToken, ToppingsService.CreateTopping);

router.patch('/update/:toppingid', AuthMiddleware.verifyToken, ToppingsService.UpdateTopping);

router.delete('/delete/:toppingid', AuthMiddleware.verifyToken, ToppingsService.DeleteTopping);

module.exports = router;
