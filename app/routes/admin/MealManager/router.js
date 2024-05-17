const router = require('express-promise-router')();
const MealService = require('./MealService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.post('/add', AuthMiddleware.verifyToken, MealService.AddNewMeal);

router.patch('/update', MealService.UpdateMeal);

router.delete('/delete', MealService.DeleteMeal);

router.patch('/status', MealService.UpdateMealStatus);

module.exports = router;