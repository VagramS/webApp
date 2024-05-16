const router = require('express-promise-router')();
const MenuService = require('./MenuService');

router.post('/create', MenuService.CreateMenuCategory);

router.patch('/update', MenuService.UpdateMenuCategory);

router.delete('/delete', MenuService.DeleteMenuCategory);

module.exports = router;