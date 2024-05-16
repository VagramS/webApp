const router = require('express-promise-router')();
const ConfirmationService = require('./ConfirmationService');

router.get('/confirmation', ConfirmationService.Confirmation_Message);

module.exports = router;