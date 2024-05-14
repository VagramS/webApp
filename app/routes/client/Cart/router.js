const router = require('express').Router();

router.post('/add/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product added to cart');
});

router.get('/', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    res.send('Cart');
});

router.delete('/remove/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product removed from cart');
});

router.patch('/update/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to adjust quantity of items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product quantity updated');
});

router.post('/Comment', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to add Instructions / Comments (Text field)'
    res.send('Comment added');
});

router.get('/total', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    res.send('Total cost');
});

router.post('/tip', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.'
    res.send('Tip added');
});

module.exports = router;