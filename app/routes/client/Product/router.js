const router = require('express').Router();

//Display detailed information about a selected meal.
router.get('/:productId', (req, res) => {
    // #swagger.tags = ["Client / Product"]
    res.send('Product');
});

module.exports = router;