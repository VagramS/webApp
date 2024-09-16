const router = require('express-promise-router')();
const MenuService = require('./MenuService');
const AuthMiddleware = require('../../../utils/Middlewares/AuthMiddleware');

router.post('/create', AuthMiddleware.verifyToken, MenuService.CreateMenuCategory);

router.patch('/update/:categoryid', AuthMiddleware.verifyToken, MenuService.UpdateMenuCategory);

router.delete('/delete/:categoryid', AuthMiddleware.verifyToken, MenuService.DeleteMenuCategory);

module.exports = router;
