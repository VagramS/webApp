const router = require('express-promise-router')();
const ConfirmationService = require('./OrderService');

router.get('/confirmation/:orderid', ConfirmationService.Confirmation_Message);

router.patch('/payment/:orderid', ConfirmationService.Payment);

module.exports = router;
