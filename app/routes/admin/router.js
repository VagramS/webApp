const express = require('express');
const router = express.Router();

const authRouter = require('./Auth/router');
const mealManagerRouter = require('./MealManager/router');
const orderManagerRouter = require('./OrderManager/router');
const tableManagerRouter = require('./TableManager/router');
const toppingsRouter = require('./Toppings/router');

router.use('/auth', authRouter);
router.use('/meals', mealManagerRouter);
router.use('/orders', orderManagerRouter);
router.use('/tables', tableManagerRouter);
router.use('/toppings', toppingsRouter);

module.exports = {Admin_Router: router};