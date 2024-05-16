const router = require('express-promise-router')();
const TableService = require('./TableService');

router.post('/create', TableService.CreateTable);

router.patch('/update', TableService.UpdateTable);

router.delete('/delete', TableService.DeleteTable);

router.post('/generate-id', TableService.GenerateUniqueId);

router.post('/generate-url', TableService.GenerateUniqueUrl);

router.post('/generate-qr', TableService.GenerateQRCode);

module.exports = router;