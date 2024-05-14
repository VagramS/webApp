const router = require('express').Router();

router.post('/add', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to add a new table'
    res.send('Add a new table');
});

router.patch('/update', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to update a table'
    res.send('Update a table');
});

router.delete('/delete', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to delete a table'
    res.send('Delete a table');
});

router.post('/generate-id', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique table ID'
    res.send('Generate a unique table ID');
});

router.post('/generate-url', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique URL for the menu page'
    res.send('Generate a unique URL');
});

router.post('/generate-qr', (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate QR codes'
    res.send('Generate QR codes');
});

module.exports = router;