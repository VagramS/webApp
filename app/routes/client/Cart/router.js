const router = require('express').Router();

// Allow users to add meals to the cart from both the menu page and the product page.
router.post('/add/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Product added to cart');
});

// Display the selected items in the cart
router.get('/', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Cart');
});

// Ability to remove items from the cart
router.delete('/remove/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Product removed from cart');
});

// Ability to adjust quantity of items from the cart
router.patch('/update/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Product quantity updated');
});

// Ability to add Instructions / Comments (Text field)
router.post('/Comment/:productId', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Comment added');
});

// Display the total cost of the order
router.get('/total', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Total cost');
});

//  Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.
router.post('/tip', (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    res.send('Tip added');
});


module.exports = router;