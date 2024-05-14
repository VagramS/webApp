const router = require('express').Router();

// Add a new table
router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Add a new table');
});

// Update table
router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Update a table');
});

// Delete table
router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Delete a table');
});

// Generate a unique table ID for each table.
router.post('/generate-id', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Generate a unique table ID');
});

// Generate a unique URL for the menu page with the embedded table ID.
router.post('/generate-url', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Generate a unique URL');
});

//Generate QR codes with the unique URL for each table.
router.post('/generate-qr', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    res.send('Generate QR codes');
});

module.exports = router;