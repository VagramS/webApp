const router = require('express').Router();

router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to add a new meal'
    res.send('Add a new meal');
});

router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update a meal'
    res.send('Update a meal');
});

router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to delete a meal'
    res.send('Delete a meal');
});

router.patch('/status', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update meal status'
    res.send('Update meal status');
});

module.exports = router;