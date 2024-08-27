const router = require('express-promise-router')();

const cartRouter = require('./Cart/router');
const menuRouter = require('./Menu/router');
const orderRouter = require('./Order/router');

router.use('/menu', menuRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = {Client_Router: router};