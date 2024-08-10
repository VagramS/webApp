const router = require("express-promise-router")();
const MealService = require("./MealService");
const AuthMiddleware = require("../../../Utils/Middlewares/AuthMiddleware");

router.post("/add", AuthMiddleware.verifyToken, MealService.AddNewMeal);

router.patch(
  "/update/:mealid",
  AuthMiddleware.verifyToken,
  MealService.UpdateMeal,
);

router.delete(
  "/delete/:mealid",
  AuthMiddleware.verifyToken,
  MealService.DeleteMeal,
);

module.exports = router;
