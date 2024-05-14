const router = require('express').Router();

router.post('/create', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Create a menu category'
    res.send('Create a menu category');
});

router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Update a menu category'
    res.send('Update a menu category');
});

router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Delete a menu category'
    res.send('Delete a menu category');
});

module.exports = router;