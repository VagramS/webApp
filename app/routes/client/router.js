const router = require('express').Router();

const cartRouter = require('./Cart/router');
const menuRouter = require('./Menu/router');
const orderRouter = require('./Order/router');
const paymentRouter = require('./Payment/router');
const productRouter = require('./Product/router');

router.use('/menu', menuRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter);
router.use('/order', orderRouter);

module.exports = {Client_Router: router};