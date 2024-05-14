const router = require('express').Router();

// Update topping
router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to update add-on/toppings options'
    res.send('Update a topping');
});

// Create topping
router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to create add-on/toppings options'
    res.send('Add a new topping');
});

// Delete topping
router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to delete add-on/toppings options'
    res.send('Delete a topping');
});

module.exports = router;