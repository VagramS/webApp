const router = require('express-promise-router')();
const MealService = require('./MealService');

router.post('/add', MealService.AddNewMeal);

router.patch('/update', MealService.UpdateMeal);

router.delete('/delete', MealService.DeleteMeal);

router.patch('/status', MealService.UpdateMealStatus);

module.exports = router;