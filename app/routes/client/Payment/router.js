const router = require('express').Router();

router.post('/stripe', (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to pay via Stripe.'
    res.send('Stripe payment');
});

router.post('/complete', (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to enter payment details and complete the transaction.'
    res.send('Payment completed');
});

router.post('/applepay', (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to pay via Apple Pay.'
    res.send('Apple Pay');
});

router.post('/status', (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Handle successful and failed payment transactions.'
    res.send('Payment status');
});

router.get('/confirmation', (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Upon successful payment, display a confirmation message along with the order number, total cost, tip amount, and table number.'
    res.send('Payment confirmation');
});

module.exports = router;