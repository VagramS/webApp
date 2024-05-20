const router = require('express-promise-router')();
const TableService = require('./TableService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.post('/create', AuthMiddleware.verifyToken, TableService.CreateTable);

router.patch('/update/:tableid', AuthMiddleware.verifyToken, TableService.UpdateTable);

router.delete('/delete/:tableid', AuthMiddleware.verifyToken, TableService.DeleteTable);

router.post('/generate-id', AuthMiddleware.verifyToken, TableService.GenerateUniqueId);

router.post('/generate-url', AuthMiddleware.verifyToken,TableService.GenerateUniqueUrl);

router.post('/generate-qr', AuthMiddleware.verifyToken,TableService.GenerateQRCode);

module.exports = router;