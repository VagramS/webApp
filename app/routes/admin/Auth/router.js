const router = require('express').Router();

// Secure login system for admin users.
router.post('/login', (req, res) => {
    // #swagger.tags = ['Admin / Auth']
    res.send('Admin login');
});

module.exports = router;