const router = require('express').Router();

router.get('/:productId', (req, res) => {
    // #swagger.tags = ["Client / Product"]
    // #swagger.description = "Display detailed information about a selected meal."
    // #swagger.parameters['productId'] = {description: 'Product ID'}
    res.send('Product');
});

module.exports = router;