const router = require("express-promise-router")();
const CartService = require("./CartService");

router.get("/:tableid", CartService.ShowCart);

router.get("/total/:tableid", CartService.DisplayTotalCostOfTable);

router.post("/add/:mealid/:tableid", CartService.AddToCart);

router.patch("/update/:tableid", CartService.Update);

router.delete("/remove/:mealid/:tableid", CartService.DeleteFromCart);

module.exports = router;
