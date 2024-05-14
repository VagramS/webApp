const router = require('express').Router();

//View all active orders in real-time.
router.get('/view', (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    res.send('View all active orders');
});

//Ability to mark orders as fulfilled or cancelled.
router.patch('/status', (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    res.send('Update order status');
});

module.exports = router;