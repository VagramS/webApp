const router = require('express-promise-router')();
const OrderService = require('./OrderService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.get('/view', AuthMiddleware.verifyToken, OrderService.ViewAllActiveOrders);

router.patch('/status/:orderid', AuthMiddleware.verifyToken, OrderService.UpdateOrderStatus);

module.exports = router;
