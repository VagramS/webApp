const router = require('express').Router();

// Create meal
router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    res.send('Add a new meal');
});

// Update meal
router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    res.send('Update a meal');
});

// Delete meal
router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    res.send('Delete a meal');
});

// Ability to mark meals as active or inactive.
router.patch('/status', (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    res.send('Update meal status');
});

module.exports = router;