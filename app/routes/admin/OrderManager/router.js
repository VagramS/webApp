const router = require('express-promise-router')();
const OrderService = require('./OrderService');

router.get('/view', OrderService.ViewAllActiveOrders);

router.patch('/status', OrderService.UpdateOrderStatus);

module.exports = router;