const router = require('express').Router();

//Allow admin to create, update, and delete add-on/toppings options


// Update topping
router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    res.send('Update a topping');
});

// Create topping
router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    res.send('Add a new topping');
});

// Delete topping
router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    res.send('Delete a topping');
});


module.exports = router;