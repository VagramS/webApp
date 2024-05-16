const router = require('express-promise-router')();
const ToppingsService = require('./ToppingService');

router.post('/create', ToppingsService.CreateTopping);

router.patch('/update', ToppingsService.UpdateTopping);

router.delete('/delete', ToppingsService.DeleteTopping);

module.exports = router;