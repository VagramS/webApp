const router = require('express').Router();

// Display all available categories (Snacks, Salads, Main, Drinks… etc).
router.get('/categories', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    res.send('Categories');
});

// Display all available meals grouped by categories
router.get('/meals', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    res.send('Meals');
});

// Allow users to filter meals by category.
router.get('/meals/:categoryId', (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    res.send('Meals filetered by category');
});


module.exports = router;