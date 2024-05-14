const router = require('express').Router();

router.post('/login', (req, res) => {
    // #swagger.tags = ['Admin / Auth']
    // #swagger.description = 'Secure login system for admin users.'
    res.send('Admin login');
});

module.exports = router;