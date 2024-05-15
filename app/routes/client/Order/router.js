const router = require('express').Router();
const ConfirmationService = require('./ConfirmationService');

router.get('/confirmation', ConfirmationService.Confirmation_Message);

module.exports = router;