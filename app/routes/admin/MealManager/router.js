const router = require('express-promise-router')();
const MealService = require('./MealService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.post('/add', AuthMiddleware.verifyToken, MealService.AddNewMeal);

router.patch('/update', AuthMiddleware.verifyToken, MealService.UpdateMeal);

router.delete('/delete', AuthMiddleware.verifyToken, MealService.DeleteMeal);

router.patch('/update-status', AuthMiddleware.verifyToken, MealService.UpdateMealStatus);

module.exports = router;