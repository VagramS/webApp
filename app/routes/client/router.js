const router = require('express').Router();

const cartRouter = require('./Cart/router');
const menuRouter = require('./Menu/router');
const orderRouter = require('./Order/router');
const paymentRouter = require('./Payment/router');
const productRouter = require('./Product/router');

router.use('/cart', cartRouter);
router.use('/menu', menuRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use('/product', productRouter);

module.exports = {Client_Router: router};