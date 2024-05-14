const router = require('express').Router();

// Create menu category
router.post('/create', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    res.send('Create a menu category');
});

// Update menu category
router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    res.send('Update a menu category');
});

// Delete menu category
router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    res.send('Delete a menu category');
});

module.exports = router;