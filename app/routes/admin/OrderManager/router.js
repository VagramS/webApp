const router = require('express').Router();

router.get('/view', (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'View all active orders in real-time'
    res.send('View all active orders');
});

router.patch('/status', (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'Mark orders as fulfilled or cancelled'
    res.send('Update order status');
});

module.exports = router;