const router = require('express').Router();

router.get('/categories', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available categories (Snacks, Salads, Main, Drinks… etc).'
    res.send('Categories');
});

router.get('/meals', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available meals grouped by categories.'
    res.send('Meals');
});

router.get('/meals/:categoryId', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to filter meals by category.'
    // #swagger.parameters['categoryId'] = { description: 'Category ID' }
    res.send('Meals filetered by category');
});

router.get('/meals/:mealId', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to view details of a specific meal.'
    // #swagger.parameters['mealId'] = { description: 'Meal ID' }
    res.send('Details of a specific meal');
});

module.exports = router;