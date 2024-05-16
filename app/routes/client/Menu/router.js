const router = require('express-promise-router')();
const CategoriesService = require('./MenuService');

router.get('/categories', CategoriesService.DisplayCategories);

router.get('/meals', CategoriesService.DisplayMeals);

router.get('/meals/:categoryId', CategoriesService.FilterByCategory);

router.get('/meals/:mealId', CategoriesService.ViewDetailsById);

module.exports = router;