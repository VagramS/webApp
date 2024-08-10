const router = require("express-promise-router")();

const authRouter = require("./Auth/router");
const mealManagerRouter = require("./MealManager/router");
const orderManagerRouter = require("./OrderManager/router");
const tableManagerRouter = require("./TableManager/router");
const toppingsRouter = require("./Toppings/router");
const menuManagerRouter = require("./MenuManager/router");

router.use("/auth", authRouter);
router.use("/menu", menuManagerRouter);
router.use("/toppings", toppingsRouter);
router.use("/meals", mealManagerRouter);
router.use("/orders", orderManagerRouter);
router.use("/tables", tableManagerRouter);

module.exports = { Admin_Router: router };
