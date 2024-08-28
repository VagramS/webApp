const router = require('express-promise-router')();
const TableService = require('./TableService');
const AuthMiddleware = require('../../../Utils/Middlewares/AuthMiddleware');

router.post('/create', AuthMiddleware.verifyToken, TableService.CreateTable);

router.patch('/update/:tableid', AuthMiddleware.verifyToken, TableService.UpdateTable);

router.delete('/delete/:tableid', AuthMiddleware.verifyToken, TableService.DeleteTable);

module.exports = router;
