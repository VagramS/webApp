const router = require('express-promise-router')();
const CategoriesService = require('./MenuService');

router.get('/categories/:tableid', CategoriesService.DisplayCategories);

router.get('/meals', CategoriesService.DisplayMeals);

router.get('/meals/:categoryid', CategoriesService.FilterByCategory);

router.get('/meal/:mealid', CategoriesService.ViewDetailsById);

module.exports = router;
