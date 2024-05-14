const router = require('express').Router();

// After successful payment, display a confirmation message to the client. 
// Include the order number, total cost, tip amount, and table number in the confirmation message.
router.get('/confirmation', (req, res) => {
    // #swagger.tags = ['Client / Order']\
    // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
    res.send('Order confirmation');
});

module.exports = router;